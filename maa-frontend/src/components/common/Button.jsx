import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  to,
  href,
  type = 'button',
  ...props
}) {
  const baseStyles = 'font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-block text-center'
  
  const variants = {
    primary: 'bg-saffron hover:bg-saffron-600 text-white',
    secondary: 'bg-forest hover:bg-forest-600 text-white',
    outline: 'border-2 border-saffron text-saffron hover:bg-saffron hover:text-white',
    ghost: 'text-saffron hover:bg-saffron-50',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  const classes = clsx(baseStyles, variants[variant], sizes[size], className)
  
  // Link button
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  
  // External link
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  
  // Regular button
  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
