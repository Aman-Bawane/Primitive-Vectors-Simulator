import { useMemo, useState } from "react";
import Header from "./components/Header";
import LatticeView from "./components/LatticeView";
import ControlPanel from "./components/ControlPanel";
import VectorControls from "./components/VectorControls";
import MetricsPanel from "./components/MetricsPanel";
import { latticeTypes } from "./components/LatticeTypes";
import "./styles.css";

const initialVectors = {
  a: [1, 0, 0],
  b: [0, 1, 0],
  c: [0, 0, 1],
};

function App() {
  const [mode, setMode] = useState("2D");
  const [latticeType, setLatticeType] = useState("Square");
  const [vectors, setVectors] = useState(initialVectors);
  const [generated, setGenerated] = useState(true);

  const [n, setN] = useState({
    n1: 1,
    n2: 1,
    n3: 1,
  });

  // ==========================================
  // CURRENT LATTICE CONFIGURATION
  // ==========================================

  const config = latticeTypes[latticeType];

  // ==========================================
  // 2D CELL AREA
  // ==========================================

  const currentArea = Math.abs(
    vectors.a[0] * vectors.b[1] -
    vectors.a[1] * vectors.b[0]
  );

  // ==========================================
  // PRIMITIVE CELL VALIDATION
  // ==========================================

  const isCenteredRectangular =
    latticeType === "Centered Rectangular";

  const primitiveArea = isCenteredRectangular
    ? currentArea / 2
    : currentArea;

  const primitiveValidation = {
    currentArea,
    primitiveArea,

    valid: !isCenteredRectangular,

    status: isCenteredRectangular
      ? "NON-PRIMITIVE"
      : "PRIMITIVE",
  };

  // ==========================================
  // SELECT LATTICE
  // ==========================================

  const selectLattice = (name) => {
    setLatticeType(name);

    const selected = latticeTypes[name];

    setVectors({
      a: [...selected.a],
      b: [...selected.b],
      c: [...selected.c],
    });

    setGenerated(true);
  };

  // ==========================================
  // UPDATE VECTOR
  // ==========================================

  const updateVector = (vector, axis, value) => {
    setVectors((prev) => ({
      ...prev,

      [vector]: prev[vector].map((v, i) =>
        i === axis ? Number(value) : v
      ),
    }));

    setGenerated(false);
  };

  // ==========================================
  // RESET
  // ==========================================

  const reset = () => {
    const selected = latticeTypes[latticeType];

    setVectors({
      a: [...selected.a],
      b: [...selected.b],
      c: [...selected.c],
    });

    setN({
      n1: 1,
      n2: 1,
      n3: 1,
    });

    setGenerated(true);
  };

  // ==========================================
  // CHANGE 2D / 3D MODE
  // ==========================================

  const changeMode = (newMode) => {
    setMode(newMode);

    if (newMode === "2D") {
      setLatticeType("Square");

      setVectors({
        a: [1, 0, 0],
        b: [0, 1, 0],
        c: [0, 0, 1],
      });
    } else {
      setLatticeType("Simple Cubic");

      setVectors({
        a: [1, 0, 0],
        b: [0, 1, 0],
        c: [0, 0, 1],
      });
    }

    setN({
      n1: 1,
      n2: 1,
      n3: 1,
    });

    setGenerated(true);
  };

  // ==========================================
  // SCALAR POINT
  // ==========================================

  const scalarPoint = useMemo(() => {
    // 2D
    if (mode === "2D") {
      return [
        n.n1 * vectors.a[0] +
        n.n2 * vectors.b[0],

        n.n1 * vectors.a[1] +
        n.n2 * vectors.b[1],
      ];
    }

    // 3D
    return [
      n.n1 * vectors.a[0] +
      n.n2 * vectors.b[0] +
      n.n3 * vectors.c[0],

      n.n1 * vectors.a[1] +
      n.n2 * vectors.b[1] +
      n.n3 * vectors.c[1],

      n.n1 * vectors.a[2] +
      n.n2 * vectors.b[2] +
      n.n3 * vectors.c[2],
    ];
  }, [vectors, n, mode]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="app">

      {/* ======================================
          HEADER
      ====================================== */}

      <Header
        mode={mode}
        setMode={changeMode}
        onReset={reset}
      />

      <div className="workspace">

        {/* ======================================
            LEFT PANEL
        ====================================== */}

        <aside className="left-panel">

          <ControlPanel
            mode={mode}
            latticeType={latticeType}
            setLatticeType={selectLattice}
          />

        </aside>

        {/* ======================================
            MAIN SIMULATION AREA
        ====================================== */}

        <main className="simulation-area">

          <div className="simulation-header">

            <div>
              <span className="eyebrow">
                INTERACTIVE CRYSTAL LAB
              </span>

              <h1>
                {latticeType} Lattice
              </h1>
            </div>

            <div className="status-pill">
              <span className="status-dot"></span>
              LIVE SIMULATION
            </div>

          </div>

          {/* LATTICE VIEW */}

          <LatticeView
            mode={mode}
            vectors={vectors}
            generated={generated}
            latticeType={latticeType}
            scalarPoint={scalarPoint}
          />

          {/* ======================================
              FORMULA
          ====================================== */}

          <div className="bottom-bar">

            <div className="formula centered-formula">

              {mode === "2D"
                ? "R = n₁a + n₂b"
                : "R = n₁a + n₂b + n₃c"}

            </div>

          </div>

        </main>

        {/* ======================================
            RIGHT PANEL
        ====================================== */}

        <aside className="right-panel">

          {/* VECTOR CONTROLS */}

          <AgentPanel\n            mode={mode}\n            latticeType={latticeType}\n            vectors={vectors}\n            onApply={applyAgentResult}\n          />\n\n          <VectorControls
            vectors={vectors}
            updateVector={updateVector}
            mode={mode}
          />

          {/* METRICS */}

          <MetricsPanel
            vectors={vectors}
            mode={mode}
            latticeType={latticeType}
          />

          {/* ====================================
              SCALAR MULTIPLIERS
              3D ONLY
          ==================================== */}

          {mode === "3D" && (
            <div className="scalar-card">

              <div className="card-title">
                SCALAR MULTIPLIERS
              </div>

              {["n1", "n2", "n3"].map(
                (key, index) => (
                  <div
                    className="scalar-row"
                    key={key}
                  >

                    <span>
                      {
                        ["n₁", "n₂", "n₃"][
                        index
                        ]
                      }
                    </span>

                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={n[key]}
                      onChange={(e) =>
                        setN({
                          ...n,
                          [key]: Number(
                            e.target.value
                          ),
                        })
                      }
                    />

                    <strong>
                      {n[key]}
                    </strong>

                  </div>
                )
              )}

              <div className="point-result">

                <span>
                  Calculated Point
                </span>

                <code>
                  (
                  {scalarPoint
                    .map((v) =>
                      v.toFixed(2)
                    )
                    .join(", ")}
                  )
                </code>

              </div>

            </div>
          )}

          {/* ====================================
              PRIMITIVE VALIDATION
          ==================================== */}

          <div
            className={`validation-card ${isCenteredRectangular
                ? "validation-centered"
                : "validation-valid"
              }`}
          >

            <div className="card-title">
              PRIMITIVE VALIDATION
            </div>

            <div className="validation-status">

              <div className="validation-icon">
                {primitiveValidation.valid ? "✓" : "!"}
              </div>

              <div>
                <strong>
                  {primitiveValidation.status}
                </strong>

                <p>
                  {primitiveValidation.valid
                    ? "The selected vectors define the primitive cell."
                    : "The conventional cell contains an additional lattice point at the center."}
                </p>
              </div>

            </div>

            {/* AREA INFORMATION ONLY FOR 2D */}

            {mode === "2D" && (
              <div className="validation-math">

                <div>

                  <span>
                    CELL AREA
                  </span>

                  <strong>
                    {primitiveValidation.currentArea.toFixed(
                      3
                    )}
                  </strong>

                </div>

                <div>

                  <span>
                    PRIMITIVE AREA
                  </span>

                  <strong>
                    {primitiveValidation.primitiveArea.toFixed(
                      3
                    )}
                  </strong>

                </div>

              </div>
            )}

          </div>

        </aside>

      </div>
    </div>
  );
}

export default App;