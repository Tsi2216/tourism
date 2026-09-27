import { ArrowRight, CalendarDays, Landmark, Sparkles } from 'lucide-react'
import TopBar from '../components/TopBar'
import { culturalSystems, cultureStories, festivals, foods } from '../data'

export default function Culture() {
  return <><TopBar title="Culture & Stories" back menu /><section className="culture-page">
    <div className="culture-hero"><img src={cultureStories[2].image} alt="Oromo culture"/><div><p className="eyebrow">LIVING HERITAGE</p><h1>Oromia, beyond the landscape.</h1><p>Systems, stories, food, clothing, music, festivals and knowledge carried from generation to generation.</p></div></div>

    <div className="culture-intro"><Landmark/><div><b>Explore the culture atlas</b><p>This collection is a starting point, not an exhaustive inventory. Oromo traditions vary across communities and regions, so each story should be read in its local context.</p></div></div>

    <section className="wollega-culture-feature">
      <div className="wollega-culture-photo">
        <img src="/images/local/wollega-hand-symbol.jpg" alt="Wollega hand symbol" loading="lazy" />
      </div>
      <div className="wollega-culture-copy">
        <p className="eyebrow dark">WESTERN OROMIA</p>
        <h2>About Wollega</h2>
        <p>Wollega is a broad cultural area in western Oromia. The Wollega Oromo are part of the Maccaa Gadaa confederacy and are known for coffee-growing landscapes, traditional foods, music, clothing and community life.</p>
        <p>Nekemte is a major urban centre in the area, while the wider Wollega landscape includes forest, farmland and river systems across several administrative zones.</p>
        <div className="wollega-culture-tags"><span>Coffee</span><span>Anchote</span><span>Ukkaamso</span><span>Geerarsa</span></div>
        <a className="source-button" href="https://artsandculture.google.com/story/ggVBLnKgyQIL-A" target="_blank" rel="noreferrer">Read the Wollega cultural story <ArrowRight size={14}/></a>
      </div>
    </section>

    <div className="section-head"><div><p className="eyebrow dark">LIVING SYSTEMS</p><h2>Knowledge that shapes community</h2></div></div>
    <div className="heritage-grid">{culturalSystems.map((s)=><article key={s.id}>
      <img src={s.image} alt={s.imageAlt} loading="lazy"/>
      <div><span>{s.label}</span><h3>{s.title}</h3><p>{s.text}</p>
        <small className="source-line">{s.source} · <a href={s.sourcePage} target="_blank" rel="noreferrer">view source</a></small>
      </div>
    </article>)}</div>

    <div className="section-head culture-section-head"><div><p className="eyebrow dark">FESTIVALS & CEREMONIES</p><h2>Celebrate the living calendar</h2></div></div>
    <div className="festival-grid">{festivals.map((f)=><article key={f.id}>
      <img src={f.image} alt={f.imageAlt} loading="lazy"/>
      <div><span><CalendarDays size={13}/> {f.season}</span><h3>{f.title}</h3><small className="festival-location">{f.place}</small><p>{f.text}</p>
        <a className="source-button" href={f.sourcePage} target="_blank" rel="noreferrer">View cultural source <ArrowRight size={14}/></a>
      </div>
    </article>)}</div>

    <div className="section-head culture-section-head"><div><p className="eyebrow dark">STORIES</p><h2>People, music & everyday life</h2></div></div>
    <div className="story-list">{cultureStories.map((s)=><article key={s.id}>
      <img src={s.image} alt={s.imageAlt} loading="lazy"/>
      <div><h3>{s.title}</h3><p>{s.text}</p>
        <a href={s.sourcePage} target="_blank" rel="noreferrer">Read the source story <ArrowRight size={14}/></a>
      </div>
    </article>)}</div>

    <div className="section-head culture-section-head"><div><p className="eyebrow dark">FOODWAYS</p><h2>Taste Oromia</h2></div><Sparkles size={18}/></div>
    <div className="food-grid">{foods.map((f)=><article key={f.id}>
      <img src={f.image} alt={f.imageAlt} loading="lazy"/>
      <b>{f.name}</b><small>{f.type}</small><small className="food-location">{f.place}</small>
      <a className="food-source" href={f.sourcePage} target="_blank" rel="noreferrer">Source</a>
    </article>)}</div>
  </section></>
}
