import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Gallery } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Gallery>('gallery', [], {
        limit: 100,
      });
      
      // Flatten all images from all gallery items
      const flattenedImages: any[] = [];
      result.items.forEach((item) => {
        // List of all possible image fields in the gallery collection
        const imageFields = [
          'image',
          'galleryImages',
          'galleryImagesBatch',
          'image2',
          'image3',
          'image4',
          'image5',
          'image6',
          'image7',
          'image8',
          'image9',
          'image10'
        ];
        
        // Extract all non-empty images from this item
        imageFields.forEach((field) => {
          if (item[field]) {
            flattenedImages.push({
              src: item[field],
              caption: item.caption || '',
              displayOrder: item.displayOrder || 0
            });
          }
        });
      });
      
      // Sort by display order
      flattenedImages.sort((a, b) => a.displayOrder - b.displayOrder);
      setAllImages(flattenedImages);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, allImages.length]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16 md:py-24">
          {/* Header Section */}
          <div className="mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl md:text-6xl text-maroon mb-4 uppercase tracking-tight"
            >
              Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Gallery</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-paragraph text-lg text-maroon/70 max-w-2xl"
            >
              Glimpses of the holy birthplace and ongoing construction
            </motion.p>
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-maroon/60">Loading gallery...</p>
            </div>
          ) : allImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[240px]">
              {allImages.map((image, index) => (
                <motion.div
                  key={`${index}-${image.src}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-[10px] border-2 border-maroon hover:border-gold transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.caption || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="font-paragraph text-cream text-sm p-4 w-full">
                      {image.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-maroon/60 text-lg">No gallery items yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxOpen && allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
            style={{
              background: 'rgba(10, 2, 4, 0.92)',
              backdropFilter: 'blur(6px)'
            }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-maroon border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Image Container */}
              <div className="flex items-center justify-center w-full h-full max-h-[70vh]">
                <Image
                  src={allImages[currentImageIndex].src}
                  alt={allImages[currentImageIndex].caption || 'Gallery image'}
                  className="max-w-full max-h-full object-contain border-4 border-gold"
                />
              </div>

              {/* Caption */}
              <p className="font-heading text-gold text-center text-sm md:text-lg uppercase tracking-wide px-4 mt-4">
                {allImages[currentImageIndex].caption}
              </p>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-maroon border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors z-20"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-maroon border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors z-20"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}
