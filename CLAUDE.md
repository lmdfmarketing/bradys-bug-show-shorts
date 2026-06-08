# Brady Bug Show — Remotion Shorts Pipeline

Automated workflow to split each episode into 3 Instagram/YouTube Shorts using Remotion + ffmpeg.

## Two-command workflow (for every new episode)

```bash
npm run prepare:clips   # ffmpeg pre-processing (edit prepare.sh timestamps first)
npm run render:all      # Remotion render → out/part-1.mp4, part-2.mp4, part-3.mp4
```

---

## How to process a new episode

### 1. Drop files into `/public`
- `video.mp4` — main episode video
- `bumper-p2.mp4` — bumper for end of Part 1 (original, any resolution/fps)
- `bumper-p3.mp4` — bumper for end of Part 2 (original, any resolution/fps)

### 2. Edit `prepare.sh` — timestamps section only
```bash
P1_END=<seconds>
P2_HOOK_START=<seconds>; P2_HOOK_END=<seconds>
P2_MAIN_START=<seconds>; P2_MAIN_END=<seconds>
P3_HOOK_START=<seconds>; P3_HOOK_END=<seconds>
P3_MAIN_START=<seconds>
```
User always provides the exact cut timestamps. Do NOT guess them.

### 3. Edit `src/config.ts` — durations and bumper texts
Update all `_SEC` values to match the new timestamps, and translate bumper texts to English (kid-friendly, age 10, US audience).

### 4. Run both commands
```bash
npm run prepare:clips
npm run render:all
```

---

## Architecture

### Video structure per Part
- **Part 1**: `clip-p1-kf.mp4` (main) → `bumper-p2-kf.mp4` (bumper with text overlay)
- **Part 2**: `video-p2.mp4` single concat (hook + rewind + main + bumper) with overlays
- **Part 3**: `video-p3.mp4` single concat (hook + rewind + main) with overlays

### Why single concat videos for Parts 2 & 3
Remotion renders frame-by-frame in headless Chrome. Having multiple `<Video>` elements that mount mid-composition (hook at frame 0, rewind at frame 300, main at frame 360) causes Chrome to stutter when loading new video files during rendering. Using a single pre-concatenated video eliminates all mid-composition video switching.

### Overlay components (on top of the single video)
- `SneakPeekLabel` — "⚡ SNEAK PEEK ⚡" at top, during hook (frames 0–hookFrames)
- `RewindOverlay` + `Audio` — "⏪ REWIND" centered, during rewind segment
- `ResumeCard` — "Now back to the story! 🎬" first 1.5s of main content
- `BumperTextOverlay` — rainbow text at bottom, during bumper segment (Parts 2/3 only; video already in concat)
- `PartLabel` — "Part 2" / "Part 3" rainbow label, absolute frame (no Sequence wrapper)

---

## Critical ffmpeg rules — DO NOT CHANGE

### All-keyframe encoding (`-g 1 -keyint_min 1 -sc_threshold 0`)
**Required.** Remotion seeks to an exact frame for every rendered frame. Without all-keyframe encoding, Chrome must decode from the previous keyframe backwards — this causes the "freeze → rewind → accelerate" stutter the user sees. Every frame must be independently decodable.

### FPS normalization (`-vf "fps=30"`)
**Required.** Source videos may be 29.97fps or other rates. The Remotion composition is 30fps. Any fps mismatch causes frame mapping inconsistency and stutter.

### Concat via `filter_complex` (NOT `-c copy`)
**Required.** Using `ffmpeg -c copy` for concatenation preserves the AAC encoder delay (~0.023s negative PTS on the audio track). This shifts the video PTS to start at `0.022982` instead of `0.000000`. When Remotion seeks to `t=0`, Chrome returns a slightly wrong frame and gets into a seek loop — causing the "vai-e-volta" stutter visible only in the Sneak Peek of Parts 2/3. Re-encoding via `filter_complex concat` guarantees PTS starts at exactly `0.000000`.

### Bumper re-encoding (`-vf "scale=1080:1920,fps=30"`)
**Required.** Bumpers are typically 720×1280 @ 24fps. They must match the composition (1080×1920 @ 30fps) to avoid black flash artifacts.

### OPTS string (copy exactly)
```bash
OPTS="-c:v libx264 -crf 17 -preset fast -g 1 -keyint_min 1 -sc_threshold 0 -profile:v baseline -pix_fmt yuv420p -c:a aac -ar 44100"
```
- `crf 17` — high quality
- `profile:v baseline` — maximum compatibility
- `pix_fmt yuv420p` — required for compatibility

---

## Permanent content rules

- **Language**: ALL text in the videos must be in English. Portuguese is never acceptable.
- **Part 1**: No labels or overlays — just video + bumper
- **Part 2**: "Part 2" label, Sneak Peek, Rewind, Resume Card, Bumper text
- **Part 3**: "Part 3" label, Sneak Peek, Rewind, Resume Card (no bumper)
- **Fonts**: CartoonBox (titles), HopeCartoon (body text), TitanOne (subtitles/labels)
- **Rainbow text**: Letter-by-letter color cycling, no background bars
- **Text position**: `paddingBottom: 360` / `bottom: 320` to clear Instagram caption area
- **Rewind duration**: Always exactly 2 seconds (hook is compressed to fit)
- **Bumper texts**: Translate to English at 4th–5th grade reading level (US kids age 10)

---

## Files that change per episode

| File | What to edit |
|------|-------------|
| `prepare.sh` | Timestamp block (lines ~26–30) |
| `src/config.ts` | All `_SEC` values + bumper texts |

Everything else (Remotion components, fonts, Root.tsx) stays the same forever.

---

## What NOT to do

- **Never** remove `-g 1` from OPTS → causes stutter
- **Never** remove `-vf "fps=30"` from clip trimming → causes stutter  
- **Never** use `ffmpeg -c copy` for the concat → causes Sneak Peek stutter in Part 3
- **Never** reduce CRF below 17 (larger files) or above 28 (visible quality loss)
- **Never** use `<Video startFrom={N}>` in Remotion — always pre-trim clips instead
- **Never** write Portuguese text in any overlay or bumper
- **Never** change font family assignments (CartoonBox/HopeCartoon/TitanOne)
