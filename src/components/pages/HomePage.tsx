import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users, Scroll, Star } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { BirthplaceStatistics } from '@/entities';
import Header from '@/components/Header';

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
    <div className="min-h-screen bg-cream text-maroon selection:bg-maroon selection:text-gold overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <Header />

      {/* --- HERO SECTION --- */}
      <HeroSection />


      {/* --- BIRTHPLACE SECTION --- */}
      <BirthplaceSection />

      {/* --- STATISTICS SECTION --- */}
      <StatisticsSection />

      {/* --- DIVINE BLESSINGS SECTION --- */}
      <BlessingsSection />

      {/* --- LEGACY / ABOUT SECTION --- */}
      <section id="legacy" className="relative py-32 bg-cream overflow-hidden">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
          
          {/* Section Header */}
          <div className="mb-24 relative">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
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
            <div className="lg:col-span-7 flex flex-col gap-24 pt-12">
              
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
                  <h3 className="font-heading text-3xl font-bold text-maroon">A Revolution of Spirit</h3>
                </div>
                <p className="font-paragraph text-lg text-maroon/80 leading-relaxed pl-20 border-l-2 border-maroon/20 group-hover:border-gold transition-colors">
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
                  <h3 className="font-heading text-3xl font-bold text-maroon">Ahimsa: The Ultimate Strength</h3>
                </div>
                <p className="font-paragraph text-lg text-maroon/80 leading-relaxed pl-20 border-l-2 border-maroon/20 group-hover:border-gold transition-colors">
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
                  <h3 className="font-heading text-3xl font-bold text-maroon">The Eternal Truth</h3>
                </div>
                <p className="font-paragraph text-lg text-maroon/80 leading-relaxed pl-20 border-l-2 border-maroon/20 group-hover:border-gold transition-colors">
                  Anekantavada—the multiplicity of views. In a polarized world, Mahavira's wisdom from Vasokund teaches us to see the truth in others' perspectives, fostering a harmony that is desperately needed today.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-maroon text-cream py-20 border-t-8 border-gold">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            <div className="col-span-1 lg:col-span-2">
              <h3 className="font-heading text-4xl font-black text-gold mb-6 uppercase tracking-wider">Vasokund</h3>
              <p className="font-paragraph text-cream/70 max-w-md leading-relaxed mb-8">
                Preserving the sacred birthplace of Lord Mahavira. A monument to peace, truth, and the eternal soul.
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors rounded-full">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-full" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold text-gold mb-6 uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Statistics', 'Legacy', 'Visit', 'Donate'].map((link) => (
                  <li key={link}>
                    <a href="#" className="font-paragraph text-cream/60 hover:text-gold transition-colors uppercase text-sm tracking-wider">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold text-gold mb-6 uppercase tracking-widest">Contact</h4>
              <ul className="space-y-4 font-paragraph text-cream/60 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0" />
                  <span>Vasokund, Vaishali<br/>Bihar, India 844128</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gold shrink-0" />
                  <span>+91 123 456 7890</span>
                </li>
              </ul>
            </div>

          </div>
          
          <div className="mt-20 pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-paragraph text-xs text-cream/40 uppercase tracking-widest">
              © 2026 Vasokund Heritage Site. All Rights Reserved.
            </p>
            <p className="font-heading text-xs text-gold uppercase tracking-widest">
              Designed with Unapologetic Devotion
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

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6B0F1A, #3D0A10, #6B0F1A)',
        paddingTop: '120px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      {/* Background Image Pseudo-element */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(https://static.wixstatic.com/media/53945f_f8e8fb0321184ed5890214db2b1c00db~mv2.png?originWidth=576&originHeight=384)',
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
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <span 
            className="font-heading text-[2.5rem] tracking-[0.75em] font-black"
            style={{ color: '#C5A55A' }}
          >
            ✦  ✦  ✦
          </span>
        </motion.div>

        {/* H1 Title with Gradient */}
        <motion.h1 
          className="font-heading font-black tracking-tight mb-6"
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
          Birthplace of Tirthankar Lord Mahavira
        </motion.h1>

        {/* Subtitle (Italic) */}
        <motion.p 
          className="font-heading italic text-2xl mb-4 tracking-wide"
          style={{ color: '#C5A55A' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          Jai Jinendra — जय जिनेंद्र
        </motion.p>

        {/* Sub2 Text */}
        <motion.p 
          className="font-paragraph mb-12 tracking-[0.125em] uppercase text-sm"
          style={{ color: 'rgba(253, 246, 236, 0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          VASOKUND · VAISHALI · BIHAR · INDIA
        </motion.p>

        {/* Hero Image Box */}
        <motion.div 
          className="mx-auto mb-12 max-w-[600px]"
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
            src="https://static.wixstatic.com/media/53945f_8b054f3958224ef7be0343afc4b0c449~mv2.png?originWidth=576&originHeight=384"
            alt="Sahastrakut Jinalaya"
            className="w-full h-auto object-cover"
            width={600}
          />
        </motion.div>

        {/* CTA Button */}
        <motion.a 
          href="#about"
          className="inline-block font-heading font-bold tracking-wide uppercase"
          style={{
            backgroundImage: 'linear-gradient(to right, #D4AF37, #C5A55A)',
            color: '#1a1a1a',
            padding: '14px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 700,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(197, 165, 90, 0.5)' }}
        >
          🏛️ पवित्र धरोहर देखें — Explore Heritage
        </motion.a>
      </motion.div>
    </section>
  );
}

// --- BIRTHPLACE SECTION COMPONENT ---

function BirthplaceSection() {
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
    <section id="birthplace" ref={sectionRef} className="relative py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-6xl lg:text-8xl font-black text-maroon uppercase tracking-tight relative z-10"
          >
            The Sacred <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Birthplace</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl text-maroon/70 mt-6 max-w-2xl"
          >
            Vasokund (Kundpur) — The Holy Land of Vaishali
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* LEFT COLUMN - Large Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-cream border-2 border-maroon p-10 hover:border-gold transition-all duration-300"
          >
            <h3 className="font-heading text-3xl lg:text-4xl font-bold text-maroon mb-8 uppercase tracking-wide">
              Why Vaishali is the Birthplace
            </h3>

            {/* Explanatory Paragraphs */}
            <div className="space-y-6 mb-10">
              <p className="font-paragraph text-lg text-maroon/80 leading-relaxed">
                Ancient texts confirm Kundpur/Vasokund in Vaishali district as the birthplace of Lord Mahavira, the 24th Tirthankar of Jainism.
              </p>
              <p className="font-paragraph text-lg text-maroon/80 leading-relaxed">
                Vaishali was the first republic in the world, home of democratic ideals and spiritual enlightenment. This sacred land witnessed the birth of one of humanity's greatest spiritual leaders.
              </p>
              <p className="font-paragraph text-lg text-maroon/80 leading-relaxed">
                Archaeological Survey of India findings at Kolhua, including the famous Lion Pillar of Ashoka, provide concrete evidence of the historical significance of this region.
              </p>
              <p className="font-paragraph text-lg text-maroon/80 leading-relaxed">
                AIIMS excavation reports further confirm the archaeological and historical authenticity of the site, validating centuries of spiritual tradition.
              </p>
              <p className="font-paragraph text-lg text-maroon/80 leading-relaxed">
                Jain Agam texts, including the Kalpa Sutra and Acharanga Sutra, provide detailed references to Vaishali as the birthplace, establishing its place in sacred literature.
              </p>
            </div>

            {/* Quote Box with Left Gold Border */}
            <div className="relative pl-8 py-8 border-l-4 border-gold bg-gold/5">
              <p className="font-heading text-xl italic text-maroon font-semibold leading-relaxed">
                "Kshtriyakund is another name for Vaishali itself"
              </p>
              <p className="font-paragraph text-sm text-maroon/60 mt-4 uppercase tracking-widest">
                — Ancient Geography Reference
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Two Stacked Cards */}
          <div className="flex flex-col gap-8">
            
            {/* Card 1: Key Facts */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-cream border-2 border-maroon p-10 hover:border-gold transition-all duration-300"
            >
              <h4 className="font-heading text-2xl font-bold text-maroon mb-8 uppercase tracking-wide">
                Key Facts
              </h4>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-bold text-maroon uppercase text-sm tracking-widest mb-1">Location</p>
                    <p className="font-paragraph text-maroon/80">Vasokund, Vaishali District, Bihar — 35 km from Patna</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Scroll className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-bold text-maroon uppercase text-sm tracking-widest mb-1">Current Structure</p>
                    <p className="font-paragraph text-maroon/80">Sahastrakut Jinalaya (under construction)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Calendar className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-bold text-maroon uppercase text-sm tracking-widest mb-1">Historical Name</p>
                    <p className="font-paragraph text-maroon/80">Kundpur / Kshtriyakund</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Star className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-bold text-maroon uppercase text-sm tracking-widest mb-1">Archaeological Evidence</p>
                    <p className="font-paragraph text-maroon/80">Lion Pillar of Ashoka at Kolhua</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Development Plan */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-cream border-2 border-maroon p-10 hover:border-gold transition-all duration-300"
            >
              <h4 className="font-heading text-2xl font-bold text-maroon mb-8 uppercase tracking-wide">
                Development Plan
              </h4>
              
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full mt-3 shrink-0" />
                  <p className="font-paragraph text-maroon/80">Grand Jain Temple (Sahastrakut Jinalaya) being constructed</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full mt-3 shrink-0" />
                  <p className="font-paragraph text-maroon/80">Museum, Dharamshala, Library planned</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full mt-3 shrink-0" />
                  <p className="font-paragraph text-maroon/80">International pilgrimage center vision</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full mt-3 shrink-0" />
                  <p className="font-paragraph text-maroon/80">Bhagwan Mahavir Smarak Samiti overseeing development</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="font-heading text-xl font-bold text-maroon uppercase tracking-widest mb-4">
                  {stat.label}
                </h3>

                {/* Description */}
                {stat.description && (
                  <p className="font-paragraph text-sm text-maroon/70 leading-relaxed">
                    {stat.description}
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="font-paragraph text-maroon/60">No statistics available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// --- ABOUT LORD MAHAVIRA SECTION COMPONENT ---

function AboutMahaviraSection() {
  const cards = [
    {
      title: "Birth & Early Life",
      content: "Vaishali is a great pilgrimage where Lord Mahavira was born. King Siddhartha and Queen Trishala lived in the palace. Prince Vardhaman was born to Queen Trishala. At age 30 he left for Tapasya. After 12 years of hard austerity, he attained enlightenment — called 'Sarwagya' and 'Kewaljnani' (omniscient)."
    },
    {
      title: "Symbol & Identity",
      content: "Symbol: Lion (Singh) — the Ashoka Pillar at Kolhua has a lion, also Mahavira's symbol.\nBirth Date: Chaitra Shukla Trayodashi, under Uttara Phalguni Nakshatra\nParents: King Siddhartha & Queen Trishala (Priyakarini)\nBirthplace: Kundpur (Vasokund), Vaishali, Videha"
    },
    {
      title: "Jivant Swami — The Living Statue",
      content: "When Vardhman was about to leave for Deeksha, Queen Trishala asked whose face she would see daily. King Siddhartha had a statue made. Prince Vardhman agreed if his statue was made — this is 'Jivant Swami', available at Museum in Vadodara. A similar statue is at 'Rajkumar Vardhman Bhawan' in Vaishali.\n\n\"The first living statue (Jivant Pratima) of Rajkumar Vardhman was installed for the first time in Vaishali.\""
    },
    {
      title: "Philosophy & Principles",
      content: "Ahimsa (Non-Violence), Anekant (Non-Absolutism), Aparigraha (Non-Possessiveness)\n\nQuote from Jugmanderlal Jaini's \"Outlines of Jainism\" p.344:\n\"Jainism, more than any other creed, gives absolute religious independence...\"\n\nNote: Vardhamana Mahavir — as published in calligraphed edition of Constitution of India."
    }
  ];

  const infoPills = [
    { icon: "🗓️", text: "Mahavir Jayanti — Chaitra Shukla Trayodashi" },
    { icon: "📜", text: "2600+ Years of Heritage" },
    { icon: "🕊️", text: "Ahimsa · Anekant · Aparigraha" }
  ];

  return (
    <section id="about" className="relative py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-24 relative">
          {/* Ornament Line */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="font-heading text-3xl text-gold">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          {/* H2 Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl lg:text-6xl font-black text-maroon uppercase tracking-tight text-center mb-6"
          >
            About Lord Mahavira
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-paragraph text-lg text-maroon/70 text-center max-w-3xl mx-auto"
          >
            The 24th Tirthankar — A Light of Non-Violence, Non-Absolutism & Non-Possessiveness
          </motion.p>
        </div>

        {/* Grid Layout - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Cards 1 & 2 */}
          <div className="flex flex-col gap-8">
            {cards.slice(0, 2).map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-cream border-2 border-maroon p-8 hover:border-gold transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="font-heading text-2xl font-bold text-maroon mb-4 uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="font-paragraph text-maroon/80 leading-relaxed whitespace-pre-line">
                  {card.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Cards 3 & 4 */}
          <div className="flex flex-col gap-8">
            {cards.slice(2, 4).map((card, index) => (
              <motion.div
                key={index + 2}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                className="group bg-cream border-2 border-maroon p-8 hover:border-gold transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="font-heading text-2xl font-bold text-maroon mb-4 uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="font-paragraph text-maroon/80 leading-relaxed whitespace-pre-line">
                  {card.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-20"
        >
          {infoPills.map((pill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 bg-maroon text-cream px-8 py-4 rounded-full border-2 border-gold font-paragraph font-semibold text-sm uppercase tracking-wide hover:bg-gold hover:text-maroon transition-all duration-300"
            >
              <span className="text-xl">{pill.icon}</span>
              <span>{pill.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- DIVINE BLESSINGS SECTION COMPONENT ---

function BlessingsSection() {
  const blessings = [
    {
      name: "Acharya Shri Mahendra Kumar",
      role: "Spiritual Guide & Scholar",
      blessing: "May the sacred birthplace of Lord Mahavira illuminate the path of all seekers. The blessings of Vasokund flow through generations, guiding souls toward enlightenment and inner peace.",
      photo: "https://static.wixstatic.com/media/53945f_d948e271bba94e4ba877baa929c12c64~mv2.png?originWidth=128&originHeight=192"
    },
    {
      name: "Revered Saint Anand Sagar",
      role: "Keeper of Jain Traditions",
      blessing: "Mahavira's teachings of Ahimsa and Anekant resonate from this sacred soil. May pilgrims who visit Vasokund find solace, wisdom, and the eternal truth that transcends all boundaries.",
      photo: "https://static.wixstatic.com/media/53945f_b112330555724bcdb4f9035d0439cba5~mv2.png?originWidth=128&originHeight=192"
    },
    {
      name: "Acharya Shri Devendra Nath",
      role: "Benediction for Devotees",
      blessing: "In this blessed land where the 24th Tirthankar was born, may every soul find liberation from the cycle of karma. The divine grace of Vasokund protects all who seek truth with sincere hearts.",
      photo: "https://static.wixstatic.com/media/53945f_19bd1c3ce04e4d48ac861254e95d2b9b~mv2.png?originWidth=128&originHeight=192"
    }
  ];

  return (
    <section id="blessings" className="relative py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-6xl lg:text-8xl font-black text-maroon uppercase tracking-tight relative z-10"
          >
            Divine <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Blessings</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl text-maroon/70 mt-6 max-w-2xl"
          >
            Sacred blessings from revered Acharyas and saints
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Blessing Cards */}
        <div className="space-y-8">
          {blessings.map((blessing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row gap-8 bg-white border-l-4 border-gold2 p-8 hover:translate-y-[-3px] transition-transform duration-300"
            >
              {/* Left: Acharya Photo */}
              <div className="md:w-[180px] flex-shrink-0">
                <div className="w-full md:w-[180px] h-[220px] overflow-hidden rounded-lg">
                  <Image
                    src={blessing.photo}
                    alt={blessing.name}
                    className="w-full h-full object-cover object-top"
                    width={180}
                  />
                </div>
              </div>

              {/* Right: Blessing Text */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-heading text-2xl font-bold text-maroon mb-2 uppercase tracking-wide">
                  {blessing.name}
                </h3>
                <p className="font-paragraph text-sm text-maroon/60 uppercase tracking-widest mb-6">
                  {blessing.role}
                </p>
                <p className="font-paragraph text-lg text-maroon/80 leading-relaxed italic">
                  "{blessing.blessing}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- STATISTICS SECTION COMPONENT ---

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
    <section id="statistics" ref={statsRef} className="relative bg-maroon py-32 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A55A_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-gold/30 pb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl lg:text-7xl font-black text-cream uppercase tracking-tight"
          >
            By The <span className="text-gold">Numbers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-paragraph text-gold/80 text-right max-w-md mt-6 md:mt-0"
          >
            Quantifying a legacy that transcends time. The impact of Lord Mahavira measured in centuries and souls.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="flex justify-between items-start mb-8">
                  <stat.icon className="w-8 h-8 text-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="w-2 h-2 bg-gold rounded-full" />
                </div>

                <div className="font-heading text-6xl lg:text-7xl font-black text-cream mb-2 flex items-baseline">
                  {isInView ? (
                    <CountUp end={stat.value} duration={2.5} delay={index * 0.1} />
                  ) : (
                    "0"
                  )}
                  <span className="text-3xl text-gold ml-1">{stat.unit}</span>
                </div>

                <div className="h-px w-full bg-gold/20 my-6 group-hover:bg-gold/50 transition-colors" />

                <h3 className="font-heading text-xl font-bold text-gold uppercase tracking-widest mb-1">
                  {stat.label}
                </h3>
                <p className="font-paragraph text-sm text-cream/60 uppercase tracking-wider">
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
