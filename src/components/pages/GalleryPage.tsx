import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Gallery } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupedByYear, setGroupedByYear] = useState<Record<number, Gallery[]>>({});

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
      
      // Group items by year
      const grouped: Record<number, Gallery[]> = {};
      sortedItems.forEach(item => {
        if (item.year !== undefined && item.year !== null) {
          if (!grouped[item.year]) {
            grouped[item.year] = [];
          }
          grouped[item.year].push(item);
        }
      });
      
      setGroupedByYear(grouped);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get years sorted in descending order
  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

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

          {/* Gallery by Years */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : years.length > 0 ? (
            <div className="space-y-16">
              {years.map((year, yearIndex) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: yearIndex * 0.1, duration: 0.5 }}
                >
                  {/* Year Heading */}
                  <div className="mb-8">
                    <h2 className="font-heading text-4xl md:text-5xl text-maroon mb-2">
                      {year} Events Images
                    </h2>
                    <div className="w-24 h-1 bg-gold rounded-full"></div>
                  </div>

                  {/* Year Gallery Grid */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {groupedByYear[year].map((item, index) => (
                      <motion.div
                        key={item._id}
                        className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                      >
                        <div className="aspect-square overflow-hidden bg-gray-200">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.caption || 'Gallery image'}
                              width={400}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-500">No image</span>
                            </div>
                          )}
                        </div>

                        {/* Overlay with info */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                          {item.caption && (
                            <h3 className="font-heading text-white text-lg mb-2">
                              {item.caption}
                            </h3>
                          )}
                          {item.description && (
                            <p className="font-paragraph text-gray-100 text-sm line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          {item.pastEvent && (
                            <p className="font-paragraph text-gold text-xs mt-2">
                              Event: {item.pastEvent}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Year divider */}
                  {yearIndex < years.length - 1 && (
                    <div className="mt-16 border-t-2 border-gold/30"></div>
                  )}
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
