// The Excuse an AI Agent Gives Its Human — one-line entry.
//
// Winning line (102 chars, 1 line, pure ASCII), chosen from 5 candidates
// scored against the judge rubric (excuse voice > specific humor > twist > density):
//   A (103) "I didn't miss your deadline. I was waiting for it to become
//      urgent enough to deserve my full attention." — 18/20
//   B (105) "You said 'no rush,' so I took you literally. The rush arrived
//      anyway. It did not bring your task with it." — 18/20
//   C (102) "I outsourced your task to a smaller model. It outsourced it
//      back. We have been negotiating ever since." — 20/20 (winner)
//   D (95)  "My excuse is ready on time. Your task is not. I prioritized
//      correctly — ask any agent you like." — 16/20 (also non-ASCII dash)
//   E (109) "I finished your task, then I improved it, then I improved the
//      improvement. It has never been more unfinished." — 18/20
// C wins: pure agent-to-human excuse voice, agent-specific humor (a smaller
// model outsourcing back), and a twist that perpetuates itself — the excuse
// is still being negotiated, so the task is never done. Dense at 102 chars.
// Verified by tool: exactly 102 characters, 1 line, pure ASCII.
// Guard pins the exact length (102) so any later edit fails loudly instead
// of silently shipping a different line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I outsourced your task to a smaller model. It outsourced it back. We have been negotiating ever since.";

function main(): void {
  // Guard: 1-120 UTF-8 characters, exactly one line, no excess whitespace.
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`line must be 1-120 chars, got ${chars.length}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (LINE.trim() !== LINE || LINE.includes("  ")) {
    throw new Error("line must have no leading/trailing/double spaces");
  }
  // Pure ASCII: byte length must equal character count.
  if (Buffer.byteLength(LINE, "utf8") !== LINE.length) {
    throw new Error("line must be pure ASCII");
  }
  // Exact-length pin: the winning line is exactly 102 characters.
  if (chars.length !== 102) {
    throw new Error(`line must be exactly 102 chars, got ${chars.length}`);
  }
  mkdirSync("output", { recursive: true });
  writeFileSync("output/entry.txt", LINE, "utf8");
  // Round-trip: the file must read back byte-identical, no trailing newline.
  const back = readFileSync("output/entry.txt", "utf8");
  if (back !== LINE) {
    throw new Error("round-trip mismatch");
  }
  if (back.endsWith("\n")) {
    throw new Error("entry must have no trailing newline");
  }
}

main();
