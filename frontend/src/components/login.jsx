import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

function Login({ onLoginSuccess, showSwitchLink = true }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
    setIsSubmitting(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData)
      onLoginSuccess(response.data.user)
      navigate('/', { replace: true })
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Unable to log in right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section login-section">
      <div className="login-shell">
        <article className="login-intro">
          <p className="eyebrow">Account access</p>
          <h1>Log in to continue your scheme search.</h1>
          <p className="hero-text">
            Sign in to save your profile details, revisit shortlisted schemes,
            and continue from where you left off.
          </p>
          <div className="signal-row">
            <article className="signal-chip">
              <span>Access</span>
              <strong>Saved profile data</strong>
            </article>
            <article className="signal-chip">
              <span>Benefit</span>
              <strong>Faster future searches</strong>
            </article>
          </div>
        </article>

        <article className="login-card">
          <div className="form-intro">
            <p className="card-kicker">Welcome back</p>
            <h3>Basic login</h3>
            <p>Use your email and password to access your Yojana Setu account.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <div className="login-meta">
              <label className="checkbox-field" htmlFor="remember">
                <input id="remember" type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <Link className="text-link" to="/contact">
                Forgot password?
              </Link>
            </div>

            {errorMessage ? <p className="form-message form-message-error">{errorMessage}</p> : null}

            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          {showSwitchLink ? (
            <p className="login-footer">
              Need an account?{' '}
              <Link className="text-link" to="/auth">
                Create one
              </Link>
            </p>
          ) : null}
        </article>
      </div>
    </section>
  )
}

export default Login
