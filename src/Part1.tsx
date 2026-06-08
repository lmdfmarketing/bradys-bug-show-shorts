// PART 1 — no label
import React from "react";
import { AbsoluteFill, Sequence, Video, staticFile } from "remotion";
import { BumperWithText } from "./BumperWithText";
import { sec, CLIP_P1, CLIP_P1_SEC, BUMPER_P2_FILE, BUMPER_P2_TEXT, BUMPER_P2_DURATION_SEC } from "./config";

const mainFrames   = sec(CLIP_P1_SEC);
const bumperFrames = sec(BUMPER_P2_DURATION_SEC);

export const PART1_TOTAL_FRAMES = mainFrames + bumperFrames;

export const Part1: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={mainFrames}>
      <AbsoluteFill>
        <Video src={staticFile(CLIP_P1)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
    </Sequence>

    <Sequence from={mainFrames} durationInFrames={bumperFrames}>
      <BumperWithText file={BUMPER_P2_FILE} text={BUMPER_P2_TEXT} />
    </Sequence>
  </AbsoluteFill>
);
