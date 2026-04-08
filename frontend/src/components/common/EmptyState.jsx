import '../../styles/components.css'

export default function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__description">{description}</p>
    </div>
  )
}
