import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const FramerImage = motion.create(Image);

const MovingImg = ({ title, img, link, width, height }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const imgRef = useRef(null);

    function handleMouse(event) {
        imgRef.current.style.display = "inline-block";
        x.set(event.pageX);
        y.set(-10);
    }

    function handleMouseLeave() {
        imgRef.current.style.display = "none";
        x.set(0);
        y.set(0);
    }

    return (
        <Link href={link} target="_blank"
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
        >
            <h2 className='capitalize text-xl font-semibold hover:underline text-sm md:text-xl'>{title}</h2>
            <FramerImage
                style={{ x: x, y: y }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
                ref={imgRef} src={img} alt={title} className="z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden"
                width={width}
                height={height}
            />
        </Link>
    );
};

const Article = ({ img, title, date, link, width, height }) => {
    return (
        <motion.li
            initial={{ y: 200 }}
            whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            viewport={{ once: true }}
            className='relative w-full p-4 py-6 my-4 rounded-xl flex flex-col md:flex-row items-start md:items-center
        justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4
        dark:bg-dark dark:text-light dark:border-light'>
            <MovingImg title={title} img={img} link={link} width={width} height={height} />
            <span className='text-primary font-semibold pl-0 pt-4 md:pt-0 md:pl-4 dark:text-primary-dark xs:text-sm'>{date}</span>
        </motion.li>
    )
}

const FeaturedArticle = ({ img, title, time, summary, link, width, height }) => {
    return (
        <li className='relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light'>
            <div className='absolute top-0 -right-2 -z-10 w-[100%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl md:-right-3 md:w-[101%] md:rounded-[2.5rem]' />
            <Link href={link} target="_blank"
                className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'
            >
                <FramerImage src={img} alt={title} className="w-full h-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    width={width}
                    height={height}
                    priority
                />
            </Link>
            <Link href={link} target="_blank">
                <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline dark:text-light text-xl md:text-2xl'>{title}</h2>
            </Link>
            <p className='text-sm mb-2 dark:text-light'>{summary}</p>
            <span className='text-primary font-semibold dark:text-primary-dark xs:text-sm'>{time}</span>
        </li>
    )
}

const Articles = ({ articlesData, siteData }) => {
    return (
        <>
            <Head>
                <title>{siteData?.metadata?.articles?.title || "Articles Page"}</title>
                <meta name="description" content={siteData?.metadata?.articles?.description || "any description"} />
            </Head>
            <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden'>
                <Layout className='pt-16'>
                    <AnimatedText text="Words Can Change The World!" className='mb-16 !text-2xl sm:!text-5xl lg:!text-7xl sm:mb-8' />
                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-8 md:gap-y-16'>
                        {articlesData?.featured?.map((article, index) => (
                            <FeaturedArticle
                                key={index}
                                title={article.title}
                                summary={article.summary}
                                time={article.time}
                                link={article.link}
                                img={article.img}
                                width={article.width}
                                height={article.height}
                            />
                        ))}
                    </ul>
                    <h2 className='font-bold text-4xl w-full text-center my-16 mt-32 dark:text-light text-2xl md:text-4xl'>All Articles</h2>
                    <ul>
                        {articlesData?.other?.map((article, index) => (
                            <Article
                                key={index}
                                title={article.title}
                                date={article.date}
                                link={article.link}
                                img={article.img}
                                width={article.width}
                                height={article.height}
                            />
                        ))}
                    </ul>
                </Layout>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const { getYamlData } = await import('@/lib/api');
    const articlesData = getYamlData('articles');
    const siteData = getYamlData('site');

    return {
        props: {
            articlesData,
            siteData
        }
    }
}

export default Articles
