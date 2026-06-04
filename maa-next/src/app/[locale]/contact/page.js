'use client'
// src/app/[locale]/contact/page.js
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { MapPin, Phone, Mail, Ambulance, Send, ChevronDown } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { SITE_CONFIG } from '@/lib/data'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

const INFO_ITEMS = [
  {
    Icon: MapPin,
    labelKey: 'contact.info.address',
    value: SITE_CONFIG.address,
    href: SITE_CONFIG.mapUrl,
    external: true,
  },
  {
    Icon: Phone,
    labelKey: 'contact.info.phone',
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    Icon: Mail,
    labelKey: 'contact.info.email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
]

function InputField({ id, label, type = 'text', placeholder, required, error, register, rows }) {
  const baseClass =
    'w-full px-5 py-4 rounded-2xl bg-gray-50/80 border text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20 placeholder:text-muted'
  const errorClass = 'border-red-400 focus:border-red-400 focus:ring-red-200/50'
  const normalClass = 'border-gray-200'

  const cls = `${baseClass} ${error ? errorClass : normalClass}`

  if (rows) {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-charcoal font-body">
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
        <textarea id={id} rows={rows} placeholder={placeholder} className={`${cls} resize-y`} {...register} />
        {error && <p className="text-xs text-red-500 font-body">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-charcoal font-body">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      <input id={id} type={type} placeholder={placeholder} className={cls} {...register} />
      {error && <p className="text-xs text-red-500 font-body">{error}</p>}
    </div>
  )
}

export default function ContactPage() {
  const t = useTranslations('contact')
  
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const errs = {}
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = t('form.errors.name')
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = t('form.errors.email')
    if (!form.subject) errs.subject = t('form.errors.subject')
    if (!form.message.trim() || form.message.trim().length < 20) errs.message = t('form.errors.message')
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      toast.success(t('form.success'))
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error(t('form.error'))
    } finally {
      setSubmitting(false)
    }
  }

  const SUBJECTS = [
    { value: 'general',     label: t('form.subjects.general') },
    { value: 'donation',    label: t('form.subjects.donation') },
    { value: 'sponsorship', label: t('form.subjects.sponsorship') },
    { value: 'emergency',   label: t('form.subjects.emergency') },
    { value: 'volunteer',   label: t('form.subjects.volunteer') },
  ]

  return (
    <div className="bg-cream">
      <PageHero
        title={t('page.hero.title')}
        subtitle={t('page.hero.subtitle')}
        variant="forest"
      />

      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left: Info cards + Map */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="space-y-4 mb-8"
              >
                {INFO_ITEMS.map((item) => (
                  <motion.a
                    key={item.labelKey}
                    variants={fadeUp}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-border hover:-translate-y-0.5 hover:border-forest/40 transition-all duration-200 group"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0 group-hover:bg-forest group-hover:text-white transition-colors duration-200">
                      <item.Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-widest font-semibold font-body mb-1">{t(`info.${item.labelKey.split('.').pop()}`)}</p>
                      <p className="text-sm text-charcoal font-medium font-body">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Map */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="aspect-[4/3] bg-white rounded-2xl border border-border overflow-hidden flex items-center justify-center"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <div className="text-center">
                  <span className="text-5xl opacity-20" aria-hidden="true">🗺️</span>
                  <p className="text-xs text-muted mt-2 font-body">
                    <a href={SITE_CONFIG.mapUrl} target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline">
                      {t('info.map')}
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: Contact Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-border" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
                <SectionHeading
                  eyebrow={t('form.heading.eyebrow')}
                  heading={t('form.heading.title')}
                  align="left"
                />

                <form onSubmit={handleSubmit} className="space-y-5 mt-6" noValidate>
                  <InputField
                    id="contact-name"
                    label={t('form.fields.name')}
                    placeholder={t('form.placeholders.name')}
                    required
                    error={errors.name}
                    register={{
                      value: form.name,
                      onChange: (e) => setForm({ ...form, name: e.target.value }),
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      id="contact-email"
                      label={t('form.fields.email')}
                      type="email"
                      placeholder={t('form.placeholders.email')}
                      required
                      error={errors.email}
                      register={{
                        value: form.email,
                        onChange: (e) => setForm({ ...form, email: e.target.value }),
                      }}
                    />
                    <InputField
                      id="contact-phone"
                      label={t('form.fields.phone')}
                      type="tel"
                      placeholder={t('form.placeholders.phone')}
                      register={{
                        value: form.phone,
                        onChange: (e) => setForm({ ...form, phone: e.target.value }),
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-subject" className="text-sm font-semibold text-charcoal font-body">
                      {t('form.fields.subject')} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`w-full appearance-none px-5 py-4 rounded-2xl bg-gray-50/80 border text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20 ${errors.subject ? 'border-red-400' : 'border-gray-200'}`}
                      >
                        <option value="">{t('form.placeholders.subject')}</option>
                        {SUBJECTS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted" aria-hidden="true" />
                    </div>
                    {errors.subject && <p className="text-xs text-red-500 font-body">{errors.subject}</p>}
                  </div>

                  <InputField
                    id="contact-message"
                    label={t('form.fields.message')}
                    placeholder={t('form.placeholders.message')}
                    required
                    rows={5}
                    error={errors.message}
                    register={{
                      value: form.message,
                      onChange: (e) => setForm({ ...form, message: e.target.value }),
                    }}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                    id="contact-submit-btn"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {t('form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send size={16} strokeWidth={2} aria-hidden="true" />
                        {t('form.submit')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PawDivider />

      {/* Emergency CTA */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-red-50 border border-red-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="shrink-0 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-red-200 animate-ping opacity-20" />
                <Ambulance size={40} strokeWidth={1.5} className="text-red-600 relative z-10" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-red-950 mb-1">{t('emergency.title')}</h3>
                <p className="text-red-800/80 font-body text-base md:text-lg">
                  {t('emergency.subtitle')}
                </p>
              </div>
            </div>
            <a
              href={`tel:${SITE_CONFIG.emergencyPhone}`}
              className="inline-flex flex-col items-center bg-red-600 text-white rounded-2xl px-10 py-4 hover:bg-red-700 active:scale-[0.98] transition-all duration-200 shadow-lg shrink-0 w-full sm:w-auto text-center"
            >
              <span className="font-bold text-2xl tracking-wide">{SITE_CONFIG.emergencyPhone}</span>
              <span className="text-xs uppercase tracking-widest font-semibold text-white/80 mt-1 font-body">{t('emergency.cta')}</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
