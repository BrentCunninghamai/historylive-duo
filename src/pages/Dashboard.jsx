import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard({ duoMode, subjects }) {
  return (
    <div className="dashboard">
      <h2>HistoryLive Duo</h2>
      <p className="lead" style={{color:'#a0a0c0', fontSize:'1.1rem', margin:'12px 0 28px'}}>
        Put Brent + Lisa into any historical moment as co-reporters. One-click YouTube content.
      </p>
      
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:16, marginBottom:32}}>
        <div style={{background:'#1a1a2e', padding:20, borderRadius:12, textAlign:'center', border:'1px solid #0f3460'}}>
          <h3 style={{fontSize:14, color:'#a0a0c0'}}>Duo Mode</h3>
          <p style={{fontSize:22, fontWeight:700, color: duoMode ? '#00ff88' : '#e94560'}}>{duoMode ? 'ON' : 'OFF'}</p>
        </div>
        <div style={{background:'#1a1a2e', padding:20, borderRadius:12, textAlign:'center', border:'1px solid #0f3460'}}>
          <h3 style={{fontSize:14, color:'#a0a0c0'}}>Subjects</h3>
          <p style={{fontSize:18}}>
            {subjects.brent && subjects.lisa ? 'Both Ready' : subjects.brent || subjects.lisa ? 'One Ready' : 'None'}
          </p>
        </div>
        <div style={{background:'#1a1a2e', padding:20, borderRadius:12, textAlign:'center', border:'1px solid #0f3460'}}>
          <h3 style={{fontSize:14, color:'#a0a0c0'}}>Scenes Ready</h3>
          <p style={{fontSize:22, fontWeight:700}}>15+</p>
        </div>
      </div>

      <h3 style={{marginBottom:12}}>Quick Start (3 steps)</h3>
      <div style={{display:'flex', flexWrap:'wrap', gap:12, marginBottom:32}}>
        <Link to="/capture" className="btn primary">1. Capture / Use Demo Subjects</Link>
        <Link to="/library" className="btn">2. Choose Scenes</Link>
        <Link to="/generate" className="btn">3. Generate Videos</Link>
        <Link to="/series" className="btn secondary">Batch Series</Link>
      </div>

      <div style={{background:'#16213e', padding:20, borderRadius:12}}>
        <h3 style={{color:'#e94560', marginBottom:12}}>How the Pipeline Works</h3>
        <ol style={{paddingLeft:20, color:'#a0a0c0', lineHeight:1.7}}>
          <li>Subject Extraction (multi-angle for consistency)</li>
          <li>Historical / Tech Background Generation</li>
          <li>Reference Compositing (faces locked, lighting matched)</li>
          <li>Image-to-Video Animation (walking, gesturing, duo interaction)</li>
          <li>Dual Voice-over (or clone when samples provided)</li>
          <li>FFmpeg Stitch + Export (Shorts + Long-form)</li>
        </ol>
        <p style={{marginTop:16, fontSize:14, color:'#00d4ff'}}>
          All videos we already created (pyramids, battles, Moon, period costumes, longer documentary) are available and ready for your channel.
        </p>
      </div>
    </div>
  )
}
