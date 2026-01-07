import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import TransitionEffect from '@/components/TransitionEffect'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
})

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content={pageProps.siteData?.metadata?.viewport || "width=device-width, initial-scale=1"} />
        <link rel="icon" href={pageProps.siteData?.metadata?.icon || "/favicon.ico"} />
      </Head>
      <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen text-dark dark:text-light flex flex-col ${router.pathname === '/' ? 'h-[100dvh] overflow-hidden' : ''}`}>
        <Navbar siteData={pageProps.siteData} />
        <AnimatePresence mode="wait">
          <div key={router.asPath} className='h-full flex-1 flex flex-col justify-center'>
            <TransitionEffect />
            <Component {...pageProps} />
          </div>
        </AnimatePresence>
        <Footer siteData={pageProps.siteData} />
      </main>
    </>
  )
}
