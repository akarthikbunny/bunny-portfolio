import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion";

const Logo = ({ logoData }) => {
    const bgColor = logoData?.backgroundColor || "#1b1b1b";
    const hoverColors = logoData?.hoverColors || ["#121212", "rgba(131,58,180,1)", "rgba(253,29,29,1)", "rgba(252,176,69,1)", "rgba(131,58,180,1)", "#121212"];

    return (
        <div className='flex items-center justify-center mt-2'>
            <Link href="/" className='flex items-center justify-center'>
                <motion.div
                    className='w-16 h-16 bg-dark text-light flex items-center justify-center rounded-full text-2xl font-bold border border-solid border-transparent dark:border-light'
                    style={{ backgroundColor: bgColor }}
                    whileHover={{
                        backgroundColor: hoverColors,
                        transition: { duration: 1, repeat: Infinity }
                    }}
                >
                    AK
                </motion.div>
            </Link>
        </div>
    )
}

export default Logo
