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
            link="/markov"
            desc="Webapp that will take a link to a webpage and use Markov chaining to create a new, strange sentence from it."
            used="[Python, Flask, Numpy, BeautifulSoup]"
        />
        <Project
            title="Optimal Hangman"
            link="/hangman/main"
            desc='Webapp and API I created that uses simple statistics to compute the "optimal" letter guesses for a game of hangman.'
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
            link="/phpc.html"
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