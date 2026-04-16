import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Clear information layers',
    description:
      'Present schemes in plain language so visitors can understand the basics before reading fine details.',
  },
  {
    title: 'Eligibility-first guidance',
    description:
      'Let people start from their profile instead of forcing them to manually compare every scheme.',
  },
  {
    title: 'Modern access',
    description:
      'Make the experience feel fast, welcoming, and usable even for first-time visitors.',
  },
]

function About() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">About Yojana Setu</p>
        <h2>Designed to make scheme discovery feel simple, current, and human.</h2>
        <p>
          Yojana Setu is built around one idea: people should not need to decode
          complex documents just to understand what support may apply to them.
        </p>
      </div>

      <div className="feature-grid feature-grid-wide">
        {highlights.map((item) => (
          <article className="feature-card" key={item.title}>
            <p className="card-kicker">Platform principle</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="section-actions">
        <Link className="button button-primary" to="/contact">
          Contact us
        </Link>
      </div>
    </section>
  )
}

export default About
