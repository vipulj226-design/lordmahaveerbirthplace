import { X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '+91 7544003396';
  const whatsappUrl = `https://wa.me/917544003396?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Lord%20Mahaveer%20Birthplace.`;

  const youtubeUrl = 'https://www.youtube.com/@lordmahaveerbirthplace'; // Update with actual YouTube channel URL

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-32 right-0 bg-white rounded-2xl shadow-2xl p-6 w-80 mb-4 border-2 border-gold"
          >
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-maroon font-bold uppercase tracking-wide">
                Live Chat
              </h3>
              <p className="font-paragraph text-sm text-maroon/80 leading-relaxed">
                Connect with us on WhatsApp for instant support and inquiries about the sacred birthplace.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-paragraph font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.192-.368-.06c-1.286-.264-2.514-.666-3.554-1.207l-.658-.38-.67.54c-1.186 1.142-1.9 2.71-1.9 4.323 0 1.925.784 3.745 2.208 5.142l.472.505-.545.867c-.3.48-.578.899-.578.899.537-.165 1.604-.591 2.408-.944l.616-.297.686.265c1.486.328 3.058.335 4.514.07l.687-.1.595.305c.845.433 1.811.742 2.565.905-.002-.001-.133-.331-.395-.754l-.472-.734.541-.499c1.256-1.157 1.968-2.798 1.968-4.55 0-2.676-2.172-4.84-4.846-4.84Z" />
                </svg>
                Open WhatsApp
              </a>
              <p className="font-heading text-sm font-bold text-maroon text-center uppercase tracking-wider">
                {phoneNumber}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Button */}
      <motion.a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl transition-all duration-300 bg-red-600 hover:bg-red-700"
        aria-label="YouTube Channel"
      >
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </motion.a>

      {/* Main WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl transition-all duration-300"
        aria-label="WhatsApp Live Chat"
      >
        {isOpen ? (
          <X className="w-8 h-8 md:w-10 md:h-10 text-white" />
        ) : (
          <Image
            src="https://static.wixstatic.com/media/53945f_35e6208606dd4874847f2da4e39392d5~mv2.png"
            alt="WhatsApp Logo"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
          />
        )}
      </motion.button>
    </div>
  );
}
