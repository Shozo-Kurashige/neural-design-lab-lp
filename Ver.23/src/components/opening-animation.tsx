import React, { useEffect } from "react";
import { motion } from "framer-motion";

export function OpeningAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3.5,
          times: [0, 0.15, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/Opening_bk.webp')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 p-6">
          <h1 className="text-white text-2xl md:text-4xl font-['Noto_Serif_JP',_serif] font-bold tracking-widest text-center leading-relaxed drop-shadow-md">
            ニッポンの中小企業と
            <br className="md:hidden" />
            地方のために。
          </h1>
        </div>
      </motion.div>
    </div>
  );
}
