import { useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useAppStore } from '../store/appStore'

export default function Auth() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const signIn = useAppStore((state) => state.signIn)
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    signIn({
      name: name || 'Oromia Traveller',
      email: email || 'traveller@example.com',
    })
    navigate('/profile')
  }

  const continueWithGoogle = () => {
    signIn({
      name: 'Oromia Traveller',
      email: 'google.user@example.com',
    })
    navigate('/profile')
  }

  return (
    <section className="auth-page">
      <div className="auth-art">
        <img
          src="https://images.squarespace-cdn.com/content/v1/63048825027c7c4f568683cd/1661252041564-1US8HSA8H5VF9LHOPAMN/Screen%2BShot%2B2022-08-23%2Bat%2B8.12.51%2Bpm.png"
          alt="Oromia landscape"
        />
        <div className="auth-art-copy">
          <Logo light />
          <h1>
            More than a destination.
            <br />
            <em>It&apos;s a feeling.</em>
          </h1>
        </div>
      </div>

      <div className="auth-card">
        <Logo />
        <p className="eyebrow dark">YOUR JOURNEY AWAITS</p>
        <h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
        <p>Save destinations, plan trips and keep your Oromia memories together.</p>

        <button className="google-btn" onClick={continueWithGoogle}>
          <b>G</b> Continue with Google
        </button>

        <div className="or">
          <span />or<span />
        </div>

        <div className="tabs">
          <button className={mode === 'signin' ? 'active' : ''} onClick={() => setMode('signin')}>
            Sign in
          </button>
          <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
            Create one
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          <button className="primary-btn" type="submit">
            {mode === 'signin' ? 'Sign in to Oromia' : 'Create account'}
            <ArrowRight size={17} />
          </button>
        </form>

        <button className="back-home" onClick={() => navigate('/')}>
          Continue as guest
        </button>
      </div>
    </section>
  )
}
