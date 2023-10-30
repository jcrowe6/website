import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import React from 'react';
import { getSortedPostsData } from '../libs/posts';
import Date from '../components/date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <CycleName />
        <p>I'm a software engineer at John Deere and am working on my Masters of Computer Science - Data Science at the University of Illinois at Urbana-Champaign. </p>
        
        <p> I like to code, read, and build stuff for fun and to expand my skillset. Check out my <Link href="/projects">projects</Link>! </p>
        <p>
          I also like to do astrophotography at night when the skies are clear. You can see some of that work on my <Link target='_blank' href="https://www.instagram.com/jay_cr0well/">instagram</Link>.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
            </li>
          ))}
        </ul>
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