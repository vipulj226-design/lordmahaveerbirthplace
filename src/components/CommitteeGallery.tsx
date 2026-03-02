import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { CommitteeMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-[100rem] mx-auto text-center">
          <p className="text-lg text-gray-600">No committee members found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="committee" className="py-20 px-4 bg-cream">
      <div className="max-w-[100rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-heading font-bold text-maroon mb-4">
            Our Committee
          </h2>
          <p className="text-lg font-paragraph text-gray-700 max-w-2xl mx-auto">
            Meet the dedicated members of our committee who lead our mission and vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Member Image */}
              {member.memberImage && (
                <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
                  <Image
                    src={`${member.memberImage}${member.memberImage.includes('?') ? '&' : '?'}t=${new Date().getTime()}`}
                    alt={member.name || 'Committee Member'}
                    className="w-full h-full object-cover"
                    width={400}
                  />
                </div>
              )}

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-maroon mb-1">
                  {member.name}
                </h3>
                <p className="text-gold font-paragraph font-semibold mb-3">
                  {member.role}
                </p>

                {member.bio && (
                  <p className="text-gray-700 font-paragraph text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                )}

                {/* LinkedIn Link */}
                {member.linkedInUrl && (
                  <a
                    href={member.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-maroon hover:text-gold transition-colors duration-200 font-paragraph font-semibold"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
