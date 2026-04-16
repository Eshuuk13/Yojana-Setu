import { Link } from 'react-router-dom'

const quickSignals = [
  { label: 'Filters', value: '5-point match' },
  { label: 'Decision time', value: 'Under 2 min' },
  { label: 'Focus', value: 'Schemes that fit you' },
]

const discoveryCards = [
  {
    title: 'Profile-led discovery',
    description: 'Start with your details and let the finder narrow the field in one clean flow.',
  },
  {
    title: 'Readable scheme cards',
    description: 'See benefits and eligibility cues without digging through dense government text.',
  },
  {
    title: 'State-aware guidance',
    description: 'Highlight schemes that differ by geography, income band, and category.',
  },
]

function Home() {
  return (
    <section className="section hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Eligibility-first discovery</p>
        <h1>Find the right government schemes through a smarter, cleaner experience.</h1>
        <p className="hero-text">
          Yojana Setu helps people discover welfare schemes using the details
          that actually matter: age, state, category, annual family income, and
          occupation. The goal is to replace confusion with a fast, guided path.
        </p>
        <div className="signal-row">
          {quickSignals.map((item) => (
            <article className="signal-chip" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="button button-primary" to="/scheme-finder">
            Find schemes for me
          </Link>
          <Link className="button button-secondary" to="/about">
            Learn more
          </Link>
        </div>
      </div>

      <div className="hero-panel">
        <article className="hero-card hero-card-featured">
          <p className="card-kicker">Today's focus</p>
          <h2>What this website is built to do</h2>
          <p>
            Help citizens move from “I heard about a scheme” to “these are the
            schemes I should actually check.”
          </p>
          <div className="hero-stat">
            <strong>One profile</strong>
            <span>Multiple possible matches surfaced instantly</span>
          </div>
        </article>

        <div className="hero-mini-grid">
          {discoveryCards.map((item) => (
            <article className="hero-card hero-card-mini" key={item.title}>
              <p className="card-kicker">Why it matters</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className="section-actions">
          <Link className="button button-secondary" to="/scheme-finder">
            Open scheme finder
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
