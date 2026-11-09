import { useMemo, useState } from "react";
import { CATEGORIES, WORDS, type Category } from "../data/vocab";
import { isDue, review, type Progress } from "../lib/progress";
import SpeakButton from "./SpeakButton";

interface Props {
  progress: Progress;
  setProgress: (fn: (p: Progress) => Progress) => void;
}

export default function Flashcards({ progress, setProgress }: Props) {
  const [cat, setCat] = useState<Category | "all">("all");
  const [flipped, setFlipped] = useState(false);
  const [reverse, setReverse] = useState(false);
  // Build the deck once per category so cards don't jump around mid-session.
  const [deckKey, setDeckKey] = useState(0);

  const deck = useMemo(
    () => WORDS.filter((w) => (cat === "all" || w.cat === cat) && isDue(progress, w.id)).map((w) => w.id),
    [cat, deckKey]
  );
  const [done, setDone] = useState<Set<string>>(new Set());
  const remaining = deck.filter((id) => !done.has(id));
  const word = WORDS.find((w) => w.id === remaining[0]);

  const choose = (c: Category | "all") => {
    setCat(c);
    setDone(new Set());
    setFlipped(false);
    setDeckKey((k) => k + 1);
  };

  const answer = (knewIt: boolean) => {
    if (!word) return;
    setProgress((p) => review(p, word.id, knewIt));
    setFlipped(false);
    setDone((d) => new Set(d).add(word.id));
  };

  const front = word && (reverse ? word.en : word.bali);
  const back = word && (reverse ? word.bali : word.en);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        <Chip active={cat === "all"} onClick={() => choose("all")}>All</Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={cat === c.id} onClick={() => choose(c.id)}>
            {c.emoji} {c.label}
          </Chip>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-stone-500">
        <span>{remaining.length} card{remaining.length === 1 ? "" : "s"} left</span>
        <button onClick={() => setReverse((r) => !r)} className="underline underline-offset-2">
          {reverse ? "English → Balinese" : "Balinese → English"} ⇄
        </button>
      </div>

      {word ? (
        <>
          <div className="card-flip h-64 cursor-pointer select-none" onClick={() => setFlipped((f) => !f)}>
            <div className={`card-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
              <Face>
                <div className="text-3xl font-bold text-center">{front}</div>
                {!reverse && <SpeakButton text={word.bali} className="mt-4" />}
                <div className="absolute bottom-3 text-xs text-stone-400">Tap to reveal</div>
              </Face>
              <Face back>
                <div className="text-3xl font-bold text-center text-lagoon-700">{back}</div>
                {reverse && <SpeakButton text={word.bali} className="mt-4" />}
                {word.note && <p className="text-sm text-stone-500 text-center mt-3">{word.note}</p>}
              </Face>
            </div>
          </div>

          {flipped ? (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => answer(false)} className="py-3 rounded-xl bg-hibiscus-100 text-hibiscus-600 font-semibold active:scale-95 transition">
                Still learning
              </button>
              <button onClick={() => answer(true)} className="py-3 rounded-xl bg-lagoon-600 text-white font-semibold active:scale-95 transition">
                I knew it ✓
              </button>
            </div>
          ) : (
            <button onClick={() => setFlipped(true)} className="w-full py-3 rounded-xl bg-white border border-stone-300 font-semibold">
              Show answer
            </button>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-stone-200">
          <div className="text-5xl">🌅</div>
          <p className="font-semibold mt-3">All done for now. Suksma!</p>
          <p className="text-sm text-stone-500 mt-1">Come back later and the cards you need to review will be here.</p>
          <button onClick={() => choose(cat)} className="mt-4 text-lagoon-600 underline underline-offset-2 text-sm">
            Check again
          </button>
        </div>
      )}
    </div>
  );
}

function Face({ children, back = false }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div
      className={`card-face ${back ? "card-back" : ""} absolute inset-0 bg-white rounded-3xl shadow-md border border-stone-200 flex flex-col items-center justify-center p-6`}
    >
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm border transition ${
        active ? "bg-lagoon-600 text-white border-lagoon-600" : "bg-white border-stone-300 text-stone-600"
      }`}
    >
      {children}
    </button>
  );
}
