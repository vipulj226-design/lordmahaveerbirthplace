import { Image } from '@/components/ui/image';
import { useActiveSection } from '@/hooks/use-active-section';
import { useNavigate } from 'react-router-dom';

const navigationLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Birthplace', href: '#about' },
  { label: "Acharyas  Blessings", href: '#blessings' },
  { label: 'Foundation', href: '#foundation' },
  { label: 'Committee', href: '#committee' },
  { label: 'Donate', href: '#donate' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'How to Reach', href: '#how-to-reach' },
  { label: 'Contact', href: '#contact' },
];

const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, navigate?: ReturnType<typeof useNavigate>) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  
  // If it's the Home link and we're already on homepage, scroll to hero
  if (targetId === 'hero') {
    const element = document.getElementById(targetId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const buffer = 8;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - buffer;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    return;
  }
  
  const element = document.getElementById(targetId);
  
  if (element) {
    // Get actual header height by measuring the header element
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    // Add a small buffer (8px) to ensure section title appears directly below header
    const buffer = 8;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight - buffer;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export default function Header() {
  const activeSection = useActiveSection();
  const navigate = useNavigate();
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] w-full"
      style={{
        backgroundColor: 'rgba(253, 246, 236, 0.96)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(107, 15, 26, 0.1)',
      }}
    >
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center items-center px-6 py-2 max-w-[1400px] mx-auto">

        {/* Logo */}
        <a href="/" onClick={(e) => handleAnchorClick(e, '#hero')} className="flex items-center gap-3 shrink-0 absolute left-6 cursor-pointer hover:opacity-80 transition-opacity">
          <Image
            src="https://static.wixstatic.com/media/53945f_926edabb995f423680415b255d79c255~mv2.png"
            alt="Lord Mahaveer Birthplace Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-heading text-xs font-black text-maroon uppercase tracking-wider">Lord Mahaveer</span>
            <span className="font-heading text-[0.65rem] font-bold text-gold uppercase tracking-wider">Birthplace</span>
          </div>
        </a>

        {/* Navigation Links */}
        <ul className="flex gap-0.5 items-center">
          {navigationLinks.map((link, index) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.href} style={{ marginLeft: index === 0 ? '80px' : '0' }}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-2 py-2 text-sm uppercase font-heading rounded transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                  style={{
                    color: isActive ? '#D4AF37' : '#000000',
                    fontWeight: '700',
                    backgroundColor: isActive ? '#6B0F1A' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#6B0F1A';
                      e.currentTarget.style.color = '#D4AF37';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#000000';
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Mobile Navigation */}
      <div className="md:hidden flex flex-col">
        {/* Mobile Header with Logo */}
        <a href="/" onClick={(e) => handleAnchorClick(e, '#hero')} className="flex items-center justify-center gap-3 py-2 border-b border-gold/20 cursor-pointer hover:opacity-80 transition-opacity">
          <Image
            src="https://static.wixstatic.com/media/53945f_926edabb995f423680415b255d79c255~mv2.png"
            alt="Lord Mahaveer Birthplace Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-heading text-xs font-black text-maroon uppercase tracking-wider">Lord Mahaveer</span>
            <span className="font-heading text-[0.65rem] font-bold text-gold uppercase tracking-wider">Birthplace</span>
          </div>
        </a>
        {/* Mobile Grid Navigation */}
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            borderTop: '1px solid rgba(197, 165, 90, 0.15)',
          }}
        >
          {navigationLinks.map((link, index) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="flex items-center justify-center min-h-[50px] px-1.5 py-2 text-[0.6rem] uppercase font-heading transition-all duration-200"
                style={{
                  borderRight: (index + 1) % 5 !== 0 ? '1px solid rgba(197, 165, 90, 0.15)' : 'none',
                  borderBottom: index < 5 ? '1px solid rgba(197, 165, 90, 0.15)' : 'none',
                  backgroundColor: isActive ? '#6B0F1A' : 'transparent',
                  color: isActive ? '#D4AF37' : '#6B0F1A',
                  lineHeight: '1.2',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                  fontWeight: '700',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#6B0F1A';
                    e.currentTarget.style.color = '#D4AF37';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6B0F1A';
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
