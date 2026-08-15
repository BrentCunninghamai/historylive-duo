import React, { useState } from 'react'

export default function DuoCapture({ subjects, setSubjects }) {
  const [brentFiles, setBrentFiles] = useState([])
  const [lisaFiles, setLisaFiles] = useState([])
  const [status, setStatus] = useState('')

  const handleBrent = (e) => {
    const files = Array.from(e.target.files)
    setBrentFiles(files)
    setSubjects(prev => ({ ...prev, brent: { files, status: 'ready', name: 'Brent' } }))
    setStatus(`Brent: ${files.length} photo(s) loaded`)
  }

  const handleLisa = (e) => {
    const files = Array.from(e.target.files)
    setLisaFiles(files)
    setSubjects(prev => ({ ...prev, lisa: { files, status: 'ready', name: 'Lisa' } }))
    setStatus(`Lisa: ${files.length} photo(s) loaded`)
  }

  const useDemoSubjects = () => {
    setSubjects({
      brent: { files: [], status: 'ready', name: 'Brent (demo cutout already extracted)', demo: true },
      lisa: { files: [], status: 'ready', name: 'Lisa (4 photos already extracted)', demo: true }
    })
    setStatus('Demo subjects loaded – using the cutouts we already created for you and Lisa')
  }

  return (
    <div className="capture">
      <h2>1. Dual Subject Capture</h2>
      <p style={{color:'#a0a0c0', marginBottom:20}}>
        Upload multi-angle full-body photos for best consistency. Front + side + 3/4 views recommended.
        Or click “Use Demo Subjects” to skip and use the cutouts we already made from your photos.
      </p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24}}>
        <div style={{background:'#1a1a2e', padding:20, borderRadius:12, border:'2px dashed #0f3460'}}>
          <h3 style={{color:'#e94560'}}>Brent (You)</h3>
          <input type="file" accept="image/*" multiple onChange={handleBrent} style={{margin:'12px 0'}} />
          <p style={{fontSize:14, color:'#a0a0c0'}}>{brentFiles.length} photo(s) selected</p>
          {subjects.brent && <p style={{color:'#00ff88', fontSize:13}}>✅ Ready</p>}
        </div>
        <div style={{background:'#1a1a2e', padding:20, borderRadius:12, border:'2px dashed #0f3460'}}>
          <h3 style={{color:'#e94560'}}>Lisa (Wife)</h3>
          <input type="file" accept="image/*" multiple onChange={handleLisa} style={{margin:'12px 0'}} />
          <p style={{fontSize:14, color:'#a0a0c0'}}>{lisaFiles.length} photo(s) selected</p>
          {subjects.lisa && <p style={{color:'#00ff88', fontSize:13}}>✅ Ready</p>}
        </div>
      </div>

      <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
        <button className="btn primary" onClick={useDemoSubjects}>
          ⚡ Use Demo Subjects (already extracted)
        </button>
        <button className="btn secondary" onClick={() => alert('In production this would call the extract API for both subjects')}>
          Extract Cutouts Now
        </button>
      </div>

      {status && <p style={{marginTop:16, color:'#00d4ff'}}>{status}</p>}
    </div>
  )
}
