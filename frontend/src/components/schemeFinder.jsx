import { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

const initialForm = {
  age: '',
  income: '',
  category: '',
  gender: '',
  state: '',
}

const categories = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Women']
const genders = ['Male', 'Female', 'Other']

const states = [
  'Andhra Pradesh',
  'Bihar',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Madhya Pradesh',
  'Maharashtra',
  'Rajasthan',
  'Tamil Nadu',
  'Uttar Pradesh',
  'West Bengal',
]

function SchemeFinder() {
  const [form, setForm] = useState(initialForm)
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setInfoMessage('')
    setUsedFallback(false)
    setHasSearched(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/schemes/recommend`, form)

      setRecommendations(response.data.recommendations || [])
      setUsedFallback(Boolean(response.data.usedFallback))
      setInfoMessage(response.data.message || '')
    } catch (error) {
      setRecommendations([])
      setErrorMessage(
        error.response?.data?.message || 'We could not analyze your profile right now.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleReset() {
    setForm(initialForm)
    setRecommendations([])
    setErrorMessage('')
    setInfoMessage('')
    setUsedFallback(false)
    setHasSearched(false)
  }

  return (
    <section className="section scheme-section">
      <div className="section-heading">
        <p className="eyebrow">Scheme Finder</p>
        <h2>Find schemes that fit your profile</h2>
        <p>Use your age, income, gender, state, and category to get smarter scheme suggestions.</p>
      </div>

      <div className="scheme-layout">
        <form className="scheme-form" onSubmit={handleSubmit}>
          <div className="form-intro">
            <p className="card-kicker">Finder input</p>
            <h3>Tell us about your profile</h3>
            <p>We use your details to request AI-supported recommendations from the latest stored scheme data.</p>
          </div>

          <label className="field">
            <span>Age</span>
            <input
              min="0"
              name="age"
              onChange={handleChange}
              placeholder="Enter age"
              type="number"
              value={form.age}
            />
          </label>

          <label className="field">
            <span>Annual Family Income</span>
            <input
              min="0"
              name="income"
              onChange={handleChange}
              placeholder="Enter annual family income"
              type="number"
              value={form.income}
            />
          </label>

          <label className="field">
            <span>Category</span>
            <select name="category" onChange={handleChange} value={form.category}>
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Gender</span>
            <select name="gender" onChange={handleChange} value={form.gender}>
              <option value="">Select gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>State</span>
            <select name="state" onChange={handleChange} value={form.state}>
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <div className="form-actions">
            <button className="button button-primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing your profile...' : 'Find schemes'}
            </button>
            <button className="button button-secondary" onClick={handleReset} type="button">
              Reset
            </button>
          </div>
        </form>

        <div className="scheme-results">
          <div className="results-header">
            <p className="card-kicker">Recommendations</p>
            <h3>Suggested schemes</h3>
            <p>
              {isLoading
                ? 'Analyzing your profile...'
                : hasSearched
                  ? `${recommendations.length} scheme${recommendations.length === 1 ? '' : 's'} found`
                  : 'Submit your details to view recommendations'}
            </p>
          </div>

          <p className="scheme-note">
            Deadlines and details may change. Please verify on official website before applying.
          </p>

          {errorMessage ? <p className="form-message form-message-error">{errorMessage}</p> : null}
          {infoMessage ? (
            <p className={usedFallback ? 'form-message form-message-warning' : 'form-message form-message-success'}>
              {infoMessage}
            </p>
          ) : null}

          {isLoading ? (
            <div className="scheme-card prompt-state">
              <h3>Analyzing your profile...</h3>
              <p>We are reviewing the latest stored scheme data and building your recommendations.</p>
            </div>
          ) : hasSearched ? (
            recommendations.length > 0 ? (
              <div className="results-grid">
                {recommendations.map((scheme) => (
                  <article className="scheme-card" key={`${scheme.name}-${scheme.applyLink}`}>
                    <h3>{scheme.name}</h3>
                    <p>{scheme.description}</p>
                    <p className="scheme-benefit">
                      <strong>Why this fits you:</strong> {scheme.eligibilityReason}
                    </p>
                    <div className="scheme-meta">
                      <span className="scheme-chip">Deadline: {scheme.deadline || 'Check official site'}</span>
                    </div>
                    {Array.isArray(scheme.steps) && scheme.steps.length > 0 ? (
                      <div className="scheme-steps">
                        <p className="card-kicker">Steps to apply</p>
                        <ol className="scheme-steps-list">
                          {scheme.steps.map((step) => (
                            <li key={`${scheme.name}-${step}`}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                    <a
                      className="button button-primary scheme-apply-button"
                      href={scheme.applyLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Apply Now
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="scheme-card empty-state">
                <h3>No schemes matched</h3>
                <p>Try adjusting your details to widen the recommendation range.</p>
              </div>
            )
          ) : (
            <div className="scheme-card prompt-state">
              <h3>Ready to analyze</h3>
              <p>
                Add your details and click <strong>Find schemes</strong> to get AI-supported
                recommendations with reasons, deadlines, and official application links.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SchemeFinder
