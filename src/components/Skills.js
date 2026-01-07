import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Skill = ({ name, x, y }) => {
    return (
        <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light py-1.5 px-3 md:py-3 md:px-6 text-xs md:text-base shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light'
            whileHover={{ scale: 1.05 }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            whileInView={{ x: x, y: y, opacity: 1 }}
            exit={{ x: 0, y: 0, opacity: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
        >
            {name}
        </motion.div>
    )
}

const Skills = ({ skillsData }) => {
    const [category, setCategory] = useState("Web");

    const handleCategoryChange = () => {
        const categories = Object.keys(skillsData);
        const currentIndex = categories.indexOf(category);
        const nextIndex = (currentIndex + 1) % categories.length;
        setCategory(categories[nextIndex]);
    }

    return (
        <>
            <h2 className='font-bold text-4xl md:text-8xl mt-64 w-full text-center'>Skills</h2>
            <div className='w-full relative flex items-center justify-center rounded-full bg-circular-light-sm dark:bg-circular-dark-sm
            lg:h-[80vh] sm:h-[60vh] h-[50vh]
            lg:bg-circular-light lg:dark:bg-circular-dark
            md:bg-circular-light-md md:dark:bg-circular-dark-md
            mb-64 md:mb-32
            '>
                <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light
         p-2 lg:p-8 text-xs lg:text-base shadow-dark cursor-pointer dark:text-dark dark:bg-light z-10'
                    whileHover={{ scale: 1.05 }}
                    onClick={handleCategoryChange}
                >
                    {category}
                </motion.div>

                {/* <AnimatePresence> */}
                <AnimatePresence mode="wait">
                    {skillsData && skillsData[category] && skillsData[category].map((skill, index) => (
                        <Skill
                            key={`${category}-${skill.name}`}
                            name={skill.name}
                            x={skill.x}
                            y={skill.y}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </>
    )
}

export default Skills
