import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'

const AnimatedNumbers = ({ value }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 })
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue, value])

    return <span ref={ref}></span>
}

const About = ({ skillsData, experienceData, educationData, biographyData, siteData }) => {
    return (
        <>
            <Head>
                <title>{siteData?.metadata?.about?.title || "About Page"}</title>
                <meta name="description" content={siteData?.metadata?.about?.description || "any description"} />
            </Head>
            <main className='flex w-full flex-col items-center justify-center'>
                <Layout className='pt-16'>
                    <AnimatedText text="Passion Fuels Purpose!" className='mb-16 !text-3xl sm:!text-4xl md:!text-6xl lg:!text-7xl' />
                    <div className='grid w-full grid-cols-8 gap-8 sm:gap-16'>
                        <div className='col-span-8 flex flex-col items-start justify-start xl:col-span-3 order-2 xl:order-1'>
                            <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75'>{biographyData?.title}</h2>
                            {biographyData?.paragraphs.map((para, index) => (
                                <p key={index} className='font-medium my-4 first:mt-0 last:mb-0'>
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div className='col-span-8 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-3 order-1 xl:order-2'>
                            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light' />
                            <div className='w-full h-auto rounded-2xl bg-gray-200 aspect-square flex items-center justify-center border border-dark dark:border-light text-dark'>
                                {biographyData?.image}
                            </div>
                        </div>

                        <div className='col-span-8 flex flex-row items-center justify-between xl:col-span-2 xl:flex-col xl:items-end order-3 xl:order-3'>
                            <div className='flex flex-col items-center justify-center xl:items-center'>
                                <span className='inline-block text-3xl font-bold md:text-6xl sm:text-5xl xl:text-7xl'>
                                    <AnimatedNumbers value={biographyData?.stats?.techs || 0} />+
                                </span>
                                <h2 className='text-xs font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xl:text-xl'>technologies learnt</h2>
                            </div>

                            <div className='flex flex-col items-center justify-center xl:items-center'>
                                <span className='inline-block text-3xl font-bold md:text-6xl sm:text-5xl xl:text-7xl'>
                                    <AnimatedNumbers value={biographyData?.stats?.projects || 0} />+
                                </span>
                                <h2 className='text-xs font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xl:text-xl'>projects completed</h2>
                            </div>

                            <div className='flex flex-col items-center justify-center xl:items-center'>
                                <span className='inline-block text-3xl font-bold md:text-6xl sm:text-5xl xl:text-7xl'>
                                    <AnimatedNumbers value={biographyData?.stats?.contest || 0} />
                                </span>
                                <h2 className='text-xs font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xl:text-xl'>leetcode contest rating</h2>
                            </div>
                        </div>
                    </div>

                    <Skills skillsData={skillsData} />
                    <Experience experienceData={experienceData} />
                    <Education educationData={educationData} />
                </Layout>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const { getYamlData } = await import('@/lib/api');
    const skillsData = getYamlData('skills');
    const experienceData = getYamlData('experience');
    const educationData = getYamlData('education');
    const biographyData = getYamlData('biography');
    const siteData = getYamlData('site');

    return {
        props: {
            skillsData,
            experienceData,
            educationData,
            biographyData,
            siteData
        }
    }
}

export default About
