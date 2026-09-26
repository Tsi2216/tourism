import { ArrowRight, Bookmark, CalendarDays, Check, Clock3, ExternalLink, Heart, MapPin, Share2, Star, Utensils, Shirt, History, Music2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { destinations } from '../data'
import { useAppStore } from '../store/appStore'
import TopBar from '../components/TopBar'

export default function DestinationDetail() {
  const { id } = useParams()
  const place = destinations.find((p) => p.id === id) || destinations[0]
  const favorites = useAppStore((s) => s.favorites)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const saved = favorites.includes(place.id)
  return <><TopBar back actions /><section className="detail-page">
    <div className="detail-hero"><img src={place.image} alt={place.name}/><div className="detail-actions"><button className="icon-btn" onClick={()=>toggleFavorite(place.id)}><Heart size={19} fill={saved?'currentColor':'none'}/></button><button className="icon-btn"><Share2 size={18}/></button></div></div>
    <div className="detail-card">
      <div className="detail-title-row"><div><h1>{place.name}</h1><p><MapPin size={14}/> {place.region}</p></div><div className="rating"><Star size={14} fill="currentColor"/> {place.rating}<small>({place.reviews})</small></div></div>
      <div className="tag-row">{place.highlights.map((h)=><span key={h}>{h}</span>)}</div>
      <p className="lead">{place.description}</p>
      <div className="facts"><div><Clock3/><span>Visit time<b>2–3 days</b></span></div><div><CalendarDays/><span>Best time<b>Seasonal</b></span></div><div><Bookmark/><span>Experience<b>Local guide</b></span></div></div>

      <div className="area-video-block"><div className="section-head"><div><p className="eyebrow dark">SEE THE PLACE</p><h2>Watch the story</h2></div>{place.videoSearch&&<a href={place.videoSearch} target="_blank" rel="noreferrer">More videos <ExternalLink size={14}/></a>}</div>{place.video ? <iframe src={place.video} title={`${place.name} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <div className="video-fallback detail-fallback"><img src={place.image} alt=""/><div><span>VIDEO GUIDE</span><h3>Explore {place.name}</h3><a href={place.videoSearch} target="_blank" rel="noreferrer">Watch videos about this place <ExternalLink size={15}/></a></div></div>}</div>

      <h2>What makes this place special</h2><div className="highlight-grid">{place.experiences.map((h)=><div key={h}><Check/><span>{h}</span></div>)}</div>
      <div className="area-info-grid">
        <article><Music2/><div><b>Culture</b><p>{place.culture}</p></div></article>
        <article><Utensils/><div><b>Food</b><p>{place.food.join(' · ')}</p></div></article>
        <article><Shirt/><div><b>Dress & adornment</b><p>{place.dress}</p></div></article>
        <article><History/><div><b>History & meaning</b><p>{place.history}</p></div></article>
      </div>
      <Link to="/trip" className="primary-btn">Add to itinerary <ArrowRight size={17}/></Link><button className="secondary-btn" onClick={()=>toggleFavorite(place.id)}><Heart size={16} fill={saved?'currentColor':'none'}/> {saved?'Saved':'Save destination'}</button>
    </div>
  </section></>
}
