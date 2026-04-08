import '../../styles/components.css'

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) {
  const variantClass = variant === 'secondary' ? 'btn--secondary' : 'btn--primary'
  const widthClass = fullWidth ? 'btn--full' : ''

  return (
    <button type={type} className={`btn ${variantClass} ${widthClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
