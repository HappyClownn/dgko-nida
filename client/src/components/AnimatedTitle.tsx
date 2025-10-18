import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titles = [
  "Niba Tahmin",
  "Oyun adı bulması çok zor",
  "Devine la photo",
  "Foto Tahmin",
];

interface AnimatedTitleProps {
  className?: string;
}

export default function AnimatedTitle({ className }: AnimatedTitleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary to-game-celebration bg-clip-text text-transparent"
        >
          {titles[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
