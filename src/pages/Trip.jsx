import { useState } from 'react'
import { ArrowRight, Check, Plus, Minus, Plane, CalendarDays, Users, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { destinations } from '../data'
import { useAppStore } from '../store/appStore'

export default function Trip(){
  const [selected,setSelected]=useState([destinations[0].id,destinations[1].id])
  const [travelers,setTravelers]=useState(2)
  const [from,setFrom]=useState('Addis Ababa')
  const [dates,setDates]=useState('Oct 10 — Oct 15, 2026')
  const saveTrip=useAppStore(s=>s.saveTrip); const navigate=useNavigate()
  const toggle=(id)=>setSelected(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])
  const create=()=>{saveTrip({id:Date.now(),name:`${selected.length} day Oromia Journey`,dates,travelers,from,places:selected.map(id=>destinations.find(p=>p.id===id)?.name).filter(Boolean)});navigate('/itinerary')}
  return <><TopBar title="Plan Your Journey" back/><section className="trip-page trip-page-new">
    <div className="booking-hero"><div><p className="eyebrow dark">VACATION PLANNER</p><h1>Build your Oromia escape.</h1><p>Choose a route, set your dates and shape a journey around landscapes, heritage and local experiences.</p></div><div className="plane-mark"><Plane size={24}/><span>OROMIA AIR ROUTE</span></div></div>
    <div className="flight-search-card">
      <div className="route-row"><label><span><Plane size={14}/> From</span><input value={from} onChange={e=>setFrom(e.target.value)} /></label><div className="route-arrow"><ArrowRight/></div><label><span><MapPin size={14}/> To</span><input value="Oromia" readOnly /></label></div>
      <div className="booking-fields"><label><span><CalendarDays size={14}/> Dates</span><input value={dates} onChange={e=>setDates(e.target.value)} /></label><label><span><Users size={14}/> Travelers</span><div className="counter"><button type="button" onClick={()=>setTravelers(Math.max(1,travelers-1))}><Minus size={14}/></button><b>{travelers} {travelers===1?'Traveler':'Travelers'}</b><button type="button" onClick={()=>setTravelers(travelers+1)}><Plus size={14}/></button></div></label><label><span>Trip style</span><select><option>Culture + Nature</option><option>Heritage focused</option><option>Nature + Adventure</option><option>Relaxed getaway</option></select></label></div>
    </div>
    <div className="trip-section-head"><div><p className="eyebrow dark">01 · CHOOSE YOUR STOPS</p><h2>Where will the journey take you?</h2></div><span>{selected.length} selected</span></div>
    <div className="select-grid trip-select-grid">{destinations.slice(0,6).map(p=><button type="button" key={p.id} className={selected.includes(p.id)?'selected place-select':'place-select'} onClick={()=>toggle(p.id)}><img src={p.image} alt={p.name}/>{selected.includes(p.id)?<span><Check size={14}/></span>:<span><Plus size={14}/></span>}<b>{p.name}</b><small>{p.region}</small></button>)}</div>
    <div className="trip-bottom-card"><div><p className="eyebrow dark">02 · REVIEW</p><h2>Ready to make it yours?</h2><p>Your plan stays on this device. You can edit the route later from your itinerary.</p></div><button className="primary-btn" onClick={create}>Create my itinerary <ArrowRight size={17}/></button></div>
  </section></>
}
