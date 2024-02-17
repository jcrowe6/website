import '../styles/globals.css';
import { Inconsolata, Roboto_Mono, Ubuntu_Mono } from 'next/font/google'

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: ["400"],
    variable: '--font-inconsolata',
  })

  

/* The Component prop is the active page, so whenever you navigate between routes, 
Component will change to the new page. 
Therefore, any props you send to Component will be received by the page.

pageProps is an object with the initial props that were preloaded for your 
page by one of our data fetching methods, otherwise it's an empty object. */
export default function App({ Component, pageProps }) {
    return (
        <main className={`${inconsolata.variable} font-mono`}>
            <Component {...pageProps} />
        </main>
    )
}