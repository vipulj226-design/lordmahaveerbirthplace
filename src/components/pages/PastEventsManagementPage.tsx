import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import { ChevronDown, ChevronUp, Calendar, MapPin } from 'lucide-react';

interface EventYears {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  year?: number;
  title?: string;
  description?: string;
  coverImage?: string;
  isActive?: boolean;
}

interface PastEvents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  eventName?: string;
  eventDate?: Date | string;
  eventYear?: number;
  location?: string;
  description?: string;
  coverImage?: string;
}

interface EventsByYear {
  year: EventYears;
  events: PastEvents[];
}

export default function PastEventsManagementPage() {
  const [eventsByYear, setEventsByYear] = useState<EventsByYear[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all years
        const yearsResult = await BaseCrudService.getAll<EventYears>('eventyears', [], { limit: 100 });
        
        // Fetch all past events
        const eventsResult = await BaseCrudService.getAll<PastEvents>('pastevents', [], { limit: 100 });

        // Group events by year
        const grouped: EventsByYear[] = yearsResult.items
          .sort((a, b) => (b.year || 0) - (a.year || 0))
          .map((year) => ({
            year,
            events: eventsResult.items
              .filter((event) => event.eventYear === year.year)
              .sort((a, b) => {
                const dateA = new Date(a.eventDate || 0).getTime();
                const dateB = new Date(b.eventDate || 0).getTime();
                return dateB - dateA;
              }),
          }));

        setEventsByYear(grouped);
        
        // Expand first year by default
        if (grouped.length > 0) {
          setExpandedYears(new Set([grouped[0].year._id]));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleYear = (yearId: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(yearId)) {
      newExpanded.delete(yearId);
    } else {
      newExpanded.add(yearId);
    }
    setExpandedYears(newExpanded);
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-cream text-maroon">
      <Header />
      
      <section className="relative py-12 md:py-20 bg-cream overflow-hidden">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
          
          {/* Section Header */}
          <div className="mb-12 md:mb-20 relative">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
            >
              Past Events <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Year-wise</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-paragraph text-lg text-maroon/70 mt-6 max-w-2xl"
            >
              Explore events organized by year. Click on any year to view all events from that period.
            </motion.p>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
          </div>

          {/* Events by Year */}
          {isLoading ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-maroon/60">Loading events...</p>
            </div>
          ) : eventsByYear.length > 0 ? (
            <div className="space-y-4">
              {eventsByYear.map((item, index) => (
                <motion.div
                  key={item.year._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-2 border-maroon overflow-hidden"
                >
                  {/* Year Header - Clickable */}
                  <button
                    onClick={() => toggleYear(item.year._id)}
                    className="w-full bg-gradient-to-r from-maroon to-[#1A0306] text-cream p-6 hover:from-gold hover:to-gold2 hover:text-maroon transition-all duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="text-4xl font-heading font-black text-gold group-hover:text-maroon transition-colors">
                        {item.year.year}
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
                          {item.year.title}
                        </h2>
                        <p className="font-paragraph text-sm text-cream/80 group-hover:text-maroon/70 transition-colors">
                          {item.events.length} event{item.events.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-paragraph text-sm uppercase tracking-widest">
                        {expandedYears.has(item.year._id) ? 'Hide' : 'Show'}
                      </span>
                      {expandedYears.has(item.year._id) ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </button>

                  {/* Year Description */}
                  {item.year.description && expandedYears.has(item.year._id) && (
                    <div className="bg-cream/50 border-b border-maroon/20 p-6">
                      <p className="font-paragraph text-maroon/80 leading-relaxed">
                        {item.year.description}
                      </p>
                    </div>
                  )}

                  {/* Events List */}
                  {expandedYears.has(item.year._id) && (
                    <div className="bg-cream">
                      {item.events.length > 0 ? (
                        <div className="divide-y divide-maroon/20">
                          {item.events.map((event, eventIndex) => (
                            <motion.div
                              key={event._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: eventIndex * 0.05 }}
                              className="p-6 hover:bg-gold/5 transition-colors duration-300 group"
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                
                                {/* Event Image */}
                                {event.coverImage && (
                                  <div className="lg:col-span-1">
                                    <div className="relative h-40 overflow-hidden rounded-lg border-2 border-maroon group-hover:border-gold transition-colors">
                                      <Image
                                        src={event.coverImage}
                                        alt={event.eventName || 'Event'}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Event Details */}
                                <div className={event.coverImage ? 'lg:col-span-3' : 'lg:col-span-4'}>
                                  <h3 className="font-heading text-2xl font-bold text-maroon mb-4 uppercase tracking-wide">
                                    {event.eventName}
                                  </h3>

                                  <div className="space-y-3 mb-6">
                                    {/* Date */}
                                    {event.eventDate && (
                                      <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-gold shrink-0" />
                                        <span className="font-paragraph text-maroon/80">
                                          {formatDate(event.eventDate)}
                                        </span>
                                      </div>
                                    )}

                                    {/* Location */}
                                    {event.location && (
                                      <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-gold shrink-0" />
                                        <span className="font-paragraph text-maroon/80">
                                          {event.location}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Description */}
                                  {event.description && (
                                    <p className="font-paragraph text-maroon/80 leading-relaxed line-clamp-3">
                                      {event.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <p className="font-paragraph text-maroon/60">
                            No events recorded for this year
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-maroon/60 text-lg">
                No events available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-maroon via-[#1A0306] to-maroon text-cream py-12">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <p className="font-paragraph text-cream/80">
            © 2026 Bhagwan Mahavir Smarak Samiti. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
