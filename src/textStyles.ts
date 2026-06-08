// Shared text style helpers
// WebkitTextStroke is unreliable in Chromium headless — use multi-shadow outline instead

// Creates a solid outline using 8-direction text shadows
export const outline = (size: number, color: string): string => {
  const s = size;
  const c = color;
  return [
    `-${s}px -${s}px 0 ${c}`,
    ` ${s}px -${s}px 0 ${c}`,
    `-${s}px  ${s}px 0 ${c}`,
    ` ${s}px  ${s}px 0 ${c}`,
    `-${s}px  0    0 ${c}`,
    ` ${s}px  0    0 ${c}`,
    ` 0    -${s}px 0 ${c}`,
    ` 0     ${s}px 0 ${c}`,
  ].join(", ");
};
