// src/pages/Team.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'
import { TEAM_MEMBERS } from '@/data/mockData'
import { getInitials } from '@/utils/helpers'

function TeamCard({ member }) {
  return (
    <motion.div
      variants={fadeUp}
      className="card-premium p-8 flex flex-col items-center justify-center text-center group cursor-pointer"
    >
      {/* Avatar / photo per UI Prompt 7 */}
      <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden bg-saffron/10 border-4 border-saffron/30 group-hover:border-saffron transition-all duration-200 flex items-center justify-center text-saffron text-2xl font-display font-bold">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          getInitials(member.name)
        )}
      </div>

      <h3 className="font-display text-lg text-charcoal">{member.name}</h3>
      <p className="text-saffron text-sm font-semibold mt-0.5 font-body">{member.designation}</p>
      {member.qualification && (
        <p className="text-xs text-muted mt-1.5 font-body">{member.qualification}</p>
      )}
    </motion.div>
  )
}

export default function Team() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('team.hero.heading')}
        subheading={t('team.hero.subheading')}
        variant="forest"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading eyebrow={t('team.grid.eyebrow')} heading={t('team.hero.heading')} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {TEAM_MEMBERS.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
