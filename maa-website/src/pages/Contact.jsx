// src/pages/Contact.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail, Ambulance, Send } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'
import { SITE_CONFIG } from '@/data/mockData'
import { submitContactForm } from '@/services/api'

export default function Contact() {
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
    setSubmitting(true)
    try {
      await submitContactForm(data)
      toast.success(t('contact.form.success'))
      reset()
    } catch {
      toast.error(t('contact.form.error'))
    } finally {
      setSubmitting(false)
    }
  }

  const INFO_ITEMS = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: SITE_CONFIG.address,
      href: SITE_CONFIG.mapUrl,
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: SITE_CONFIG.phone,
      href: `tel:${SITE_CONFIG.phone}`,
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('contact.hero.heading')}
        subheading={t('contact.hero.subheading')}
        variant="forest"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Contact Info + Map */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="space-y-4 mb-10"
              >
                {INFO_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      variants={fadeUp}
                      href={item.href}
                      target={item.icon === MapPin ? '_blank' : undefined}
                      rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 p-5 card-premium group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0 group-hover:bg-forest group-hover:text-white transition-colors duration-200">
                        <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-charcoal/60 uppercase tracking-widest font-semibold mb-1 font-body">
                          {item.label}
                        </p>
                        <p className="text-base text-charcoal font-medium font-body" style={{ textWrap: 'pretty' }}>{item.value}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </motion.div>

              {/* Map placeholder */}
              <div className="aspect-[4/3] card-premium flex items-center justify-center overflow-hidden relative">
                <span className="text-5xl opacity-20" aria-hidden="true">🗺️</span>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="card-premium p-8 md:p-10"
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-forest mb-8">
                  {t('contact.form.heading')}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-charcoal mb-2 font-body">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={t('contact.form.namePlaceholder')}
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20 ${
                        errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      {...register('name', { required: true, minLength: 2 })}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-2 font-body">Name is required</p>}
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-charcoal mb-2 font-body">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        className={`w-full px-5 py-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20 ${
                          errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-2 font-body">Valid email is required</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold text-charcoal mb-2 font-body">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder={t('contact.form.phonePlaceholder')}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20"
                        {...register('phone')}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-semibold text-charcoal mb-2 font-body">
                      {t('contact.form.subject')} *
                    </label>
                    <select
                      id="contact-subject"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20 ${
                        errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      {...register('subject', { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>{t('contact.form.subjectPlaceholder')}</option>
                      {Object.entries({
                        general: t('contact.form.subjects.general'),
                        donation: t('contact.form.subjects.donation'),
                        sponsorship: t('contact.form.subjects.sponsorship'),
                        emergency: t('contact.form.subjects.emergency'),
                        volunteer: t('contact.form.subjects.volunteer'),
                      }).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="text-xs text-red-500 mt-2 font-body">Subject is required</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-charcoal mb-2 font-body">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder={t('contact.form.messagePlaceholder')}
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-sm font-body transition-all outline-none resize-y focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20 ${
                        errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      {...register('message', { required: true, minLength: 20 })}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-2 font-body">Message must be at least 20 characters</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-saffron w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? t('contact.form.sending') : t('contact.form.submit')}
                    {!submitting && <Send size={18} strokeWidth={2} aria-hidden="true" />}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <PawDivider />

      {/* Emergency Ambulance CTA matching About page style */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="bg-red-50/80 backdrop-blur-md border border-red-100 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-red-900 shadow-card"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="shrink-0 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-red-200 animate-ping opacity-20"></div>
                <Ambulance size={40} strokeWidth={1.5} className="text-red-600 relative z-10" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-normal text-red-950 mb-2">
                  {t('contact.ambulance.heading')}
                </h3>
                <p className="text-red-800/80 font-body text-lg">
                  {t('contact.ambulance.subtext')}
                </p>
              </div>
            </div>
            
            <a 
              href={`tel:${SITE_CONFIG.emergencyPhone}`}
              className="inline-flex flex-col items-center justify-center bg-red-600 text-white rounded-[10px] px-10 py-3.5 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shrink-0 w-full sm:w-auto"
            >
              <span className="font-bold text-2xl tracking-wide">{SITE_CONFIG.emergencyPhone}</span>
              <span className="text-xs uppercase tracking-widest font-semibold text-white/80 mt-1">{t('contact.ambulance.tapToCall')}</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
