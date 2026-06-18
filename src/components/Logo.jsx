import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Logo = ({ size = 36, showText = true }) => {
  return (
    <div className="flex items-center gap-3 select-none cursor-pointer group">
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-xl bg-orange-500/10 dark:bg-orange-500/20 p-1 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
      >
        <DotLottieReact
          src="/animation/logo.json"
          loop
          autoplay
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(249,115,22,0.2)]"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center font-black tracking-wide text-xl sm:text-2xl font-sans">
            <span className="text-slate-900 dark:text-slate-50 transition-colors duration-300">
              Brawn
            </span>
            <span className="text-orange-600 dark:text-orange-400 font-extrabold transition-colors duration-300">
              ix
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.12em] text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">
            Fitness Platform
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
