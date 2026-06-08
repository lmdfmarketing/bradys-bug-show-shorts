import React from "react";
import { outline } from "./textStyles";

// Kid-show palette — cycles letter by letter
const COLORS = [
  "#FF3D3D", // red
  "#FF8C00", // orange
  "#FFE000", // yellow
  "#00E676", // green
  "#00BFFF", // sky blue
  "#E040FB", // purple
];

type Props = {
  text: string;
  fontFamily: string;
  fontSize: number;
  outlineSize?: number;
  outlineColor?: string;
  letterSpacing?: number;
};

export const RainbowText: React.FC<Props> = ({
  text,
  fontFamily,
  fontSize,
  outlineSize = 3,
  outlineColor = "#1a1a2e",
  letterSpacing = 1,
}) => {
  let colorIndex = 0;

  return (
    <span style={{ fontFamily, fontSize, letterSpacing, lineHeight: 1.2, display: "inline" }}>
      {text.split("").map((char, i) => {
        if (char === " " || char === "\n") {
          return <span key={i} style={{ display: "inline-block", width: fontSize * 0.35 }} />;
        }
        const color = COLORS[colorIndex % COLORS.length];
        colorIndex++;
        return (
          <span
            key={i}
            style={{
              color,
              textShadow: outline(outlineSize, outlineColor),
              display: "inline-block",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};
