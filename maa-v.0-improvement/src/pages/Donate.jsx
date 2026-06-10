import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Copy, Check, Heart, Shield, Activity, Phone } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Card from '../components/common/Card'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

export default function Donate() {
  const { t } = useTranslation()
  const [copiedField, setCopiedField] = useState(null)

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const impactStatements = [
    { icon: Heart, text: '₹500 covers one emergency surgery', color: 'text-saffron' },
    { icon: Shield, text: '₹1,000 stocks life-saving medicines for a week', color: 'text-forest' },
    { icon: Activity, text: '₹5,000 runs our free ambulance for a month', color: 'text-charcoal' },
  ]

  const bankDetails = [
    { label: 'Account Name', value: 'MAA Saraswati Veterinary Hospital' },
    { label: 'Bank', value: 'State Bank of India' },
    { label: 'Branch', value: 'Banjara Hills, Hyderabad' },
    { label: 'Account No.', value: '0000123456789' },
    { label: 'IFSC Code', value: 'SBIN0001234' },
  ]

  return (
    <div className="bg-cream min-h-screen pb-20">
      <PageHero
        title="Support Free Veterinary Care"
        subtitle="Every Rupee Counts"
        description="Help us provide medicine, surgery, and ambulance services to animals who have no one else to turn to."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Why Donate Section */}
        <section className="mb-20">
          <SectionHeading title="Your Impact" className="text-center" />
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mt-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {impactStatements.map((item, idx) => (
              <motion.div key={idx} variants={staggerItem}>
                <Card className="text-center h-full flex flex-col items-center justify-center p-8 shadow-soft border border-white">
                  <div className={`w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-6 ${item.color}`}>
                    <item.icon size={32} />
                  </div>
                  <p className="text-lg font-display text-charcoal font-medium leading-relaxed">
                    {item.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Donation Methods Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* UPI Section */}
          <motion.section 
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-card border border-border"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-bold text-forest mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center text-saffron">1</span>
              Scan & Pay via UPI
            </h2>
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 mb-6 relative overflow-hidden p-4">
                {/* Placeholder for real QR code */}
                <div className="absolute inset-0 bg-saffron/5" />
                <div className="text-center z-10">
                  <p className="font-mono text-gray-500 mb-2">[ QR Code Placeholder ]</p>
                  <p className="text-sm font-medium text-forest">maa@sbi</p>
                </div>
              </div>
              
              <div className="bg-cream rounded-full px-6 py-3 flex items-center gap-4">
                <span className="font-mono font-medium text-charcoal">maa@upi</span>
                <button 
                  onClick={() => copyToClipboard('maa@upi', 'upi')}
                  className="text-saffron hover:text-saffron/80 transition-colors"
                  aria-label="Copy UPI ID"
                >
                  {copiedField === 'upi' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="text-center border-t border-gray-100 pt-6">
              <p className="text-sm text-charcoal-light font-medium mb-4">Supported Apps</p>
              <div className="flex justify-center gap-4 text-gray-400 font-bold text-sm tracking-wider">
                <span>GPay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span>
              </div>
            </div>
          </motion.section>

          {/* Bank Transfer Section */}
          <motion.section 
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-card border border-border"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-bold text-forest mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center text-saffron">2</span>
              Bank Transfer
            </h2>

            <div className="space-y-4">
              {bankDetails.map((detail, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-cream rounded-xl">
                  <span className="text-sm text-charcoal-light font-medium mb-1 sm:mb-0">{detail.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-semibold text-charcoal">{detail.value}</span>
                    <button 
                      onClick={() => copyToClipboard(detail.value, detail.label)}
                      className="text-forest/60 hover:text-forest transition-colors p-1"
                      title="Copy"
                    >
                      {copiedField === detail.label ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="mt-8 bg-saffron/10 rounded-xl p-5 border border-saffron/20">
              <div className="flex items-start gap-3 text-sm text-charcoal">
                <Phone className="text-saffron mt-1 shrink-0" size={18} />
                <p>
                  <strong className="block mb-1">Acknowledgement Request</strong>
                  All donations are voluntary. Please screenshot your payment and WhatsApp it to <strong>+91 XXX XXX XXXX</strong> so we can acknowledge your contribution.
                </p>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  )
}
