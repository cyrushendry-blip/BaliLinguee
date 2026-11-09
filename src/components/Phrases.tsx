import { PHRASES } from "../data/vocab";
import SpeakButton from "./SpeakButton";

export default function Phrases() {
  return (
    <div className="space-y-5">
      {PHRASES.map((group) => (
        <section key={group.title}>
          <h2 className="font-semibold text-lg mb-2">
            {group.emoji} {group.title}
          </h2>
          <ul className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
            {group.items.map((p) => (
              <li key={p.bali} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">
                    {p.bali}
                    {p.polite && (
                      <span className="ml-2 align-middle text-[10px] uppercase tracking-wide bg-frangipani-100 text-amber-700 px-1.5 py-0.5 rounded">
                        polite
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-stone-500">{p.en}</div>
                </div>
                <SpeakButton text={p.bali} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
