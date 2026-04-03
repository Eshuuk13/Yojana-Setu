import { Link } from 'react-router-dom'

function Contact() {
  return (
    <section className="section contact-section">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Let people know how to reach you</h2>
        <p>
          Use this area as a simple contact block until you add a real backend
          form or support workflow.
        </p>
      </div>

      <div className="contact-card">
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
    </section>
  )
}

export default Contact
