import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { CommitteeMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function CommitteeGallery() {
  const [members, setMembers] = useState<CommitteeMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const result = await BaseCrudService.getAll<CommitteeMembers>('committee', [], { limit: 100 });
        const sortedMembers = result.items.sort((a, b) => {
          const dateA = a._createdDate ? new Date(a._createdDate).getTime() : 0;
          const dateB = b._createdDate ? new Date(b._createdDate).getTime() : 0;
          return dateA - dateB;
        });
        setMembers(sortedMembers);
      } catch (error) {
        console.error('Error loading committee members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  return (
    <section id="committee" className="relative py-32 bg-cream overflow-hidden">
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-6xl font-black text-maroon uppercase tracking-tight relative z-10 lg:text-5xl"
          >
            Our <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Committee</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl text-maroon/70 mt-6 max-w-2xl"
          >
            Meet the dedicated members leading our mission and vision
          </motion.p>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Committee Members Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-maroon/60">Loading committee members...</p>
          </div>
        ) : members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white border-2 border-maroon overflow-hidden hover:border-gold transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              >
                {/* Member Image */}
                {member.memberImage && (
                  <div className="relative w-full aspect-square overflow-hidden bg-maroon/10">
                    <Image
                      src={member.memberImage}
                      alt={member.name || 'Committee Member'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                    />
                  </div>
                )}

                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-maroon mb-2 uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="font-paragraph text-sm text-gold font-semibold uppercase tracking-widest mb-4">
                    {member.role}
                  </p>

                  {member.bio && (
                    <p className="font-paragraph text-maroon/80 text-sm mb-6 leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  )}

                  {/* LinkedIn Link */}
                  {member.linkedInUrl && (
                    <a
                      href={member.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-maroon hover:text-gold transition-colors duration-200 font-paragraph font-semibold text-sm uppercase tracking-wide"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              {/* Member Info */}
                </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-paragraph text-maroon/60 text-lg">No committee members found yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
