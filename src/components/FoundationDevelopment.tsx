import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

interface FoundationDevelopmentBlock {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  yearPeriod?: string;
  heading?: string;
  content?: string;
  image?: string;
  quote?: string;
}

export default function FoundationDevelopment() {
  const [blocks, setBlocks] = useState<FoundationDevelopmentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const result = await BaseCrudService.getAll<FoundationDevelopmentBlock>('foundationdevelopment');
        setBlocks(result.items);
      } catch (error) {
        console.error('Error fetching foundation & development blocks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <section id="foundation-development" className="w-full py-20 bg-cream">
      <div className="max-w-[100rem] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-heading font-bold text-maroon mb-4"
          >
            Foundation & Development
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl font-paragraph text-maroon/80 max-w-3xl mx-auto"
          >
            A sacred journey — from the first foundation stone in 1956 to the grand Panchkalyanak in 2013
          </motion.p>
        </div>

        {/* Timeline Blocks */}
        <div className="space-y-12">
          {blocks.map((block, index) => (
            <motion.div
              key={block._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                {block.image && (
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={block.image}
                      alt={block.heading || 'Foundation & Development'}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-lg p-8 shadow-md">
                  {/* Year/Period Badge */}
                  <div className="inline-block bg-gold/20 text-maroon px-4 py-2 rounded-full mb-4 font-heading font-bold text-sm">
                    {block.yearPeriod}
                  </div>

                  {/* Heading */}
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-maroon mb-4">
                    {block.heading}
                  </h3>

                  {/* Content */}
                  <p className="font-paragraph text-gray-700 mb-4 leading-relaxed">
                    {block.content}
                  </p>

                  {/* Quote (if available) */}
                  {block.quote && (
                    <blockquote className="border-l-4 border-gold pl-4 italic text-gray-600 font-paragraph">
                      "{block.quote}"
                    </blockquote>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
