---
title: 'Hacking "PHP Calculator" writeup'
date: '2023-10-27'
---
*[2023 update]: I actually wrote this in 2021 on my old site - I've formatted it and made minor edits but the content remains the same!*

---

This is a writeup for the web hacking challenge 'PHP Calculator', one of the harder web hacking challenges
in the SIGPwny (UIUC cybersecurity club) CTF.

*[This link is now dead :O]* [Here's](http://phpcalc.chal.sigpwny.com/) a link to the challenge if you'd like to take a look at it first - this writeup is a big spoiler, the challenge is really fun

If not, thanks for choosing to read this. It's about a 5-6 minute read all in all. Let's get into it.

## Looking for an attack

It's a calculator. It works as you'd expect, and even has some cool trig functions(!) It also has a link to the PHP source code right at the top. 

![](/images/phpc1.png)

In short, the backend just takes the user-controlled parameter `expr` and sends it through a function `check_expr()`
and sets the calculator output to be the result of this function.

![](/images/phpc2.png )

check_expr() puts our input through 3 tests.

- Must be shorter than 0135 (octal, in decimal 93) characters long 
- Cannot have any spaces, tabs, newlines, backslashes, quotes, or brackets
- If there are letters or underscores, then the entire word that they make up must be in an approved list of strings. 
These strings are the [PHP math functions](http://php.net/manual/en/ref.math.php).
(about 50 functions, mostly things like 'sin', 'cos', 'pow', 'rand', 'floor', etc.)

If we pass these checks, our input is sent to a function called evaluate_expr(), *which just does a literal `eval()` of the input string*,
interpreting it as PHP code. Red flag! Our goal now is to get some code in here that will return the flag file's contents.

## Testing ideas

I couldn't find a way around the strict regex. Input any character or symbol that wasn't a function in the whitelist? Denied. So I thought to work with what we have and use only the PHP math functions to construct an input to `eval()`. We're looking for any function that returns something other than just a number - but like I said, most of these are just plain old math functions with numeric outputs. 

The first thing that jumped out at me was the function 'base_convert' 

![](/images/phpc3.png)

As you can see, this returns a string, not a number! And better yet, if we set the 'to_base' argument to 36, 
the number gets converted into an alphanumeric sequence that can include all characters a-z! 
This means, using an online base36 to decimal converter, we can find numbers that, when put through this
(whitelisted) function, return whatever lowercase word we want.

![](/images/phpc4.png)

Awesome! Let's do 'system(ls)'!

![](/images/phpc5.png)

Nice. At this point, I think I have it. All we have to do is construct 'system(cat flag.php)'. 
Unfortunately, this requires a space and a period, which we can't make from base_convert(). But, we <i>can</i>
make 'chr()', which can take in an ASCII value and give us any character, great! The full payload is a concatenation of these parts, and the periods are PHP for string concatenation.

- base_convert(1751504350,10,36) --- "system"
- (base_convert(15941,10,36). ------ "(cat" 
- base_convert(16191,10,36)(32) ---- "chr(32)" / space
- base_convert(727432,10,36). ------ "flag"
- base_convert(16191,10,36)(46). --- "chr(46)" / period
- base_convert(33037,10,36)) ------- "php)"

Great, just paste it in, and...

![](/images/phpc6.png)

Too long. The payload has to be less than 93 characters. Well, we don't necessarily need get 
<i>just</i> flag.php's contents. How about 'system(cat *)' / base_convert(1751504350,10,36)(base_convert(15941,10,36).base_convert(16191,10,36)(32).base_convert(16191,10,36)(42)) ?



This is unfortunately still too long - 117 characters. So close!  This is where I really got stuck. 
I tried other approaches, looked through all kinds of possible PHP or linux commands that could be useful
and shorter, but I eventually found that
to get father, we'll have to get creative with how we can create strings.

## Getting creative

So, the real issue here is that putting in a single special character, like a space or an asterisk,
currently requires 29 characters of payload, as in 'base_convert(16191,10,36)(42)' is needed to make '*'. 
It would be really, really awesome if I could somehow <i>modify</i> a whole string, and convert some characters
into new ones. E.g. use base convert() to create something like 'z7fkp', perform some function on it, and it becomes
'cat *'


This is starting to sound very encryption-ey, and I thought about XORing strings together. The ^ operator
is in fact allowed, and some quick testing showed we can new characters this way. Before, the only output I could get is lowercase letters, since that's what `base_convert` returns, but you can see that XORing two `base_convert` outputs gets us a capital F!

![](/images/phpc7.png)

I found that PHP XORs strings together by by just XORing each character's ASCII together, left to right. Using this info, I wrote a
Python script that tried all the possible combinations of XORs of characters we can make with base_convert (0-9, a-z)

![](/images/phpc8.png)

Hmm. Mostly control characters, a few capital letters, and no spaces, asterisks, or lowercase letters we need.
Well, how about 3 XORs?
Since 36\*36\*36 is a big number, I just searched to see if there was some combination that would produce an asterisk. And:

![](/images/phpc9.png)

'1' ^ 'a' ^ 'z' gives us an '*'! I made a quick change and had it look up the rest of the characters in 
'cat *', and found this combination.

![](/images/phpc10.png)

Taking each column to be a string of text, we essentially just need to have '11111'^'111aa'^'catpz', and we 
should get a 'cat *' to put in our base_convert'd 'system()' call! 

Also, I noticed that '11111' and '111aa' are valid hexadecimal numbers, and another allowed function is
`dechex()`, which we can use to make these strings without having to type the longer `base_convert`. 

So! Here's the final payload:



base_convert(1751504350,10,36)(dechex(69905)^dechex(70058)^base_convert(20660471,10,36)) 

->    system    (        '11111'   ^   '111aa'   ^            'catpz'         )

->            system  (    cat  *  )



This comes in at a cool 88 characters long. Below you can see it plugged into the site, and alongside
the broken page, at the top of the source, we have:

![](/images/phpc11.png)

The solution flag! 

Thank you for reading, I hope you enjoyed! :)