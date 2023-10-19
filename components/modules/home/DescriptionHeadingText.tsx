'use client';

import { motion } from "framer-motion";
import React from "react";

export function DescriptionHeadingText() {
  const text = "Empowering Your Imagination with AI Services.";
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
        {displayedText ? displayedText : "Empowering Your Imagination with AI Services."}
      </motion.span>
      <motion.span
        className="animate-blink ml-1 inline-flex h-[22px] w-[2px] rounded-full bg-current align-sub opacity-75"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}