import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Gallery } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

const IMAGES_PER_PAGE = 15;

export default function GalleryPage() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(IMAGES_PER_PAGE);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Gallery>('gallery', [], {
        limit: 100,
      });
      
      // Sort by displayOrder if available, otherwise by dateAdded
      const sortedItems = (result.items || []).sort((a, b) => {
        if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
          return a.displayOrder - b.displayOrder;
        }
        return 0;
      });

      setItems(sortedItems);
      setTotalCount(sortedItems.length);
      setHasMore(sortedItems.length > IMAGES_PER_PAGE);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newCount = displayedCount + IMAGES_PER_PAGE;
    setDisplayedCount(newCount);
    setHasMore(newCount < totalCount);
  };

  const displayedItems = items.slice(0, displayedCount);

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

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : displayedItems.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {displayedItems.map((item, index) => (
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

              {/* Load More Button */}
              {hasMore && (
                <motion.div
                  className="flex justify-center mt-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Button
                    onClick={handleLoadMore}
                    className="bg-maroon hover:bg-maroon/90 text-cream px-8 py-3 rounded-lg font-heading text-lg"
                  >
                    See More Images ({displayedCount}/{totalCount})
                  </Button>
                </motion.div>
              )}

              {/* Results Info */}
              <div className="text-center mt-12">
                <p className="font-paragraph text-gray-600">
                  Showing {displayedCount} of {totalCount} images
                </p>
              </div>
            </>
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
