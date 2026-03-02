const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Birthplace', href: '#birthplace' },
  { label: 'Blessings', href: '#blessings' },
  { label: 'Vaishali', href: '#vaishali' },
  { label: 'Foundation', href: '#foundation' },
  { label: 'Committee', href: '#committee' },
  { label: 'Donate', href: '#donate' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'How to Reach', href: '#how-to-reach' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
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
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            borderTop: '1px solid rgba(197, 165, 90, 0.15)',
          }}
        >
          {navigationLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center min-h-[48px] text-[0.55rem] uppercase font-paragraph text-maroon transition-colors duration-200"
              style={{
                borderRight: (index + 1) % 5 !== 0 ? '1px solid rgba(197, 165, 90, 0.15)' : 'none',
                borderBottom: index < 5 ? '1px solid rgba(197, 165, 90, 0.15)' : 'none',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6B0F1A';
                e.currentTarget.style.color = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6B0F1A';
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
