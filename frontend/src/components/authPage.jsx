import { useState } from 'react'
import Login from './login'
import Register from './register'

function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('register')

  return (
    <section className="section auth-section">
      <div className="auth-switcher" role="tablist" aria-label="Authentication mode">
        <button
          className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
          type="button"
          onClick={() => setMode('register')}
        >
          Register
        </button>
        <button
          className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
          type="button"
          onClick={() => setMode('login')}
        >
          Log in
        </button>
      </div>

      {mode === 'register' ? (
        <Register showSwitchLink={false} onRegistered={() => setMode('login')} />
      ) : (
        <Login showSwitchLink={false} onLoginSuccess={onLoginSuccess} />
      )}
    </section>
  )
}

export default AuthPage
