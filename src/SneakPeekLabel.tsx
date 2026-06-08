import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CARTOON_BOX } from "./fonts";
import { RainbowText } from "./RainbowText";

export const SneakPeekLabel: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame, [0, 8, 13, 16], [0, 1.15, 0.93, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0,
      display: "flex",
      justifyContent: "center",
      paddingTop: 64,
      pointerEvents: "none",
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: "top center",
    }}>
      <RainbowText
        text="⚡ SNEAK PEEK ⚡"
        fontFamily={CARTOON_BOX}
        fontSize={66}
        outlineSize={3}
        outlineColor="#1a1a2e"
        letterSpacing={4}
      />
    </div>
  );
};
