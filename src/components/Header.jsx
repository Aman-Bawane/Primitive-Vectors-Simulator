import { RotateCcw, Atom } from "lucide-react";

function Header({ mode, setMode, onReset }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">
          <Atom size={22} />
        </div>

        <div>
          <div className="brand-name">PRIMITIVE VECTOR LAB</div>
          <div className="brand-subtitle">
            Crystal Structure Simulator
          </div>
        </div>
      </div>

      <div className="mode-switch">
        <button
          className={mode === "2D" ? "active" : ""}
          onClick={() => setMode("2D")}
        >
          2D
        </button>

        <button
          className={mode === "3D" ? "active" : ""}
          onClick={() => setMode("3D")}
        >
          3D
        </button>
      </div>

      <button className="reset-button" onClick={onReset}>
        <RotateCcw size={15} />
        Reset
      </button>
    </header>
  );
}

export default Header;