import { CalendarDays, Check, Share2 } from 'lucide-react'
import TopBar from '../components/TopBar'
import { destinations } from '../data'
import { useAppStore } from '../store/appStore'

export default function Itinerary() {
  const trips = useAppStore((state) => state.trips)
  const trip =
    trips[trips.length - 1] || {
      name: '5 Days Oromia Adventure',
      dates: 'Flexible dates',
      places: destinations.slice(0, 3).map((place) => place.name),
    }

  return (
    <>
      <TopBar title="My Itinerary" back actions />
      <section className="itinerary-page">
        <img className="itinerary-cover" src={destinations[0].image} alt="Oromia" />
        <h1>{trip.name}</h1>
        <p className="muted">
          <CalendarDays size={14} /> {trip.dates} <span>·</span> 2 Adults
        </p>

        <div className="timeline">
          {trip.places.map((name, index) => (
            <div className="timeline-item" key={name}>
              <span className="timeline-dot">{index + 1}</span>
              <div>
                <b>
                  Day {index + 1} · {name}
                </b>
                <p>
                  {index === 0
                    ? 'Arrival & city tour'
                    : index === 1
                      ? 'Hiking and nature tour'
                      : 'Relax, explore and local experience'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="itinerary-actions">
          <button className="secondary-btn">Edit</button>
          <button className="primary-btn">
            <Share2 size={16} /> Share
          </button>
        </div>

        <div className="soft-banner">
          <Check />
          <span>Your itinerary is saved on this device.</span>
        </div>
      </section>
    </>
  )
}
