// PART 2 — single concat video (hook + rewind + main + bumper)
// All overlays placed on top; no mid-composition video switching
import React from "react";
import { AbsoluteFill, Sequence, Video, Audio, staticFile } from "remotion";
import { PartLabel } from "./PartLabel";
import { SneakPeekLabel } from "./SneakPeekLabel";
import { RewindOverlay } from "./RewindOverlay";
import { ResumeCard } from "./ResumeCard";
import { BumperTextOverlay } from "./BumperTextOverlay";
import {
  sec,
  VIDEO_P2,
  REWIND_SFX_FILE,
  CLIP_P2_HOOK_SEC,
  CLIP_P2_MAIN_SEC,
  BUMPER_P3_TEXT,
  BUMPER_P3_DURATION_SEC,
  REWIND_DURATION_SEC,
  RESUME_CARD_DURATION_SEC,
} from "./config";

const hookFrames    = sec(CLIP_P2_HOOK_SEC);           // 300
const rewindFrames  = sec(REWIND_DURATION_SEC);        // 60
const resumeFrames  = sec(RESUME_CARD_DURATION_SEC);   // 45
const mainFrames    = sec(CLIP_P2_MAIN_SEC);           // 2490
const bumperFrames  = sec(BUMPER_P3_DURATION_SEC);     // 241

const rewindStart  = hookFrames;                       // 300
const mainStart    = rewindStart + rewindFrames;       // 360
const bumperStart  = mainStart + mainFrames;           // 2850

export const PART2_TOTAL_FRAMES = bumperStart + bumperFrames;

export const Part2: React.FC = () => (
  <AbsoluteFill>
    {/* ── Single video for the entire composition (no mid-render switching) ── */}
    <Video
      src={staticFile(VIDEO_P2)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />

    {/* ── ⚡ SNEAK PEEK label during hook ── */}
    <Sequence from={0} durationInFrames={hookFrames}>
      <SneakPeekLabel />
    </Sequence>

    {/* ── ⏪ REWIND overlay + SFX ── */}
    <Sequence from={rewindStart} durationInFrames={rewindFrames}>
      <Audio src={staticFile(REWIND_SFX_FILE)} />
      <RewindOverlay />
    </Sequence>

    {/* ── "Now back to the story!" on first 1.5s of main ── */}
    <Sequence from={mainStart} durationInFrames={resumeFrames}>
      <ResumeCard />
    </Sequence>

    {/* ── Bumper text overlay (video already in concat) ── */}
    <Sequence from={bumperStart} durationInFrames={bumperFrames}>
      <BumperTextOverlay text={BUMPER_P3_TEXT} />
    </Sequence>

    {/* ── "Part 2" label ── */}
    <PartLabel label="Part 2" />
  </AbsoluteFill>
);
