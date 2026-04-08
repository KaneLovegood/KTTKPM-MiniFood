import { useToast } from '../../context/ToastContext'
import '../../styles/components.css'

const toastClassMap = { success: 'toast__content--success', error: 'toast__content--error', info: 'toast__content--info' }

export default function Toast() {
  const { toast } = useToast()

  if (!toast) {
    return null
  }

  return (
    <div className="toast">
      <div className={`toast__content ${toastClassMap[toast.type] || toastClassMap.info}`}>
        {toast.message}
      </div>
    </div>
  )
}
