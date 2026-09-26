import { Mountain } from 'lucide-react'

export default function Logo({ light = false }) {
  return (
    <div className={light ? 'logo light' : 'logo'}>
      <span className="logo-mark">
        <Mountain size={23} />
      </span>
      <span>
        <strong>Oromia</strong>
        <small>Tourism</small>
      </span>
    </div>
  )
}
