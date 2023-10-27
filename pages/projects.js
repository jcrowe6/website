import Layout from "../components/layout";
import Head from 'next/head';
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

export default function Projects() {
    return (
    <Layout>
        <Head>
        <title>Projects</title>
        </Head>
        
        <h1>Projects</h1>

        <section>
        <Project
            title="Solitaire Solver"
            link="https://github.com/jcrowe6/solitaire_solver"
            desc="Solitaire engine written in C, and a Gymnasium environment that wraps it, to train an agent with reinforcement learning."
            used="[C, Python, Gymnasium]"
        />
        <Project
            title="Pascal's Mod Triangle"
            link="https://github.com/jcrowe6/pascals-mod-triangle/blob/master/pascals%20mod%20triangle.ipynb"
            desc="A visual exploration of Pascal's Triangle in different moduli."
            used="[Jupyter Notebook, Matplotlib]"
        />
        <Project
            title="Peg Game Analysis"
            link="https://github.com/jcrowe6/peg-game-analysis/blob/master/peg%20game%20analysis.ipynb"
            desc= 'Numerical analysis and data visualization of the many ways to solve the "peg game" (from cracker barrel)'
            used="[Jupyter Notebook, Matplotlib]"
        />
        <Project
            title="Markov Chain Sentences"
            link="https://github.com/jcrowe6/markov_page"
            desc="Webapp that takes a link to a webpage and uses Markov chaining / bigram to create a new, strange sentence from it. (Used to be hosted on my old site but haven't gotten around to restarting it)"
            used="[Python, Flask, Numpy, BeautifulSoup]"
        />
        <Project
            title="Optimal Hangman"
            link="https://github.com/jcrowe6/optimal-hangman-web"
            desc="Webapp and API I created that uses simple statistics to compute the optimal letter guesses for a game of hangman. (Used to be hosted on my old site but haven't gotten around to restarting it)"
            used="[Python, Flask]"
        />
        <Project
            title="Orpheus"
            link="https://github.com/jcrowe6/orpheus"
            desc= "Short 2D sidescroller game, inspired by the ancient myth of Orpheus and his descent to the underworld. Written in 2 weeks for my Classical Civilizations 115 final project."
            used="[Python, PyGame]"
        />
        <Project
            title="PHP Calculator Writeup"
            link="/posts/hacking-php-calc"
            desc="Writeup of my solution to the PHP Calculator challenge from PwnyCTF / UIUC's cybersecurity club CTF."
            used="[PHP]"
        />
        <Project
            title="Wikipedia Graph Analysis"
            link="https://github.com/jcrowe6/wiki_graph"
            desc="Final team project in data structures course, wrote a graph implementation to parse then analyze a dataset of Wikipedia hyperlinks, about 25 million edges in size. I was responsible for implementing the graph class, BFS, and Kosaraju's algorithm. "
            used="[C++]"
        />
        <Project
            title="Super Checkers"
            link="https://github.com/jcrowe6/CheckersGame"
            desc="Multiplayer checkers game for Android. I implemented the polling/netcode in the app and designed the API for the server."
            used="[Java, Android, Python, Flask]"
        />
        </section>
    </Layout>
    );
}

function Project({title, link, desc, used}) {
    return (
        <>
        <h3><Link href={link} target="_blank"> {title} </Link></h3>
        <p>{desc} <span className={utilStyles.smallText}>{used}</span></p>
        </>
    )
}