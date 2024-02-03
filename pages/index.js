import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';
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
      <section className='text-2xl py-5 space-y-3'>
        <CycleName />
        <p>I'm...</p>

        <ul className='list-disc list-inside'>
          <li>a software engineer @ John Deere</li>
          <li>a MCS-Data Science student @ UIUC</li>
        </ul>
        
        <p> I like to code, read, and build stuff for fun and to expand my skillset. Check out my <Link className='cool-link' href="/projects">projects</Link>! </p>
        <p>
          I also like to do astrophotography at night when the skies are clear. You can see some of that work on my <Link className='cool-link' target='_blank' href="https://www.instagram.com/jay_cr0well/">instagram</Link>
        </p>
      </section>

      <section className='py-5'>
        <h1 className='text-3xl pb-3'>Blog</h1>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className='pb-4' key={id}>
            <p className='text-2xl'><Link className='cool-link' href={`/posts/${id}`}>{title}</Link></p>
            <p className='text-lg text-gray-600'><Date dateString={date} /></p>
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
      names: ["Jeremiah", "Jay", "Jerry", "JP", "j4yb0ne"],
    }
  }

  changeText = () => {
    this.setState({ num: (this.state.num < (this.state.names.length - 1) ? (this.state.num + 1) : 0) })
  }

  render() {
    return <p>
      Hi! I'm <span className='cursor-default text-blue-500 ' onClick={this.changeText}>{this.state.names[this.state.num]}</span>
    </p>
  }
}