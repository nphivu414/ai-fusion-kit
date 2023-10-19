'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image"


export const HeroBannerImage = () => {
  return (
    <motion.section 
      className="flex justify-center px-4 "
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Image src='/featured-screenshot.png' height={650} width={1200} alt="Resume GPT"/>
    </motion.section>
  )
}