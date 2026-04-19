import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function WhatsAppChat() {
  const whatsappUrl = `https://wa.me/917544003396?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Lord%20Mahaveer%20Birthplace.`;
  const youtubeUrl = `https://www.youtube.com/@lordmahaveerbirthplace`;

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6 flex flex-col items-end gap-3">
      {/* YouTube Button */}
      <motion.a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl transition-all duration-300 relative bg-red-600 hover:bg-red-700"
        aria-label="YouTube Channel"
      >
        <span className="text-white text-2xl md:text-3xl font-bold">▶</span>
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-600"
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.a>

      {/* Live Chat Text - Always Visible */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#25D366] text-white px-3 py-1 rounded-lg font-heading font-bold text-xs uppercase tracking-wide shadow-lg"
      >
        Live Chat
      </motion.div>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl transition-all duration-300 relative"
        aria-label="WhatsApp Live Chat"
      >
        <Image
          src="https://static.wixstatic.com/media/53945f_35e6208606dd4874847f2da4e39392d5~mv2.png"
          alt="WhatsApp Logo"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
        />
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
        />
      </motion.a>
    </div>
  );
}
