import { Image } from '@/components/ui/image';

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
      <nav className="hidden md:flex justify-between items-center px-6 py-2 max-w-[1400px] mx-auto gap-8">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 shrink-0">
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
        <ul className="flex gap-1">
          {navigationLinks.map((link) => {
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-xs uppercase font-heading font-bold rounded transition-colors duration-200 flex items-center gap-2"
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
            );
          })}
        </ul>
      </nav>
      {/* Mobile Navigation */}
      <div className="md:hidden flex flex-col">
        {/* Mobile Header with Logo */}
        <div className="flex items-center justify-center gap-3 py-2 border-b border-gold/20">
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
        </div>
        {/* Mobile Grid Navigation */}
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            borderTop: '1px solid rgba(197, 165, 90, 0.15)',
          }}
        >
          {navigationLinks.map((link, index) => {
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-center min-h-[50px] px-1.5 py-2 text-[0.6rem] uppercase font-heading font-bold text-maroon transition-colors duration-200"
                style={{
                  borderRight: (index + 1) % 5 !== 0 ? '1px solid rgba(197, 165, 90, 0.15)' : 'none',
                  borderBottom: index < 5 ? '1px solid rgba(197, 165, 90, 0.15)' : 'none',
                  backgroundColor: 'transparent',
                  lineHeight: '1.2',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
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
            );
          })}
        </div>
      </div>
    </header>
  );
}
