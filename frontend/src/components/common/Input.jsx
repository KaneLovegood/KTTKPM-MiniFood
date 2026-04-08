import '../../styles/components.css'

export default function Input({ label, id, error, className = '', ...props }) {
  return (
    <div className="input-field">
      {label ? (
        <label htmlFor={id} className="input-field__label">
          {label}
        </label>
      ) : null}
      <input id={id} className={`input-field__control ${className}`.trim()} {...props} />
      {error ? <p className="input-field__error">{error}</p> : null}
    </div>
  )
}
