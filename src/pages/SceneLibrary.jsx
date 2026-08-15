import React from 'react'

const SCENES = [
  { id: 'pyramid', title: 'Great Pyramid Construction', era: '2560 BC', type: 'construction' },
  { id: 'pyramid-theories', title: 'Pyramid Build Theories', era: '2560 BC', type: 'detail' },
  { id: 'pyramid-tech', title: 'Modern Muon / AI Tech', era: '2020s-Future', type: 'tech' },
  { id: 'waterloo', title: 'Battle of Waterloo', era: '1815', type: 'battle' },
  { id: 'cannae', title: 'Battle of Cannae', era: '216 BC', type: 'battle' },
  { id: 'dday', title: 'D-Day Omaha Beach', era: '1944', type: 'battle' },
  { id: 'getty', title: 'Gettysburg Little Round Top', era: '1863', type: 'battle' },
  { id: 'forum', title: 'Roman Forum Peak', era: '1st-2nd C AD', type: 'daily' },
  { id: 'colosseum', title: 'Colosseum Games', era: '80 AD', type: 'daily' },
  { id: 'moon', title: 'Apollo 11 Moon Landing', era: '1969', type: 'space' },
  { id: 'viking', title: 'Viking Raid', era: '9th C', type: 'battle' },
  { id: 'moon-base', title: 'Future Moon Base', era: '2030s', type: 'future' },
  { id: 'sphinx', title: 'Sphinx & Lost Chambers', era: 'Ancient', type: 'mystery' },
  { id: 'workers-village', title: 'Pyramid Workers Village', era: '2560 BC', type: 'daily' },
  { id: 'thermal', title: 'Thermal Anomalies & Hidden Doors', era: 'Modern', type: 'tech' },
]

export default function SceneLibrary({ selected, setSelected }) {
  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const selectAllBattles = () => {
    setSelected(['waterloo', 'cannae', 'dday', 'getty'])
  }

  const selectPyramidSeries = () => {
    setSelected(['pyramid', 'pyramid-theories', 'pyramid-tech', 'sphinx', 'workers-village', 'thermal'])
  }

  return (
    <div className="library">
      <h2>Historical Scene Library</h2>
      <p style={{color:'#a0a0c0', marginBottom:16}}>
        Select one or more for multi-scene documentary. Duo mode places both of you as co-reporters.
      </p>

      <div style={{display:'flex', gap:10, marginBottom:20, flexWrap:'wrap'}}>
        <button className="btn secondary" onClick={selectAllBattles}>Select All Battles</button>
        <button className="btn secondary" onClick={selectPyramidSeries}>Select Pyramid Mysteries Series</button>
        <button className="btn secondary" onClick={() => setSelected([])}>Clear</button>
      </div>

      <div className="scene-grid">
        {SCENES.map(s => (
          <div 
            key={s.id} 
            className={`scene-card ${selected.includes(s.id) ? 'selected' : ''}`} 
            onClick={() => toggle(s.id)}
            style={{cursor:'pointer'}}
          >
            <div className="scene-thumb">{s.title[0]}</div>
            <h3>{s.title}</h3>
            <p style={{fontSize:13, color:'#a0a0c0'}}>{s.era} • {s.type}</p>
            {selected.includes(s.id) && <span style={{color:'#00ff88', fontSize:12}}>✓ Selected</span>}
          </div>
        ))}
      </div>
      <p className="selected-count" style={{marginTop:16, color:'#00d4ff'}}>
        {selected.length} scene(s) selected — go to Generate when ready
      </p>
    </div>
  )
}
