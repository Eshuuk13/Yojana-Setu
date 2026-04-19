import { Link } from 'react-router-dom'
import heroSideImage from '../assets/modi.png'
import heroImage from '../assets/housing.png'
import heroImage2 from '../assets/bulls.png'
import heroImage3 from '../assets/women.png'
import heroImage4 from '../assets/students.png'
import { Users, IndianRupee, FileText, MapPin } from "lucide-react";

const quickSignals = [
  { label: 'Eligibility Match', value: 'Smart Filtering' },
  { label: 'Processing Time', value: 'Under 2 minutes' },
  { label: 'Coverage', value: 'Central + State Schemes' },
]

const stats = [
  {
    label: "Beneficiaries Reached",
    value: "12M+",
    icon: <Users size={28} />,
  },
  {
    label: "Funds Distributed",
    value: "₹2.5L Cr",
    icon: <IndianRupee size={28} />,
  },
  {
    label: "Schemes Covered",
    value: "500+",
    icon: <FileText size={28} />,
  },
  {
    label: "States Covered",
    value: "28+",
    icon: <MapPin size={28} />,
  },
];

const featureCards = [
  {
    kicker: 'Why it works',
    title: 'Profile-based discovery',
    description: 'Get schemes matched to your age, income, occupation, and category in minutes.',
  },
  {
    kicker: 'Clarity first',
    title: 'Plain-language guidance',
    description: 'Understand benefits, eligibility, and next steps without decoding complex documents.',
  },
  {
    kicker: 'Coverage',
    title: 'Central + state support',
    description: 'Browse opportunities across multiple schemes through one cleaner entry point.',
  },
]

const tickerImages = [
  { src: heroImage, alt: 'Government housing support' },
  { src: heroImage2, alt: 'Farmer support scheme' },
  { src: heroImage3, alt: 'Women support scheme' },
  { src: heroImage4, alt: 'Student scholarship support' },
]

function Home() {
  return (
    <>
      <div className="ticker" aria-label="Featured schemes">
        <div className="ticker-track">
          {tickerImages.concat(tickerImages).map((item, index) => (
            <div className="ticker-item ticker-image-item" key={`${item.alt}-${index}`}>
              <img className="ticker-image" src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>

      <section className="section hero-section">
        <div className="hero-intro-shell">
          <div className="hero-copy">
            <p className="eyebrow">Government schemes made simple</p>
            <h1>Find the right support faster, with less confusion and more clarity.</h1>
            <p className="hero-text">
              Yojana Setu helps people discover relevant welfare schemes through one simpler,
              modern experience built around their profile.
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
                Find Schemes for Me
              </Link>
              <Link className="button button-secondary" to="/about">
                How it Works
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <img className="hero-visual-image" src={heroSideImage} alt="" />
          </div>
        </div>

        <div className="hero-stats-grid">
          {stats.map((item) => (
            <article className="hero-stat-card" key={item.label}>
              <span className="hero-stat-icon" aria-hidden="true">
                {item.icon}
              </span>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="hero-feature-strip">
          {featureCards.map((item) => (
            <article className="hero-feature-card" key={item.title}>
              <p className="card-kicker">{item.kicker}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
