import TopBar from '../components/TopBar'
import { destinations, cultureStories, foods } from '../data'

export default function Gallery() {
  const images = [
    ...destinations.map((destination) => destination.image),
    ...cultureStories.map((story) => story.image),
    ...foods.map((food) => food.image),
  ]

  return (
    <>
      <TopBar title="Gallery" back />
      <section className="content-page">
        <div className="pills">
          <button className="pill active">All</button>
          <button className="pill">Nature</button>
          <button className="pill">Culture</button>
          <button className="pill">Food</button>
          <button className="pill">People</button>
        </div>

        <div className="gallery-grid">
          {images.map((src, index) => (
            <img key={index} src={src} alt="Oromia" loading="lazy" />
          ))}
        </div>
      </section>
    </>
  )
}
