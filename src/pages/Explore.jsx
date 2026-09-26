import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import TopBar, { SearchBox } from '../components/TopBar'
import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data'

const categories = ['All', 'Nature', 'Culture', 'Adventure', 'Festivals']
export default function Explore() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return destinations.filter((p) => {
      const haystack = [p.name, p.region, p.category, p.description, ...(p.highlights || []), ...(p.experiences || [])].join(' ').toLowerCase()
      return (category === 'All' || p.category === category) && (!q || haystack.includes(q))
    })
  }, [category, query])
  return <><TopBar title="Destinations" back /><section className="content-page"><SearchBox value={query} onChange={(v)=>{setQuery(v); setParams(v ? {q:v} : {})}} /><div className="pills">{categories.map((c)=><button key={c} className={category===c?'pill active':'pill'} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="destination-grid">{filtered.map((p)=><DestinationCard key={p.id} place={p} />)}</div>{filtered.length===0&&<div className="empty"><h2>No destinations found</h2><p>Try another search or category.</p></div>}<div className="soft-banner"><div><b>Plan a trip around Oromia</b><span>Save your favorite places and build an itinerary.</span></div><ArrowRight/></div></section></>
}
