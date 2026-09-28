export const latticeTypes = {
  Square: {
    dimension: "2D",
    a: [1, 0, 0],
    b: [0, 1, 0],
    c: [0, 0, 1],
    description: "Equal sides with 90° between vectors.",
  },

  Hexagonal: {
    dimension: "2D",
    a: [1, 0, 0],
    b: [0.5, 0.866025, 0],
    c: [0, 0, 1],
    description: "Two equal vectors separated by 60°.",
  },

  Rectangular: {
    dimension: "2D",
    a: [1.5, 0, 0],
    b: [0, 1, 0],
    c: [0, 0, 1],
    description: "Two perpendicular vectors with unequal lengths.",
  },

  "Centered Rectangular": {
  a: [1.5, 0, 0],
  b: [0, 1, 0],
  c: [0, 0, 1],
},

  Oblique: {
    dimension: "2D",
    a: [1.2, 0, 0],
    b: [0.45, 0.9, 0],
    c: [0, 0, 1],
    description: "Unequal vectors with a non-right angle.",
  },

  "Simple Cubic": {
    dimension: "3D",
    a: [1, 0, 0],
    b: [0, 1, 0],
    c: [0, 0, 1],
    description: "Primitive cubic lattice.",
  },

  BCC: {
    dimension: "3D",
    a: [1, 0, 0],
    b: [0, 1, 0],
    c: [0, 0, 1],
    description: "Body-centered cubic structure.",
  },

  FCC: {
    dimension: "3D",
    a: [1, 0, 0],
    b: [0, 1, 0],
    c: [0, 0, 1],
    description: "Face-centered cubic structure.",
  },
};

export const twoDLattices = [
  "Square",
  "Hexagonal",
  "Rectangular",
  "Centered Rectangular",
  "Oblique",
];

export const threeDLattices = [
  "Simple Cubic",
  "BCC",
  "FCC",
];