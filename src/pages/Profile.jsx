import {
  Bell,
  ChevronRight,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
  Ticket,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { useAppStore } from '../store/appStore'

export default function Profile() {
  const user = useAppStore((state) => state.user)
  const signOut = useAppStore((state) => state.signOut)
  const navigate = useNavigate()

  const goToSignIn = () => navigate('/auth')

  return (
    <>
      <TopBar menu />
      <section className="profile-page">
        <div className="profile-head">
          <div className="avatar">
            <UserRound />
          </div>
          <div>
            <h1>{user?.name || 'Oromia Traveller'}</h1>
            <p>{user?.email || 'Sign in to save your journey'}</p>
          </div>
        </div>

        {!user && (
          <Link to="/auth" className="primary-btn">
            Sign in <ChevronRight size={17} />
          </Link>
        )}

        <div className="profile-menu">
          <Link to="/saved">
            <Heart />
            <span>Favorites</span>
            <ChevronRight />
          </Link>
          <Link to="/itinerary">
            <Ticket />
            <span>My Trips</span>
            <ChevronRight />
          </Link>
          <button onClick={goToSignIn}>
            <MapPin />
            <span>Saved Addresses</span>
            <ChevronRight />
          </button>
          <button>
            <Bell />
            <span>Notifications</span>
            <ChevronRight />
          </button>
          <button>
            <Settings />
            <span>Settings</span>
            <ChevronRight />
          </button>
          <button>
            <HelpCircle />
            <span>Help &amp; Support</span>
            <ChevronRight />
          </button>
          {user && (
            <button
              onClick={() => {
                signOut()
                navigate('/')
              }}
            >
              <LogOut />
              <span>Log Out</span>
              <ChevronRight />
            </button>
          )}
        </div>

        <div className="profile-banner">
          <b>Travel responsibly</b>
          <p>
            Respect local communities, protect nature and leave every place better than you found it.
          </p>
        </div>
      </section>
    </>
  )
}
