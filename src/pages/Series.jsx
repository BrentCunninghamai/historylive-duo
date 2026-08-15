import React from 'react'

const SERIES = [
  {
    title: 'We Report From Every Pyramid Mystery',
    episodes: [
      'Ep1: Construction Theories (Ramps, Spirals, Pulleys)',
      'Ep2: ScanPyramids Muon Tomography & Big Void',
      'Ep3: North Face Corridor & Future Openings',
      'Ep4: AI Predicting Construction Timelines',
      'Ep5: Sphinx & Lost Chambers',
      'Ep6: The Missing Casing Stones & How They Were Removed',
      'Ep7: Boat Pits & the Solar Boat of Khufu',
      'Ep8: Thermal Anomalies & Hidden Doors',
      'Ep9: Workers Village & Daily Life of the Builders',
      'Ep10: Future Robots & Full Interior Mapping 2030s'
    ]
  },
  {
    title: 'Battles We Walked Through',
    episodes: ['Waterloo 1815', 'Cannae 216 BC', 'D-Day 1944', 'Gettysburg 1863', 'Hastings 1066']
  },
  {
    title: 'From Rome to the Moon',
    episodes: ['Roman Forum', 'Colosseum Games', 'Apollo 11', 'Future Lunar Base']
  }
]

export default function Series() {
  return (
    <div className="series">
      <h2>Batch Series Generator</h2>
      <p style={{color:'#a0a0c0', marginBottom:24}}>
        One-click create entire YouTube series. Duo mode auto-applies to every episode.
      </p>
      {SERIES.map(s => (
        <div key={s.title} className="series-card" style={{background:'#1a1a2e', padding:20, borderRadius:12, marginBottom:16, border:'1px solid #0f3460'}}>
          <h3 style={{color:'#e94560'}}>{s.title}</h3>
          <ul style={{margin:'12px 0', paddingLeft:20, color:'#a0a0c0'}}>
            {s.episodes.map(e => <li key={e}>{e}</li>)}
          </ul>
          <button 
            className="btn" 
            onClick={() => alert(`In production this queues all ${s.episodes.length} episodes for generation with duo subjects + dual VO + auto thumbnails/SEO.`)}
          >
            Generate Full Series ({s.episodes.length} episodes)
          </button>
        </div>
      ))}
    </div>
  )
}
