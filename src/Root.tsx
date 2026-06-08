import { Composition } from "remotion";
import { Part1, PART1_TOTAL_FRAMES } from "./Part1";
import { Part2, PART2_TOTAL_FRAMES } from "./Part2";
import { Part3, PART3_TOTAL_FRAMES } from "./Part3";
import { FPS } from "./config";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="part-1" component={Part1} durationInFrames={PART1_TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="part-2" component={Part2} durationInFrames={PART2_TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="part-3" component={Part3} durationInFrames={PART3_TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
  </>
);
