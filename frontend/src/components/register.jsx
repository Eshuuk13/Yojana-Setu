import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const initialFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function Register() {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })

      setSuccessMessage(response.data?.message || 'Registration successful.')
      setFormData(initialFormData)
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Unable to register right now. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section login-section">
      <div className="login-shell">
        <article className="login-intro">
          <p className="eyebrow">Create account</p>
          <h1>Register to save your eligibility journey.</h1>
          <p className="hero-text">
            Create an account to keep your details in one place and come back to
            the schemes that matter to you.
          </p>
          <div className="signal-row">
            <article className="signal-chip">
              <span>Profile</span>
              <strong>Store your search details</strong>
            </article>
            <article className="signal-chip">
              <span>Follow-up</span>
              <strong>Revisit matched schemes later</strong>
            </article>
          </div>
        </article>

        <article className="login-card">
          <div className="form-intro">
            <p className="card-kicker">New here?</p>
            <h3>Basic registration</h3>
            <p>Create your account with the details below.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field" htmlFor="fullName">
              Full name
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field" htmlFor="email">
              Email address
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field" htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field" htmlFor="confirmPassword">
              Confirm password
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            {errorMessage ? <p className="form-message form-message-error">{errorMessage}</p> : null}
            {successMessage ? (
              <p className="form-message form-message-success">{successMessage}</p>
            ) : null}

            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="login-footer">
            Already have an account?{' '}
            <Link className="text-link" to="/login">
              Log in
            </Link>
          </p>
        </article>
      </div>
    </section>
  )
}

export default Register
