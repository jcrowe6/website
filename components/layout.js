import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const name = 'Jeremiah Crowell';
export const siteTitle = 'Jeremiah Crowell';

export default function Layout({ children, home }) {
  return (
  <div className="container mx-auto my-12 px-20">
      <Head>
        <meta
          name="description"
          content="Portfolio and personal site of Jeremiah Crowell"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata"
          rel="stylesheet"
        />
      </Head>
      <header className='flex flex-col items-center'>
        {home ? (
          <>
            <Image
              priority
              src="/images/hs4.jpg"
              className='rounded-[80px] transition-all hover:-translate-y-1 hover:rounded-[40px] duration-300'
              height={144}
              width={144}
              alt=""
            />
            <h1 className='text-4xl font-bold p-5'>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/hs4.jpg"
                className='rounded-[80px] transition-all hover:-translate-y-1 hover:rounded-[30px] duration-300'
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className='text-2xl font-bold p-5'>
              <Link href="/" className='text-inherit'>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main className=''>{children}</main>
      {!home && (
        <div className='my-8'>
          <Link className='text-xl cool-link' href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}