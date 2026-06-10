import PageHero from '../components/common/PageHero'
import Card from '../components/common/Card'
import SectionHeading from '../components/common/SectionHeading'

export default function Infrastructure() {
  const facilities = [
    { icon: '🏥', name: 'Operation Theatres', description: '2 fully equipped modern OTs with latest equipment', image: '/images/hospital-6.png' },
    { icon: '🛏️', name: 'Hospital Wards', description: 'Separate wards for different animal categories', image: '/images/hospital-1.png' },
    { icon: '🔬', name: 'Diagnostic Lab', description: 'State-of-the-art diagnostic facilities', image: '/images/hospital-3.png' },
    { icon: '🚑', name: 'Ambulance Service', description: '24/7 emergency ambulance service', image: '/images/hospital-4.png' },
    { icon: '💊', name: 'Pharmacy', description: 'Complete range of veterinary medicines', image: '/images/hospital-2.png' },
    { icon: '🏨', name: 'Intensive Care', description: 'ICU beds for critical animals', image: '/images/hospital-1.png' },
  ]

  return (
    <div>
      <PageHero
        title="Our Infrastructure"
        subtitle="State-of-the-Art Facilities"
        description="Equipped with modern medical facilities to provide the best possible care for animals."
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Modern Facilities" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, idx) => (
              <Card key={idx} hover className="overflow-hidden">
                <div className="h-40 overflow-hidden rounded-lg mb-4 bg-gray-200">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-4xl mb-3">{facility.icon}</div>
                <h3 className="text-lg font-display font-bold text-charcoal mb-2">{facility.name}</h3>
                <p className="text-sm text-charcoal-light">{facility.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
