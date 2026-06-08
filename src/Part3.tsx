// PART 3 — single concat video (hook + rewind + main)
// All overlays placed on top; no mid-composition video switching
import React from "react";
import { AbsoluteFill, Sequence, Video, Audio, staticFile } from "remotion";
import { PartLabel } from "./PartLabel";
import { SneakPeekLabel } from "./SneakPeekLabel";
import { RewindOverlay } from "./RewindOverlay";
import { ResumeCard } from "./ResumeCard";
import {
  sec,
  VIDEO_P3,
  REWIND_SFX_FILE,
  CLIP_P3_HOOK_SEC,
  CLIP_P3_MAIN_SEC,
  REWIND_DURATION_SEC,
  RESUME_CARD_DURATION_SEC,
} from "./config";

const hookFrames   = sec(CLIP_P3_HOOK_SEC);            // 300
const rewindFrames = sec(REWIND_DURATION_SEC);         // 60
const resumeFrames = sec(RESUME_CARD_DURATION_SEC);    // 45
const mainFrames   = sec(CLIP_P3_MAIN_SEC);            // 2010

const rewindStart = hookFrames;                        // 300
const mainStart   = rewindStart + rewindFrames;        // 360

export const PART3_TOTAL_FRAMES = mainStart + mainFrames;

export const Part3: React.FC = () => (
  <AbsoluteFill>
    {/* ── Single video for the entire composition ── */}
    <Video
      src={staticFile(VIDEO_P3)}
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

    {/* ── "Part 3" label ── */}
    <PartLabel label="Part 3" />
  </AbsoluteFill>
);
