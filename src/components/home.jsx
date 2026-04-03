import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="section hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Government scheme discovery</p>
        <h1>Find the right schemes without the confusion.</h1>
        <p className="hero-text">
          Yojana Setu is a basic starting point for a platform that helps people
          explore public welfare schemes, understand eligibility, and take the
          next step with confidence.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/contact">
            Get started
          </Link>
          <Link className="button button-secondary" to="/about">
            Learn more
          </Link>
        </div>
      </div>

      <div className="hero-card">
        <h2>What this website aims to do</h2>
        <ul>
          <li>Show important schemes in one place</li>
          <li>Explain who each scheme is for</li>
          <li>Make it easier to ask for support</li>
        </ul>
      </div>
    </section>
  )
}

export default Home
