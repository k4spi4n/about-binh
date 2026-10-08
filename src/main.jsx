import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './motion.css'

// Decide up front whether the intro veil plays, so the hero can schedule its
// own entrance against it from the very first frame. It plays once per browser
// session and never for visitors who prefer reduced motion.
const INTRO_KEY = 'intro-seen'
let seen = false
try {
  seen = sessionStorage.getItem(INTRO_KEY) === '1'
  sessionStorage.setItem(INTRO_KEY, '1')
} catch {
  // Storage can be unavailable (private mode); just play the intro.
}
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
document.documentElement.dataset.intro = seen || reduceMotion ? 'skip' : 'play'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
