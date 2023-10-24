'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image"
import { useTheme } from 'next-themes';


export const HeroBannerImage = () => {
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (
    <div className='h-[673px]'/>
  )

  const imageSrc = theme === 'dark' ? '/featured-dark.jpg' : '/featured.jpg'
  return (
    <motion.section 
      className="flex justify-center px-4 "
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Image src={imageSrc} height={673} width={1280} alt="Resume GPT" className='rounded-lg border-8'/>
    </motion.section>
  )
}