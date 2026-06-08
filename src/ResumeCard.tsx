import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { HOPE_CARTOON } from "./fonts";
import { RainbowText } from "./RainbowText";
import { FPS, RESUME_CARD_DURATION_SEC } from "./config";

export const ResumeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = RESUME_CARD_DURATION_SEC * FPS;

  const scale = interpolate(
    frame, [0, 8, 13, 16], [0, 1.15, 0.94, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = interpolate(
    frame, [totalFrames - 12, totalFrames], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: 360,
      pointerEvents: "none",
      opacity,
      transform: `scale(${scale})`,
    }}>
      <RainbowText
        text="Now back to the story! 🎬"
        fontFamily={HOPE_CARTOON}
        fontSize={56}
        outlineSize={3}
        outlineColor="#1a1a2e"
        letterSpacing={1}
      />
    </div>
  );
};
