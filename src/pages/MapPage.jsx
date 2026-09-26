import { useEffect, useState } from 'react'
import { ArrowRight, Compass, ExternalLink, MapPin, Navigation, Plus, Minus, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import TopBar from '../components/TopBar'
import { destinations } from '../data'
import 'leaflet/dist/leaflet.css'

const icon = new L.DivIcon({
  className: 'oromia-map-pin',
  html: '<span></span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
})

function FlyTo({ place }) {
  const map = useMap()
  useEffect(() => {
    if (place) map.flyTo(place.coords, 8, { duration: 0.8 })
  }, [map, place])
  return null
}

export default function MapPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const filtered = destinations.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.region.toLowerCase().includes(query.toLowerCase()))

  return <>
    <TopBar title="Explore Oromia Map" menu />
    <section className="map-page">
      <div className="map-intro">
        <div>
          <p className="eyebrow dark">THE OROMIA ATLAS</p>
          <h1>Every place has a story.</h1>
          <p>Tap a destination to see its landscape, culture, food, clothing, history and video guide.</p>
        </div>
        <div className="map-search"><Search size={17}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search Bale, Guji, Wenchi..." /></div>
      </div>

      <div className="live-map-shell">
        <MapContainer center={[7.7, 39.1]} zoom={7} scrollWheelZoom className="leaflet-map">
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filtered.map((place) => <Marker key={place.id} position={place.coords} icon={icon} eventHandlers={{ click: () => setSelected(place) }}><Popup><b>{place.name}</b><br/><span>{place.region}</span></Popup></Marker>)}
          <FlyTo place={selected} />
        </MapContainer>
        <div className="map-floating-label"><Compass size={16}/><span>Oromia</span><small>{filtered.length} destinations</small></div>
        <div className="map-controls-custom"><button title="Zoom in" onClick={()=>document.querySelector('.leaflet-control-zoom-in')?.click()}><Plus size={18}/></button><button title="Zoom out" onClick={()=>document.querySelector('.leaflet-control-zoom-out')?.click()}><Minus size={18}/></button><button title="Center map" onClick={()=>setSelected(null)}><Navigation size={17}/></button></div>
      </div>

      <div className="map-nearby">
        <div className="section-head"><div><p className="eyebrow dark">SELECT A PLACE</p><h2>Open its story</h2></div><span>{filtered.length} places</span></div>
        <div className="map-list">{filtered.map((p)=><button key={p.id} className={selected?.id===p.id?'map-place-row selected':'map-place-row'} onClick={()=>setSelected(p)}><img src={p.image} alt=""/><div><b>{p.name}</b><small>{p.region} · {p.category}</small></div><ArrowRight size={16}/></button>)}</div>
      </div>

      {selected && <div className="place-story-panel">
        <button className="story-close" onClick={()=>setSelected(null)} aria-label="Close"><X size={18}/></button>
        <div className="story-video">
          {selected.video ? <iframe src={selected.video} title={`${selected.name} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <div className="video-fallback"><img src={selected.image} alt=""/><div><span>VIDEO GUIDE</span><h3>{selected.name}</h3><a href={selected.videoSearch} target="_blank" rel="noreferrer">Watch area videos <ExternalLink size={15}/></a></div></div>}
        </div>
        <div className="story-body">
          <p className="eyebrow dark">PLACE STORY · {selected.region}</p>
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          <div className="story-chips">{selected.highlights.map((x)=><span key={x}>{x}</span>)}</div>
          <div className="story-sections">
            <article><b>Culture</b><p>{selected.culture}</p></article>
            <article><b>Food</b><p>{selected.food.join(' · ')}</p></article>
            <article><b>Dress & adornment</b><p>{selected.dress}</p></article>
            <article><b>History & meaning</b><p>{selected.history}</p></article>
          </div>
          <div className="story-actions"><Link className="primary-btn" to={`/destination/${selected.id}`}>Full destination <ArrowRight size={16}/></Link><button className="secondary-btn" onClick={()=>setSelected(null)}>Keep exploring</button></div>
        </div>
      </div>}
    </section>
  </>
}
