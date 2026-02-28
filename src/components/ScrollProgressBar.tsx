import { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[9999] transition-all duration-300 ease-out"
      style={{
        width: `${scrollProgress}%`,
        background: 'linear-gradient(to right, #D4AF37, #C5A55A, #6B0F1A)',
        boxShadow: '0 0 8px rgba(197, 165, 90, 0.7)',
      }}
    />
  );
}
