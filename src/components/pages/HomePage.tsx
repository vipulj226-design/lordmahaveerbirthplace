import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users, Scroll, Star, ChevronDown, X, ChevronLeft, ChevronRight, MessageCircle, Clock, Building2 } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { BirthplaceStatistics, SpiritualLeaders } from '@/entities';
import Header from '@/components/Header';
import FoundationDevelopment from '@/components/FoundationDevelopment';
import CommitteeGallery from '@/components/CommitteeGallery';

// Types for new CMS collections
interface SpiritualLeader {
  _id: string;
  leaderName?: string;
  leaderTitle?: string;
  leaderImage?: string;
  leaderDescription?: string;
  displayOrder?: number;
}

interface AboutUsContent {
  _id: string;
  sectionTitle?: string;
  introText?: string;
  statueImage?: string;
  statueDescription?: string;
}

interface CommitteeMember {
  _id: string;
  name?: string;
  role?: string;
  memberImage?: string;
  bio?: string;
}

// HPI 1.7-G

// --- UTILITY COMPONENTS ---

const CountUp = ({ end, duration, delay }: { end: number; duration: number; delay: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [end, duration, delay]);

  return <>{count}</>;
};

// --- MAIN COMPONENT ---

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax Transforms
  const statsY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  return (
    <div 
      className="min-h-screen bg-cream text-maroon selection:bg-maroon selection:text-gold overflow-x-hidden"
    >
      {/* --- HEADER --- */}
      <Header />
      {/* --- HERO SECTION --- */}
      <HeroSection />
      {/* --- BIRTHPLACE & ABOUT US SECTION (MERGED) --- */}
      <BirthplaceAboutSection />
      {/* --- STATISTICS SECTION --- */}
      <StatisticsSection />
      {/* --- DIVINE BLESSINGS SECTION --- */}
      <BlessingsSection />
      {/* --- FOUNDATION & DEVELOPMENT SECTION --- */}
      <FoundationDevelopment />
      {/* --- FOUNDATION & TEMPLE SECTION --- */}
      {/* --- COMMITTEE GALLERY SECTION --- */}
      <CommitteeGallery />
      {/* --- DONATE SECTION --- */}
      <DonateSection />
      {/* --- UPCOMING EVENTS SECTION --- */}
      <UpcomingEventsSection />
      {/* --- GALLERY SECTION --- */}
      <GallerySection />
      {/* --- HOW TO REACH SECTION --- */}
      <HowToReachSection />
      {/* --- CONTACT SECTION --- */}
      <ContactSection />
      {/* --- FOOTER --- */}
      <footer className="bg-gradient-to-r from-maroon via-[#1A0306] to-maroon text-cream py-20">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
          
          {/* Logo */}
          <div className="text-center mb-16">
            <Image
              src="https://static.wixstatic.com/media/53945f_06a423b0a7fc4ff7a7488f7c493ec082~mv2.png#originWidth=588&originHeight=588"
              className="w-24 h-24 mx-auto mb-6" />
            <h3 className="font-heading text-4xl font-black text-gold mb-2 uppercase tracking-wider leading-tight">Lord Mahaveer Birthplace</h3>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <a href="https://wa.me/917544003396" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-paragraph text-cream hover:text-gold transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            <a href="mailto:info@lordmahaveerbirthplace.com" className="flex items-center gap-2 font-paragraph text-cream hover:text-gold transition-colors">
              <span>✉️</span>
              <span>Email</span>
            </a>
            <a href="https://lordmahaveerbirthplace.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-paragraph text-cream hover:text-gold transition-colors">
              <span>🌐</span>
              <span>Website</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-16 text-center">
            {['About', 'Blessings', 'Foundation', 'Committee', 'Donate', 'Gallery', 'Events', 'How to Reach', 'Contact'].map((link) => {
              const href = link === 'How to Reach' ? '#how-to-reach' : `#${link.toLowerCase()}`;
              return (
                <a key={link} href={href} className="font-paragraph text-cream/80 hover:text-gold transition-colors text-sm uppercase tracking-wider">
                  {link}
                </a>
              );
            })}
          </div>

          {/* Organization Info */}
          <div className="text-center border-t border-gold/20 pt-8 mb-8">
            <p className="font-paragraph text-cream/80 mb-2">Bhagwan Mahavir Smarak Samiti | Vasokund, Vaishali (Bihar)</p>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-gold/20 pt-8">
            <p className="font-paragraph text-xs text-cream/60 uppercase tracking-widest mb-4">© 2026 All rights reserved</p>
            <p className="font-paragraph text-gold uppercase tracking-widest text-sm">
              🌐 Website Designed & Managed by Vipul Jain | 💬 WhatsApp:{' '}
              <a
                href="https://wa.me/918470990283"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold2 transition-colors underline"
              >
                8470990283
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- HERO SECTION COMPONENT ---

function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [heroContent, setHeroContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const result = await BaseCrudService.getAll<any>('herosectioncontent');
        if (result.items.length > 0) {
          setHeroContent(result.items[0]);
        } else {
          setHeroContent(null);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
        setHeroContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    // Create 28 particles
    const particleCount = 28;
    const colors = ['#C5A55A', '#FDF6EC']; // gold3 and cream

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 5 + 2; // 2-7px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 12 + 6; // 6-18s
      const delay = Math.random() * 8; // 0-8s
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        left: ${left}%;
        bottom: -${size}px;
        opacity: 0;
        animation: floatUp ${duration}s linear ${delay}s infinite;
        pointer-events: none;
        margin-top: 120px;
      `;

      container.appendChild(particle);
    }

    // Add keyframes animation
    if (!document.getElementById('floatUp-keyframes')) {
      const style = document.createElement('style');
      style.id = 'floatUp-keyframes';
      style.textContent = `
        @keyframes floatUp {
          0% {
            bottom: -10px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            bottom: 100vh;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  const backgroundImage = heroContent?.backgroundImage || 'https://static.wixstatic.com/media/53945f_f8e8fb0321184ed5890214db2b1c00db~mv2.png?originWidth=576&originHeight=384';
  const frontImage = heroContent?.backgroundImage || 'https://static.wixstatic.com/media/53945f_8b054f3958224ef7be0343afc4b0c449~mv2.png?originWidth=576&originHeight=384';
  const title = heroContent?.title || 'Birthplace of Tirthankar Lord Mahavira';
  const subtitle = heroContent?.subtitle || 'Jai Jinendra — जय जिनेंद्र';
  const shortDescription = heroContent?.shortDescription || 'VASOKUND (VAISHALI), BIHAR – INDIA';
  const ctaText = heroContent?.ctaText || 'Explore Heritage';
  const ctaUrl = heroContent?.ctaUrl || '#about';

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[35vh] md:min-h-[45vh] flex items-center justify-center overflow-hidden p-[43px]"
      style={{
        background: 'linear-gradient(135deg, #6B0F1A, #3D0A10, #6B0F1A)',
        paddingTop: '20px',
        paddingBottom: '40px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      {/* Background Image Pseudo-element */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: 0.45,
        }}
      />
      {/* Radial Gradient Vignette Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />
      {/* Particles Container */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Main Content */}
      <motion.div 
        className="relative z-20 w-full max-w-[100rem] mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Ornament Text */}
        {/* H1 Title with Gradient */}
        <motion.div 
          className="mb-6 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >

        </motion.div>
        <motion.h1 
          className="font-heading font-black tracking-tight mb-6 -mt-4 md:mt-0 text-3xl"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            backgroundImage: 'linear-gradient(to right, #C5A55A, #FDF6EC, #D4AF37)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {title}
        </motion.h1>
        {/* Subtitle (Italic) */}

        {/* Sub2 Text */}
        <motion.p 
          className="font-paragraph mb-12 tracking-[0.125em] uppercase text-sm"
          style={{ color: 'rgba(253, 246, 236, 0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          {shortDescription}
        </motion.p>
        {/* Hero Image Box */}
        <motion.div 
          className="mx-auto mb-12 max-w-[600px] -mt-6 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          style={{
            borderRadius: '12px',
            border: '3px solid #C5A55A',
            boxShadow: '0 0 30px rgba(197, 165, 90, 0.6)',
            overflow: 'hidden',
          }}
        >
          <Image 
            src={frontImage}
            alt="Sahastrakut Jinalaya"
            className="w-full h-full object-cover block"
            width={600}
          />
        </motion.div>
        {/* CTA Button */}
        <motion.a 
          href="#about"
          className="inline-block font-heading font-bold tracking-wide uppercase -mt-8 md:-mt-4 relative z-30"
          style={{
            backgroundImage: 'linear-gradient(to right, #D4AF37, #C5A55A)',
            color: '#1a1a1a',
            padding: '16px 48px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 700,
            boxShadow: '0 8px 25px rgba(197, 165, 90, 0.4)',
            border: '2px solid #C5A55A',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          whileHover={{ 
            y: -4, 
            boxShadow: '0 15px 40px rgba(197, 165, 90, 0.6)',
            scale: 1.05
          }}
        >
          <ArrowRight className="w-5 h-5" />
          About Birthplace
        </motion.a>
      </motion.div>
    </section>
  );
}

// --- BIRTHPLACE & ABOUT US SECTION (MERGED) ---

function BirthplaceAboutSection() {
  const [statistics, setStatistics] = useState<BirthplaceStatistics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const result = await BaseCrudService.getAll<BirthplaceStatistics>('birthplacestatistics');
        setStatistics(result.items);
      } catch (error) {
        console.error('Error fetching birthplace statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-4 md:py-40 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-32 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-6xl lg:text-8xl font-black text-maroon uppercase tracking-tight relative z-10 leading-tight"
          >
            The Sacred <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Birthplace</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-sm md:text-xl text-maroon/70 mt-3 md:mt-8 max-w-2xl"
          >
            Vasokund (Kundpur) — The Holy Land of Vaishali
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Single Column Full-Width Content */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="group relative bg-gradient-to-br from-cream to-cream/90 border-2 border-gold p-6 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden mb-6 md:mb-12">
          <div className="absolute inset-0 bg-maroon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-heading text-3xl lg:text-4xl font-black text-maroon mb-6 uppercase tracking-wide relative z-10">
              Why Vaishali is the <span className="text-gold">Birthplace</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4 border-l-4 border-maroon/20 pl-6">
                <p className="font-paragraph text-base lg:text-lg text-maroon/80 leading-relaxed">
                  Ancient texts confirm Kundpur/Vasokund in Vaishali district as the birthplace of Lord Mahavira, the 24th Tirthankar of Jainism.
                </p>
                <p className="font-paragraph text-base lg:text-lg text-maroon/80 leading-relaxed">
                  Vaishali was the first republic in the world, home of democratic ideals and spiritual enlightenment. This sacred land witnessed the birth of one of humanity's greatest spiritual leaders.
                </p>
                <p className="font-paragraph text-base lg:text-lg text-maroon/80 leading-relaxed">
                  Archaeological Survey of India findings at Kolhua, including the famous Lion Pillar of Ashoka, provide concrete evidence of the historical significance of this region.
                </p>
              </div>
              <div className="space-y-4 border-l-4 border-maroon/20 pl-6">
                <p className="font-paragraph text-base lg:text-lg text-maroon/80 leading-relaxed">
                  AIIMS excavation reports further confirm the archaeological and historical authenticity of the site, validating centuries of spiritual tradition.
                </p>
                <p className="font-paragraph text-base lg:text-lg text-maroon/80 leading-relaxed">
                  Jain Agam texts, including the Kalpa Sutra and Acharanga Sutra, provide detailed references to Vaishali as the birthplace, establishing its place in sacred literature.
                </p>
                <div className="relative p-4 bg-maroon/5 border-t-4 border-gold group-hover:border-gold2 transition-colors duration-300 mt-6">
                  <p className="font-heading text-base italic text-maroon font-semibold leading-relaxed">
                    "Kshtriyakund is another name for Vaishali itself"
                  </p>
                  <p className="font-paragraph text-xs text-maroon/60 mt-2 uppercase tracking-widest">
                    — Ancient Geography Reference
                  </p>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-cream font-bold text-lg shadow-md">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 md:mb-16">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="font-paragraph text-maroon/60">Loading statistics...</p>
            </div>
          ) : statistics.length > 0 ? (
            statistics.map((stat, index) => (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-cream border-2 border-maroon p-8 hover:border-gold transition-colors duration-300"
              >
                {/* Icon */}
                {stat.icon && (
                  <div className="mb-6 h-16 w-16 flex items-center justify-center">
                    <Image 
                      src={stat.icon} 
                      alt={stat.label || 'Statistic icon'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Value */}
                <div className="font-heading text-5xl lg:text-6xl font-black text-maroon mb-2 flex items-baseline">
                  {stat.statisticValue}
                  {stat.unit && <span className="text-2xl text-gold ml-2">{stat.unit}</span>}
                </div>

                {/* Label */}
                <h3 className="font-heading text-lg font-bold text-maroon uppercase tracking-widest mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                {stat.description && (
                  <p className="font-paragraph text-xs text-maroon/70 leading-relaxed">
                    {stat.description}
                  </p>
                )}
              </motion.div>
            ))
          ) : null}
        </div>

        {/* Birthplace Confirmation Section */}
        <div className="border-t-2 border-gold/30 mb-16 md:p-[67px]">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-black text-maroon mb-8 uppercase tracking-tight"
          >
            Birthplace <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Confirmation</span>
          </motion.h3>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            {/* Hermann Jacobi & Sacred Books */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-maroon p-6 md:p-8 hover:border-gold transition-all duration-300"
            >
              <h4 className="font-heading text-xl font-bold text-maroon mb-4 uppercase tracking-wide">
                📚 Hermann Jacobi & Sacred Books
              </h4>
              <p className="font-paragraph text-maroon/80 leading-relaxed mb-3 text-sm">
                In the "Sacred Books of the East" (Volumes 22 & 45), Hermann Jacobi, one of the greatest authorities on Jainism, states:
              </p>
              <div className="bg-gold/10 border-l-4 border-gold p-4 mb-3">
                <p className="font-paragraph italic text-maroon/90 leading-relaxed text-xs">
                  "The Jainas, both Swetambars and Digambars, believe that Mahavira was the son of King Siddhartha of Kundapur or Kundagrama. Kundagrama is called in the Acharanga Sutra as Samnivesa, a term which the commentator interprets as denoting an encampment place of caravans or processions."
                </p>
              </div>
              <p className="font-paragraph text-maroon/80 leading-relaxed text-sm">
                Mahavira was born in Kundagrama near Vaishali (Basarha in Hajipur sub-division of Muzaffarpur district). Kundagrama is known as Vasokund today.
              </p>
            </motion.div>

            {/* Excavated Seals & Brahmi Inscriptions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border-2 border-maroon p-6 md:p-8 hover:border-gold transition-all duration-300"
            >
              <h4 className="font-heading text-xl font-bold text-maroon mb-4 uppercase tracking-wide">
                🔍 Excavated Seals & Inscriptions
              </h4>
              <p className="font-paragraph text-maroon/80 leading-relaxed mb-3 text-sm">
                During excavation at Vaishali (1903-04 by Dr. T. Bloch), archaeologists found 12-15 coins with engravings:
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex gap-3">
                  <span className="text-gold font-bold">•</span>
                  <p className="font-paragraph text-maroon/80 text-xs">Vaishalyaddhisthanadhikaran</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">•</span>
                  <p className="font-paragraph text-maroon/80 text-xs">Vaishali Nam Kunde-Kumarmattyadhikaran(sya)</p>
                </li>
              </ul>
              <p className="font-paragraph text-maroon/80 leading-relaxed text-sm">
                A special seal in Brahmi script reads: "Vaishali Namakunde Kumaramatyadhikaran(sya)" — proving Prince Vardhman held the position of 'Kumaramatya' (Prime Minister).
              </p>
            </motion.div>

            {/* Bihar Government Jain Circuit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-maroon p-6 md:p-8 hover:border-gold transition-all duration-300"
            >
              <h4 className="font-heading text-xl font-bold text-maroon mb-4 uppercase tracking-wide">
                🏛️ Bihar Government Recognition
              </h4>
              <p className="font-paragraph text-maroon/80 leading-relaxed mb-3 text-sm">
                The tourism department of Bihar Government published a book 'Jain Circuit' in 2003, in which Vasokund in Vaishali is officially mentioned as the birthplace of Lord Mahavir.
              </p>
              <div className="bg-gold/10 border-l-4 border-gold p-3">
                <p className="font-heading font-bold text-maroon text-xs uppercase tracking-widest">
                  Official Recognition
                </p>
                <p className="font-paragraph text-maroon/80 mt-1 text-xs">
                  Vasokund, Vaishali — Birthplace of Lord Mahavira (Jain Circuit, 2003)
                </p>
              </div>
            </motion.div>

            {/* Ashoka Pillar & Archaeological Finds */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border-2 border-maroon p-6 md:p-8 hover:border-gold transition-all duration-300 lg:col-span-2"
            >
              <h4 className="font-heading text-xl font-bold text-maroon mb-4 uppercase tracking-wide">
                🦁 Ashoka Pillar & Archaeological Finds
              </h4>
              <p className="font-paragraph text-maroon/80 leading-relaxed mb-3 text-sm">
                After the Deekshoupwas, Lord Mahavir ate for the first time (Parna) at Koolgram (now Kolhua). There is a stone pillar with a Lion called the Ashok Stambh.
              </p>
              <p className="font-paragraph text-maroon/80 leading-relaxed mb-4 text-sm">
                The symbol of Lord Mahavir is also a 'Lion'. His ancestors reigned here. This pillar was made by Vajjio & Lichhivi as a memorial to Vardhman Mahavir.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gold/5 p-4 rounded-lg border border-gold/20">
                  <p className="font-heading font-bold text-maroon uppercase text-xs tracking-widest mb-2">Two Bulls</p>
                  <p className="font-paragraph text-maroon/80 text-xs leading-relaxed">
                    Symbols of religion, charity, and prosperity recovered during excavation at Raja Vishal ka Garh
                  </p>
                </div>
                <div className="bg-gold/5 p-4 rounded-lg border border-gold/20">
                  <p className="font-heading font-bold text-maroon uppercase text-xs tracking-widest mb-2">Gold Ear-Ornament</p>
                  <p className="font-paragraph text-maroon/80 text-xs leading-relaxed">
                    Kundal belonging to King Chetak's family, worn by Lord Mahavir in youth
                  </p>
                </div>
                <div className="bg-gold/5 p-4 rounded-lg border border-gold/20">
                  <p className="font-heading font-bold text-maroon uppercase text-xs tracking-widest mb-2">Kundalpur</p>
                  <p className="font-paragraph text-maroon/80 text-xs leading-relaxed">
                    Named after the sacred ornament worn by Lord Mahavira
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Unapologetic Truth Section */}
        <div className="relative bg-gradient-to-r from-maroon via-[#1A0306] to-maroon text-cream py-12 md:py-24 px-6 md:px-12 rounded-lg border-2 border-gold">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#C5A55A_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="relative z-10">
            {/* Section Header */}
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-black text-cream uppercase tracking-tight mb-12 relative z-10"
            >
              The Unapologetic<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Truth</span>
            </motion.h2>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-20">
              
              {/* Sticky Image Column */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-32">
                  <div className="relative aspect-[3/4] w-full overflow-hidden border-4 border-maroon bg-maroon">
                    <Image
                      src="https://static.wixstatic.com/media/53945f_c4c8144dd34c4ac59690c4eca6987e26~mv2.png"
                      className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:scale-105 transition-transform duration-700"
                      originWidth={286}
                      originHeight={433} />
                    <div className="absolute inset-0 border border-gold/30 m-4 pointer-events-none" />
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 -right-8 bg-gold text-maroon p-6 font-heading font-bold text-xl shadow-xl hidden lg:block border border-solid border-[#6b0f1a]">
                      <span className="block text-4xl font-black mb-1">24</span>
                      Tirthankara
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrolling Text Column */}
              <div className="lg:col-span-7 flex flex-col gap-8 md:gap-16 pt-0 md:pt-8">
                
                {/* Block 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-heading text-5xl font-black text-gold/40 group-hover:text-gold transition-colors">01</span>
                    <h3 className="font-heading text-2xl font-bold text-cream">A Revolution of Spirit</h3>
                  </div>
                  <p className="font-paragraph text-base text-cream/80 leading-relaxed pl-16 border-l-2 border-cream/20 group-hover:border-gold transition-colors">
                    In an era of ritual complexity, Lord Mahavira introduced a radical simplicity. Born in 599 BCE at Vasokund, his life was a bold declaration that spiritual liberation is the birthright of every soul, not just the chosen few.
                  </p>
                </motion.div>

                {/* Block 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-heading text-5xl font-black text-gold/40 group-hover:text-gold transition-colors">02</span>
                    <h3 className="font-heading text-2xl font-bold text-cream">Ahimsa: The Ultimate Strength</h3>
                  </div>
                  <p className="font-paragraph text-base text-cream/80 leading-relaxed pl-16 border-l-2 border-cream/20 group-hover:border-gold transition-colors">
                    Non-violence is not passivity; it is the highest form of bravery. Mahavira's teachings at Vaishali challenged the very foundations of violence in thought, word, and deed, establishing a legacy that echoes through millennia.
                  </p>
                </motion.div>

                {/* Block 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="group"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-heading text-5xl font-black text-gold/40 group-hover:text-gold transition-colors">03</span>
                    <h3 className="font-heading text-2xl font-bold text-cream">The Eternal Truth</h3>
                  </div>
                  <p className="font-paragraph text-base text-cream/80 leading-relaxed pl-16 border-l-2 border-cream/20 group-hover:border-gold transition-colors">
                    Anekantavada—the multiplicity of views. In a polarized world, Mahavira's wisdom from Vasokund teaches us to see the truth in others' perspectives, fostering a harmony that is desperately needed today.
                  </p>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlessingsSection() {
  const [blessings, setBlessings] = useState<SpiritualLeaders[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlessings = async () => {
      try {
        const result = await BaseCrudService.getAll<SpiritualLeaders>('spiritualleaders');
        const sortedBlessings = result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setBlessings(sortedBlessings);
      } catch (error) {
        console.error('Error fetching spiritual leaders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlessings();
  }, []);

  const staticBlessings = [
    {
      name: "Parampujya Shwetpicchhacharya Shri Vidyanandji Muniraj",
      dates: "(Born: 22 April 1925 — Devlokgaman: 22 September 2019)",
      image: "https://static.wixstatic.com/media/53945f_ec462564133b4e80a302aa05a0c90887~mv2.png?originWidth=384&originHeight=384",
      blessing: "\"Lord Mahavira was born at Vasokund (Kundpur). My Holy blessings are there to build Vardhman's magnificent temple at Vasokund (Kundpur) in Vaishali. This should have been completed much earlier. It is my holy desire and feeling that this work is now completed without any obstacles.\"",
      achievements: "उनके निर्देशन में सम्पन्न महत्त्वपूर्ण कार्य (31 कार्य): भगवान् महावीर का 2500वाँ निर्वाण महोत्सव, श्रवणबेलगोला महामस्तकाभिषेक, गोम्मटेश्वर प्रतिमाओं का निर्माण, बावनगजा जीर्णोद्धार, सम्मेदशिखर आन्दोलन, जैन अल्पसंख्यक घोषणा आन्दोलन, जैन ध्वज व प्रतीक निर्माण, कुन्दकुन्द भारती की स्थापना, प्राकृत शोध संस्थान, तथा 100+ पुस्तकों का प्रकाशन आदि।"
    },
    {
      name: "Parampujya Aacharya Shri Vidyasagar Muniraj",
      dates: "",
      image: "https://static.wixstatic.com/media/53945f_0ffb1236e6ae46f685a0a02c0aff1c9d~mv2.png?originWidth=384&originHeight=384",
      blessing: "\"The construction work of a temple (Jinalaya) of Lord Mahavira at the Birth-Place of Lord Mahavira at Vasokund (Kundpur) in Vaishali is in progress. This temple at Vaishali shall become the model epicentre of spreading the Principles of Lord Mahavira. It is my Holy Blessing that it may lead to the welfare of all the creatures.\"",
      achievements: ""
    },
    {
      name: "Parampujya Aacharya Shri Vardhman Sagar Muniraj",
      dates: "",
      image: "https://static.wixstatic.com/media/53945f_ce03f5dee53f4134b590bf01b2c82e1c~mv2.png?originWidth=384&originHeight=384",
      blessing: "\"I realized that the lifestyle of Lord Mahavira and his principles like Brotherhood, Non-Violence, Tolerance, Secularism, Celibacy, etc. are embedded in the hearts of the people of Vaishali. I Bless all the citizens of Vaishali who have preserved these principles of Vardhman Mahavira and the events related to His Birth in their local folk songs & melodies and also retained His Birth Place as Uncultivated land even more than 2600 years after His Birth.\"",
      achievements: ""
    },
    {
      name: "Parampujya Aacharya Shri Shrutsagar Muniraj",
      dates: "",
      image: "https://static.wixstatic.com/media/53945f_611b7a06d8b24450a30c12c323200291~mv2.png?originWidth=384&originHeight=384",
      blessing: "\"Tirthankar Mahavira is a pillar of light from where the Rays of Non-Violence, Anekant (Non-Absolutism), Aparigraha (Non-Possessiveness) have enlightened the world. I give my Holy Blessing for this superb temple (Jinalaya) at Bhagwan Mahavir Birth Place Vasokund, Vaishali where construction is going on.\"",
      achievements: ""
    },
    {
      name: "Parampujya Aacharya Shri Vishudhsagar Muniraj",
      dates: "",
      image: "https://static.wixstatic.com/media/53945f_8e54460515ec4825a072bf6eebfdb10e~mv2.png?originWidth=384&originHeight=384",
      blessing: "\"From the study of the entire Jainagam texts and from the research of modern scholars, historians and archaeologists, it has been known that Lord Mahavir Swami was born in Videha Desh, Vaishali, Kundapur (Bharatvarshe Videha Kundapuram) of Bharat Kshetra. I have my blessings for the completion of the construction work of the grand Jinalaya at this historic birthplace.\"",
      achievements: ""
    },
    {
      name: "Bhattarak Charukirti",
      dates: "— Guidance",
      image: "https://static.wixstatic.com/media/53945f_5bb65b84b9904da89f8ed4313edf0ecc~mv2.png?originWidth=384&originHeight=384",
      blessing: "\"Vardhman Mahavir knew very well that every work is inspired by someone, and hence it is important to make that person look forward for development. The knowledge given by Him about the perspective of an individual and the society/community is very essential. My Holy Blessings are there for early completion of the construction work of this beautiful temple in Vaishali.\"",
      achievements: ""
    },
    {
      name: "Dr. Virendra D. Heggade",
      dates: "— Guidance (Param Shiromani Sanrakshak)",
      image: "https://static.wixstatic.com/media/53945f_d80881a0ba7243d8b1118389d87aa75a~mv2.png?originWidth=384&originHeight=384",
      blessing: "\"Lord Mahavira does not represent any particular community, religion or society but He is established as a pride and glory of the whole mankind. Lord Mahavira's immense kindness not only towards human beings but also for speechless creatures was invaluable. He abolished exploitation and stress in the world by means of Non-Violence, Non-Possessiveness and Non-Absolutism. My best wishes are there for the construction of this Grand Temple at the Birth Place of Lord Mahavira in Vasokund, Vaishali at fast pace.\"",
      achievements: ""
    },
    {
      name: "Acharya Mahashraman (Terapanth)",
      dates: "— 23 March 2017",
      image: "https://static.wixstatic.com/media/53945f_869e0542cc66483aa06de1c00d21f7bd~mv2.png?originWidth=384&originHeight=384",
      blessing: "Acharya Mahashraman along with his Sangh (76 Sadhus and Sadhvis) visited the Birthplace on 23 March 2017. He was welcomed by Digambar Jain Acharya Shri Geetalsagar ji and his Sangh. He expressed happiness and wished for this to become an international centre for Ahimsa and Anekantavad.",
      achievements: ""
    }
  ];

  return (
    <section id="blessings" className="relative py-4 md:py-40 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-32 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
          >
            🙏 Acharyas <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Blessings</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-lg text-maroon/70 mt-3 max-w-2xl"
          >
            Mangal Ashirwad — Sacred blessings from revered Acharyas for the temple at the birthplace
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Blessing Cards */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-maroon/60">Loading blessings...</p>
            </div>
          ) : blessings.length > 0 ? (
            blessings.map((blessing, index) => (
              <motion.div
                key={blessing._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group bg-white border-l-4 border-gold2 overflow-hidden hover:translate-y-[-3px] transition-transform duration-300 p-6"
              >
                {/* Leader Image */}
                {blessing.leaderImage && (
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={blessing.leaderImage}
                      alt={blessing.leaderName || 'Leader'}
                      width={240}
                      height={280}
                      className="w-56 h-64 object-contain"
                    />
                  </div>
                )}

                {/* Leader Name and Title */}
                <h3 className="font-heading text-xl font-bold text-maroon mb-2 uppercase tracking-wide">
                  {blessing.leaderName}
                </h3>
                {blessing.leaderTitle && (
                  <p className="font-paragraph text-xs text-maroon/60 uppercase tracking-widest mb-4">
                    {blessing.leaderTitle}
                  </p>
                )}
                
                {/* Leader Description */}
                {blessing.leaderDescription && (
                  <p className="font-paragraph text-base text-maroon/80 leading-relaxed italic mb-4">
                    {blessing.leaderDescription}
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-maroon/60 text-lg">No spiritual leaders available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function VaishaliHeritageSection() {
  const heritageCards = [
    {
      title: "Historical Significance",
      content: "Vaishali was the world's first republic. Licchavi clan ruled democratically. Lord Mahavira and Lord Buddha both have connections to Vaishali."
    },
    {
      title: "Archaeological Sites",
      content: "Kolhua: Ashoka Pillar with Lion Capital\nAbhishek Pushkarini (Coronation Tank)\nRaja Vishal ka Garh\nBawan Pokhar Temple"
    },
    {
      title: "Jain Connection",
      content: "Lord Mahavira born here (599 BCE)\nVasokund/Kundpur = exact birthplace\nLicchavi Kshatriya clan was Mahavira's family\nMultiple visits by Lord Buddha to Vaishali also documented"
    }
  ];

  const locationPills = [
    { icon: MapPin, text: "Vaishali District, Bihar" },
    { icon: Calendar, text: "2600+ Years of Heritage" },
    { icon: Scroll, text: "World's First Republic" },
    { icon: Star, text: "Birthplace of Mahavira" }
  ];

  return (
    <section id="vaishali" className="relative py-16 md:py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
      </div>
    </section>
  );
}



function StatisticsSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  const stats = [
    { value: 599, label: "BCE", description: "Birth Year", unit: "", icon: Calendar },
    { value: 2625, label: "Years", description: "Of Legacy", unit: "+", icon: Scroll },
    { value: 24, label: "Tirthankara", description: "Of Jainism", unit: "th", icon: Star },
    { value: 6, label: "Million", description: "Followers", unit: "+", icon: Users }
  ];

  return (
    <section id="statistics" ref={statsRef} className="relative bg-maroon py-8 md:py-32 overflow-hidden pt-24 md:pt-48">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A55A_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 border-b border-gold/30 pb-4 md:pb-6">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl lg:text-6xl font-black text-cream uppercase tracking-tight"
          >
            By The <span className="text-gold">Numbers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-paragraph text-gold/80 text-right max-w-md mt-4 md:mt-0 text-sm"
          >
            Quantifying a legacy that transcends time. The impact of Lord Mahavira measured in centuries and souls.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-maroon-900 border border-gold/20 p-8 hover:bg-maroon-800 transition-colors duration-500"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gold/5 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <stat.icon className="w-8 h-8 text-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="w-2 h-2 bg-gold rounded-full" />
                </div>

                <div className="font-heading text-5xl lg:text-6xl font-black text-cream mb-2 flex items-baseline">
                  {isInView ? (
                    <CountUp end={stat.value} duration={2.5} delay={index * 0.1} />
                  ) : (
                    "0"
                  )}
                  <span className="text-3xl text-gold ml-1">{stat.unit}</span>
                </div>

                <div className="h-px w-full bg-gold/20 my-4 group-hover:bg-gold/50 transition-colors" />

                <h3 className="font-heading text-lg font-bold text-gold uppercase tracking-widest mb-1">
                  {stat.label}
                </h3>
                <p className="font-paragraph text-xs text-cream/60 uppercase tracking-wider">
                  {stat.description}
                </p>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-700 delay-100" />
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-700 delay-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- ABOUT US SECTION COMPONENT (The Unapologetic Truth) ---

function AboutUsSection() {
  return (
    <section id="about" className="relative bg-gradient-to-r from-maroon via-[#1A0306] to-maroon text-cream py-16 md:py-32 overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-6xl lg:text-8xl font-black text-maroon uppercase tracking-tight relative z-10"
          >
            The Unapologetic<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Truth</span>
          </motion.h2>
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
          
          {/* Sticky Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="relative aspect-[3/4] w-full overflow-hidden border-4 border-maroon bg-maroon">
                <Image 
                  src="https://static.wixstatic.com/media/53945f_d0d06ffee96845a5826851cf03f30364~mv2.png?originWidth=640&originHeight=896" 
                  alt="Ancient Jain Statue Representation" 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 border border-gold/30 m-4 pointer-events-none" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 -right-8 bg-gold text-maroon p-6 font-heading font-bold text-xl shadow-xl border-2 border-maroon hidden lg:block">
                  <span className="block text-4xl font-black mb-1">24</span>
                  Tirthankara
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-12 md:gap-24 pt-0 md:pt-12">
            
            {/* Block 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-heading text-6xl font-black text-gold/40 group-hover:text-gold transition-colors">01</span>
                <h3 className="font-heading text-3xl font-bold text-cream">A Revolution of Spirit</h3>
              </div>
              <p className="font-paragraph text-lg text-cream/80 leading-relaxed pl-20 border-l-2 border-cream/20 group-hover:border-gold transition-colors">
                In an era of ritual complexity, Lord Mahavira introduced a radical simplicity. Born in 599 BCE at Vasokund, his life was a bold declaration that spiritual liberation is the birthright of every soul, not just the chosen few.
              </p>
            </motion.div>

            {/* Block 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-heading text-6xl font-black text-gold/40 group-hover:text-gold transition-colors">02</span>
                <h3 className="font-heading text-3xl font-bold text-cream">Ahimsa: The Ultimate Strength</h3>
              </div>
              <p className="font-paragraph text-lg text-cream/80 leading-relaxed pl-20 border-l-2 border-cream/20 group-hover:border-gold transition-colors">
                Non-violence is not passivity; it is the highest form of bravery. Mahavira's teachings at Vaishali challenged the very foundations of violence in thought, word, and deed, establishing a legacy that echoes through millennia.
              </p>
            </motion.div>

            {/* Block 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-heading text-6xl font-black text-gold/40 group-hover:text-gold transition-colors">03</span>
                <h3 className="font-heading text-3xl font-bold text-cream">The Eternal Truth</h3>
              </div>
              <p className="font-paragraph text-lg text-cream/80 leading-relaxed pl-20 border-l-2 border-cream/20 group-hover:border-gold transition-colors">
                Anekantavada—the multiplicity of views. In a polarized world, Mahavira's wisdom from Vasokund teaches us to see the truth in others' perspectives, fostering a harmony that is desperately needed today.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// --- DONATE SECTION COMPONENT ---

function DonateSection() {
  const bankDetails = [
    {
      bankName: "HDFC Bank",
      branch: "Green Park Branch, New Delhi",
      accountNumber: "50100264497212",
      ifscCode: "HDFC0000586",
      accountHolder: "Bhagwan Mahavir Smarak Samiti"
    },
    {
      bankName: "State Bank of India",
      branch: "JNU Branch, New Delhi",
      accountNumber: "10596551078",
      ifscCode: "SBIN0001624",
      accountHolder: "Bhagwan Mahavir Smarak Samiti"
    },
    {
      bankName: "State Bank of India",
      branch: "Vaishali, Bihar",
      accountNumber: "35268043586",
      ifscCode: "SBIN0017445",
      accountHolder: "Bhagwan Mahavir Samiti"
    }
  ];

  return (
    <section id="donate" className="relative py-4 md:py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 md:mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
          >
            💛 Donation & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Support</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-lg text-maroon/70 mt-3 max-w-2xl"
          >
            Contribute to the sacred construction — Tax exemption under Section 80-G
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>
        {/* Inspirational Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-gradient-to-r from-maroon to-[#1A0306] text-cream p-8 rounded-lg border-2 border-gold"
        >
          <p className="font-heading text-xl italic text-gold mb-3">
            🙏 "एक ईंट आपकी, एक मंदिर सबका"
          </p>
          <p className="font-paragraph text-base leading-relaxed mb-4">
            आपका हर योगदान भगवान महावीर की जन्मभूमि को संवारता है।
          </p>
          <p className="font-paragraph text-base leading-relaxed text-cream/90">
            "Your every contribution helps build the Grand Temple at the Birthplace of Tirthankar Lord Mahavira."
          </p>
        </motion.div>
        {/* Bank Details Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="font-heading text-2xl font-bold text-maroon mb-6 uppercase tracking-wide">
            🏦 Bank Details
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bankDetails.map((bank, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border-2 border-maroon p-6 hover:border-gold transition-all duration-300"
              >
                <h4 className="font-heading text-lg font-bold text-maroon mb-4 uppercase tracking-wide">
                  {bank.bankName}
                </h4>
                
                <div className="space-y-3 font-paragraph text-sm">
                  <div>
                    <p className="text-maroon/60 text-xs uppercase tracking-widest mb-1">Branch</p>
                    <p className="text-maroon font-semibold">{bank.branch}</p>
                  </div>
                  <div>
                    <p className="text-maroon/60 text-xs uppercase tracking-widest mb-1">Account Holder</p>
                    <p className="text-maroon font-semibold">{bank.accountHolder}</p>
                  </div>
                  <div>
                    <p className="text-maroon/60 text-xs uppercase tracking-widest mb-1">Account Number</p>
                    <p className="text-maroon font-mono font-bold">{bank.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-maroon/60 text-xs uppercase tracking-widest mb-1">IFSC Code</p>
                    <p className="text-maroon font-mono font-bold">{bank.ifscCode}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Tax Exemption Note */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gold/10 border-l-4 border-gold p-6 mb-8 rounded-lg"
        >
          <h3 className="font-heading text-xl font-bold text-maroon mb-3 uppercase tracking-wide">
            📝 Tax Exemption Note
          </h3>
          <p className="font-paragraph text-base text-maroon/80 leading-relaxed">
            Donations are exempt from Income Tax under Section 80-G. After making your deposit, please inform the office by telephone and obtain a receipt.
          </p>
        </motion.div>
        {/* WhatsApp CTA */}

      </div>
    </section>
  );
}

// --- GALLERY SECTION COMPONENT ---

function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const result = await BaseCrudService.getAll<any>('gallery');
        const sortedItems = result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setGalleryItems(sortedItems);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, galleryItems.length]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  return (
    <section id="gallery" className="relative py-4 md:py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
          >
            Sacred <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Gallery</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-lg text-maroon/70 mt-3 max-w-2xl"
          >
            Glimpses of the holy birthplace and ongoing construction
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="font-paragraph text-maroon/60 text-sm">Loading gallery...</p>
          </div>
        ) : galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[240px]">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-[10px] border-2 border-maroon hover:border-gold transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.caption || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="font-paragraph text-cream text-sm p-4 w-full">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-paragraph text-maroon/60 text-lg">No gallery items yet. Check back soon!</p>
          </div>
        )}
      </div>
      {/* Lightbox */}
      {lightboxOpen && galleryItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
          style={{
            background: 'rgba(10, 2, 4, 0.92)',
            backdropFilter: 'blur(6px)'
          }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-maroon border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Image Container */}
            <div className="flex items-center justify-center w-full h-full max-h-[70vh]">
              <Image
                src={galleryItems[currentImageIndex].image}
                alt={galleryItems[currentImageIndex].caption || 'Gallery image'}
                className="max-w-full max-h-full object-contain border-4 border-gold"
              />
            </div>

            {/* Caption */}
            <p className="font-heading text-gold text-center text-sm md:text-lg uppercase tracking-wide px-4 mt-4">
              {galleryItems[currentImageIndex].caption}
            </p>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-maroon border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors z-20"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-maroon border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors z-20"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// --- UPCOMING EVENTS SECTION COMPONENT ---

function UpcomingEventsSection() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await BaseCrudService.getAll<any>('upcomingevents');
        setEvents(result.items);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date: any) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (time: any) => {
    if (!time) return '';
    return time;
  };

  return (
    <section id="events" ref={sectionRef} className="relative py-8 md:py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
          >
            Upcoming <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Events</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl text-maroon/70 mt-6 max-w-2xl"
          >
            Join us for sacred celebrations and spiritual gatherings at the birthplace of Lord Mahavira
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-maroon/60">Loading events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white border-2 border-maroon overflow-hidden hover:border-gold transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              >
                {/* Event Image */}
                {event.eventImage && (
                  <div className="relative h-48 overflow-hidden bg-maroon/10">
                    <Image
                      src={event.eventImage}
                      alt={event.eventName || 'Event'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                {/* Event Content */}
                <div className="p-8">
                  {/* Event Name */}
                  <h3 className="font-heading text-2xl font-bold text-maroon mb-6 uppercase tracking-wide line-clamp-2">
                    {event.eventName}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-4 mb-8">
                    {/* Date */}
                    {event.eventDate && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <div>
                          <p className="font-paragraph text-sm text-maroon/60 uppercase tracking-widest mb-1">Date</p>
                          <p className="font-paragraph font-semibold text-maroon">{formatDate(event.eventDate)}</p>
                        </div>
                      </div>
                    )}

                    {/* Time */}
                    {event.eventTime && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <div>
                          <p className="font-paragraph text-sm text-maroon/60 uppercase tracking-widest mb-1">Time</p>
                          <p className="font-paragraph font-semibold text-maroon">{formatTime(event.eventTime)}</p>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {event.eventLocation && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <div>
                          <p className="font-paragraph text-sm text-maroon/60 uppercase tracking-widest mb-1">Location</p>
                          <p className="font-paragraph font-semibold text-maroon">{event.eventLocation}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Event Description */}
                  {event.eventDescription && (
                    <p className="font-paragraph text-maroon/80 leading-relaxed">
                      {event.eventDescription}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-paragraph text-maroon/60 text-lg">No upcoming events at this time. Please check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// --- HOW TO REACH SECTION COMPONENT ---

function HowToReachSection() {
  const transportModes = [
    {
      icon: "✈️",
      title: "By Air",
      details: [
        "Nearest Airport: Patna International Airport (35 km)",
        "Flight connections from major Indian cities",
        "Taxi/cab available from airport"
      ]
    },
    {
      icon: "🚂",
      title: "By Train",
      details: [
        "Nearest Railway Station: Patna Junction (35 km)",
        "Well-connected to Delhi, Mumbai, Kolkata",
        "Local transport available from station"
      ]
    },
    {
      icon: "🚗",
      title: "By Road",
      details: [
        "National Highway 2 connects to Vaishali",
        "Taxi/cab services available",
        "Personal vehicle recommended for flexibility"
      ]
    },
    {
      icon: "🚌",
      title: "By Bus",
      details: [
        "Regular bus services from Patna",
        "State transport and private operators",
        "Journey time: ~1.5 hours from Patna"
      ]
    }
  ];

  const accommodationOptions = [
    {
      type: "Dharamshala",
      description: "Sacred guest houses for pilgrims",
      amenities: ["Basic facilities", "Spiritual atmosphere", "Affordable rates"]
    },
    {
      type: "Hotels",
      description: "Comfortable lodging in nearby towns",
      amenities: ["Modern facilities", "Various price ranges", "Dining options"]
    },
    {
      type: "Ashrams",
      description: "Spiritual retreats and meditation centers",
      amenities: ["Yoga & meditation", "Vegetarian meals", "Peaceful environment"]
    }
  ];

  return (
    <section id="how-to-reach" className="relative py-8 md:py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
          >
            How to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Reach</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl text-maroon/70 mt-6 max-w-2xl"
          >
            Journey to the sacred birthplace of Lord Mahavira at Vasokund, Vaishali
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Transport Modes Grid */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-bold text-maroon mb-12 uppercase tracking-wide"
          >
            🚀 Transportation Options
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transportModes.map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border-2 border-maroon p-8 hover:border-gold transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              >
                <div className="text-5xl mb-4">{mode.icon}</div>
                <h4 className="font-heading text-2xl font-bold text-maroon mb-6 uppercase tracking-wide">
                  {mode.title}
                </h4>
                <ul className="space-y-3">
                  {mode.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0" />
                      <p className="font-paragraph text-maroon/80 text-sm leading-relaxed">
                        {detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Distance & Time Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 bg-gradient-to-r from-maroon to-[#1A0306] text-cream p-12 rounded-lg border-2 border-gold"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8 uppercase tracking-wide text-center md:text-left">
            📍 Distance & Travel Time from Major Cities
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { city: "Patna", distance: "35 km", time: "1 hour" },
              { city: "Delhi", distance: "1000 km", time: "18-20 hours" },
              { city: "Kolkata", distance: "250 km", time: "5-6 hours" },
              { city: "Varanasi", distance: "150 km", time: "3-4 hours" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <p className="font-heading text-2xl font-bold text-gold mb-2 uppercase tracking-wide">
                  {item.city}
                </p>
                <p className="font-paragraph text-cream/80 mb-2">
                  <span className="font-bold text-gold">{item.distance}</span> away
                </p>
                <p className="font-paragraph text-cream/70 text-sm">
                  ~{item.time} journey
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Accommodation Options */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-bold text-maroon mb-12 uppercase tracking-wide"
          >
            🏨 Accommodation Options
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accommodationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border-2 border-maroon p-8 hover:border-gold transition-all duration-300"
              >
                <h4 className="font-heading text-2xl font-bold text-maroon mb-3 uppercase tracking-wide">
                  {option.type}
                </h4>
                <p className="font-paragraph text-maroon/80 mb-6 leading-relaxed">
                  {option.description}
                </p>
                <div className="space-y-2">
                  <p className="font-heading text-sm font-bold text-maroon uppercase tracking-widest mb-3">
                    Amenities:
                  </p>
                  {option.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-gold">✓</span>
                      <p className="font-paragraph text-maroon/80 text-sm">
                        {amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Best Time to Visit */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gold/10 border-l-4 border-gold p-8 mb-12 rounded-lg"
        >
          <h3 className="font-heading text-2xl font-bold text-maroon mb-4 uppercase tracking-wide">
            📅 Best Time to Visit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-heading font-bold text-maroon uppercase text-sm tracking-widest mb-2">
                Ideal Season
              </p>
              <p className="font-paragraph text-maroon/80 leading-relaxed">
                October to March — Pleasant weather, cool temperatures, and ideal for pilgrimage. Avoid monsoon (June-September) and extreme summer heat (April-May).
              </p>
            </div>
            <div>
              <p className="font-heading font-bold text-maroon uppercase text-sm tracking-widest mb-2">
                Special Events
              </p>
              <p className="font-paragraph text-maroon/80 leading-relaxed">
                Mahavir Jayanti (March/April) — Grand celebrations at the birthplace. Diwali season also sees significant pilgrim gatherings and spiritual events.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border-2 border-maroon p-8 rounded-lg"
        >
          <h3 className="font-heading text-2xl font-bold text-maroon mb-8 uppercase tracking-wide">
            💡 Pilgrimage Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Wear comfortable walking shoes for the sacred site",
              "Carry water and sun protection during summer",
              "Dress modestly as a sign of respect",
              "Book accommodation in advance during peak season",
              "Hire a local guide for historical insights",
              "Respect the spiritual sanctity of the birthplace",
              "Plan 2-3 days for a meaningful pilgrimage",
              "Contact us in advance for group pilgrimages"
            ].map((tip, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-2xl">✨</span>
                <p className="font-paragraph text-maroon/80 leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact for Arrangements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="font-paragraph text-lg text-maroon/80 mb-6">
            Need help planning your pilgrimage? Contact us for personalized arrangements.
          </p>
          <a
            href="https://wa.me/917544003396"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-heading font-bold uppercase tracking-wide hover:bg-[#20BA5A] transition-colors duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            📞 WhatsApp — 7544003396
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// --- CONTACT SECTION COMPONENT ---

function ContactSection() {
  return (
    <section id="contact" className="relative py-8 md:py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
          >
            Contact <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl text-maroon/70 mt-6 max-w-2xl"
          >
            Reach us for pilgrimages, donations, or temple information
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Vaishali Contact Card */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-maroon" />
              <h2 className="font-heading text-3xl font-bold text-maroon uppercase tracking-wide">Bihar Office</h2>
            </div>
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-maroon p-8 rounded-lg"
          >
            <h3 className="font-heading text-2xl font-bold text-maroon mb-8 uppercase tracking-wide">
              Bhagwan Mahavir Smarak Samiti
            </h3>

            <div className="space-y-6 mb-8 font-paragraph">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Address</p>
                  <p className="text-maroon font-semibold">Vasokund, Vaishali District, Bihar</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Phone/Mobile</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-primary">+91-7544003396</p>
                    <p className="font-semibold text-primary">+91-9771682337</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Email</p>
                  <p className="text-maroon font-semibold text-sm">bhagwanmahavir1008@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🌐</span>
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Website</p>
                  <p className="text-maroon font-semibold">lordmahaveerbirthplace.com</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <a
              href="https://maps.app.goo.gl/dErHAXqxD9FGSQjJ6"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 rounded-lg overflow-hidden border-2 border-maroon block cursor-pointer hover:border-gold transition-colors duration-300"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.8234567890!2d85.4234!3d25.9876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7d5c0000000001%3A0x1234567890abcdef!2sVasokund%2C%20Vaishali%2C%20Bihar!5e0!3m2!1sen!2sin!4v1709545200000"
                width="100%"
                height="250"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>

            {/* Directions Button */}
            <a
              href="https://maps.app.goo.gl/dErHAXqxD9FGSQjJ6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-paragraph font-semibold hover:bg-blue-700 transition-colors"
            >
              🗺️ Open in Google Maps
            </a>
            </motion.div>
          </div>

          {/* Delhi Contact Card */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-maroon" />
              <h2 className="font-heading text-3xl font-bold text-maroon uppercase tracking-wide">Delhi Office</h2>
            </div>
            <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-maroon p-8 rounded-lg"
          >
            <h3 className="font-heading text-2xl font-bold text-maroon mb-8 uppercase tracking-wide">
              Kundkund Bharti
            </h3>

            <div className="space-y-6 mb-8 font-paragraph">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Address</p>
                  <p className="text-maroon font-semibold">18-B, Special Institutional Area, New Delhi - 110067</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Phone</p>
                  <div className="space-y-1">
                    <p className="text-maroon font-semibold">+91-7982277419</p>
                    <p className="text-maroon font-semibold">+91-9873027779</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Email</p>
                  <p className="text-maroon font-semibold">kundkundbharti@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🌐</span>
                <div>
                  <p className="text-maroon/60 text-sm uppercase tracking-widest mb-1">Website</p>
                  <p className="text-maroon font-semibold">kundkundbharti.com</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div 
              className="mb-6 rounded-lg overflow-hidden border-2 border-maroon cursor-pointer hover:border-gold transition-colors duration-300"
              onClick={() => window.open('https://maps.app.goo.gl/z6JExdjA3thxMMyt8', '_blank')}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5234!2d77.1950!3d28.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2cc00000001%3A0x1234567890abcdef!2sQutab+Institutional+Area,+New+Delhi!5e0!3m2!1sen!2sin!4v1709545200000"
                width="100%"
                height="250"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Directions Button */}
            <a
              href="https://maps.app.goo.gl/z6JExdjA3thxMMyt8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-paragraph font-semibold hover:bg-blue-700 transition-colors"
            >
              🗺️ Open in Google Maps
            </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
