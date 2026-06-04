'use client'
// src/app/[locale]/our-team/page.js
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { TEAM_MEMBERS } from '@/lib/data'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

export default function OurTeamPage() {
  const t = useTranslations('team')

  return (
    <div className="bg-cream">
      <PageHero
        title={t('page.hero.title')}
        subtitle={t('page.hero.subtitle')}
        variant="forest"
      />

      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow={t('section.meet.eyebrow')}
            heading={t('section.meet.heading')}
            subtext={t('section.meet.subtext')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden border border-border hover:-translate-y-1 hover:border-forest/40 transition-all duration-300 group"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                {/* Avatar / Photo */}
                <div className="aspect-square bg-forest-subtle flex items-center justify-center relative overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center group-hover:bg-forest/20 transition-colors duration-200">
                        <User size={36} strokeWidth={1.5} className="text-forest/50" aria-hidden="true" />
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/5 transition-colors duration-300" aria-hidden="true" />
                </div>

                <div className="p-5 border-t border-border">
                  <h3 className="font-display text-lg text-forest leading-tight">{member.name}</h3>
                  <p className="text-sm font-semibold text-saffron mt-1 font-body">{member.designation}</p>
                  <p className="text-xs text-muted mt-1.5 font-body">{member.qualification}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* Join the team CTA */}
      <section className="py-16 md:py-20 bg-forest-subtle">
        <div className="section-wrapper text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <span className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">
              {t('section.volunteer.eyebrow')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-forest mt-2 mb-4">
              {t('section.volunteer.heading')}
            </h2>
            <p className="text-base text-charcoal/70 max-w-xl mx-auto font-body leading-relaxed mb-8">
              {t('section.volunteer.subtext')}
            </p>
            <Link href="/contact" className="btn-primary">
              {t('section.volunteer.cta')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
