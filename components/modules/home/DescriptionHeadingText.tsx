'use client';

import { motion } from "framer-motion";
import React from "react";

export function DescriptionHeadingText() {
  const text = "A feature-rich, highly customizable AI Chatbot Template, empowered by Next.js.";
  const [displayedText, setDisplayedText] = React.useState("");
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, 50);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i]);

  return (
    <div>
      <motion.span
        className="h-16 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {displayedText ? displayedText : "A feature-rich, highly customizable AI Chatbot Template, empowered by Next.js."}
      </motion.span>
      <motion.span
        className="ml-1 inline-flex h-[22px] w-[2px] animate-blink rounded-full bg-current align-sub opacity-75 delay-1000"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}