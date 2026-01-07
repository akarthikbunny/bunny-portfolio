import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'

const Details = ({ position, company, companyLink, time, address, work }) => {
    const ref = useRef(null);
    return (
        <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-full md:w-[60%] mx-auto flex flex-col items-center justify-between'>
            <LiIcon reference={ref} />
            <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <h3 className='capitalize font-bold text-xl md:text-2xl'>{position}&nbsp;<a href={companyLink} target="_blank" rel="noopener noreferrer" className='text-primary capitalize dark:text-primary-dark'>@{company}</a></h3>
                <span className='capitalize font-medium text-dark/75 dark:text-light/75 text-xs md:text-sm'>
                    {time} | {address}
                </span>
                <p className='font-medium w-full text-sm md:text-base'>
                    {work}
                </p>
            </motion.div>
        </li>
    );
};

const Experience = ({ experienceData }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    })

    return (
        <div className='my-64'>
            <h2 className='font-bold text-4xl md:text-8xl mb-32 w-full text-center md:mb-16'>Experience</h2>
            <div ref={ref} className='w-full mx-auto relative lg:w-[90%] md:w-full'>
                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className="absolute left-[25px] md:left-[37.5px] lg:left-[37.5px] top-0 w-[2px] md:w-[4px] h-full bg-dark origin-top dark:bg-primary-dark" />

                <ul className='w-full flex flex-col items-start justify-between pl-20 md:pl-0 md:ml-4'>
                    {experienceData?.map((job, index) => (
                        <Details
                            key={index}
                            position={job.position}
                            company={job.company}
                            companyLink={job.companyLink}
                            time={job.time}
                            address={job.address}
                            work={job.work}
                        />
                    ))}
                </ul>
            </div>
        </div >
    )
}

export default Experience
