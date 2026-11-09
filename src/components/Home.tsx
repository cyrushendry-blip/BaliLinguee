import type { Tab } from "../App";
import { WORDS } from "../data/vocab";
import { isDue, isMastered, isSeen, type Progress } from "../lib/progress";

export default function Home({ progress, go }: { progress: Progress; go: (t: Tab) => void }) {
  const seen = WORDS.filter((w) => isSeen(progress, w.id)).length;
  const mastered = WORDS.filter((w) => isMastered(progress, w.id)).length;
  const due = WORDS.filter((w) => isSeen(progress, w.id) && isDue(progress, w.id)).length;
  const pct = Math.round((mastered / WORDS.length) * 100);

  return (
    <div className="space-y-5">
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200">
        <p className="text-lg font-semibold">Om Swastiastu! 🙏</p>
        <p className="text-stone-600 text-sm mt-1">
          That's how you say hello in Balinese. Let's keep going.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <Stat value={seen} label="words seen" />
          <Stat value={mastered} label="mastered" />
          <Stat value={due} label="to review" />
        </div>
        <div className="mt-4">
          <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-frangipani-400 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {pct}% of {WORDS.length} words mastered
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Tile emoji="🃏" title="Flashcards" text="Learn words with spaced repetition" onClick={() => go("cards")} />
        <Tile emoji="💬" title="Phrases" text="Useful sentences by situation" onClick={() => go("phrases")} />
        <Tile emoji="🪜" title="Speech levels" text="Polite vs everyday Balinese" onClick={() => go("levels")} />
        <Tile emoji="🎯" title="Quiz" text="Test yourself" onClick={() => go("quiz")} />
      </div>

      <p className="text-xs text-stone-400 text-center px-4">
        Balinese varies by region. Check with a native speaker when you can. 🌴
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-lagoon-50 rounded-xl py-2.5">
      <div className="text-2xl font-bold text-lagoon-700">{value}</div>
      <div className="text-xs text-stone-500">{label}</div>
    </div>
  );
}

function Tile({ emoji, title, text, onClick }: { emoji: string; title: string; text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-4 text-left shadow-sm border border-stone-200 active:scale-[0.98] hover:border-lagoon-500 transition"
    >
      <div className="text-2xl">{emoji}</div>
      <div className="font-semibold mt-1">{title}</div>
      <div className="text-xs text-stone-500">{text}</div>
    </button>
  );
}
