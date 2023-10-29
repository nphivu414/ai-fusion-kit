'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image"
import { useActiveThemeColor } from '@/hooks/useActiveTheme';


export const HeroBannerImage = () => {
  const [isMounted, setIsMounted] = React.useState(false)
  const theme = useActiveThemeColor()
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return (
    <div className='h-[673px]'/>
  )

  const getImageSrc = () => {
    if (theme === "dark") {
      return "/featured-dark.jpg"
    }
    return "/featured.jpg"
  }

  return (
    <motion.section 
      className="flex justify-center px-4 "
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Image src={getImageSrc()} height={673} width={1280} alt="Resume GPT" className='rounded-lg border-8'/>
    </motion.section>
  )
}