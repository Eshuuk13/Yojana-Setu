import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Clear information',
    description:
      'Present schemes in plain language so visitors can quickly understand the basics.',
  },
  {
    title: 'Helpful guidance',
    description:
      'Offer a simple path toward checking eligibility and deciding what to explore next.',
  },
  {
    title: 'Easy access',
    description:
      'Keep the experience lightweight and approachable for first-time users.',
  },
]

function About() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">About Us</p>
        <h2>Connecting You to the Right Government Schemes</h2>
        <p>
          This section introduces the purpose of the platform and gives visitors
          a quick sense of what they can expect from Yojana Setu.
        </p>
      </div>

      <div className="feature-grid">
        {highlights.map((item) => (
          <article className="feature-card" key={item.title}>
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
