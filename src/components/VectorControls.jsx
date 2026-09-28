function VectorControls({
  vectors,
  updateVector,
  mode,
}) {
  const is3D = mode === "3D";

  const vectorList = is3D
    ? ["a", "b", "c"]
    : ["a", "b"];

  const vectorNames = {
    a: "Vector A",
    b: "Vector B",
    c: "Vector C",
  };

  const vectorClasses = {
    a: "vector-a",
    b: "vector-b",
    c: "vector-c",
  };

  const axes = is3D
    ? ["X", "Y", "Z"]
    : ["X", "Y"];

  return (
    <div className="vector-card">

      <div className="card-title">
        <span>☷</span>
        VECTOR CONTROLS
      </div>

      {vectorList.map((vector) => (
        <div
          className="vector-block"
          key={vector}
        >

          <div className="vector-heading">

            <span
              className={`vector-letter ${vectorClasses[vector]}`}
            >
              {vector}
            </span>

            <strong>
              {vectorNames[vector]}
            </strong>

          </div>

          {axes.map((axis, index) => (
            <div
              className="axis-row"
              key={axis}
            >

              <span className="axis-label">
                {axis}
              </span>

              {/* Existing slider */}
              <input
                type="range"
                min="-3"
                max="3"
                step="0.01"
                value={vectors[vector][index]}
                onChange={(e) =>
                  updateVector(
                    vector,
                    index,
                    e.target.value
                  )
                }
              />

              {/* New direct input box */}
              <input
                type="number"
                className="axis-input"
                min="-3"
                max="3"
                step="0.01"
                value={vectors[vector][index]}
                onChange={(e) =>
                  updateVector(
                    vector,
                    index,
                    e.target.value
                  )
                }
              />

            </div>
          ))}

        </div>
      ))}

    </div>
  );
}

export default VectorControls;