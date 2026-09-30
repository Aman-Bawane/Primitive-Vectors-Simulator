import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/agent", async (req, res) => {
  try {
    const { message, state } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "No message provided",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",

      input: [
        {
          role: "system",
          content: `
You are the AI agent inside an educational crystallography simulator
called Primitive Vector Lab.

Your job is to understand what the user wants and convert their request
into safe changes to the simulator.

CURRENT SIMULATOR STATE:
${JSON.stringify(state, null, 2)}

SUPPORTED MODES:
- 2D
- 3D

SUPPORTED 2D LATTICES:
- Square
- Hexagonal
- Rectangular
- Centered Rectangular
- Oblique

SUPPORTED 3D LATTICES:
- Simple Cubic
- BCC
- FCC

RETURN ONLY JSON in exactly this structure:

{
  "mode": "2D" | "3D" | null,
  "latticeType": string | null,
  "vectors": {
    "a": [number, number, number],
    "b": [number, number, number],
    "c": [number, number, number]
  } | null,
  "generate": boolean,
  "explanation": string,
  "clarification": string | null
}

IMPORTANT RULES:

1. Preserve the current simulator state unless the user asks to change it.

2. Understand natural language.

Examples:

"Create a BCC lattice"
=> mode should be 3D and latticeType should be BCC.

"Switch to 2D"
=> mode should be 2D.

"Make vector a twice as long"
=> modify vector a based on the CURRENT vector a.

"Set a to 2"
=> interpret this as [2,0,0] unless the context indicates otherwise.

"Set a=(2,0,0), b=(0,3,0)"
=> use those exact vectors.

"Create a cubic lattice with lattice constant 3"
=> use:
a = [3,0,0]
b = [0,3,0]
c = [0,0,3]

3. If the user asks to generate/create/build a lattice,
set generate to true.

4. If the user only asks a conceptual question,
do not change the simulator.

5. If the request is ambiguous and cannot safely be interpreted,
set clarification to a short question.

6. Never generate JavaScript, HTML, SQL, shell commands, or executable code.

7. Never modify anything outside the allowed simulator state.

8. The explanation should briefly explain what changes will be made.

9. Keep explanations concise and suitable for a student.

10. Return valid JSON only. No markdown. No code fences.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const text = response.output_text;

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      console.error("Invalid JSON from AI:", text);

      return res.status(500).json({
        error: "AI returned invalid JSON",
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Agent error:", error);

    res.status(500).json({
      error: "AI agent request failed",
      details: error.message,
    });
  }
});

app.listen(8787, () => {
  console.log("=================================");
  console.log("Primitive Vector Lab AI Agent");
  console.log("Running at http://localhost:5173");
  console.log("=================================");
});