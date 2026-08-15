/**
 * HistoryLive Duo API Layer
 * Works with the FastAPI stubs. In production replace with real Imagine / FFmpeg / Voice calls.
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`API ${res.status}: ${text || res.statusText}`)
    }
    return res.json()
  } catch (err) {
    console.warn('API call failed, using demo fallback:', err.message)
    return null
  }
}

export async function extractSubjects(files = [], person = 'brent') {
  if (files.length === 0) {
    return { asset_id: `demo-${person}-${Date.now()}`, status: 'extracted', person, demo: true }
  }
  const form = new FormData()
  files.forEach(f => form.append('images', f))
  form.append('person', person)
  const data = await safeFetch(`${API_BASE}/api/extract`, { method: 'POST', body: form })
  return data || { asset_id: `demo-${person}-${Date.now()}`, status: 'extracted', person, demo: true }
}

export async function generateBackground(sceneId, extra = '') {
  const data = await safeFetch(`${API_BASE}/api/generate-bg?scene_id=${encodeURIComponent(sceneId)}&extra_prompt=${encodeURIComponent(extra)}`, {
    method: 'POST'
  })
  return data || { asset_id: `bg-${sceneId}-${Date.now()}`, image_url: null, demo: true }
}

export async function compositeDuo(bgId, brentId, lisaId, prompt) {
  const data = await safeFetch(`${API_BASE}/api/composite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bg: bgId, brent: brentId, lisa: lisaId, prompt })
  })
  return data || { asset_id: `comp-${Date.now()}`, image_url: null, demo: true }
}

export async function animateScene(assetId, prompt, duration = 10) {
  const data = await safeFetch(`${API_BASE}/api/animate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ asset_id: assetId, prompt, duration })
  })
  return data || { asset_id: `vid-${Date.now()}`, video_url: null, demo: true }
}

export async function generateDualVoice(turns, voices = { brent: 'orion', lisa: 'ara' }) {
  const data = await safeFetch(`${API_BASE}/api/voice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ turns, voices })
  })
  return data || { audio_url: null, duration: 12, demo: true }
}

export async function stitchDocumentary(videoIds, fade = 1.5) {
  const data = await safeFetch(`${API_BASE}/api/stitch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videos: videoIds, fade })
  })
  return data || { final_url: null, duration: videoIds.length * 10, youtube_ready: true, demo: true }
}

export async function applyPeriodCostume(assetId, era) {
  const data = await safeFetch(`${API_BASE}/api/period-costume?asset_id=${assetId}&era=${era}`, {
    method: 'POST'
  })
  return data || { asset_id: `period-${era}-${Date.now()}`, demo: true }
}

export async function runFullDuoPipeline({ brentFiles, lisaFiles, sceneIds, usePeriod = false }) {
  const results = []
  const brent = await extractSubjects(brentFiles, 'brent')
  const lisa = await extractSubjects(lisaFiles, 'lisa')

  let brentId = brent.asset_id
  let lisaId = lisa.asset_id

  if (usePeriod && sceneIds[0]) {
    const era = sceneIds[0].includes('pyramid') ? 'egyptian' :
                sceneIds[0].includes('forum') || sceneIds[0].includes('colosseum') ? 'roman' :
                sceneIds[0].includes('dday') || sceneIds[0].includes('waterloo') ? 'wwii' : 'astronaut'
    brentId = (await applyPeriodCostume(brentId, era)).asset_id
    lisaId = (await applyPeriodCostume(lisaId, era)).asset_id
  }

  for (const scene of sceneIds) {
    const bg = await generateBackground(scene)
    const comp = await compositeDuo(bg.asset_id, brentId, lisaId, `Brent and Lisa co-reporters live from ${scene}`)
    const anim = await animateScene(comp.asset_id, 'duo walking gesturing speaking to camera', 10)
    results.push({ scene, video: anim.asset_id, status: 'ready' })
  }

  const final = await stitchDocumentary(results.map(r => r.video))
  return { clips: results, final, brent, lisa }
}
