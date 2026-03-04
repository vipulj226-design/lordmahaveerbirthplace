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
  galleryImage1?: string;
  galleryImage2?: string;
  galleryImage3?: string;
  galleryImage4?: string;
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

  return (
    <section id="foundation" className="relative py-16 md:py-20 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl text-4xl"
          >
            Foundation & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Development</span>
          </motion.h2>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl text-maroon/70 mt-6 max-w-2xl"
          >
            A sacred journey — from the first foundation stone in 1956 to the grand Panchkalyanak in 2013
          </motion.p>
          </div>

        {/* Timeline Blocks */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-maroon/60">Loading timeline...</p>
          </div>
        ) : blocks.length > 0 ? (
          <div className="space-y-12">
            {blocks.map((block, index) => (
              <motion.div
                key={block._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-2 border-maroon rounded-lg overflow-hidden hover:border-gold transition-all duration-300"
              >
                {/* Combined Image + Content Box */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
                  {/* Main Image - Left or Right based on index */}
                  <div className={`w-full ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    {block.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full h-auto overflow-hidden"
                      >
                        <Image
                          src={`${block.image}${block.image.includes('?') ? '&' : '?'}t=${new Date().getTime()}`}
                          alt={block.heading || 'Foundation & Development'}
                          width={600}
                          height={600}
                          className="w-full h-auto object-cover"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Content - Right or Left based on index */}
                  <div className={`w-full ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="bg-cream p-6 md:p-8 lg:p-10 w-full flex flex-col justify-center">
                      {/* Year/Period Badge */}
                      {block.yearPeriod && (
                        <div className="inline-block bg-gold/20 text-maroon px-4 py-2 rounded-full mb-4 font-heading font-bold text-xs uppercase tracking-widest w-fit">
                          {block.yearPeriod}
                        </div>
                      )}

                      {/* Heading */}
                      <h3 className="font-heading text-2xl lg:text-3xl font-bold text-maroon mb-4 uppercase tracking-wide">
                        {block.heading}
                      </h3>

                      {/* Content */}
                      <p className="font-paragraph text-base lg:text-lg text-maroon/80 mb-4 leading-relaxed">
                        {block.content}
                      </p>

                      {/* Quote (if available) */}
                      {block.quote && (
                        <blockquote className="border-l-4 border-gold pl-4 py-3 italic text-maroon/80 font-paragraph text-base mb-6">
                          "{block.quote}"
                        </blockquote>
                      )}
                    </div>
                  </div>
                </div>

                {/* Photo Gallery - 4 Photos from CMS - Full Width Below */}
                {(block.galleryImage1 || block.galleryImage2 || block.galleryImage3 || block.galleryImage4) && (
                  <div className="border-t-2 border-maroon/20 p-6 lg:p-8 bg-cream">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 auto-rows-max">
                      {block.galleryImage1 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          className="rounded-lg overflow-hidden border-2 border-gold/40 hover:border-gold transition-colors duration-300"
                        >
                          <Image
                            src={block.galleryImage1}
                            alt="Gallery photo 1"
                            width={700}
                            height={500}
                            className="w-full h-auto object-contain"
                          />
                        </motion.div>
                      )}
                      {block.galleryImage2 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="rounded-lg overflow-hidden border-2 border-gold/40 hover:border-gold transition-colors duration-300"
                        >
                          <Image
                            src={block.galleryImage2}
                            alt="Gallery photo 2"
                            width={700}
                            height={500}
                            className="w-full h-auto object-contain"
                          />
                        </motion.div>
                      )}
                      {block.galleryImage3 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className="rounded-lg overflow-hidden border-2 border-gold/40 hover:border-gold transition-colors duration-300"
                        >
                          <Image
                            src={block.galleryImage3}
                            alt="Gallery photo 3"
                            width={700}
                            height={500}
                            className="w-full h-auto object-contain"
                          />
                        </motion.div>
                      )}
                      {block.galleryImage4 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="rounded-lg overflow-hidden border-2 border-gold/40 hover:border-gold transition-colors duration-300"
                        >
                          <Image
                            src={block.galleryImage4}
                            alt="Gallery photo 4"
                            width={700}
                            height={500}
                            className="w-full h-auto object-contain"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-paragraph text-maroon/60 text-lg">No timeline data available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
