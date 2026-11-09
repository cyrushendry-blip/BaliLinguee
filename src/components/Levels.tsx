import { LEVEL_PAIRS } from "../data/vocab";
import SpeakButton from "./SpeakButton";

export default function Levels() {
  return (
    <div className="space-y-4">
      <section className="bg-white rounded-2xl p-5 border border-stone-200 text-sm text-stone-600 space-y-2">
        <h2 className="font-semibold text-lg text-stone-800">Speech levels 🪜</h2>
        <p>
          Balinese changes depending on who you're talking to. The same idea can use a completely different word.
        </p>
        <p>
          <b className="text-amber-700">Basa Alus</b> (refined) is for elders, priests, strangers and formal situations.{" "}
          <b className="text-lagoon-700">Basa Andap</b> (everyday, also called Kasar) is for friends, family and people younger than you.
        </p>
        <p>As a visitor, use Alus. People appreciate the effort.</p>
      </section>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wide bg-stone-100 px-4 py-2">
          <span>English</span>
          <span className="text-lagoon-700">Andap</span>
          <span className="text-amber-700">Alus</span>
        </div>
        <ul className="divide-y divide-stone-100">
          {LEVEL_PAIRS.map((p) => (
            <li key={p.en} className="grid grid-cols-3 items-center px-4 py-2.5">
              <span className="text-stone-500 text-sm">{p.en}</span>
              <span className="font-medium">{p.andap}</span>
              <span className="font-semibold flex items-center justify-between gap-1">
                {p.alus}
                <SpeakButton text={p.alus} className="w-7 h-7 text-xs" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
