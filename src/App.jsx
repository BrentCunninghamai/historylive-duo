import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DuoCapture from './pages/DuoCapture'
import SceneLibrary from './pages/SceneLibrary'
import Generator from './pages/Generator'
import Series from './pages/Series'
import './App.css'

function App() {
  const [duoMode, setDuoMode] = useState(true)
  const [subjects, setSubjects] = useState({ brent: null, lisa: null })
  const [selectedScenes, setSelectedScenes] = useState([])

  return (
    <Router>
      <div className="app dark">
        <header className="header">
          <div className="logo">
            <span className="logo-icon">📺</span>
            <h1>HistoryLive <span className="duo-badge">DUO</span></h1>
          </div>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/capture">Capture</Link>
            <Link to="/library">Scenes</Link>
            <Link to="/generate">Generate</Link>
            <Link to="/series">Series</Link>
          </nav>
          <div className="mode-toggle">
            <label style={{cursor:'pointer', color:'#00d4ff'}}>
              <input 
                type="checkbox" 
                checked={duoMode} 
                onChange={e => setDuoMode(e.target.checked)} 
                style={{marginRight:6}}
              />
              Duo Mode (Brent + Lisa)
            </label>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard duoMode={duoMode} subjects={subjects} />} />
            <Route path="/capture" element={<DuoCapture subjects={subjects} setSubjects={setSubjects} />} />
            <Route path="/library" element={<SceneLibrary selected={selectedScenes} setSelected={setSelectedScenes} />} />
            <Route path="/generate" element={
              <Generator duoMode={duoMode} subjects={subjects} scenes={selectedScenes} />
            } />
            <Route path="/series" element={<Series />} />
          </Routes>
        </main>
        <footer>
          HistoryLive Duo • AI Pipeline: Extract → Composite → Animate → Voice → Export • Built for YouTube creators
        </footer>
      </div>
    </Router>
  )
}

export default App
