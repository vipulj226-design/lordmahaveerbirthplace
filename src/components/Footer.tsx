import { MessageCircle, Zap, Award, Clock, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-maroon via-gray-900 to-black py-16 px-4">
      <style>{`
        @keyframes goldGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(197, 165, 90, 0.4)); }
          50% { filter: drop-shadow(0 0 16px rgba(197, 165, 90, 0.6)); }
        }
        .glow-text {
          animation: goldGlow 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Top Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
          <div className="w-2 h-2 rounded-full bg-gold"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
        </div>

        {/* Designer Credit Section */}
        <div className="text-center mb-8">
          <p className="text-gold text-xs uppercase tracking-widest font-paragraph mb-4 opacity-80">
            Website Designed & Managed By
          </p>
          
          {/* Glowing Name */}
          <h2 className="glow-text text-6xl md:text-7xl font-paragraph font-bold text-gold mb-6"
              style={{
                letterSpacing: '0.08em',
                fontWeight: '900'
              }}>
            VIPUL JAIN
          </h2>

          {/* Bottom Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
            <div className="w-2 h-2 rounded-full bg-gold"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>

        {/* WhatsApp Contact Bar */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-full px-6 py-3 flex items-center gap-3"
               style={{
                 filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.5))'
               }}>
            <MessageCircle size={20} className="text-white" />
            <span className="text-white font-paragraph font-semibold tracking-wide">
              WHATSAPP: 8470990283
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Professional Design */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 p-3 rounded-full bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-colors">
              <Award size={24} className="text-gold" />
            </div>
            <p className="text-gold text-sm font-paragraph font-semibold uppercase tracking-wide">
              Professional Design
            </p>
          </div>

          {/* Fast Delivery */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 p-3 rounded-full bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-colors">
              <Zap size={24} className="text-gold" />
            </div>
            <p className="text-gold text-sm font-paragraph font-semibold uppercase tracking-wide">
              Fast Delivery
            </p>
          </div>

          {/* Trusted Service */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 p-3 rounded-full bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-colors">
              <CheckCircle size={24} className="text-gold" />
            </div>
            <p className="text-gold text-sm font-paragraph font-semibold uppercase tracking-wide">
              Trusted Service
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 p-3 rounded-full bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-colors">
              <Clock size={24} className="text-gold" />
            </div>
            <p className="text-gold text-sm font-paragraph font-semibold uppercase tracking-wide">
              24/7 Support
            </p>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="flex items-center justify-center gap-4 pt-8 border-t border-gold/20">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50"></div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gold/60 text-xs font-paragraph mt-6 tracking-wide">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
