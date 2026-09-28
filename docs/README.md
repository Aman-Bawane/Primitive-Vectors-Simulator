# 🔷 Primitive Vectors Simulator

An interactive web-based simulation tool for understanding **crystal lattices, primitive vectors, unit cells, and crystallographic concepts** through dynamic 2D and 3D visualizations.

The simulator is designed to make crystallography easier to understand by allowing users to interact with lattice structures, modify primitive vectors, and visually observe how different vector configurations form crystal lattices.

---

## 🚀 Features

### 📐 Interactive Primitive Vectors

- Define and visualize primitive vectors **a, b, and c**
- Adjust vector components interactively
- Visual representation of vector directions and magnitudes
- Dynamic recalculation of lattice structures

### 🔢 2D and 3D Visualization

- Switch between **2D and 3D modes**
- Interactive 3D camera controls
- Rotate, zoom, and explore lattice structures
- Appropriate axis representation for each visualization mode

### 🧊 Crystal Lattice Visualization

The simulator supports visualization of different lattice structures, including:

- Simple / Primitive
- Centered Rectangular
- Body-Centered
- Face-Centered
- Hexagonal
- Other lattice configurations

### 🧭 Vector Components

Visualize primitive vector components using:

- **α (Alpha)**
- **β (Beta)**
- Vector magnitude
- Vector direction
- X, Y and Z components where applicable

### 🔍 Interactive Controls

Users can modify parameters and immediately observe the effect on the lattice.

The interface provides controls for:

- Lattice selection
- 2D / 3D mode
- Primitive vector values
- Vector angles
- Lattice dimensions
- Visualization parameters

### ✅ Primitive / Non-Primitive Validation

The simulator provides validation for lattice configurations and identifies whether a selected representation is:

- **Primitive**
- **Non-Primitive**

This helps users understand the relationship between unit cells and primitive cells.

---

## 🎯 Purpose

The main purpose of this project is to provide a visual and interactive way to learn concepts related to:

- Crystal structures
- Unit cells
- Primitive cells
- Primitive vectors
- Lattice points
- Vector geometry
- Crystallographic systems

Traditional crystallography often requires students to imagine three-dimensional structures from diagrams. This project attempts to make those concepts easier to understand through direct interaction and visualization.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Visualization

- Three.js
- React Three Fiber
- Drei

### Development Tools

- VS Code
- npm
- Git
- GitHub

---

## 📁 Project Structure

```text
Primitive-Vectors-Simulator/
│
├── docs/
│   └── Documentation files
│
├── server/
│   └── Server-side functionality
│
├── src/
│   ├── components/
│   │   ├── Header
│   │   ├── LatticeView
│   │   ├── ControlPanel
│   │   └── VectorControls
│   │
│   ├── App.jsx
│   └── ...
│
├── public/
│   └── Static assets
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
