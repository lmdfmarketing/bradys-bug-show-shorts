import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { TITAN_ONE } from "./fonts";
import { RainbowText } from "./RainbowText";

export const RewindOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 5, 50, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      opacity,
    }}>
      <RainbowText
        text="⏪ REWIND"
        fontFamily={TITAN_ONE}
        fontSize={82}
        outlineSize={4}
        outlineColor="#1a1a2e"
        letterSpacing={3}
      />
    </div>
  );
};
