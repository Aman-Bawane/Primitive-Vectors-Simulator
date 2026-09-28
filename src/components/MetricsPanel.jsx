import * as THREE from "three";

function magnitude(v) {
  return Math.sqrt(
    v[0] ** 2 +
      v[1] ** 2 +
      v[2] ** 2
  );
}

function angleBetween(a, b) {
  const dot =
    a[0] * b[0] +
    a[1] * b[1] +
    a[2] * b[2];

  const ma = magnitude(a);
  const mb = magnitude(b);

  if (!ma || !mb) return 0;

  const value = Math.max(
    -1,
    Math.min(1, dot / (ma * mb))
  );

  return (Math.acos(value) * 180) / Math.PI;
}

function MetricsPanel({ vectors, mode }) {
  const a = new THREE.Vector3(...vectors.a);
  const b = new THREE.Vector3(...vectors.b);
  const c = new THREE.Vector3(...vectors.c);

  const cross = new THREE.Vector3().crossVectors(a, b);

  const area = cross.length();

  const volume = Math.abs(
    a.dot(
      new THREE.Vector3()
        .crossVectors(b, c)
    )
  );

  const alpha = angleBetween(vectors.b, vectors.c);
  const beta = angleBetween(vectors.a, vectors.c);
  const gamma = angleBetween(vectors.a, vectors.b);

  return (
    <div className="metrics-card">
      <div className="card-title">LIVE METRICS</div>

      <div className="metric-grid">
        <div>
          <span>|a|</span>
          <strong>{a.length().toFixed(3)}</strong>
        </div>

        <div>
          <span>|b|</span>
          <strong>{b.length().toFixed(3)}</strong>
        </div>

        <div>
          <span>|c|</span>
          <strong>{c.length().toFixed(3)}</strong>
        </div>
      </div>

      <div className="angle-grid">
        <div>
          <span>α</span>
          <strong>{alpha.toFixed(2)}°</strong>
        </div>

        <div>
          <span>β</span>
          <strong>{beta.toFixed(2)}°</strong>
        </div>

        <div>
          <span>γ</span>
          <strong>{gamma.toFixed(2)}°</strong>
        </div>
      </div>

      <div className="big-metric">
        <div>
          <span>UNIT CELL AREA</span>
          <strong>{area.toFixed(4)}</strong>
        </div>

        <code>|a × b|</code>
      </div>

      {mode === "3D" && (
        <div className="big-metric">
          <div>
            <span>UNIT CELL VOLUME</span>
            <strong>{volume.toFixed(4)}</strong>
          </div>

          <code>|a · (b × c)|</code>
        </div>
      )}
    </div>
  );
}

export default MetricsPanel;