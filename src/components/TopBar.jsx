import { ArrowLeft, ArrowRight, Menu, Search, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function TopBar({ title, back = false, actions = false, menu = false }) {
  const navigate = useNavigate()

  return (
    <header className="topbar">
      <div className="topbar-side">
        {back && (
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={19} />
          </button>
        )}
        {!back && <Logo />}
      </div>

      {title && <h1>{title}</h1>}

      <div className="topbar-side right">
        {actions && (
          <>
            <button className="icon-btn" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="icon-btn" aria-label="Share">
              <Share2 size={17} />
            </button>
          </>
        )}
        {menu && (
          <button className="icon-btn" aria-label="Menu">
            <Menu size={20} />
          </button>
        )}
      </div>
    </header>
  )
}

export function SearchBox({ value, onChange, placeholder = 'Search destinations...', onSubmit }) {
  const submit = (event) => {
    event.preventDefault()
    onSubmit?.(value)
  }

  return (
    <form className="search-box" onSubmit={submit}>
      <Search size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" aria-label="Search">
        <ArrowRight size={17} />
      </button>
    </form>
  )
}
