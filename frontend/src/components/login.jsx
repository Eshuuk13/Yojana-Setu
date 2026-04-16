import { Link } from 'react-router-dom'

function Login() {
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

          <form className="login-form">
            <label className="field" htmlFor="email">
              Email address
              <input id="email" type="email" name="email" placeholder="name@example.com" />
            </label>

            <label className="field" htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
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

            <button className="button button-primary" type="submit">
              Log in
            </button>
          </form>

          <p className="login-footer">
            Need an account?{' '}
            <Link className="text-link" to="/register">
              Create one
            </Link>
          </p>
        </article>
      </div>
    </section>
  )
}

export default Login
