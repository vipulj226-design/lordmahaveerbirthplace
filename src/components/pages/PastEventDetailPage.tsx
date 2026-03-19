import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

interface PastEvent {
  _id: string;
  eventName?: string;
  eventDate?: Date | string;
  description?: string;
  coverImage?: string;
  location?: string;
  eventUrl?: string;
}

interface GalleryItem {
  _id: string;
  image?: string;
  caption?: string;
  description?: string;
  displayOrder?: number;
}

export default function PastEventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<PastEvent | null>(null);
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const loadEventData = async () => {
      try {
        setIsLoading(true);
        if (!id) {
          setError('Event not found');
          return;
        }

        // Load event details
        const eventData = await BaseCrudService.getById<PastEvent>('pastevents', id);
        setEvent(eventData);

        // Load photos for this event
        const galleryResult = await BaseCrudService.getAll<GalleryItem>('gallery', [], { limit: 1000 });
        const eventPhotos = (galleryResult.items || [])
          .filter((photo: any) => photo.pastEvent === id)
          .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setPhotos(eventPhotos);
      } catch (err) {
        setError('Failed to load event details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [id]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <p className="font-paragraph text-lg text-maroon">{error || 'Event not found'}</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero Section with Event Cover */}
        <section className="w-full relative h-96 md:h-[500px] overflow-hidden">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.eventName || 'Event'}
              className="w-full h-full object-cover"
              width={1600}
              height={500}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-maroon to-maroon/80" />
          )}
          <div className="absolute inset-0 bg-black/40" />

          {/* Event Info Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="w-full p-6 md:p-12 bg-gradient-to-t from-black/60 to-transparent">
              <h1 className="font-heading text-4xl md:text-5xl text-cream mb-3">
                {event.eventName}
              </h1>
              <div className="flex flex-wrap gap-6 text-cream/90 font-paragraph">
                {event.eventDate && (
                  <div>
                    <p className="text-sm text-cream/70">Date</p>
                    <p className="text-lg">{formatDate(event.eventDate)}</p>
                  </div>
                )}
                {event.location && (
                  <div>
                    <p className="text-sm text-cream/70">Location</p>
                    <p className="text-lg">📍 {event.location}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Event Description */}
        {event.description && (
          <section className="w-full py-12 md:py-16 bg-white">
            <div className="max-w-[100rem] mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-paragraph text-lg text-gray-700 leading-relaxed max-w-3xl">
                  {event.description}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section className="w-full py-16 md:py-24 bg-cream">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-maroon mb-4">
                Event Gallery
              </h2>
              <p className="font-paragraph text-gray-600 mb-12">
                {photos.length} {photos.length === 1 ? 'photo' : 'photos'} from this event
              </p>
            </motion.div>

            {photos.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-paragraph text-lg text-gray-600">
                  No photos available for this event yet
                </p>
              </div>
            ) : (
              <>
                {/* Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {photos.map((photo, index) => {
                    // Collect all image fields from the photo
                    const imageFields = [
                      photo.image,
                      (photo as any).galleryImages,
                      (photo as any).galleryImagesBatch,
                    ].filter(Boolean);

                    return imageFields.map((imageUrl, imgIndex) => (
                      <motion.div
                        key={`${photo._id}-${imgIndex}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: (index + imgIndex) * 0.05 }}
                        className="cursor-pointer group"
                        onClick={() => setSelectedPhoto({ ...photo, image: imageUrl })}
                      >
                        <div className="relative w-full h-64 overflow-hidden rounded-lg bg-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={photo.caption || 'Event photo'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              width={400}
                              height={300}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              🔍
                            </span>
                          </div>
                        </div>
                        {photo.caption && (
                          <p className="font-paragraph text-sm text-gray-700 mt-3 line-clamp-2">
                            {photo.caption}
                          </p>
                        )}
                      </motion.div>
                    ));
                  })}
                </div>

                {/* Lightbox Modal */}
                {selectedPhoto && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedPhoto(null)}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative max-w-4xl w-full"
                    >
                      {selectedPhoto.image && (
                        <Image
                          src={selectedPhoto.image}
                          alt={selectedPhoto.caption || 'Event photo'}
                          className="w-full h-auto rounded-lg"
                          width={800}
                          height={600}
                        />
                      )}
                      {selectedPhoto.caption && (
                        <p className="font-paragraph text-cream mt-4 text-center">
                          {selectedPhoto.caption}
                        </p>
                      )}
                      <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 right-4 bg-maroon/80 hover:bg-maroon text-cream rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                      >
                        ✕
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
