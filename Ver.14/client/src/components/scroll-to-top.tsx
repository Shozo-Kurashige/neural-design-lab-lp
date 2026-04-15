import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 p-3 bg-[#2C3E30] text-[#D4AF37] rounded-full shadow-lg border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white hover:border-white transition-all duration-300 group"
          aria-label="トップへ戻る"
        >
          <div className="flex flex-col items-center justify-center gap-0.5">
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-[9px] font-bold tracking-widest font-['Noto_Serif_JP'] hidden sm:block">
              TOP
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
