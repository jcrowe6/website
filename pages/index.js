import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import React from 'react';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <CycleName />
        <p>I recently finished my degree in computer science and statistics at the University of Illinois at Urbana-Champaign. </p>
        
        <p> I like to code, read, and build stuff for fun and to expand my skillset. Check out my <Link href="/projects">projects</Link>! </p>
        <p>
          I also like to do astrophotography at night when the skies are clear. You can see some of that work on my <Link target='_blank' href="https://www.instagram.com/jay_cr0well/">instagram</Link>.
        </p>
      </section>
    </Layout>
  );
}

class CycleName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      names: ["Jeremiah", "Jay", "Jerry", "JP", "j4yb0ne", "really good at coding stuff in React like this text cycling component that you've been clicking on"],
    }
  }

  changeText = () => {
    this.setState({ num: (this.state.num < (this.state.names.length - 1) ? (this.state.num + 1) : 0) })
  }

  render() {
    return <p>
      Hi! I'm <span className='cycleName' onClick={this.changeText}>{this.state.names[this.state.num]}</span>.
    </p>
  }
}