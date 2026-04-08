import '../../styles/components.css'

export default function Loading({ text = 'Dang tai du lieu...' }) {
  return <div className="loading-state">{text}</div>
}
