import { Image } from '@/components/ui/image';

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Birthplace', href: '#birthplace' },
  { label: 'Blessings', href: '#blessings' },
  { label: 'Vaishali', href: '#vaishali' },
  { label: 'Foundation', href: '#foundation' },
  { label: 'Committee', href: '#committee' },
  { label: 'Donate', href: '#donate' },
  { label: 'Gallery', href: '#gallery' },
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
      <nav className="hidden md:flex justify-between items-center px-6 py-4 max-w-[1400px] mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image
            src="https://static.wixstatic.com/media/53945f_2e826a49018c4608a83b51af29559333~mv2.png?originWidth=128&originHeight=128"
            alt="Lord Mahaveer Birthplace Logo"
            width={24}
            height={24}
          />
          <span className="font-heading text-[1.1rem] font-bold text-maroon">
            ☸ Lord
            <span style={{ color: '#D4AF37' }}>Mahaveer</span> Birthplace
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-1">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 text-xs uppercase font-paragraph rounded transition-colors duration-200"
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
        {/* Mobile Logo */}
        <div className="flex items-center justify-center gap-2 py-3 border-b border-[rgba(197,165,90,0.15)]">
          <Image
            src="https://static.wixstatic.com/media/53945f_871cd988c2c84607ba185313bfc4a532~mv2.png?originWidth=128&originHeight=128"
            alt="Lord Mahaveer Birthplace Logo"
            width={20}
            height={20}
          />
          <span className="font-heading text-[0.82rem] font-bold text-maroon text-center">
            ☸ Lord
            <span style={{ color: '#D4AF37' }}>Mahaveer</span> Birthplace
          </span>
        </div>

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
              className="flex flex-col items-center justify-center min-h-[44px] text-[0.58rem] uppercase font-paragraph text-maroon transition-colors duration-200"
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
