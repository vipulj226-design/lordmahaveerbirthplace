import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function WhatsAppChat() {
  const whatsappUrl = `https://wa.me/917544003396?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Lord%20Mahaveer%20Birthplace.`;
  const youtubeUrl = `https://www.youtube.com/@lordmahaveerbirthplace`;

  return (
    <div className="fixed bottom-3 right-3 z-50 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 flex flex-col items-end gap-2 sm:gap-2.5">
      {/* YouTube Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-red-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg font-heading font-bold text-[10px] sm:text-xs uppercase tracking-wide shadow-md sm:shadow-lg shrink-0"
      >
        Our YouTube Channel
      </motion.div>

      {/* YouTube Button */}
      <motion.a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.12, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg sm:shadow-xl transition-all duration-300 relative bg-white hover:bg-gray-100 shrink-0"
        aria-label="YouTube Channel"
      >
        <Image
          src="https://static.wixstatic.com/media/53945f_7c7c9c56aaa04ae6820fcd7ed2ce3a1f~mv2.png?originWidth=128&originHeight=128"
          alt="YouTube Logo"
          width={64}
          height={64}
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain"
        />
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-600"
          animate={{ scale: [1, 1.25], opacity: [1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.a>

      {/* Live Chat Text - Always Visible */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#25D366] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg font-heading font-bold text-[10px] sm:text-xs uppercase tracking-wide shadow-md sm:shadow-lg shrink-0"
      >
        Live Chat
      </motion.div>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.12, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg sm:shadow-xl transition-all duration-300 relative shrink-0"
        aria-label="WhatsApp Live Chat"
      >
        <Image
          src="https://static.wixstatic.com/media/53945f_35e6208606dd4874847f2da4e39392d5~mv2.png"
          alt="WhatsApp Logo"
          width={64}
          height={64}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full"
        />
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{ scale: [1, 1.25], opacity: [1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
        />
      </motion.a>
    </div>
  );
}
