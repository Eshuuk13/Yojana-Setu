import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import Contact from './components/contact'
import SchemeFinder from './components/schemeFinder'
import Login from './components/login'
import Register from './components/register'

function App() {
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
            <span className="brand-tag">Discover public support with clarity</span>
          </span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Contact
          </NavLink>
          <NavLink
            to="/scheme-finder"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-cta active' : 'nav-link nav-link-cta'
            }
          >
            Scheme Finder
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Register
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scheme-finder" element={<SchemeFinder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  )
}

export default App
