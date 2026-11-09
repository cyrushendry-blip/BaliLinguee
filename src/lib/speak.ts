// Browsers have no Balinese voice. Indonesian spelling and pronunciation are
// close enough to give a useful approximation, so we use an Indonesian voice.

export const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

export function speak(text: string) {
  if (!canSpeak) return;
  const clean = text.replace(/…/g, "");
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = "id-ID";
  u.rate = 0.85;
  const voice = speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("id"));
  if (voice) u.voice = voice;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
