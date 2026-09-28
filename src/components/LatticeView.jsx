import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Line,
  Text,
} from "@react-three/drei";
import * as THREE from "three";


// =========================================================
// VECTOR ARROW
// =========================================================

function VectorArrow({ vector, color, label }) {
  const start = new THREE.Vector3(0, 0, 0);
  const end = new THREE.Vector3(...vector);

  const direction = end.clone().sub(start).normalize();

  const quaternion = new THREE.Quaternion();

  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  return (
    <group>

      <Line
        points={[
          [0, 0, 0],
          vector,
        ]}
        color={color}
        lineWidth={4}
      />

      <mesh position={vector}>
        <sphereGeometry args={[0.11, 16, 16]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh
        position={[
          vector[0] - direction.x * 0.16,
          vector[1] - direction.y * 0.16,
          vector[2] - direction.z * 0.16,
        ]}
        quaternion={quaternion}
      >
        <coneGeometry
          args={[0.09, 0.24, 12]}
        />

        <meshStandardMaterial
          color={color}
        />
      </mesh>

      <Text
        position={[
          vector[0] + 0.18,
          vector[1] + 0.18,
          vector[2] + 0.05,
        ]}
        fontSize={0.22}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

    </group>
  );
}


// =========================================================
// LATTICE POINTS
// =========================================================

function LatticePoints({
  vectors,
  mode,
  latticeType,
}) {
  const points = [];

  const range = 5;

  for (let i = -range; i <= range; i++) {

    for (let j = -range; j <= range; j++) {

      if (mode === "2D") {

        const x =
          i * vectors.a[0] +
          j * vectors.b[0];

        const y =
          i * vectors.a[1] +
          j * vectors.b[1];

        points.push([
          x,
          y,
          0,
        ]);

      } else {

        for (let k = -range; k <= range; k++) {

          const x =
            i * vectors.a[0] +
            j * vectors.b[0] +
            k * vectors.c[0];

          const y =
            i * vectors.a[1] +
            j * vectors.b[1] +
            k * vectors.c[1];

          const z =
            i * vectors.a[2] +
            j * vectors.b[2] +
            k * vectors.c[2];

          points.push([
            x,
            y,
            z,
          ]);


          // =========================
          // BCC
          // =========================

          if (latticeType === "BCC") {

            points.push([
              x +
                (vectors.a[0] +
                  vectors.b[0] +
                  vectors.c[0]) / 2,

              y +
                (vectors.a[1] +
                  vectors.b[1] +
                  vectors.c[1]) / 2,

              z +
                (vectors.a[2] +
                  vectors.b[2] +
                  vectors.c[2]) / 2,
            ]);
          }


          // =========================
          // FCC
          // =========================

          if (latticeType === "FCC") {

            const offsets = [
              [0.5, 0.5, 0],
              [0.5, 0, 0.5],
              [0, 0.5, 0.5],
            ];

            offsets.forEach((offset) => {

              points.push([

                x +
                  offset[0] * vectors.a[0] +
                  offset[1] * vectors.b[0] +
                  offset[2] * vectors.c[0],

                y +
                  offset[0] * vectors.a[1] +
                  offset[1] * vectors.b[1] +
                  offset[2] * vectors.c[1],

                z +
                  offset[0] * vectors.a[2] +
                  offset[1] * vectors.b[2] +
                  offset[2] * vectors.c[2],

              ]);

            });
          }

        }
      }
    }
  }


  return (
    <group>

      {points.map((point, index) => (

        <mesh
          key={index}
          position={point}
        >

          <sphereGeometry
            args={[
              mode === "2D"
                ? 0.055
                : 0.045,

              8,
              8,
            ]}
          />

          <meshStandardMaterial
            color="#70a7ff"
            emissive="#143a75"
            emissiveIntensity={0.8}
          />

        </mesh>

      ))}

    </group>
  );
}


// =========================================================
// SCALAR POINT
// =========================================================

function ScalarPoint({ point }) {

  if (!point) return null;

  return (
    <group>

      {/* Line from origin to calculated point */}

      <Line
        points={[
          [0, 0, 0],
          point,
        ]}
        color="#ffd84d"
        lineWidth={3}
        dashed
        dashSize={0.12}
        gapSize={0.08}
      />


      {/* Highlighted calculated point */}

      <mesh position={point}>

        <sphereGeometry
          args={[0.16, 24, 24]}
        />

        <meshStandardMaterial
          color="#ffd84d"
          emissive="#ffb300"
          emissiveIntensity={1.5}
        />

      </mesh>


      {/* Outer glow ring */}

      <mesh position={point}>

        <sphereGeometry
          args={[0.23, 24, 24]}
        />

        <meshBasicMaterial
          color="#ffd84d"
          transparent
          opacity={0.12}
        />

      </mesh>


      {/* R label */}

      <Text
        position={[
          point[0] + 0.25,
          point[1] + 0.25,
          point[2] + 0.1,
        ]}
        fontSize={0.22}
        color="#ffd84d"
        anchorX="center"
        anchorY="middle"
      >
        R
      </Text>

    </group>
  );
}


// =========================================================
// UNIT CELL
// =========================================================

function UnitCell({
  vectors,
  mode,
}) {

  const { a, b, c } = vectors;


  // =========================
  // 2D UNIT CELL
  // =========================

  if (mode === "2D") {

    const p0 = [0, 0, 0];

    const p1 = a;

    const p2 = [
      a[0] + b[0],
      a[1] + b[1],
      a[2] + b[2],
    ];

    const p3 = b;


    return (
      <Line
        points={[
          p0,
          p1,
          p2,
          p3,
          p0,
        ]}
        color="#ffffff"
        lineWidth={2}
      />
    );
  }


  // =========================
  // 3D UNIT CELL
  // =========================

  const p000 = [0, 0, 0];

  const p100 = a;

  const p010 = b;

  const p001 = c;

  const p110 = [
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2],
  ];

  const p101 = [
    a[0] + c[0],
    a[1] + c[1],
    a[2] + c[2],
  ];

  const p011 = [
    b[0] + c[0],
    b[1] + c[1],
    b[2] + c[2],
  ];

  const p111 = [
    a[0] + b[0] + c[0],
    a[1] + b[1] + c[1],
    a[2] + b[2] + c[2],
  ];


  const edges = [

    [p000, p100],
    [p000, p010],
    [p000, p001],

    [p100, p110],
    [p100, p101],

    [p010, p110],
    [p010, p011],

    [p001, p101],
    [p001, p011],

    [p110, p111],
    [p101, p111],
    [p011, p111],

  ];


  return (
    <group>

      {edges.map((edge, index) => (

        <Line
          key={index}
          points={edge}
          color="#ffffff"
          lineWidth={1.5}
        />

      ))}

    </group>
  );
}


// =========================================================
// SCENE
// =========================================================

function Scene({
  mode,
  vectors,
  latticeType,
  scalarPoint,
}) {

  return (
    <>

      <ambientLight
        intensity={1.2}
      />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
      />


      {/* GRID */}

      <gridHelper
        args={[
          14,
          14,
          "#26364e",
          "#182438",
        ]}
      />


      {/* AXES */}

      <axesHelper
        args={[2]}
      />


      {/* LATTICE */}

      <LatticePoints
        vectors={vectors}
        mode={mode}
        latticeType={latticeType}
      />


      {/* UNIT CELL */}

      <UnitCell
        vectors={vectors}
        mode={mode}
      />


      {/* VECTOR A */}

      <VectorArrow
        vector={vectors.a}
        color="#ff5d73"
        label="a"
      />


      {/* VECTOR B */}

      <VectorArrow
        vector={vectors.b}
        color="#52d273"
        label="b"
      />


      {/* VECTOR C */}

      {mode === "3D" && (

        <VectorArrow
          vector={vectors.c}
          color="#5ba7ff"
          label="c"
        />

      )}


      {/* ORIGIN */}

      <mesh
        position={[0, 0, 0]}
      >

        <sphereGeometry
          args={[0.13, 20, 20]}
        />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
        />

      </mesh>


      {/* =========================
          CALCULATED SCALAR POINT
          ========================= */}

      {mode === "3D" && (
  <ScalarPoint
    point={scalarPoint}
  />
)}


      {/* CAMERA CONTROLS */}

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={20}
      />

    </>
  );
}


// =========================================================
// LATTICE VIEW
// =========================================================

function LatticeView({
  mode,
  vectors,
  latticeType,
  scalarPoint,
}) {

  return (
    <div className="canvas-container">

      <Canvas
        camera={{
          position:
            mode === "2D"
              ? [0, 0, 9]
              : [5, 5, 6],

          fov: 45,
        }}
      >

        <Scene
          mode={mode}
          vectors={vectors}
          latticeType={latticeType}
          scalarPoint={scalarPoint}
        />

      </Canvas>


      <div className="canvas-help">

        <span>
          🖱 Drag
        </span>

        <span>
          Scroll Zoom
        </span>

        <span>
          Right-click Pan
        </span>

      </div>


      <div className="origin-label">
        O · ORIGIN
      </div>

    </div>
  );
}

export default LatticeView;