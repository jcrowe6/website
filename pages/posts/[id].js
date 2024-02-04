import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../libs/posts';
import Head from 'next/head'
import Date from '../../components/date'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className='text-4xl font-bold pb-3'>{postData.title}</h1>
          <p className='text-gray-600 text-lg pb-3'><Date dateString={postData.date} /></p>
          <div className='space-y-4 [&>p]:text-xl [&_a]:cool-link [&>h2]:text-3xl [&>h2]:font-bold [&>ul]:list-inside [&>ul]:list-disc [&>ul]:text-xl' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }