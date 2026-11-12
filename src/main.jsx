import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './motion.css'

// Decide up front whether the intro veil plays, so the hero can schedule its
// own entrance against it from the very first frame. It plays on every page
// load (including reloads), but never for visitors who prefer reduced motion.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
document.documentElement.dataset.intro = reduceMotion ? 'skip' : 'play'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
