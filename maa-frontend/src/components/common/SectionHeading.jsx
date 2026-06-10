export default function SectionHeading({ title, subtitle, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  
  return (
    <div className={`mb-12 ${alignClass}`}>
      <h2 className="text-4xl font-display font-bold text-charcoal mb-2">{title}</h2>
      <div className={`h-1 w-24 bg-saffron ${align === 'left' ? '' : 'mx-auto'}`}></div>
      {subtitle && <p className="text-charcoal-light mt-4">{subtitle}</p>}
    </div>
  )
}
