import '../styles/components.css'

const getStatusType = (status) => {
  const normalized = String(status || '').toUpperCase()
  if (['PAID', 'SUCCESS', 'COMPLETED'].includes(normalized)) return 'success'
  if (['PENDING', 'CREATED', 'PROCESSING'].includes(normalized)) return 'warning'
  if (['CANCELLED', 'FAILED', 'REJECTED'].includes(normalized)) return 'danger'
  return 'neutral'
}

export default function StatusBadge({ status }) {
  const type = getStatusType(status)
  return <span className={`status-badge status-badge--${type}`}>{status}</span>
}
