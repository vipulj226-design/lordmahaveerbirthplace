import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Gallery } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Folder, Image as ImageIcon } from 'lucide-react';

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
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

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
    setExpandedEvent(null);
  };

  const toggleEvent = (eventName: string) => {
    setExpandedEvent(expandedEvent === eventName ? null : eventName);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-[100rem] mx-auto px-4 py-16 md:py-24">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="font-heading text-5xl md:text-6xl text-maroon mb-4">
              Event Gallery
            </h1>
            <p className="font-paragraph text-lg text-gray-700 max-w-2xl mx-auto">
              Explore our collection of memorable moments from past events and celebrations
            </p>
          </div>

          {/* Gallery Folder Structure */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : years.length > 0 ? (
            <div className="space-y-4">
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
                    className="w-full flex items-center gap-3 p-4 bg-white border-2 border-gold/30 rounded-lg hover:bg-cream hover:border-gold transition-all duration-200 text-left"
                    whileHover={{ x: 4 }}
                  >
                    <Folder className="w-6 h-6 text-gold flex-shrink-0" />
                    <span className="font-heading text-xl text-maroon flex-1">
                      {year} Events Images
                    </span>
                    <motion.div
                      animate={{ rotate: expandedYear === year ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gold" />
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
                        <div className="pl-8 space-y-2 mt-2">
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
                                className="w-full flex items-center gap-3 p-3 bg-gold/10 border border-gold/20 rounded-lg hover:bg-gold/20 transition-all duration-200 text-left"
                                whileHover={{ x: 4 }}
                              >
                                <Folder className="w-5 h-5 text-gold flex-shrink-0" />
                                <span className="font-paragraph text-maroon flex-1">
                                  {eventName}
                                </span>
                                <span className="text-sm text-gold font-paragraph">
                                  {groupedByYearAndEvent[year][eventName].length} photos
                                </span>
                                <motion.div
                                  animate={{ rotate: expandedEvent === eventName ? 90 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronRight className="w-4 h-4 text-gold" />
                                </motion.div>
                              </motion.button>

                              {/* Photos Grid */}
                              <AnimatePresence>
                                {expandedEvent === eventName && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-4">
                                      {groupedByYearAndEvent[year][eventName].map((item, photoIndex) => {
                                        // Collect all image fields from the item
                                        const imageFields = [
                                          item.image,
                                          item.galleryImages,
                                          item.galleryImagesBatch,
                                        ].filter(Boolean);

                                        return imageFields.map((imageUrl, imgIndex) => (
                                          <motion.div
                                            key={`${item._id}-${imgIndex}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (photoIndex + imgIndex) * 0.03, duration: 0.2 }}
                                            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                          >
                                            <div className="aspect-square overflow-hidden bg-gray-200">
                                              {imageUrl ? (
                                                <Image
                                                  src={imageUrl}
                                                  alt={item.caption || 'Gallery image'}
                                                  width={300}
                                                  height={300}
                                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                              ) : (
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                  <ImageIcon className="w-8 h-8 text-gray-500" />
                                                </div>
                                              )}
                                            </div>

                                            {/* Overlay with info */}
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
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
    </>
  );
}
