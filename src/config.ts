// ─────────────────────────────────────────────
//  EDIT THIS FILE FOR EACH NEW VIDEO
// ─────────────────────────────────────────────

export const FPS = 30;

// ── Pre-trimmed + all-keyframe clips (auto-generated) ──
export const CLIP_P1          = "clip-p1-kf.mp4";
export const CLIP_P2_HOOK     = "clip-p2-hook-kf.mp4";
export const CLIP_P2_MAIN     = "clip-p2-main-kf.mp4";
export const CLIP_P3_HOOK     = "clip-p3-hook-kf.mp4";
export const CLIP_P3_MAIN     = "clip-p3-main-kf.mp4";
export const HOOK_P2_REV_FILE = "hook-p2-rev-kf.mp4";
export const HOOK_P3_REV_FILE = "hook-p3-rev-kf.mp4";
export const REWIND_SFX_FILE  = "rewind-sfx.wav";
export const BUMPER_P2_FILE   = "bumper-p2-kf.mp4";
export const BUMPER_P3_FILE   = "bumper-p3-kf.mp4";

// ── Concatenated single-file videos for Parts 2 & 3 (no mid-composition switch) ──
export const VIDEO_P2 = "video-p2.mp4";   // hook + rewind + main + bumper
export const VIDEO_P3 = "video-p3.mp4";   // hook + rewind + main

// ── Clip durations in seconds ──
export const CLIP_P1_SEC            = 150;        // 0:00 → 2:30
export const CLIP_P2_HOOK_SEC       = 12;         // 5:36 → 5:48
export const CLIP_P2_MAIN_SEC       = 167;        // 2:30 → 5:17
export const CLIP_P3_HOOK_SEC       = 8;          // 6:46 → 6:54
export const CLIP_P3_MAIN_SEC       = 142;        // 5:17 → 7:39
export const BUMPER_P2_DURATION_SEC = 9.042;
export const BUMPER_P3_DURATION_SEC = 8.042;

// ── Bumper text (ENGLISH ONLY) ──
export const BUMPER_P2_TEXT = "Will Dr. Blendin's plan work?\nFind out in Part 2!";
export const BUMPER_P3_TEXT = "The disguise is blown!\nWhat will Brady do now? See the finale in Part 3!";

// ─────────────────────────────────────────────
//  ANIMATION CONSTANTS
// ─────────────────────────────────────────────
export const REWIND_DURATION_SEC      = 2;
export const LABEL_VISIBLE_SEC        = 6;
export const RESUME_CARD_DURATION_SEC = 1.5;

export const sec = (s: number) => Math.round(s * FPS);
