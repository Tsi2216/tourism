import { ArrowRight, ChevronRight, Coffee, Compass, Heart, MapPin, Mountain, Play, Sparkles, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import DestinationCard from '../components/DestinationCard'
import { SearchBox } from '../components/TopBar'
import { culturalSystems, destinations } from '../data'

const heroSlides = [
  { image: '/images/culture/arsi.jpg', title: 'Arsi Oromo', alt: 'Arsi Oromo women in traditional cultural clothing', credit: 'User supplied photograph' },
  { image: '/images/culture/jimma.jpg', title: 'Jimma Oromo', alt: 'Jimma Oromo women in traditional cultural clothing', credit: 'User supplied photograph' },
  { image: '/images/culture/borana.jpg', title: 'Borana Oromo', alt: 'Borana Oromo women in traditional cultural clothing', credit: 'User supplied photograph from screen recording' },
  { image: '/images/culture/bale.jpg', title: 'Bale Oromo', alt: 'Oromo women in traditional Bale cultural clothing', credit: 'User supplied photograph from screen recording' },
  { image: '/images/culture/shawa.jpg', title: 'Shawa Oromo', alt: 'Shawa Oromo women in traditional cultural clothing', credit: 'User supplied photograph from screen recording' },
  { image: '/images/culture/karayu.jpg', title: 'Karayu Oromo', alt: 'Karayu Oromo traditional cultural scene', credit: 'User supplied photograph from screen recording' },
  { image: '/images/culture/wollega.jpg', title: 'Wollega Oromo', alt: 'Wollega Oromo people in traditional cultural clothing', credit: 'User supplied photograph from screen recording' },
  { image: '/images/culture/walo-oromo.jpg', title: 'Walo Oromo', alt: 'Walo Oromo women in traditional cultural clothing', credit: 'User supplied photograph from screen recording' },
  { image: '/images/culture/guji.jpg', title: 'Guji Oromo', alt: 'Guji Oromo cultural ceremony', credit: 'User supplied photograph from screen recording' },
  { image: '/images/culture/raya.jpg', title: 'Raya Oromo', alt: 'Raya Oromo people in traditional cultural clothing', credit: 'User supplied photograph' },
  { image: '/images/culture/kamisse.jpg', title: 'Kamisse Oromo', alt: 'Oromo women in traditional Kamisse cultural clothing', credit: 'User supplied photograph from screen recording' },
]

const heroVideo = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Traditional_Ethiopian_Coffee_Roasting_Ceremony.webm',
  title: 'Borana Oromo coffee ceremony',
  credit: 'Keria T · Wikimedia Commons · CC BY-SA 4.0'
}

const heritageSteps = [
  { number: 1, id: 'oda', eyebrow: 'Odaa', title: 'The Odaa Tree', text: 'The sacred odaa marks a place of assembly — a living space where law, memory and community meet.', image: 'https://images.squarespace-cdn.com/content/v1/63048825027c7c4f568683cd/1661252030443-J35CSBHTN8H2T01RC78N/Screen%2BShot%2B2022-08-23%2Bat%2B8.35.58%2Bpm.png', accent: 'Governance · Heritage' },
  { number: 2, id: 'siinqee', eyebrow: 'Siinqee', title: 'Women & Peace', text: 'Siinqee is associated with women’s social authority, solidarity and peace-making in documented Oromo traditions.', image: 'https://images.squarespace-cdn.com/content/v1/63048825027c7c4f568683cd/1661385925749-5N4X6G7KI98O3IICZSFL/Screen%2BShot%2B2022-08-25%2Bat%2B10.04.53%2Bam.png', accent: 'Women · Peace' },
  { number: 3, id: 'waaqeffannaa', eyebrow: 'Waaqeffannaa', title: 'A Living Worldview', text: 'An indigenous Oromo worldview centered on Waaqa and relationships among people, nature and creation.', image: 'https://images.squarespace-cdn.com/content/v1/63048825027c7c4f568683cd/1661252080247-FCGCQA4A1OLE9K05D8NY/Screen%2BShot%2B2022-08-23%2Bat%2B8.53.30%2Bpm.png', accent: 'Worldview · Spiritual life' },
  { number: 4, id: 'safuu', eyebrow: 'Safuu', title: 'A Way of Living', text: 'Safuu describes a framework of proper conduct, responsibility and respectful relationships across community life.', image: 'https://images.squarespace-cdn.com/content/v1/63048825027c7c4f568683cd/1661252655931-TKW0GOP1S5J35MQQMQRF/Screen%2BShot%2B2022-08-23%2Bat%2B6.40.46%2Bpm.png', accent: 'Ethics · Social values' }
]

export default function Home() {
  const [heritageIndex, setHeritageIndex] = useState(0)
  const [heroIndex, setHeroIndex] = useState(0)
  const [showHeroVideo, setShowHeroVideo] = useState(true)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const heritage = heritageSteps[heritageIndex]
  const hero = heroSlides[heroIndex]

  useEffect(() => {
    if (showHeroVideo) return undefined
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length)
    }, 1900)
    return () => {
      window.clearInterval(timer)
    }
  }, [showHeroVideo])
  const submitSearch = () => {
    const q = query.trim()
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
  }

  return <div className="home-page">
    <header className="home-nav">
      <Logo />
      <nav>
        <a href="#destinations">EXPEDITIONS</a>
        <a href="#heritage">HERITAGE</a>
        <Link to="/map">MAP</Link>
        <a href="#heritage">GADAA</a>
        <a href="#wollega">WOLLEGA</a>
        <a href="#journey">JOURNEY</a>
      </nav>
      <Link to="/trip" className="nav-journey">PLAN A JOURNEY <ArrowRight size={15} /></Link>
    </header>

    <section className="hero-home hero-home-new">
      <div className="hero-slideshow" aria-label="Oromia visual story">
        <video
          className={`hero-video ${showHeroVideo ? 'is-visible' : ''}`}
          autoPlay
          muted
          loop={false}
          preload="auto"
          playsInline
          poster="/images/bale-mountains.jpg"
          onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 1 }}
          onError={() => { setHeroIndex(0); setShowHeroVideo(false) }}
          onEnded={() => { setHeroIndex(0); setShowHeroVideo(false) }}
        >
          <source src={heroVideo.src} type="video/webm" />
        </video>
        {heroSlides.map((slide, index) => (
          <img
            key={slide.image}
            className={`hero-slide ${index === heroIndex && !showHeroVideo ? 'is-active' : ''}`}
            src={slide.image}
            alt={slide.alt}
            aria-hidden={index !== heroIndex || showHeroVideo}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-head"><Logo light /><button className="language">EN <span>⌄</span></button></div>
      <div className="hero-side-note"><span>09° N</span><i></i><span>39° E</span></div>
      <div className="hero-copy">
        <p className="eyebrow">THE HEART OF EAST AFRICA</p>
        <h1>Oromia,<br /><em>alive with stories.</em></h1>
        <p>Walk through highlands, forests and lakes — then meet the living traditions that give each place its meaning.</p>
        <div className="hero-actions">
          <a href="#destinations" className="primary-btn light-btn">Begin the journey <ArrowRight size={17} /></a>
          <Link to="/map" className="hero-play"><span><Play size={14} fill="currentColor" /></span> Explore the map</Link>
        </div>
      </div>
      <div className="hero-scene-label"><span>{showHeroVideo ? heroVideo.title : hero.title}</span><small>{showHeroVideo ? 'REAL OROMO CEREMONY · REAL VIDEO' : 'REAL PLACE · REAL CULTURE'}</small></div><div className="hero-credit">{showHeroVideo ? `Video: ${heroVideo.credit}` : `Photo: ${hero.credit}`}</div>
      <div className="hero-dots" aria-label="Hero image selection">
        {heroSlides.map((slide, index) => (
          <button key={slide.image} className={index === heroIndex ? 'active' : ''} onClick={() => setHeroIndex(index)} aria-label={`Show story image ${index + 1}`} />
        ))}
      </div>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><i></i></div>
      <div className="hero-stamp"><span>OROMIA</span><small>LAND · PEOPLE · MEMORY</small></div>
      <div className="pattern-strip" />
    </section>

    <section className="home-intro">
      <div className="intro-kicker"><span>01</span><i></i><span>ARRIVE CURIOUS</span></div>
      <div className="intro-grid">
        <h2>A region is more<br /><em>than a destination.</em></h2>
        <div>
          <p>Oromia is a meeting place of landscapes, languages, foodways, craft, music and generations of knowledge.</p>
          <div className="intro-signature"><span>Explore with respect</span><span>•</span><span>Learn from place</span></div>
        </div>
      </div>
      <SearchBox value={query} onChange={setQuery} onSubmit={submitSearch} placeholder="Search a place, story or experience..." />
      <div className="quick-links">
        <Link to="/explore?category=nature"><span><Mountain /></span><small>Nature</small></Link>
        <Link to="/culture"><span><Sparkles /></span><small>Heritage</small></Link>
        <Link to="/food"><span><Utensils /></span><small>Foodways</small></Link>
        <Link to="/explore?category=adventure"><span><Compass /></span><small>Adventure</small></Link>
        <Link to="/culture"><span><Coffee /></span><small>Festivals</small></Link>
      </div>
    </section>

    <section className="editorial-destinations" id="destinations">
      <div className="editorial-section-head">
        <div><span className="section-index">02</span><p className="eyebrow dark">EXPEDITIONS</p><h2>Places worth taking<br /><em>the long way to.</em></h2></div>
        <Link to="/explore" className="circle-link" aria-label="Explore all destinations"><ArrowRight /></Link>
      </div>
      <div className="destination-feature-grid">
        {destinations.slice(0, 3).map((p, index) => <Link key={p.id} to={`/destination/${p.id}`} className={`feature-place feature-place-${index + 1}`}>
          <img src={p.image} alt={p.name} loading="lazy" />
          <div className="feature-shade" />
          <div className="feature-number">0{index + 1}</div>
          <div className="feature-copy"><span>{p.category} · {p.region}</span><h3>{p.name}</h3><small>{p.highlights.slice(0, 3).join('  ·  ')}</small></div>
        </Link>)}
      </div>
    </section>

    <section className="wollega-home-section" id="wollega">
      <div className="wollega-home-photo">
        <img src="/images/local/wollega-hand-symbol.jpg" alt="Wollega hand symbol" loading="lazy" />
        <span>Wollega · Western Oromia</span>
      </div>
      <div className="wollega-home-copy">
        <span className="section-index">03</span>
        <p className="eyebrow dark">DISCOVER WOLLEGA</p>
        <h2>Western Oromia,<br /><em>green and full of stories.</em></h2>
        <p>Wollega is a broad western Oromia cultural area associated with Maccaa Oromo communities, coffee farming, forests, local foods and distinctive music and dress. Nekemte is one of its major urban centres.</p>
        <div className="wollega-facts"><span>Coffee</span><span>Anchote</span><span>Geerarsa</span><span>Forests</span></div>
        <Link to="/destination/wollega" className="outline-btn">Explore Wollega <ArrowRight size={15} /></Link>
      </div>
    </section>

    <section className="heritage-orbit-section" id="heritage">
      <div className="heritage-heading">
        <div className="section-index">04</div>
        <p className="eyebrow dark">OUR HERITAGE</p>
        <h2>Culture, stories<br />and <em>traditions.</em></h2>
        <p className="heritage-lead">A visual atlas of living knowledge. Move around the circle to discover a different thread of Oromo heritage.</p>
      </div>

      <div className="heritage-orbit-layout">
        <div className="orbit-stage">
          <div className="orbit-ring ring-outer"></div>
          <div className="orbit-ring ring-inner"></div>
          <div className="orbit-core"><span>Oromia</span><strong>Gadaa</strong><small>living system</small></div><div className="orbit-tree-note">Odaa · Chaffee</div>
          {heritageSteps.map((item, index) => {
            const positions = ['orbit-top', 'orbit-right', 'orbit-bottom', 'orbit-left']
            return <button key={item.id} className={`orbit-node ${positions[index]} ${index === heritageIndex ? 'selected' : ''}`} onClick={() => setHeritageIndex(index)} aria-label={`Show ${item.title}`}>
              <span>{item.number}</span>
            </button>
          })}
          <div className="orbit-label orbit-label-top">LAW</div>
          <div className="orbit-label orbit-label-right">PEACE</div>
          <div className="orbit-label orbit-label-bottom">WORLDVIEW</div>
          <div className="orbit-label orbit-label-left">VALUES</div>
        </div>

        <article className="heritage-feature-card">
          <div className="heritage-photo"><img src={heritage.image} alt={heritage.title} /><span className="photo-caption">Oromia · living heritage</span></div>
          <div className="heritage-feature-copy">
            <span className="heritage-category">{heritage.eyebrow} <i></i> {heritage.accent}</span>
            <h3>{heritage.title}</h3>
            <p>{heritage.text}</p>
            <div className="heritage-meta"><span>0{heritage.number}</span><div><i></i><i></i><i></i><i></i></div><b>SELECT A STORY</b></div>
          </div>
        </article>
      </div>
    </section>

    <section className="map-promo map-promo-new" id="journey">
      <div className="map-promo-copy">
        <span className="section-index">05</span>
        <p className="eyebrow">THE LIVING MAP</p>
        <h2>Every place has<br /><em>a story behind it.</em></h2>
        <p>Find destinations, cultural places and landscapes across Oromia. Open a place to see its location, local context and available media.</p>
        <Link to="/map" className="outline-btn">Open the map <MapPin size={15} /></Link>
      </div>
      <div className="mini-map"><span className="map-line l1"/><span className="map-line l2"/><i className="pin p1"/><i className="pin p2"/><i className="pin p3"/><b>Bale</b><b>Langano</b><b>Sof Omar</b><div className="map-compass">N</div></div>
    </section>

    <section className="home-quote">
      <div className="quote-line"></div>
      <p>“A journey through Oromia is a journey through living memory.”</p>
      <span>LAND · PEOPLE · HERITAGE</span>
    </section>

    <footer className="home-footer">
      <Logo />
      <span>Discover Oromia with curiosity, respect and wonder.</span>
      <Link to="/trip">Plan a journey <ChevronRight size={15} /></Link>
    </footer>
  </div>
}
