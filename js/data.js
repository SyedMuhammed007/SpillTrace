/* SpillTrace — centralized dummy data (frontend prototype only) */
window.DATA = {
  user: { name: 'TrueVox', role: 'Investigator', email: 'investigator@SpillTrace.ai', initials: 'TV' },

  investigations: {
    'INV-2026-001': {
      id: 'INV-2026-001',
      title: 'Gulf of Mexico Oil Spill Investigation',
      short: 'Gulf of Mexico',
      region: 'Gulf of Mexico',
      coords: '26.184° N, -91.245° W',
      status: 'completed',
      created: '26 Aug 2026',
      updated: '26 Aug 2026',
      spill: {
        area: 18.6, confidence: 0.92,
        scene: 'S1A_IW_GRDH_1SDV', acquired: '2026-08-26 08:12 UTC',
        crs: 'EPSG:4326', resolution: '10 m', channels: 'VV / VH',
        model: 'OilSegNet', modelVersion: '1.4.2',
        centroid: '26.184° N, -91.245° W', perimeter: '27.4 km',
        thickness: 'Moderate sheen / emulsion mix', firstObserved: '2026-08-26 08:12 UTC'
      },
      drift: {
        direction: 'backward', duration: '12 h', particles: 500, timestep: '1 h',
        model: 'OpenOil', version: '1.14.10', quality: 'Acceptable',
        boundaryExit: '0%', corridor: '21.36 km²',
        forcing: {
          wind: 'ERA5 Reanalysis — 10 m U/V', windRes: '0.25° / 1 h',
          current: 'HYCOM Global — 0–50 m depth', currentRes: '0.08° / 3 h',
          spatial: '24.5°–28.0° N, -94.0°–-88.5° W',
          temporal: '2026-08-25 20:00 → 2026-08-26 08:00 UTC',
          buffer: '350 m', crs: 'EPSG:32615'
        }
      },
      candidates: {
        count: 12, topDistance: '2.4 km',
        list: [
          { rank: 1, name: 'Vessel A', mmsi: '123456789', imo: '9876543', type: 'Oil / Chemical Tanker', flag: 'Panama', distance: '2.4 km', overlap: '52 min', ais: 'High', status: 'Qualified', entry: '10:42 UTC', exit: '11:34 UTC', score: 0.81 },
          { rank: 2, name: 'Vessel B', mmsi: '987654321', imo: '9123456', type: 'Crude Oil Tanker', flag: 'Liberia', distance: '4.8 km', overlap: '30 min', ais: 'Medium', status: 'Marginal', entry: '09:58 UTC', exit: '10:41 UTC', score: 0.63 },
          { rank: 3, name: 'Vessel C', mmsi: '564738291', imo: '9345678', type: 'Product Tanker', flag: 'Marshall Is.', distance: '7.1 km', overlap: '18 min', ais: 'High', status: 'Qualified', entry: '08:22 UTC', exit: '09:05 UTC', score: 0.57 },
          { rank: 4, name: 'Vessel D', mmsi: '477391025', imo: '9456789', type: 'Bulk Carrier', flag: 'Hong Kong', distance: '9.3 km', overlap: '12 min', ais: 'Low', status: 'Marginal', entry: '07:44 UTC', exit: '08:12 UTC', score: 0.41 },
          { rank: 5, name: 'Vessel E', mmsi: '636019284', imo: '9567890', type: 'General Cargo', flag: 'Singapore', distance: '11.8 km', overlap: '6 min', ais: 'Low', status: 'Excluded', entry: '06:51 UTC', exit: '07:20 UTC', score: 0.24 },
          { rank: 6, name: 'Vessel F', mmsi: '219034775', imo: '9678901', type: 'Supply Vessel', flag: 'Denmark', distance: '14.2 km', overlap: '—', ais: 'None', status: 'Excluded', entry: '—', exit: '—', score: 0.11 }
        ]
      },
      attribution: {
        top: 'Vessel A', score: 0.81, confidence: 0.76,
        components: [
          { key: 'spatial', label: 'Spatial Compatibility', value: 0.91, note: 'Normalized proximity of the vessel track to the reconstructed source corridor. 1.0 = track passes through corridor centroid.' },
          { key: 'temporal', label: 'Temporal Compatibility', value: 0.82, note: 'Overlap between the vessel presence window and the back-calculated release interval.' },
          { key: 'drift', label: 'Drift Consistency', value: 0.88, note: 'Agreement between simulated backward drift origin and the vessel position at candidate release time.' },
          { key: 'ais', label: 'AIS Coverage', value: 1.00, note: 'Completeness of positional reports across the analysis window. Gaps reduce confidence.' },
          { key: 'route', label: 'Route Continuity', value: 0.74, note: 'Absence of unexplained gaps, AIS silence or route anomalies near the corridor.' }
        ],
        compare: {
          'Vessel A': [0.91, 0.82, 0.88, 1.00, 0.74],
          'Vessel B': [0.58, 0.61, 0.52, 0.66, 0.70],
          'Vessel C': [0.49, 0.44, 0.57, 0.92, 0.61]
        },
        reasons: [
          '2.4 km minimum distance to source corridor',
          '52 min temporal overlap with release window',
          'High AIS coverage across the analysis window',
          'Track intersects reconstructed source corridor',
          'Strong drift consistency with backward simulation'
        ]
      },
      health: [
        { label: 'Data Integrity', value: '100%' },
        { label: 'Model Traceability', value: '100%' },
        { label: 'AIS Coverage', value: 'High' },
        { label: 'Environmental Coverage', value: 'Acceptable' }
      ]
    },
    'INV-2026-002': {
      id: 'INV-2026-002', title: 'North Atlantic Case 002', short: 'North Atlantic',
      region: 'North Atlantic', coords: '44.210° N, -40.118° W', status: 'running',
      created: '26 Aug 2026', updated: '26 Aug 2026',
      spill: { area: null, confidence: null, scene: 'S1B_IW_GRDH_1SDH', acquired: '2026-08-26 11:47 UTC', crs: 'EPSG:4326', resolution: '10 m', channels: 'VV / VH', model: 'OilSegNet', modelVersion: '1.4.2' },
      drift: { duration: '—', particles: 500, timestep: '1 h', model: 'OpenOil', version: '1.14.10', quality: 'Pending' },
      candidates: { count: 0, topDistance: '—', list: [] },
      attribution: { top: '—', score: null, confidence: null, components: [], reasons: [] },
      health: [
        { label: 'Data Integrity', value: '100%' },
        { label: 'Model Traceability', value: '100%' },
        { label: 'AIS Coverage', value: 'Streaming' },
        { label: 'Environmental Coverage', value: 'Pending' }
      ]
    },
    'INV-2026-003': {
      id: 'INV-2026-003', title: 'Arabian Sea Case 003', short: 'Arabian Sea',
      region: 'Arabian Sea', coords: '16.442° N, 63.905° E', status: 'archived',
      created: '24 Aug 2026', updated: '24 Aug 2026',
      spill: { area: 4.8, confidence: 0.71, scene: 'S1A_IW_GRDH_1SDV', acquired: '2026-08-23 05:58 UTC', crs: 'EPSG:4326', resolution: '10 m', channels: 'VV / VH', model: 'OilSegNet', modelVersion: '1.4.2' },
      drift: { duration: '8 h', particles: 500, timestep: '1 h', model: 'OpenOil', version: '1.14.10', quality: 'Low' },
      candidates: { count: 0, topDistance: '—', list: [] },
      attribution: { top: '—', score: null, confidence: null, components: [], reasons: [], verdict: 'Inconclusive' },
      health: [
        { label: 'Data Integrity', value: '100%' },
        { label: 'Model Traceability', value: '100%' },
        { label: 'AIS Coverage', value: 'Low' },
        { label: 'Environmental Coverage', value: 'Partial' }
      ]
    },
    'INV-2026-004': {
      id: 'INV-2026-004', title: 'Bay of Bengal Screening 004', short: 'Bay of Bengal',
      region: 'Bay of Bengal', coords: '15.021° N, 88.310° E', status: 'running',
      created: '25 Aug 2026', updated: '26 Aug 2026',
      spill: { area: null, confidence: null, scene: 'S1A_IW_GRDH_1SDV', acquired: '2026-08-26 00:31 UTC', crs: 'EPSG:4326', resolution: '10 m', channels: 'VV / VH', model: 'OilSegNet', modelVersion: '1.4.2' },
      drift: { duration: '—', particles: 500, timestep: '1 h', model: 'OpenOil', version: '1.14.10', quality: 'Pending' },
      candidates: { count: 0, topDistance: '—', list: [] },
      attribution: { top: '—', score: null, confidence: null, components: [], reasons: [] },
      health: []
    }
  },

  metrics: { active: 8, processing: 2, completed: 5, attention: 1 },

  snapshot: [
    { label: 'Active regions', value: '3' },
    { label: 'High-priority cases', value: '1' },
    { label: 'Avg. AIS coverage', value: '94.6%' }
  ],

  pipeline: [
    { id: 'M1', name: 'Identity & Investigation', status: 'complete', note: 'Case context sealed' },
    { id: 'M2', name: 'Dataset Registry', status: 'complete', note: '2 scenes registered' },
    { id: 'M3', name: 'SAR Artifact Extraction', status: 'complete', note: 'Radiometric QC passed' },
    { id: 'M4', name: 'Spill Detection', status: 'complete', note: '92% confidence' },
    { id: 'M5', name: 'Spill Characterization', status: 'complete', note: '18.6 km² polygon' },
    { id: 'M6', name: 'Forcing Acquisition', status: 'complete', note: 'ERA5 + HYCOM' },
    { id: 'M7', name: 'Forcing Set Assembly', status: 'complete', note: '12 h window' },
    { id: 'M8', name: 'Backward Drift', status: 'complete', note: '500 particles' },
    { id: 'M9', name: 'Candidate Filtering', status: 'complete', note: '12 qualified' },
    { id: 'M10', name: 'Attribution', status: 'complete', note: 'Top score 0.81' },
    { id: 'M11', name: 'GIS Dashboard', status: 'active', note: 'Live layer stack' },
    { id: 'M12', name: 'Reports & Audit', status: 'ready', note: 'Pack v1.0 built' }
  ],

  timeline: [
    { t: '08:12', label: 'SAR scene acquired', layer: 'sar' },
    { t: '09:41', label: 'Spill detected', layer: 'spill' },
    { t: '09:56', label: 'Spill characterized', layer: 'spill' },
    { t: '10:18', label: 'Drift analysis completed', layer: 'drift' },
    { t: '10:42', label: 'Candidate filtering completed', layer: 'tracks' },
    { t: '11:06', label: 'Attribution completed', layer: 'approach' },
    { t: '11:24', label: 'Evidence pack generated', layer: 'approach' }
  ],

  activity: [
    { t: '10:42 UTC', d: 'AIS trajectory correlation completed', live: true },
    { t: '10:18 UTC', d: 'Backward drift run completed', live: false },
    { t: '09:56 UTC', d: 'Spill event characterized', live: false },
    { t: '09:41 UTC', d: 'SAR spill detection completed', live: false },
    { t: '08:12 UTC', d: 'Sentinel-1 scene ingested', live: false }
  ],

  notifications: [
    { t: 'Attribution finalized for INV-2026-001', s: 'Vessel A holds the top evidence score of 0.81 — 11:06 UTC' },
    { t: 'New SAR scene available', s: 'S1B_IW_GRDH_1SDH queued for North Atlantic Case 002 — 11:47 UTC' },
    { t: 'AIS coverage restored', s: 'Gap of 14 min closed for Vessel C track — 09:12 UTC' }
  ],

  evidenceChain: [
    { mid: 'M2', name: 'Dataset', entityId: 'ent-7f3a91c2-4b1e-4d2a-9c61-0a5e8d2b7f14', module: 'dataset-registry', version: '2.3.0', timestamp: '2026-08-26 08:14:02 UTC', dataset: 'S1A_IW_GRDH_1SDV_20260826T081211', checksum: 'sha256:9c21d8f0…44ab', uri: 's3://SpillTrace/raw/2026-001/scene-01.tif', model: '—' },
    { mid: 'M3', name: 'SAR Artifact', entityId: 'ent-2c84e6a1-90fd-47b3-b1d2-5e1c9a3077d2', module: 'sar-preprocess', version: '1.9.4', timestamp: '2026-08-26 08:39:47 UTC', dataset: 'scene-01.calibrated.vv', checksum: 'sha256:41b0aa77…e913', uri: 's3://SpillTrace/artifacts/2026-001/sar-vv.tif', model: '—' },
    { mid: 'M4', name: 'Detection Result', entityId: 'ent-b5190d3e-6a47-42ce-8f05-77d3c19e2b60', module: 'detection', version: '1.4.2', timestamp: '2026-08-26 09:41:19 UTC', dataset: 'sar-vv.tilebatch.512', checksum: 'sha256:c7d21f5b…02aa', uri: 's3://SpillTrace/artifacts/2026-001/mask.geojson', model: 'OilSegNet 1.4.2' },
    { mid: 'M5', name: 'Spill Event', entityId: 'ent-90e1c47d-3f28-4b9a-a6e3-1d8f52c6a9b7', module: 'characterization', version: '1.2.0', timestamp: '2026-08-26 09:56:03 UTC', dataset: 'mask.geojson.refined', checksum: 'sha256:18ef90c3…77d1', uri: 's3://SpillTrace/events/2026-001/spill.geojson', model: '—' },
    { mid: 'M7', name: 'Forcing Set', entityId: 'ent-5d72b08a-c9e4-43f1-9b26-e40a8c15d3f8', module: 'forcing-assembly', version: '3.0.1', timestamp: '2026-08-26 10:04:41 UTC', dataset: 'era5+hycom.window.12h', checksum: 'sha256:63aa12d9…c40e', uri: 's3://SpillTrace/forcing/2026-001/window.nc', model: '—' },
    { mid: 'M8', name: 'Drift Run', entityId: 'ent-e3a6f512-78bd-4c0e-b9d7-2f6410ab8ce5', module: 'drift-backward', version: '1.14.10', timestamp: '2026-08-26 10:18:26 UTC', dataset: 'window.nc + spill.geojson', checksum: 'sha256:d09c47e1…5b3f', uri: 's3://SpillTrace/drift/2026-001/run-001.nc', model: 'OpenOil 1.14.10' },
    { mid: 'M9', name: 'Candidate Vessel Set', entityId: 'ent-1f9c2d60-a5e3-48d7-92b8-c3d7e6f01a24', module: 'candidate-filter', version: '2.1.5', timestamp: '2026-08-26 10:42:55 UTC', dataset: 'ais.window.12h + corridor.geojson', checksum: 'sha256:7e54b2ca…91d6', uri: 's3://SpillTrace/candidates/2026-001/set.geojson', model: '—' },
    { mid: 'M10', name: 'Attribution Result', entityId: 'ent-a8d40e97-21cf-46b5-8e39-94f0b7c25d18', module: 'attribution', version: '1.6.0', timestamp: '2026-08-26 11:06:12 UTC', dataset: 'set.geojson + run-001.nc', checksum: 'sha256:f2c88a13…30e7', uri: 's3://SpillTrace/attribution/2026-001/ranking.json', model: '—' }
  ],

  report: {
    title: 'Final Evidence Pack', generated: '26 Aug 2026', version: '1.0',
    jsonSize: '4.2 MB', pdfPages: 24, hash: 'sha256:3f91c0ab…b7e2',
    stages: ['Preparing…', 'Collecting evidence…', 'Building canonical JSON…', 'Generating PDF…', 'Validating hashes…', 'Completed ✓']
  },

  landingFlow: [
    { id: 'dataset', label: 'Dataset', k: 'Input', v: 'Sentinel-1 GRD scene, radiometrically calibrated and geocoded.' },
    { id: 'artifact', label: 'SAR Artifact', k: 'M3', v: 'Calibrated VV/VH backscatter tiles with QC metadata.' },
    { id: 'detection', label: 'Detection', k: 'M4', v: 'Segmentation mask produced by OilSegNet 1.4.2 at 92% confidence.' },
    { id: 'event', label: 'Spill Event', k: 'M5', v: 'Canonical spill polygon — area, perimeter, centroid, morphology.' },
    { id: 'forcing', label: 'Forcing Set', k: 'M7', v: 'ERA5 wind + HYCOM current window assembled for the analysis period.' },
    { id: 'drift', label: 'Drift Run', k: 'M8', v: 'OpenOil backward simulation, 500 particles over 12 hours.' },
    { id: 'candidates', label: 'Candidate Set', k: 'M9', v: 'AIS tracks filtered by spatial and temporal compatibility.' },
    { id: 'attribution', label: 'Attribution', k: 'M10', v: 'Evidence-weighted ranking with confidence intervals.' },
    { id: 'pack', label: 'Evidence Pack', k: 'M12', v: 'Canonical JSON + PDF with checksums for every artifact.' }
  ]
};

/* helpers shared across pages */
window.CTX = {
  get id() { try { return localStorage.getItem('ot.ctx') || 'INV-2026-001'; } catch (e) { return 'INV-2026-001'; } },
  set id(v) { try { localStorage.setItem('ot.ctx', v); } catch (e) {} },
  inv() { return DATA.investigations[this.id] || DATA.investigations['INV-2026-001']; }
};
