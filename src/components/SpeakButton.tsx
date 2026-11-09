import { canSpeak, speak } from "../lib/speak";

export default function SpeakButton({ text, className = "" }: { text: string; className?: string }) {
  if (!canSpeak) return null;
  return (
    <button
      type="button"
      aria-label={`Listen to ${text}`}
      title="Listen (approximate pronunciation)"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      className={`w-9 h-9 shrink-0 rounded-full bg-lagoon-50 text-lagoon-700 hover:bg-lagoon-100 active:scale-95 transition ${className}`}
    >
      🔊
    </button>
  );
}
