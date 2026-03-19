import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
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

export default function PastEventsPage() {
  const [events, setEvents] = useState<PastEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const result = await BaseCrudService.getAll<PastEvent>('pastevents', [], { limit: 100 });
        setEvents(result.items || []);
      } catch (err) {
        setError('Failed to load past events');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-maroon to-maroon/80 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-5xl md:text-6xl text-cream mb-4">Past Events</h1>
              <p className="font-paragraph text-lg text-cream/90 max-w-2xl mx-auto">
                Explore our collection of memorable events and moments from the past
              </p>
            </motion.div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-maroon">{error}</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-maroon">No past events found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/past-events/${event._id}`}>
                      <div className="group cursor-pointer h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        {/* Event Image */}
                        {event.coverImage && (
                          <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                            <Image
                              src={event.coverImage}
                              alt={event.eventName || 'Event'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              width={400}
                              height={300}
                            />
                          </div>
                        )}

                        {/* Event Info */}
                        <div className="flex-1 p-6 flex flex-col">
                          <h3 className="font-heading text-xl text-maroon mb-2 line-clamp-2">
                            {event.eventName || 'Untitled Event'}
                          </h3>

                          {event.eventDate && (
                            <p className="font-paragraph text-sm text-gold mb-3">
                              {formatDate(event.eventDate)}
                            </p>
                          )}

                          {event.location && (
                            <p className="font-paragraph text-sm text-gray-600 mb-3">
                              📍 {event.location}
                            </p>
                          )}

                          {event.description && (
                            <p className="font-paragraph text-sm text-gray-700 line-clamp-3 flex-1">
                              {event.description}
                            </p>
                          )}

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <span className="font-paragraph text-sm text-gold font-semibold">
                              View Gallery →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
