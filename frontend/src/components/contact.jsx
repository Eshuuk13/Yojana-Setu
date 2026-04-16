import { Link } from 'react-router-dom'

function Contact() {
  return (
    <section className="section contact-section">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Support, feedback, and partnership conversations start here.</h2>
        <p>
          This section can later connect to a real support workflow, but for now
          it provides a clean, direct way for people to reach the team.
        </p>
      </div>

      <div className="contact-layout">
        <article className="contact-card contact-card-highlight">
          <p className="card-kicker">Reach the team</p>
          <h3>We can turn this into a full support desk later.</h3>
          <p>
            For now, these contact points give your visitors a trustworthy and
            polished next step.
          </p>
        </article>

        <div className="contact-card contact-card-details">
          <p>
            <strong>Email:</strong> support@yojanasetu.in
          </p>
          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p>
            <strong>Location:</strong> India
          </p>
          <a className="button button-primary" href="mailto:support@yojanasetu.in">
            Contact us
          </a>
          <Link className="button button-secondary" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact
