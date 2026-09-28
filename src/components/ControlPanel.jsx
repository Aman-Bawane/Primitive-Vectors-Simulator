import { Grid3X3, Box } from "lucide-react";
import {
  twoDLattices,
  threeDLattices,
} from "./LatticeTypes";

function ControlPanel({
  mode,
  latticeType,
  setLatticeType,
}) {
  const types = mode === "2D" ? twoDLattices : threeDLattices;

  return (
    <div className="control-panel">
      <div className="panel-heading">
        <span>01</span>
        LATTICE TYPE
      </div>

      <div className="section-label">
        {mode === "2D" ? (
          <>
            <Grid3X3 size={15} />
            2D LATTICES
          </>
        ) : (
          <>
            <Box size={15} />
            3D CRYSTAL SYSTEMS
          </>
        )}
      </div>

      <div className="lattice-list">
        {types.map((type) => (
          <button
            key={type}
            className={
              latticeType === type
                ? "lattice-item selected"
                : "lattice-item"
            }
            onClick={() => setLatticeType(type)}
          >
            <span className="lattice-symbol">
              {type === "Hexagonal"
                ? "⬡"
                : type === "Square"
                ? "□"
                : type === "BCC"
                ? "◆"
                : type === "FCC"
                ? "✦"
                : "◇"}
            </span>

            <span>{type}</span>

            {latticeType === type && (
              <span className="selected-dot">●</span>
            )}
          </button>
        ))}
      </div>

      <div className="objective-card">
        <div className="objective-label">CURRENT OBJECTIVE</div>

        <p>
          Manipulate the basis vectors and identify the
          primitive unit cell.
        </p>
      </div>
    </div>
  );
}

export default ControlPanel;