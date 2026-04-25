import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Gallery } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Folder, Image as ImageIcon, Home, Youtube, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GroupedGallery {
  [year: number]: {
    [event: string]: Gallery[];
  };
}

export default function GalleryPage() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupedByYearAndEvent, setGroupedByYearAndEvent] = useState<GroupedGallery>({});
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Gallery>('gallery', [], {
        limit: 100,
      });
      
      // Sort by displayOrder if available
      const sortedItems = (result.items || []).sort((a, b) => {
        if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
          return a.displayOrder - b.displayOrder;
        }
        return 0;
      });

      setItems(sortedItems);
      
      // Group items by year and then by event
      const grouped: GroupedGallery = {};
      sortedItems.forEach(item => {
        if (item.year !== undefined && item.year !== null) {
          if (!grouped[item.year]) {
            grouped[item.year] = {};
          }
          
          const eventName = item.pastEvent || 'Uncategorized';
          if (!grouped[item.year][eventName]) {
            grouped[item.year][eventName] = [];
          }
          grouped[item.year][eventName].push(item);
        }
      });
      
      setGroupedByYearAndEvent(grouped);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get years sorted in descending order
  const years = Object.keys(groupedByYearAndEvent)
    .map(Number)
    .sort((a, b) => b - a);

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const toggleEvent = (eventName: string) => {
    const newExpandedEvents = new Set(expandedEvents);
    if (newExpandedEvents.has(eventName)) {
      newExpandedEvents.delete(eventName);
    } else {
      newExpandedEvents.add(eventName);
    }
    setExpandedEvents(newExpandedEvents);
  };

  return (
    <>
      <main className="min-h-screen bg-cream">
        <div className="max-w-[100rem] mx-auto px-3 sm:px-4 py-4 sm:py-8 md:py-12">
          {/* Logo and Go to Homepage Section - Centered */}
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 md:mb-8">
            {/* Logo Section */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 border-gold overflow-hidden flex-shrink-0">
                <Image
                  src="https://static.wixstatic.com/media/53945f_e6cd73f23f1c458b99a1317f3bc1ba6e~mv2.webp"
                  alt="Lord Mahaveer Birthplace Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-heading text-base sm:text-lg md:text-xl text-maroon text-center font-bold">
                Lord Mahaveer Birthplace
              </h2>
            </div>

            {/* Go to Homepage Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-maroon text-cream border-2 border-maroon rounded-lg hover:bg-cream hover:text-maroon transition-colors duration-200 font-paragraph font-semibold text-xs sm:text-sm"
            >
              <Home className="w-3.5 h-3.5" />
              Go to Homepage
            </Link>
          </div>

          {/* Header Section */}
          <div className="mb-6 sm:mb-8 md:mb-10 text-center">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-maroon mb-1.5 sm:mb-2">
              Event Gallery
            </h1>
            <p className="font-paragraph text-xs sm:text-sm md:text-base text-gray-700 max-w-2xl mx-auto px-2">
              Explore our collection of memorable moments from past events and celebrations
            </p>
          </div>

          {/* Gallery Folder Structure */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <LoadingSpinner />
            </div>
          ) : years.length > 0 ? (
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {years.map((year, yearIndex) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: yearIndex * 0.05, duration: 0.3 }}
                >
                  {/* Year Folder */}
                  <motion.button
                    onClick={() => toggleYear(year)}
                    className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border-2 border-gold/30 rounded-lg hover:bg-cream hover:border-gold active:bg-cream active:border-gold transition-all duration-200 text-left cursor-pointer touch-manipulation"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Folder className="w-5 sm:w-6 h-5 sm:h-6 text-gold flex-shrink-0 pointer-events-none" />
                    <span className="font-heading text-base sm:text-lg md:text-xl text-maroon flex-1 pointer-events-none font-bold">
                      {year} Events Images
                    </span>
                    <motion.div
                      animate={{ rotate: expandedYear === year ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="pointer-events-none"
                    >
                      <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gold" />
                    </motion.div>
                  </motion.button>

                  {/* Events List */}
                  <AnimatePresence>
                    {expandedYear === year && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 sm:pl-8 space-y-1 sm:space-y-2 mt-2">
                          {Object.keys(groupedByYearAndEvent[year]).map((eventName, eventIndex) => (
                            <motion.div
                              key={eventName}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: eventIndex * 0.05, duration: 0.2 }}
                            >
                              {/* Event Folder */}
                              <motion.button
                                onClick={() => toggleEvent(eventName)}
                                className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gold/10 border border-gold/20 rounded-lg hover:bg-gold/20 active:bg-gold/30 transition-all duration-200 text-left cursor-pointer touch-manipulation"
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Folder className="w-4 sm:w-5 h-4 sm:h-5 text-gold flex-shrink-0 pointer-events-none" />
                                <span className="font-paragraph text-sm sm:text-base text-maroon flex-1 pointer-events-none">
                                  {eventName}
                                </span>
                                <motion.div
                                  animate={{ rotate: expandedEvents.has(eventName) ? 90 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="pointer-events-none"
                                >
                                  <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gold" />
                                </motion.div>
                              </motion.button>

                              {/* Photos Grid */}
                              <AnimatePresence>
                                {expandedEvents.has(eventName) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 sm:mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-3 pl-2 sm:pl-4">
                                      {groupedByYearAndEvent[year][eventName].map((item, photoIndex) => {
                                        // Get images from all available image fields
                                        const imageUrls: string[] = [];
                                        
                                        // Check galleryNew media gallery field
                                        if ((item as any).galleryNew && Array.isArray((item as any).galleryNew)) {
                                          (item as any).galleryNew.forEach((img: any) => {
                                            if (img) {
                                              // Try different possible property names for the image URL
                                              const imageUrl = img.url || img.src || img.image || (typeof img === 'string' ? img : null);
                                              if (imageUrl) imageUrls.push(imageUrl);
                                            }
                                          });
                                        }
                                        
                                        // Check individual image fields
                                        const imageFields = ['image', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9', 'image10', 'galleryImages', 'galleryImagesBatch'];
                                        imageFields.forEach(field => {
                                          if ((item as any)[field] && typeof (item as any)[field] === 'string') {
                                            imageUrls.push((item as any)[field]);
                                          }
                                        });

                                        return imageUrls.map((imageUrl, imgIndex) => (
                                          <motion.div
                                            key={`${item._id}-${imgIndex}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (photoIndex + imgIndex) * 0.03, duration: 0.2 }}
                                            className="relative overflow-hidden rounded-lg shadow-md p-0 bg-transparent aspect-square cursor-pointer"
                                            onClick={() => setSelectedImage({ src: imageUrl, caption: item.caption, description: item.description, altText: item.caption || 'Gallery image' })}
                                          >
                                            <div className="w-full h-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                              {imageUrl ? (
                                                <Image
                                                  src={imageUrl}
                                                  alt={item.caption || 'Gallery image'}
                                                  width={300}
                                                  height={300}
                                                  className="w-full h-full object-cover pointer-events-none hover:scale-110 transition-transform duration-300"
                                                />
                                              ) : (
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                  <ImageIcon className="w-8 h-8 text-gray-500" />
                                                </div>
                                              )}
                                            </div>

                                            {/* Info display */}
                                            <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-end p-3">
                                              {item.caption && (
                                                <h3 className="font-heading text-white text-sm mb-1">
                                                  {item.caption}
                                                </h3>
                                              )}
                                              {item.description && (
                                                <p className="font-paragraph text-gray-100 text-xs line-clamp-2">
                                                  {item.description}
                                                </p>
                                              )}
                                            </div>
                                          </motion.div>
                                        ));
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* YouTube Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12 sm:mt-16 md:mt-24 bg-gradient-to-r from-maroon via-[#1A0306] to-maroon text-cream p-6 sm:p-8 md:p-12 rounded-lg border-2 border-gold"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
                  {/* YouTube Icon and Text */}
                  <div className="flex-1 flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                      <Youtube className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-[#FF0000] flex-shrink-0" />
                      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-cream uppercase tracking-wide">
                        Watch Our Videos
                      </h3>
                    </div>
                    <p className="font-paragraph text-sm sm:text-base md:text-lg text-cream/90 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-center md:text-left">
                      Watch all our event videos on our official YouTube channel. Subscribe to stay updated with the latest content.
                    </p>
                    <a
                      href="https://youtube.com/@lordmahaveerbirthplaceofficial?si=pzWROH2caVMC4Cyr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 sm:gap-3 bg-[#FF0000] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-heading font-bold uppercase tracking-wide text-xs sm:text-sm md:text-base hover:bg-[#CC0000] transition-colors duration-300"
                    >
                      <Youtube className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                      Subscribe on YouTube
                    </a>
                  </div>
                  
                  {/* YouTube Logo */}
                  <div className="flex-1 flex justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-white rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <Youtube className="w-16 sm:w-20 md:w-32 h-16 sm:h-20 md:h-32 text-[#FF0000]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-gray-600">
                No gallery images available yet
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full"
          >
            {/* Square Image Container */}
            <div className="relative w-full aspect-square bg-maroon rounded-lg overflow-hidden border-4 border-gold shadow-2xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.altText || selectedImage.caption || 'Gallery image'}
                className="w-full h-full object-cover"
                width={800}
                height={800}
              />
            </div>

            {/* Image Caption */}
            {selectedImage.caption && (
              <div className="mt-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-cream mb-2">
                  {selectedImage.caption}
                </h3>
                {selectedImage.description && (
                  <p className="font-paragraph text-cream/80">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gold text-maroon rounded-full p-2 hover:bg-gold2 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
