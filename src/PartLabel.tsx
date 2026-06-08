import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CARTOON_BOX } from "./fonts";
import { RainbowText } from "./RainbowText";
import { FPS, LABEL_VISIBLE_SEC } from "./config";

type Props = { label: string };

export const PartLabel: React.FC<Props> = ({ label }) => {
  const frame = useCurrentFrame();
  const visibleFrames = LABEL_VISIBLE_SEC * FPS;

  const scale = interpolate(
    frame, [0, 10, 16, 20], [0, 1.2, 0.93, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = interpolate(
    frame, [visibleFrames - 20, visibleFrames], [1, 0],
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
      {/* No bar — floating rainbow text */}
      <RainbowText
        text={label}
        fontFamily={CARTOON_BOX}
        fontSize={110}
        outlineSize={6}
        outlineColor="#1a1a2e"
        letterSpacing={6}
      />
    </div>
  );
};
