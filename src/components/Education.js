import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'

const Details = ({ type, time, place, info }) => {
    const ref = useRef(null);
    return (
        <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-full md:w-[60%] mx-auto flex flex-col items-center justify-between'>
            <LiIcon reference={ref} />
            <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <h3 className='capitalize font-bold text-xl md:text-2xl md:text-4xl sm:text-xl xs:text-xl'>{type}</h3>
                <span className='capitalize font-medium text-dark/75 dark:text-light/75 text-xs md:text-sm'>
                    {time} | {place}
                </span>
                <p className='font-medium w-full text-sm md:text-base'>
                    {info}
                </p>
            </motion.div>
        </li>
    );
};

const Education = ({ educationData }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    })

    return (
        <div className='my-64'>
            <h2 className='font-bold text-4xl md:text-8xl mb-32 w-full text-center md:mb-16'>Education</h2>
            <div ref={ref} className='w-full mx-auto relative lg:w-[90%] md:w-full'>
                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className="absolute left-[25px] md:left-[37.5px] lg:left-[37.5px] top-0 w-[2px] md:w-[4px] h-full bg-dark origin-top dark:bg-primary-dark" />

                <ul className='w-full flex flex-col items-start justify-between pl-20 md:pl-0 md:ml-4'>
                    {educationData?.map((edu, index) => (
                        <Details
                            key={index}
                            type={edu.type}
                            time={edu.time}
                            place={edu.place}
                            info={edu.info}
                        />
                    ))}
                </ul>
            </div>
        </div >
    )
}

export default Education
