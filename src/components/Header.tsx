const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Birthplace', href: '#birthplace' },
  { label: 'Blessings', href: '#blessings' },
  { label: 'Vaishali', href: '#vaishali' },
  { label: 'Foundation', href: '#foundation' },
  { label: 'Committee', href: '#committee' },
  { label: 'Donate', href: '#donate' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] w-full bg-cream/96 backdrop-blur-[10px]"
      style={{
        boxShadow: '0 2px 20px rgba(107, 15, 26, 0.1)',
      }}
    >
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center items-center px-6 py-2 max-w-[1400px] mx-auto">
        {/* Navigation Links */}
        <ul className="flex gap-0.5">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-2 py-1 text-[0.7rem] uppercase font-paragraph rounded transition-colors duration-200"
                style={{
                  color: '#000000',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6B0F1A';
                  e.currentTarget.style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex flex-col">
        {/* Mobile Grid Navigation */}
        <div className="grid gap-0 grid-cols-3 sm:grid-cols-4 border-t border-gold/15">
          {navigationLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center min-h-[56px] sm:min-h-[52px] text-xs sm:text-sm uppercase font-paragraph text-maroon transition-colors duration-200 border-r border-gold/15 hover:bg-maroon hover:text-gold"
              style={{
                borderRight: (index + 1) % 4 !== 0 && window.innerWidth >= 640 ? '1px solid rgba(197, 165, 90, 0.15)' : (index + 1) % 3 !== 0 && window.innerWidth < 640 ? '1px solid rgba(197, 165, 90, 0.15)' : 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
