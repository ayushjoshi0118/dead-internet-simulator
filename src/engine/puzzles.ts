import type { PuzzleDefinition } from './types';

// All answers stored lowercase-normalized (no spaces, trimmed)
// Puzzle 1: Caesar cipher (shift 7) — "RIFTWATCH" → player decodes from encoded "YPMCPHAM" wait let's use a real one
// "LIMINAL" encoded with ROT-7 shift => L+7=S, I+7=P, M+7=T, I+7=P, N+7=U, A+7=H, L+7=S → "SPTPUHS"
// Player finds encoded string "SPTPUHS" and the shift hint (7) scattered across USENET + CipheX
// Decoded answer: LIMINAL

// Puzzle 2: Word pattern — first word of 3 specific posts across 3 sites
// Marcus blog post starts with "THRESHOLD"
// Midnight Shrine has a poem where every 7th word is part of the phrase
// News archive headline that starts with "CASCADE"
// The three hidden words in order: THRESHOLD + CASCADE + LIMINAL = "TCL"? No...
// Let's make it a keyword the player assembles: each site hides ONE WORD
// Site A: "BELOW" | Site B: "THE" | Site C: "SURFACE"
// Combined phrase (in order): "BELOW THE SURFACE" → answer: belowthesurface

// Puzzle 3: Three sites each have a coordinate number
// Room 404: "47" | AltaVault hidden result: "11" | The Hollow Webring: "09"
// Combined: "471109" — this is the access code to THE ENDPOINT

export const PUZZLES: PuzzleDefinition[] = [
  {
    id: 'caesar_cipher',
    name: 'The Encoded Transmission',
    description:
      'A mysterious encoded message was posted to the USENET mirror by user "hollow_eye". ' +
      'Find the cipher key hidden on the CipheX Terminal and decode the message.',
    type: 'caesar',
    answer: 'liminal', // player decodes "SPTPUHS" with shift 7
    unlocks: 'valdris://restricted',
    hint: 'The shift key was posted in plain sight — look at what CipheX calls "The Standard Offset".',
  },
  {
    id: 'word_pattern',
    name: 'The Hidden Phrase',
    description:
      'Three different sites each hide one word of a secret phrase. ' +
      'Find the word hidden on Marcus\'s blog, the Midnight Shrine, and the Daily Packet archive.',
    type: 'word_pattern',
    answer: 'belowthesurface',
    unlocks: 'valdris://final-message',
    hint: 'Each page highlights one word differently. Read the marked words in the order: Blog → Shrine → News.',
  },
  {
    id: 'coordinate_code',
    name: 'The Access Sequence',
    description:
      'Three nodes of the old network each hold part of the final access code. ' +
      'Find the number hidden on Room 404, the AltaVault hidden result, and the Hollow Webring listing.',
    type: 'coordinate',
    answer: '471109',
    unlocks: 'endpoint://the-endpoint',
    hint: 'The numbers appear as data artifacts — dates, post IDs, member counts. Write them in the order: Room → Search → Ring.',
  },
];

export function getPuzzle(id: string): PuzzleDefinition | undefined {
  return PUZZLES.find(p => p.id === id);
}

export function validateAnswer(puzzleId: string, rawAnswer: string): boolean {
  const puzzle = getPuzzle(puzzleId);
  if (!puzzle) return false;
  const normalized = rawAnswer.toLowerCase().replace(/\s+/g, '').trim();
  return normalized === puzzle.answer;
}

export function caesarDecode(text: string, shift: number): string {
  return text
    .split('')
    .map(char => {
      if (/[A-Za-z]/.test(char)) {
        const base = char >= 'a' ? 97 : 65;
        return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
      }
      return char;
    })
    .join('');
}

export function caesarEncode(text: string, shift: number): string {
  return caesarDecode(text, 26 - shift);
}
