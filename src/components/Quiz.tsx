import { useState } from "react";
import { LEVEL_PAIRS, WORDS } from "../data/vocab";

interface Question {
  prompt: string;
  hint: string;
  answer: string;
  options: string[];
}

const LENGTH = 10;

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function makeQuestion(): Question {
  const kind = Math.random();
  if (kind < 0.2) {
    // Speech level: pick the polite form
    const pair = LEVEL_PAIRS[Math.floor(Math.random() * LEVEL_PAIRS.length)];
    const wrong = shuffle(LEVEL_PAIRS.filter((p) => p !== pair)).slice(0, 2).map((p) => p.alus);
    return {
      prompt: pair.andap,
      hint: "What's the polite (Alus) form of this word?",
      answer: pair.alus,
      options: shuffle([pair.alus, pair.andap, ...wrong]),
    };
  }
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const pool = WORDS.filter((w) => w.id !== word.id);
  // Prefer distractors from the same category so it's not too easy.
  const same = shuffle(pool.filter((w) => w.cat === word.cat));
  const distractors = [...same, ...shuffle(pool)].filter((w, i, arr) => arr.indexOf(w) === i).slice(0, 3);
  if (kind < 0.6) {
    return {
      prompt: word.bali,
      hint: "What does this mean?",
      answer: word.en,
      options: shuffle([word.en, ...distractors.map((d) => d.en)]),
    };
  }
  return {
    prompt: word.en,
    hint: "How do you say this in Balinese?",
    answer: word.bali,
    options: shuffle([word.bali, ...distractors.map((d) => d.bali)]),
  };
}

const newRound = () => Array.from({ length: LENGTH }, makeQuestion);

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>(newRound);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const restart = () => {
    setQuestions(newRound());
    setI(0);
    setPicked(null);
    setScore(0);
  };

  if (i >= questions.length) {
    const good = score >= LENGTH * 0.8;
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-stone-200">
        <div className="text-5xl">{good ? "🏆" : "🌱"}</div>
        <p className="text-2xl font-bold mt-3">
          {score} / {LENGTH}
        </p>
        <p className="text-stone-500 mt-1">{good ? "Becik pisan! (Very good!)" : "Keep practising, you're getting there."}</p>
        <button onClick={restart} className="mt-5 px-6 py-3 rounded-xl bg-lagoon-600 text-white font-semibold">
          Play again
        </button>
      </div>
    );
  }

  const q = questions[i];
  const pick = (o: string) => {
    if (picked) return;
    setPicked(o);
    if (o === q.answer) setScore((s) => s + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-stone-500">
        <span>
          Question {i + 1} / {LENGTH}
        </span>
        <span>Score {score}</span>
      </div>
      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div className="h-full bg-lagoon-500 transition-all" style={{ width: `${(i / LENGTH) * 100}%` }} />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center">
        <p className="text-sm text-stone-500">{q.hint}</p>
        <p className="text-3xl font-bold mt-2">{q.prompt}</p>
      </div>

      <div className="grid gap-2">
        {q.options.map((o) => {
          const state = !picked ? "" : o === q.answer ? "right" : o === picked ? "wrong" : "dim";
          return (
            <button
              key={o}
              onClick={() => pick(o)}
              className={`py-3 px-4 rounded-xl border text-left font-medium transition ${
                state === "right"
                  ? "bg-lagoon-600 text-white border-lagoon-600"
                  : state === "wrong"
                  ? "bg-hibiscus-100 border-hibiscus-500 text-hibiscus-600"
                  : state === "dim"
                  ? "bg-white border-stone-200 opacity-50"
                  : "bg-white border-stone-300 active:scale-[0.98]"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>

      {picked && (
        <button
          onClick={() => {
            setI((n) => n + 1);
            setPicked(null);
          }}
          className="w-full py-3 rounded-xl bg-stone-800 text-white font-semibold"
        >
          {i + 1 === LENGTH ? "See results" : "Next →"}
        </button>
      )}
    </div>
  );
}
