import { AbsoluteFill, Video, staticFile, useVideoConfig } from "remotion";

type Props = {
  startFromFrame: number;
  label: string;
};

export const VideoSegment: React.FC<Props> = ({ startFromFrame, label }) => {
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Video
        src={staticFile("video.mp4")}
        startFrom={startFromFrame}
        endAt={startFromFrame + durationInFrames}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Subtle label — top-right corner, clean and small */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 40,
          backgroundColor: "rgba(0,0,0,0.45)",
          borderRadius: 10,
          padding: "8px 22px",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 32,
            fontFamily: "SF Pro Display, Helvetica Neue, Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {label}
        </span>
      </div>
    </AbsoluteFill>
  );
};
