import { Bookmark, Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

export default function DestinationCard({ place, compact = false }) {
  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const saved = favorites.includes(place.id)

  const handleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(place.id)
  }

  return (
    <Link
      className={compact ? 'place-card compact' : 'place-card'}
      to={`/destination/${place.id}`}
    >
      <div className="place-image">
        <img src={place.image} alt={place.name} />
        <button
          className="heart-btn"
          onClick={handleFavorite}
          aria-label="Save destination"
        >
          <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="place-info">
        <div className="place-name-row">
          <h3>{place.name}</h3>
          <Bookmark size={14} className="bookmark" />
        </div>

        <div className="meta">
          <Star size={13} fill="currentColor" />
          {place.rating}
          <span>({place.reviews})</span>
        </div>

        {!compact && (
          <div className="meta muted">
            <MapPin size={13} />
            {place.region}
          </div>
        )}
      </div>
    </Link>
  )
}
