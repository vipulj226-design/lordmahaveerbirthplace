import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'about',
        'statistics',
        'blessings',
        'foundation',
        'committee',
        'donate',
        'events',
        'gallery',
        'how-to-reach',
        'contact'
      ];

      // Get the header height to account for fixed positioning
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const offset = headerHeight + 50; // Add extra buffer for better UX

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        
        // Check if section is in viewport (accounting for header)
        if (rect.top <= offset && rect.bottom > offset) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return activeSection;
}
