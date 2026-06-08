import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { HOPE_CARTOON } from "./fonts";
import { RainbowText } from "./RainbowText";

type Props = { text: string };

export const BumperTextOverlay: React.FC<Props> = ({ text }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame, [0, 10, 16, 20], [0, 1.18, 0.93, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  const lines = text.split("\n");

  return (
    <div style={{
      position: "absolute",
      bottom: 320,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      pointerEvents: "none",
      opacity,
      transform: `scale(${scale})`,
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <RainbowText
            text={line}
            fontFamily={HOPE_CARTOON}
            fontSize={54}
            outlineSize={3}
            outlineColor="#1a1a2e"
            letterSpacing={1}
          />
        </div>
      ))}
    </div>
  );
};
