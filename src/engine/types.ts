// Core types for the Dead Internet Simulator engine

export interface SiteDefinition {
  url: string;
  title: string;
  favicon?: string;
  locked?: boolean; // requires unlock via puzzle
  unlockKey?: string; // which puzzle key unlocks it
}

export interface Page {
  url: string;
  title: string;
  content: string; // raw HTML-like content rendered by PageRenderer
  links?: string[]; // outgoing links (for directory)
  clues?: string[]; // clue IDs embedded on this page
  isLocked?: boolean;
  unlockKey?: string;
}

export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
}

export interface BrowserHistory {
  past: string[];
  future: string[];
}

export interface Bookmark {
  url: string;
  title: string;
  addedAt: number;
}

export interface Clue {
  id: string;
  text: string;
  foundAt: string; // URL where discovered
  discoveredAt: number; // timestamp
}

export interface PuzzleDefinition {
  id: string;
  name: string;
  description: string;
  type: 'caesar' | 'word_pattern' | 'coordinate';
  answer: string; // lowercase, normalized
  unlocks: string; // url or page key unlocked on success
  hint?: string;
}

export interface ProgressState {
  version: number;
  visitedUrls: string[];
  unlockedPages: string[];
  solvedPuzzles: string[];
  bookmarks: Bookmark[];
  discoveredClues: Clue[];
  currentUrl: string;
  tabs: Tab[];
  history: string[];
  startedAt: number;
  completedAt?: number;
}
