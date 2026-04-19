import './App.css'
import { useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import goiLogo from './assets/GOI.png'
import Home from './components/home'
import About from './components/about'
import Contact from './components/contact'
import AuthPage from './components/authPage'
import Profile from './components/profile'
import SchemeFinder from './components/schemeFinder'

const AUTH_STORAGE_KEY = 'yojanaSetuUser'

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY)

    return storedUser ? JSON.parse(storedUser) : null
  })

  const handleAuthSuccess = (user) => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    setAuthenticatedUser(user)
  }

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthenticatedUser(null)
  }

  const isAuthenticated = Boolean(authenticatedUser)

  return (
    <main className="landing-page">
      <div className="page-aura page-aura-one" aria-hidden="true" />
      <div className="page-aura page-aura-two" aria-hidden="true" />
      <div className="page-grid" aria-hidden="true" />
      <header className="site-header">
        <NavLink className="brand brand-link" to="/">
          <span className="brand-mark">YS</span>
          <span className="brand-lockup">
            <span className="brand-name">Yojana Setu</span>
          </span>
        </NavLink>
        <div className="header-center" aria-hidden="true">
          <img className="header-center-logo" src={goiLogo} alt="" />
        </div>
        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink
            to="/scheme-finder"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-cta active' : 'nav-link nav-link-cta'
            }
          >
            Scheme Finder
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/auth"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Login / Register
            </NavLink>
          )}
          {isAuthenticated ? (
            <button className="nav-link nav-button" type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
              </ProtectedRoute>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scheme-finder" element={<SchemeFinder />} />
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AuthPage onLoginSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile user={authenticatedUser} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/register" element={<Navigate to="/auth" replace />} />
      </Routes>

      <footer className="site-footer">
        <p className="footer-copy">Yojana Setu keeps scheme discovery simple and accessible.</p>
        <nav className="footer-nav" aria-label="Footer navigation">
          <NavLink className="footer-link" to="/about">
            About
          </NavLink>
          <NavLink className="footer-link" to="/contact">
            Contact
          </NavLink>
        </nav>
      </footer>
    </main>
  )
}

export default App
