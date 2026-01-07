import Head from 'next/head'
import Layout from '@/components/Layout'
import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import { LinkArrow } from '@/components/Icons'
import AsciiArtBackground from '@/components/AsciiArtBackground'

export default function Home({ homeData, siteData }) {
  return (
    <>
      <Head>
        <title>{siteData?.metadata?.home?.title || "Portfolio"}</title>
        <meta name="description" content={siteData?.metadata?.home?.description || "any description"} />
      </Head>
      <AsciiArtBackground
        landscapeImage={homeData?.landscapeImage}
        portraitImage={homeData?.portraitImage}
      />
      <main className='flex items-center text-dark w-full dark:text-light relative z-10'>
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex items-center justify-between w-full flex-col xl:flex-col">
            <div className='w-full'>
            </div>
            <div className='w-full flex flex-col items-center self-center lg:text-center'>
              <AnimatedText text={homeData?.title} className="!text-3xl !text-center sm:!text-3xl md:!text-5xl lg:!text-6xl xl:!text-5xl" />
              <p className='my-4 text-xs font-medium sm:text-xs md:text-sm lg:text-base text-center lg:text-center pt-2'>
                {homeData?.description}
              </p>
              <div className='flex items-center self-center mt-2 lg:self-center'>
                <Link href={homeData?.resumeLink || "/dummy.pdf"} target={"_blank"}
                  className="flex items-center bg-dark text-light p-2 px-4 rounded-lg text-base font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2.5 md:px-6 md:text-lg"
                  download={true}
                >Resume <LinkArrow className={"w-6 ml-1"} />
                </Link>
                <Link href={homeData?.email || "mailto:abcd@gmail.com"} target={"_blank"}
                  className="ml-4 text-base font-medium capitalize text-dark underline dark:text-light md:text-lg"
                >Contact</Link>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const { getYamlData } = await import('@/lib/api');
  const homeData = getYamlData('home');
  const siteData = getYamlData('site');

  return {
    props: {
      homeData,
      siteData
    }
  }
}
