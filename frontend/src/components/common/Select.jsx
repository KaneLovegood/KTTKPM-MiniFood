import '../../styles/components.css'

export default function Select({ label, id, children, className = '', ...props }) {
  return (
    <div className="input-field">
      {label ? (
        <label htmlFor={id} className="input-field__label">
          {label}
        </label>
      ) : null}
      <select id={id} className={`input-field__control ${className}`.trim()} {...props}>
        {children}
      </select>
    </div>
  )
}
