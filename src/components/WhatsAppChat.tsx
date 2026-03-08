import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '7544003396';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20services`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-4 w-72 mb-2"
          >
            <div className="space-y-3">
              <h3 className="font-heading text-lg text-primary font-semibold">
                Chat with us on WhatsApp
              </h3>
              <p className="font-paragraph text-sm text-gray-600">
                We're here to help! Click below to start a conversation.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-paragraph font-semibold py-2 px-4 rounded-lg transition-colors w-full"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.192-.368-.06c-1.286-.264-2.514-.666-3.554-1.207l-.658-.38-.67.54c-1.186 1.142-1.9 2.71-1.9 4.323 0 1.925.784 3.745 2.208 5.142l.472.505-.545.867c-.3.48-.578.899-.578.899.537-.165 1.604-.591 2.408-.944l.616-.297.686.265c1.486.328 3.058.335 4.514.07l.687-.1.595.305c.845.433 1.811.742 2.565.905-.002-.001-.133-.331-.395-.754l-.472-.734.541-.499c1.256-1.157 1.968-2.798 1.968-4.55 0-2.676-2.172-4.84-4.846-4.84Z" />
                </svg>
                Open WhatsApp
              </a>
              <p className="font-paragraph text-xs text-gray-500 text-center">
                📞 {phoneNumber}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors"
        aria-label="WhatsApp Chat"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
