'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex items-center justify-center transition-colors duration-300 select-none">
      <div className="w-36 h-36 sm:w-44 sm:h-44">
        <DotLottieReact
          src="/animation/loading.json"
          loop
          autoplay
          className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(249,115,22,0.15)]"
        />
      </div>
    </div>
  );
}
