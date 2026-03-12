import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Kick off DB warmup immediately — runs in parallel with React rendering
// so Aiven's cold-start latency is hidden behind the initial JS parse time.
import { warmupDb } from "@/lib/useDbWakeup.ts";
warmupDb();

createRoot(document.getElementById("root")!).render(<App />);