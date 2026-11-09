import { useEffect, useState } from "react";
import { loadProgress, saveProgress, type Progress } from "./lib/progress";
import Home from "./components/Home";
import Flashcards from "./components/Flashcards";
import Phrases from "./components/Phrases";
import Levels from "./components/Levels";
import Quiz from "./components/Quiz";

export type Tab = "home" | "cards" | "phrases" | "levels" | "quiz";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "🏝️" },
  { id: "cards", label: "Cards", icon: "🃏" },
  { id: "phrases", label: "Phrases", icon: "💬" },
  { id: "levels", label: "Levels", icon: "🪜" },
  { id: "quiz", label: "Quiz", icon: "🎯" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  return (
    <div className="min-h-screen pb-24 text-stone-800">
      <header className="bg-gradient-to-br from-lagoon-600 to-lagoon-900 text-white px-4 pt-6 pb-5 shadow">
        <div className="max-w-xl mx-auto flex items-center gap-2">
          <span className="text-3xl">🌺</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">BaliLinguee</h1>
            <p className="text-lagoon-100 text-sm">Learn Balinese, one word at a time</p>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-5">
        {tab === "home" && <Home progress={progress} go={setTab} />}
        {tab === "cards" && <Flashcards progress={progress} setProgress={setProgress} />}
        {tab === "phrases" && <Phrases />}
        {tab === "levels" && <Levels />}
        {tab === "quiz" && <Quiz />}
      </main>

      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-stone-200">
        <div className="max-w-xl mx-auto grid grid-cols-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-2.5 flex flex-col items-center text-xs font-medium transition ${
                tab === t.id ? "text-lagoon-600" : "text-stone-500"
              }`}
            >
              <span className={`text-xl transition ${tab === t.id ? "scale-110" : "opacity-70"}`}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
