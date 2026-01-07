import AnimatedText from '@/components/AnimatedText'
import * as Icons from '@/components/Icons'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const FramerImage = motion.create(Image);

const FeaturedProject = ({ type, title, summary, img, links, width, height }) => {
    const mainLink = links?.find(l => l.icon === 'GlobeIcon')?.url || links?.[0]?.url || "/";

    return (
        <article className='w-full flex flex-col lg:flex-row items-center justify-between relative rounded-br-2xl
        rounded-2xl lg:rounded-3xl border border-solid border-dark bg-light shadow-2xl p-4 md:p-8 lg:p-12 dark:bg-dark dark:border-light'>
            <div className='absolute top-0 -right-2 -z-10 w-[100%] h-[102%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-3 md:w-[101%] md:h-[103%] md:rounded-[2.5rem]' />
            <Link href={mainLink} target="_blank"
                className='w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-lg'
            >
                <FramerImage src={img} alt={title} className="w-full h-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    width={width}
                    height={height}
                    priority
                />
            </Link>

            <div className='w-full lg:w-1/2 flex flex-col items-start justify-between pl-0 lg:pl-6 pt-6 lg:pt-0'>
                <span className='text-primary font-medium text-xl dark:text-primary-dark text-sm sm:text-xl'>{type}</span>
                <Link href={mainLink} target="_blank" className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-4xl font-bold dark:text-light text-xl sm:text-4xl'>{title}</h2>
                </Link>
                <p className='my-2 font-medium text-dark dark:text-light text-sm sm:text-base'>{summary}</p>
                <div className='mt-2 flex items-center gap-4'>
                    <div className='mt-2 flex items-center gap-4'>
                        {links?.map((linkItem, index) => {
                            const url = linkItem.url || "/";
                            const Icon = Icons[linkItem.icon];
                            return Icon ? (
                                <Link key={index} href={url} target="_blank" className='w-10'>
                                    <Icon />
                                </Link>
                            ) : null;
                        })}
                    </div>
                </div>
            </div>
        </article>
    )
}

const Project = ({ title, type, img, links, width, height }) => {
    const mainLink = links?.find(l => l.icon === 'GlobeIcon')?.url || links?.[0]?.url || "/";
    return (
        <article className='w-full flex flex-col items-center justify-center rounded-2xl 
        border border-solid border-dark bg-light p-4 md:p-6 relative dark:bg-dark dark:border-light'>
            <div className='absolute top-0 -right-2 -z-10 w-[100%] h-[102%] rounded-[1.5rem] bg-dark rounded-br-3xl dark:bg-light md:-right-3 md:w-[101%] md:h-[103%] md:rounded-[2rem]' />
            <Link href={mainLink} target="_blank"
                className='w-full cursor-pointer overflow-hidden rounded-lg'
            >
                <FramerImage src={img} alt={title} className="w-full h-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    width={width}
                    height={height}
                />
            </Link>

            <div className='w-full flex flex-col items-start justify-between mt-4'>
                <span className='text-primary font-medium text-xl dark:text-primary-dark text-sm md:text-lg'>{type}</span>
                <Link href={mainLink} target="_blank" className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-3xl font-bold dark:text-light text-lg lg:text-2xl'>{title}</h2>
                </Link>
                <div className='w-full mt-2 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-4'>
                            {links?.map((linkItem, index) => {
                                const url = linkItem.url || "/";
                                const Icon = Icons[linkItem.icon];
                                return Icon ? (
                                    <Link key={index} href={url} target="_blank" className='w-8 md:w-6'>
                                        <Icon />
                                    </Link>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

const Projects = ({ projectsData, siteData }) => {
    return (
        <>
            <Head>
                <title>{siteData?.metadata?.projects?.title || "Projects Page"}</title>
                <meta name="description" content={siteData?.metadata?.projects?.description || "any description"} />
            </Head>
            <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden'>
                <Layout className='pt-16'>
                    <AnimatedText text="Imagination Trumps Knowledge!" className='mb-16 !text-2xl sm:!text-5xl lg:!text-6xl sm:mb-8' />

                    <div className='grid grid-cols-12 gap-x-0 gap-y-16 md:gap-x-8 md:gap-y-24 lg:gap-x-16 xl:gap-x-24'>
                        {projectsData?.featured?.map((project, index) => (
                            <div className='col-span-12' key={index}>
                                <FeaturedProject
                                    title={project.title}
                                    img={project.img}
                                    summary={project.summary}
                                    links={project.links}
                                    type={project.type}
                                    width={project.width}
                                    height={project.height}
                                />
                            </div>
                        ))}
                        {projectsData?.other?.map((project, index) => (
                            <div className='col-span-12 md:col-span-6' key={index}>
                                <Project
                                    title={project.title}
                                    img={project.img}
                                    links={project.links}
                                    type={project.type}
                                    width={project.width}
                                    height={project.height}
                                />
                            </div>
                        ))}
                    </div>
                </Layout>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const { getYamlData } = await import('@/lib/api');
    const projectsData = getYamlData('projects');
    const siteData = getYamlData('site');

    return {
        props: {
            projectsData,
            siteData
        }
    }
}

export default Projects
