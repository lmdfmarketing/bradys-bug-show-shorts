#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  Brady Bug Show — Shorts Preparation Script
#
#  HOW TO USE:
#  1. Drop your files into the /public folder:
#       public/video.mp4          ← main episode video
#       public/bumper-p2.mp4      ← "continues in Part 2" bumper (original)
#       public/bumper-p3.mp4      ← "continues in Part 3" bumper (original)
#
#  2. Edit src/config.ts with your timestamps and bumper texts
#
#  3. Run:  bash prepare.sh
#
#  4. Run:  npm run render:all
# ─────────────────────────────────────────────────────────────

set -e
cd "$(dirname "$0")/public"

echo ""
echo "🎬 Brady Bug Show — Preparing clips..."
echo ""

# ── Load timestamps from config (edit values below to match config.ts) ──
P1_END=150
P2_HOOK_START=336; P2_HOOK_END=348
P2_MAIN_START=150; P2_MAIN_END=317
P3_HOOK_START=406; P3_HOOK_END=414
P3_MAIN_START=317

P2_HOOK_DUR=$((P2_HOOK_END - P2_HOOK_START))
P3_HOOK_DUR=$((P3_HOOK_END - P3_HOOK_START))

echo "📐 Step 1/3 — Trimming clips (30fps, all-keyframe)..."

OPTS="-c:v libx264 -crf 17 -preset fast -g 1 -keyint_min 1 -sc_threshold 0 -profile:v baseline -pix_fmt yuv420p -c:a aac -ar 44100"

ffmpeg -ss 0          -t $P1_END     -i video.mp4 -vf "fps=30" $OPTS clip-p1-kf.mp4          -y 2>/dev/null
ffmpeg -ss $P2_HOOK_START -t $P2_HOOK_DUR -i video.mp4 -vf "fps=30" $OPTS clip-p2-hook-kf.mp4     -y 2>/dev/null
ffmpeg -ss $P2_MAIN_START -t $((P2_MAIN_END-P2_MAIN_START)) -i video.mp4 -vf "fps=30" $OPTS clip-p2-main-kf.mp4     -y 2>/dev/null
ffmpeg -ss $P3_HOOK_START -t $P3_HOOK_DUR -i video.mp4 -vf "fps=30" $OPTS clip-p3-hook-kf.mp4     -y 2>/dev/null
ffmpeg -ss $P3_MAIN_START -i video.mp4    -vf "fps=30" $OPTS clip-p3-main-kf.mp4     -y 2>/dev/null

echo "⏪ Step 2/3 — Generating reversed hooks (2s rewind)..."

HOOK_P2_SPEED=$(echo "$P2_HOOK_DUR / 2" | bc -l | xargs printf "%.4f")
HOOK_P3_SPEED=$(echo "$P3_HOOK_DUR / 2" | bc -l | xargs printf "%.4f")

ffmpeg -ss $P2_HOOK_START -t $P2_HOOK_DUR -i video.mp4 \
  -vf "fps=30,reverse,setpts=PTS/${HOOK_P2_SPEED}" \
  -af "areverse,atempo=${HOOK_P2_SPEED}" \
  -t 2 $OPTS hook-p2-rev-kf.mp4 -y 2>/dev/null

ffmpeg -ss $P3_HOOK_START -t $P3_HOOK_DUR -i video.mp4 \
  -vf "fps=30,reverse,setpts=PTS/${HOOK_P3_SPEED}" \
  -af "areverse,atempo=2.0,atempo=$(echo "$HOOK_P3_SPEED / 2" | bc -l | xargs printf "%.4f")" \
  -t 2 $OPTS hook-p3-rev-kf.mp4 -y 2>/dev/null

echo "🎵 Generating rewind sound..."
python3 -c "
import math, wave, struct
sr=44100; dur=2.0; n=int(sr*dur); s=[]
for i in range(n):
    t=i/sr; f=3800-3500*(t/dur)**0.7
    v=0.35*math.sin(2*math.pi*f*t)+0.12*math.sin(2*math.pi*f*2.1*t)
    fade=min(t/0.05,1.0)*(1.0 if t<1.75 else max(0,(2.0-t)/0.25))
    s.append(int(v*fade*32767))
with wave.open('rewind-sfx.wav','w') as wf:
    wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(sr)
    wf.writeframes(struct.pack('<'+'h'*len(s),*s))
"

echo "📺 Step 3/4 — Re-encoding bumpers to 1080x1920 @ 30fps..."
ffmpeg -i bumper-p2.mp4 -vf "scale=1080:1920,fps=30" $OPTS bumper-p2-kf.mp4 -y 2>/dev/null
ffmpeg -i bumper-p3.mp4 -vf "scale=1080:1920,fps=30" $OPTS bumper-p3-kf.mp4 -y 2>/dev/null

echo "🔗 Step 4/4 — Concatenating into single-file videos for Parts 2 & 3..."

# Re-encode via filter_complex concat to guarantee PTS starts at exactly 0.000000
# (-c copy leaves a 0.023s PTS offset from AAC encoder delay that causes Remotion seek stutter)

# Part 2: hook → rewind → main → bumper
ffmpeg -i clip-p2-hook-kf.mp4 -i hook-p2-rev-kf.mp4 -i clip-p2-main-kf.mp4 -i bumper-p3-kf.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a]concat=n=4:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" $OPTS video-p2.mp4 -y 2>/dev/null

# Part 3: hook → rewind → main
ffmpeg -i clip-p3-hook-kf.mp4 -i hook-p3-rev-kf.mp4 -i clip-p3-main-kf.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" $OPTS video-p3.mp4 -y 2>/dev/null

echo ""
echo "✅ All clips ready! Now run:  npm run render:all"
echo ""
