// Spaced repetition using a simple Leitner box system.
// Box 0 = new, 1..5 = learned more and more. Each box has a review interval.

const KEY = "balilinguee:progress:v1";
const INTERVAL_DAYS = [0, 1, 2, 4, 8, 16];
const DAY = 24 * 60 * 60 * 1000;

export interface CardState {
  box: number;
  due: number; // timestamp
}

export type Progress = Record<string, CardState>;

export function loadProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveProgress(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable: progress just won't persist */
  }
}

export function review(p: Progress, id: string, knewIt: boolean): Progress {
  const current = p[id]?.box ?? 0;
  const box = knewIt ? Math.min(current + 1, INTERVAL_DAYS.length - 1) : 1;
  return { ...p, [id]: { box, due: Date.now() + INTERVAL_DAYS[box] * DAY } };
}

export function isDue(p: Progress, id: string) {
  const s = p[id];
  return !s || s.due <= Date.now();
}

export function isMastered(p: Progress, id: string) {
  return (p[id]?.box ?? 0) >= 4;
}

export function isSeen(p: Progress, id: string) {
  return !!p[id];
}
