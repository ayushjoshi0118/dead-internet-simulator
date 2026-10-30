import type { ProgressState, Bookmark, Clue, Tab } from './types';

const STORAGE_KEY = 'dead_internet_progress';
const SCHEMA_VERSION = 2;
const HOME_URL = 'altavault://search';

function defaultProgress(): ProgressState {
  const startTab: Tab = {
    id: 'tab-1',
    url: HOME_URL,
    title: 'AltaVault Search',
    favicon: '🔍',
  };
  return {
    version: SCHEMA_VERSION,
    visitedUrls: [],
    unlockedPages: [],
    solvedPuzzles: [],
    bookmarks: [],
    discoveredClues: [],
    currentUrl: HOME_URL,
    tabs: [startTab],
    history: [],
    startedAt: Date.now(),
  };
}

function validate(raw: unknown): ProgressState {
  if (
    typeof raw !== 'object' ||
    raw === null ||
    (raw as ProgressState).version !== SCHEMA_VERSION
  ) {
    return defaultProgress();
  }
  const p = raw as ProgressState;
  // Coerce arrays
  return {
    version: SCHEMA_VERSION,
    visitedUrls: Array.isArray(p.visitedUrls) ? p.visitedUrls : [],
    unlockedPages: Array.isArray(p.unlockedPages) ? p.unlockedPages : [],
    solvedPuzzles: Array.isArray(p.solvedPuzzles) ? p.solvedPuzzles : [],
    bookmarks: Array.isArray(p.bookmarks) ? p.bookmarks : [],
    discoveredClues: Array.isArray(p.discoveredClues) ? p.discoveredClues : [],
    currentUrl: typeof p.currentUrl === 'string' ? p.currentUrl : HOME_URL,
    tabs: Array.isArray(p.tabs) && p.tabs.length > 0 ? p.tabs : defaultProgress().tabs,
    history: Array.isArray(p.history) ? p.history : [],
    startedAt: typeof p.startedAt === 'number' ? p.startedAt : Date.now(),
    completedAt: typeof p.completedAt === 'number' ? p.completedAt : undefined,
  };
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return validate(JSON.parse(raw));
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silent fail
  }
}

export function resetProgress(): ProgressState {
  localStorage.removeItem(STORAGE_KEY);
  const fresh = defaultProgress();
  saveProgress(fresh);
  return fresh;
}

// Mutations — all return new state objects (immutable updates)

export function recordVisit(state: ProgressState, url: string): ProgressState {
  if (state.visitedUrls.includes(url)) return state;
  return { ...state, visitedUrls: [...state.visitedUrls, url] };
}

export function unlockPage(state: ProgressState, pageUrl: string): ProgressState {
  if (state.unlockedPages.includes(pageUrl)) return state;
  return { ...state, unlockedPages: [...state.unlockedPages, pageUrl] };
}

export function solvePuzzle(state: ProgressState, puzzleId: string): ProgressState {
  if (state.solvedPuzzles.includes(puzzleId)) return state;
  return { ...state, solvedPuzzles: [...state.solvedPuzzles, puzzleId] };
}

export function addBookmark(state: ProgressState, bookmark: Bookmark): ProgressState {
  if (state.bookmarks.some(b => b.url === bookmark.url)) return state;
  return { ...state, bookmarks: [...state.bookmarks, bookmark] };
}

export function removeBookmark(state: ProgressState, url: string): ProgressState {
  return { ...state, bookmarks: state.bookmarks.filter(b => b.url !== url) };
}

export function discoverClue(state: ProgressState, clue: Clue): ProgressState {
  if (state.discoveredClues.some(c => c.id === clue.id)) return state;
  return { ...state, discoveredClues: [...state.discoveredClues, clue] };
}

export function markComplete(state: ProgressState): ProgressState {
  return { ...state, completedAt: Date.now() };
}

export function getProgressPercentage(state: ProgressState): number {
  const TOTAL_PAGES = 12;
  const TOTAL_PUZZLES = 3;
  const TOTAL_CLUES = 15;
  const pageScore = Math.min(state.visitedUrls.length / TOTAL_PAGES, 1) * 40;
  const puzzleScore = (state.solvedPuzzles.length / TOTAL_PUZZLES) * 40;
  const clueScore = Math.min(state.discoveredClues.length / TOTAL_CLUES, 1) * 20;
  return Math.round(pageScore + puzzleScore + clueScore);
}
