// Balinese learning content.
//
// NOTE: Balinese varies by region and register. This list is a starting point:
// check entries with a native speaker and correct them here — every screen in
// the app reads from this file.

export type Category =
  | "greetings"
  | "people"
  | "numbers"
  | "food"
  | "places"
  | "colors";

export interface Word {
  id: string;
  bali: string;
  en: string;
  cat: Category;
  note?: string;
}

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "greetings", label: "Greetings & basics", emoji: "🙏" },
  { id: "people", label: "People & family", emoji: "👪" },
  { id: "numbers", label: "Numbers", emoji: "🔢" },
  { id: "food", label: "Food & market", emoji: "🍌" },
  { id: "places", label: "Places & nature", emoji: "🌋" },
  { id: "colors", label: "Colours", emoji: "🎨" },
];

const w = (cat: Category, bali: string, en: string, note?: string): Word => ({
  id: `${cat}:${bali}`,
  bali,
  en,
  cat,
  note,
});

export const WORDS: Word[] = [
  // Greetings & basics
  w("greetings", "Om Swastiastu", "Hello (respectful greeting)", "Literally “may you be well”. Hands together in front of the chest."),
  w("greetings", "Om Shanti Shanti Shanti Om", "Peace (formal closing)"),
  w("greetings", "Rahajeng semeng", "Good morning"),
  w("greetings", "Rahajeng tengai", "Good day (around midday)"),
  w("greetings", "Rahajeng sanja", "Good afternoon / evening"),
  w("greetings", "Rahajeng wengi", "Good night"),
  w("greetings", "Rahajeng rauh", "Welcome"),
  w("greetings", "Suksma", "Thank you"),
  w("greetings", "Matur suksma", "Thank you very much (polite)"),
  w("greetings", "Ampura", "Sorry / excuse me"),
  w("greetings", "Durus", "Please / go ahead", "Used when inviting someone to eat, sit or come in."),
  w("greetings", "Nggih", "Yes (polite)"),
  w("greetings", "Nenten", "No / not (polite)", "Often shortened to “ten”."),
  w("greetings", "Napi gatra?", "How are you? (polite)"),
  w("greetings", "Kenken kabare?", "How are you? (casual)"),
  w("greetings", "Becik-becik", "I'm fine (polite)"),

  // People & family
  w("people", "tiang", "I / me (polite)"),
  w("people", "icang", "I / me (casual)", "Only with close friends or younger people."),
  w("people", "ragane", "you (polite)"),
  w("people", "cai", "you (casual)", "Can sound rude to strangers or elders."),
  w("people", "meme", "mother"),
  w("people", "bapa", "father"),
  w("people", "beli", "older brother", "Also a friendly way to address a man."),
  w("people", "mbok", "older sister", "Also a friendly way to address a woman."),
  w("people", "adi", "younger sibling"),
  w("people", "panak", "child (son/daughter)"),
  w("people", "kurenan", "spouse"),
  w("people", "timpal", "friend"),

  // Numbers
  w("numbers", "besik", "one (1)", "“sa” in compounds."),
  w("numbers", "dua", "two (2)"),
  w("numbers", "telu", "three (3)"),
  w("numbers", "papat", "four (4)"),
  w("numbers", "lima", "five (5)"),
  w("numbers", "nem", "six (6)"),
  w("numbers", "pitu", "seven (7)"),
  w("numbers", "kutus", "eight (8)"),
  w("numbers", "sia", "nine (9)"),
  w("numbers", "dasa", "ten (10)"),

  // Food & market
  w("food", "nasi", "rice (cooked)"),
  w("food", "yeh", "water (casual)", "Polite: toya."),
  w("food", "be", "meat / fish (side dish)"),
  w("food", "siap", "chicken"),
  w("food", "celeng", "pig / pork"),
  w("food", "biu", "banana"),
  w("food", "nyuh", "coconut"),
  w("food", "jaja", "cake / traditional snack"),
  w("food", "jaen", "delicious"),
  w("food", "seduk", "hungry"),
  w("food", "Aji kuda?", "How much (does it cost)?"),
  w("food", "mael", "expensive"),
  w("food", "mudah", "cheap"),

  // Places & nature
  w("places", "umah", "house / home"),
  w("places", "pura", "temple"),
  w("places", "peken", "market"),
  w("places", "carik", "rice field"),
  w("places", "segara", "sea"),
  w("places", "gunung", "mountain"),
  w("places", "banjar", "village community / hall"),
  w("places", "matanai", "sun"),
  w("places", "bulan", "moon / month"),
  w("places", "ujan", "rain"),

  // Colours
  w("colors", "barak", "red"),
  w("colors", "putih", "white"),
  w("colors", "selem", "black"),
  w("colors", "kuning", "yellow"),
  w("colors", "gadang", "green"),
  w("colors", "biru", "blue"),
];

// ---------- Phrases ----------

export interface Phrase {
  bali: string;
  en: string;
  polite?: boolean;
}

export const PHRASES: { title: string; emoji: string; items: Phrase[] }[] = [
  {
    title: "Meeting someone",
    emoji: "👋",
    items: [
      { bali: "Om Swastiastu", en: "Hello", polite: true },
      { bali: "Napi gatra?", en: "How are you?", polite: true },
      { bali: "Becik-becik, suksma.", en: "I'm fine, thank you.", polite: true },
      { bali: "Sira wastan ragane?", en: "What is your name?", polite: true },
      { bali: "Wastan tiang …", en: "My name is …", polite: true },
      { bali: "Ragane saking dija?", en: "Where are you from?", polite: true },
      { bali: "Tiang saking …", en: "I am from …", polite: true },
    ],
  },
  {
    title: "Being polite",
    emoji: "🙏",
    items: [
      { bali: "Matur suksma", en: "Thank you very much", polite: true },
      { bali: "Ampura", en: "Sorry / excuse me", polite: true },
      { bali: "Durus", en: "Please, go ahead", polite: true },
      { bali: "Tiang nenten uning", en: "I don't know", polite: true },
      { bali: "Tiang sing nawang", en: "I don't know (casual)" },
    ],
  },
  {
    title: "At the market",
    emoji: "🛒",
    items: [
      { bali: "Aji kuda?", en: "How much is it?" },
      { bali: "Mael gati!", en: "Very expensive!" },
      { bali: "Tiang meli niki", en: "I'll buy this one", polite: true },
    ],
  },
  {
    title: "Food",
    emoji: "🍚",
    items: [
      { bali: "Durus ngajeng", en: "Please, eat (polite invitation)", polite: true },
      { bali: "Sampun ngajeng?", en: "Have you eaten? (a common greeting)", polite: true },
      { bali: "Suba madaar?", en: "Have you eaten? (casual)" },
      { bali: "Jaen gati!", en: "Very delicious!" },
    ],
  },
];

// ---------- Speech levels ----------
// Balinese has registers: Basa Alus (refined, for elders, priests, strangers)
// and Basa Andap / Kasar (everyday, among friends and family). Many common
// words change completely between them.

export interface LevelPair {
  en: string;
  andap: string;
  alus: string;
}

export const LEVEL_PAIRS: LevelPair[] = [
  { en: "I", andap: "icang", alus: "tiang" },
  { en: "you", andap: "cai", alus: "ragane" },
  { en: "yes", andap: "aa", alus: "nggih" },
  { en: "no / not", andap: "sing", alus: "nenten" },
  { en: "what", andap: "apa", alus: "napi" },
  { en: "how", andap: "kenken", alus: "sapunapi" },
  { en: "this", andap: "ene", alus: "niki" },
  { en: "that", andap: "ento", alus: "nika" },
  { en: "there is / have", andap: "ada", alus: "wenten" },
  { en: "already", andap: "suba", alus: "sampun" },
  { en: "not yet", andap: "konden", alus: "durung" },
  { en: "from", andap: "uli", alus: "saking" },
  { en: "with / together", andap: "ajak", alus: "sareng" },
  { en: "eat", andap: "madaar", alus: "ngajeng" },
  { en: "sleep", andap: "medem", alus: "sirep" },
  { en: "come / arrive", andap: "teka", alus: "rauh" },
  { en: "go", andap: "luas", alus: "lunga" },
  { en: "know", andap: "nawang", alus: "uning" },
  { en: "give", andap: "maang", alus: "ngicen" },
  { en: "speak", andap: "ngomong", alus: "ngraos" },
  { en: "name", andap: "adan", alus: "wastan" },
  { en: "water", andap: "yeh", alus: "toya" },
  { en: "good", andap: "melah", alus: "becik" },
  { en: "big", andap: "gede", alus: "ageng" },
  { en: "small", andap: "cenik", alus: "alit" },
];
