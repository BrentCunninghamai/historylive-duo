import React, { useState } from 'react'
import { runFullDuoPipeline } from '../api/backendStubs'

export default function Generator({ duoMode, subjects, scenes }) {
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState([])
  const [outputs, setOutputs] = useState(null)
  const [usePeriod, setUsePeriod] = useState(false)

  const addLog = (msg) => setLogs(prev => [...prev, { t: new Date().toLocaleTimeString(), msg }])

  const runPipeline = async () => {
    if (!duoMode && !subjects.brent) {
      alert('Enable Duo Mode or upload at least one subject')
      return
    }
    if (!scenes || scenes.length === 0) {
      alert('Go to Scenes library and select at least one scene first')
      return
    }

    setStatus('running')
    setProgress(5)
    setLogs([])
    setOutputs(null)
    addLog('Starting HistoryLive Duo pipeline...')

    try {
      const steps = [
        { p: 15, msg: 'Extracting subjects (Brent + Lisa cutouts)...' },
        { p: 30, msg: 'Generating historical backgrounds...' },
        { p: 50, msg: 'Compositing duo into scenes (face lock + lighting match)...' },
        { p: 70, msg: 'Animating walking / gesturing / duo interaction...' },
        { p: 85, msg: 'Generating dual voice-over...' },
        { p: 95, msg: 'Stitching multi-scene documentary + YouTube export...' }
      ]

      for (const step of steps) {
        setProgress(step.p)
        addLog(step.msg)
        await new Promise(r => setTimeout(r, 900))
      }

      const result = await runFullDuoPipeline({
        brentFiles: subjects.brent?.files || [],
        lisaFiles: subjects.lisa?.files || [],
        sceneIds: scenes,
        usePeriod
      })

      setProgress(100)
      addLog('Pipeline complete! Videos ready.')
      setOutputs(result)
      setStatus('done')
    } catch (err) {
      addLog('Error: ' + err.message)
      setStatus('error')
    }
  }

  return (
    <div className="generator">
      <h2>Generate Duo Content</h2>
      
      <div className="config" style={{background:'#1a1a2e', padding:'1.5rem', borderRadius:12, marginBottom:'1.5rem'}}>
        <p><strong>Duo Mode:</strong> {duoMode ? '✅ ON' : 'OFF'}</p>
        <p><strong>Subjects:</strong> Brent {subjects.brent ? '✅' : '—'} | Lisa {subjects.lisa ? '✅' : '—'}</p>
        <p><strong>Scenes selected:</strong> {scenes?.length ? scenes.join(', ') : 'None (go to Scenes library)'}</p>
        
        <label style={{display:'block', marginTop:12}}>
          <input type="checkbox" checked={usePeriod} onChange={e => setUsePeriod(e.target.checked)} />
          {' '}Apply Period Costumes (Egyptian / Roman / WWII / Astronaut based on scene)
        </label>
        <label style={{display:'block', marginTop:8}}>
          <input type="checkbox" defaultChecked /> Dual Voice-over Conversation
        </label>
        <label style={{display:'block', marginTop:8}}>
          <input type="checkbox" /> Use real voice clones (when samples uploaded)
        </label>
      </div>

      <button 
        className="btn primary large" 
        onClick={runPipeline} 
        disabled={status === 'running'}
        style={{fontSize:'1.1rem', padding:'1rem 2rem'}}
      >
        {status === 'running' ? '⏳ Generating...' : '▶ Run Full Duo Pipeline'}
      </button>

      {status !== 'idle' && (
        <div style={{marginTop:20}}>
          <div className="progress" style={{background:'#0f3460', borderRadius:8, overflow:'hidden', height:10}}>
            <div className="bar" style={{width: progress + '%', height:10, background:'#00d4ff', transition:'width 0.4s'}} />
          </div>
          <p style={{marginTop:8, color:'#a0a0c0'}}>{progress}% — {status === 'done' ? 'Complete' : status}</p>
          
          <div style={{background:'#0a0a12', padding:12, borderRadius:8, marginTop:12, maxHeight:180, overflowY:'auto', fontFamily:'monospace', fontSize:13}}>
            {logs.map((l,i) => (
              <div key={i} style={{color:'#00d4ff'}}>[{l.t}] {l.msg}</div>
            ))}
          </div>
        </div>
      )}

      {outputs && (
        <div style={{marginTop:24, background:'#1a1a2e', padding:20, borderRadius:12}}>
          <h3 style={{color:'#e94560'}}>✅ Ready for YouTube</h3>
          <p>Clips generated: {outputs.clips?.length || 0}</p>
          <ul style={{margin:'12px 0', paddingLeft:20, color:'#a0a0c0'}}>
            {outputs.clips?.map((c,i) => (
              <li key={i}>{c.scene} → {c.video}</li>
            ))}
          </ul>
          <p><strong>Final Documentary:</strong> {outputs.final?.final_url || 'Stitched & ready'} ({outputs.final?.duration || '?'}s)</p>
          <p style={{marginTop:12, fontSize:14, color:'#00ff88'}}>
            In production this would download the MP4 + auto-create YouTube title, description, tags & thumbnail.
          </p>
          <div style={{marginTop:16}}>
            <button className="btn" onClick={() => alert('In live version this downloads the MP4 and opens YouTube Studio')}>
              Download + Open YouTube Studio
            </button>
          </div>
        </div>
      )}

      <div style={{marginTop:40, padding:16, background:'#16213e', borderRadius:8, fontSize:14, color:'#a0a0c0'}}>
        <strong>Demo Mode Active:</strong> Pipeline runs fully with the real backend stubs. 
        All previous videos we generated are ready in the artifacts folder.
      </div>
    </div>
  )
}
