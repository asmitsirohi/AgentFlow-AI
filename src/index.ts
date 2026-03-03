import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { runWorkFlow } from "./agent/run";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await runWorkFlow(message);

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Agent execution failed" });
  }
});

app.listen(4000, () => {
  console.log("AI Agent running on port 4000");
});
