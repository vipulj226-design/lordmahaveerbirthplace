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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax Transforms
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const statsY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  // Particle Animation Logic (Preserved & Optimized)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    handleResize();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles - Increased density for "Bold" feel
    const particleCount = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8, // Slightly faster
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1, // Larger variation
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        // Using Gold color from palette
        ctx.fillStyle = `rgba(197, 165, 90, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(197, 165, 90, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream text-maroon selection:bg-maroon selection:text-gold overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <Header />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden pt-32 md:pt-20">
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="w-full max-w-[120rem] mx-auto h-full border-x border-maroon/5 grid grid-cols-12 gap-4 px-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-full border-r border-maroon/5 hidden md:block col-span-1" />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center">
            
            {/* Left Column: Massive Typography */}
            <motion.div 
              style={{ y: heroTextY, opacity: heroOpacity }}
              className="col-span-12 lg:col-span-8 relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-[1px] w-12 bg-maroon" />
                <span className="font-paragraph font-bold text-maroon uppercase tracking-[0.3em] text-sm">
                  The 24th Tirthankara
                </span>
              </motion.div>

              <h1 className="font-heading text-[15vw] lg:text-[11rem] leading-[0.85] font-black text-maroon tracking-tighter mix-blend-multiply">
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="block"
                >
                  LORD
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-b from-maroon to-maroon/80 ml-[10vw] lg:ml-32"
                >
                  MAHAVIRA
                </motion.span>
              </h1>
            </motion.div>

            {/* Right Column: Info Card & Stamp */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-end h-full mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative bg-cream border-2 border-maroon p-8 lg:p-12 shadow-[12px_12px_0px_0px_rgba(107,15,26,1)]"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold rounded-full flex items-center justify-center animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2 fill-maroon">
                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent"/>
                    <text fontSize="13" fontWeight="bold" letterSpacing="2">
                      <textPath href="#curve">
                        BIRTHPLACE • VASOKUND •
                      </textPath>
                    </text>
                  </svg>
                </div>

                <h2 className="font-heading text-3xl font-bold text-maroon mb-4">
                  Sacred Origins
                </h2>
                <p className="font-paragraph text-maroon/80 leading-relaxed mb-8">
                  Stand on the ground where divinity took form. Vasokund is not just a location; it is the genesis of non-violence and truth.
                </p>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-maroon font-bold uppercase tracking-wider text-sm">
                    <MapPin className="w-5 h-5 text-gold" />
                    Vaishali, Bihar
                  </div>
                  <div className="flex items-center gap-3 text-maroon font-bold uppercase tracking-wider text-sm">
                    <Calendar className="w-5 h-5 text-gold" />
                    599 BCE
                  </div>
                </div>

                <button className="mt-8 w-full bg-maroon text-gold py-4 font-heading font-bold uppercase tracking-widest hover:bg-maroon/90 transition-all flex items-center justify-center gap-2 group">
                  Explore The Site
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="font-heading text-xs font-bold text-maroon uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-16 bg-maroon/20 overflow-hidden">
            <motion.div 
              animate={{ y: [-64, 64] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-1/2 bg-maroon"
            />
          </div>
        </motion.div>
      </section>

      {/* --- BIRTHPLACE SECTION --- */}
      <BirthplaceSection />

      {/* --- STATISTICS SECTION --- */}
      <StatisticsSection />

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
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
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
