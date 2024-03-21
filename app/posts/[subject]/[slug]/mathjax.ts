"use client"

import { useEffect, useState } from "react"

export const MathJax = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    (window as any).MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']]
      },
      svg: {
        fontCache: 'global'
      }
    };
  
    return (function () {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
      script.async = true;
      document.head.appendChild(script);
    })();
  }, [])

  if (!isMounted) {
    return null;
  }
}

// from: https://medium.com/@axcodes/how-to-use-mathjax-in-next-js-2ee53ba6a695