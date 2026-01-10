import Link from 'next/link'
import React from 'react'

const Footer = ({ siteData }) => {
    return (
        <footer className='w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base'>
            <div className='relative w-full px-8 py-8 flex items-center justify-between flex-col lg:flex-row lg:py-8 font-medium text-sm sm:text-base'>
                <span>{new Date().getFullYear()} {siteData?.footer?.copyright || "© All Rights Reserved."}</span>
                <div className='flex items-center lg:py-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2'>
                    {siteData?.footer?.credit || "Build With"} <span className='text-primary text-2xl px-1 dark:text-primary-dark font-bold'>&#9825;</span> {siteData?.footer?.creditPost || "by"}&nbsp;<Link href={siteData?.footer?.creditLink || "/"} className='underline underline-offset-2'>{siteData?.footer?.creditLinkText || ""}</Link>
                </div>
                <Link href={siteData?.footer?.contactLink || "/"} target={"_blank"} className='underline underline-offset-2'>{siteData?.footer?.contactLinkText || "Contact Me"}</Link>
            </div>
        </footer>
    )
}

export default Footer
