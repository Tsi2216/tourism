import TopBar from '../components/TopBar'
import { foods } from '../data'

export default function Food(){
  return <>
    <TopBar title="Traditional Food" back/>
    <section className="content-page">
      <p className="eyebrow dark">TASTE OROMIA</p>
      <h1 className="page-title">Flavors worth travelling for</h1>
      <p className="food-intro">Real Oromo food imagery and documented dishes from Visit Oromia and Wikimedia Commons.</p>
      <div className="food-large-grid">
        {foods.map(f=><article key={f.id}>
          <img src={f.image} alt={f.imageAlt || f.name}/>
          <div>
            <h3>{f.name}</h3>
            <p>{f.type}</p>
            {f.sourcePage && <a className="food-source" href={f.sourcePage} target="_blank" rel="noreferrer">View source ↗</a>}
          </div>
        </article>)}
      </div>
    </section>
  </>
}
