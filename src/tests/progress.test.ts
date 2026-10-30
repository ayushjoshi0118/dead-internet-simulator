import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadProgress,
  saveProgress,
  resetProgress,
  recordVisit,
  unlockPage,
  solvePuzzle,
  addBookmark,
  removeBookmark,
  discoverClue,
  markComplete,
  getProgressPercentage,
} from '../engine/progress';
import type { Bookmark, Clue } from '../engine/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('Progress Persistence', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('loads fresh progress when storage is empty', () => {
    const p = loadProgress();
    expect(p.visitedUrls).toEqual([]);
    expect(p.solvedPuzzles).toEqual([]);
    expect(p.bookmarks).toEqual([]);
    expect(p.version).toBe(2);
  });

  it('saves and reloads progress correctly', () => {
    let p = loadProgress();
    p = recordVisit(p, 'hollow://webring');
    saveProgress(p);
    const reloaded = loadProgress();
    expect(reloaded.visitedUrls).toContain('hollow://webring');
  });

  it('resets progress to fresh state', () => {
    let p = loadProgress();
    p = recordVisit(p, 'hollow://webring');
    saveProgress(p);
    const fresh = resetProgress();
    expect(fresh.visitedUrls).toEqual([]);
  });

  it('discards invalid/corrupt progress data', () => {
    localStorage.setItem('dead_internet_progress', 'not-json{{{{');
    const p = loadProgress();
    expect(p.visitedUrls).toEqual([]);
  });

  it('discards progress with wrong schema version', () => {
    localStorage.setItem('dead_internet_progress', JSON.stringify({ version: 999, visitedUrls: ['x'] }));
    const p = loadProgress();
    expect(p.visitedUrls).toEqual([]);
  });

  describe('recordVisit', () => {
    it('adds a URL to visitedUrls', () => {
      const p = recordVisit(loadProgress(), 'room://404');
      expect(p.visitedUrls).toContain('room://404');
    });

    it('does not add duplicates', () => {
      let p = recordVisit(loadProgress(), 'room://404');
      p = recordVisit(p, 'room://404');
      expect(p.visitedUrls.filter(u => u === 'room://404').length).toBe(1);
    });
  });

  describe('unlockPage', () => {
    it('adds a page to unlockedPages', () => {
      const p = unlockPage(loadProgress(), 'valdris://restricted');
      expect(p.unlockedPages).toContain('valdris://restricted');
    });

    it('does not add duplicates', () => {
      let p = unlockPage(loadProgress(), 'valdris://restricted');
      p = unlockPage(p, 'valdris://restricted');
      expect(p.unlockedPages.filter(u => u === 'valdris://restricted').length).toBe(1);
    });
  });

  describe('solvePuzzle', () => {
    it('adds puzzleId to solvedPuzzles', () => {
      const p = solvePuzzle(loadProgress(), 'caesar_cipher');
      expect(p.solvedPuzzles).toContain('caesar_cipher');
    });

    it('is idempotent', () => {
      let p = solvePuzzle(loadProgress(), 'caesar_cipher');
      p = solvePuzzle(p, 'caesar_cipher');
      expect(p.solvedPuzzles.length).toBe(1);
    });
  });

  describe('bookmarks', () => {
    const bm: Bookmark = { url: 'room://404', title: 'Room 404', addedAt: 1 };

    it('adds a bookmark', () => {
      const p = addBookmark(loadProgress(), bm);
      expect(p.bookmarks).toHaveLength(1);
      expect(p.bookmarks[0].url).toBe('room://404');
    });

    it('does not add duplicate bookmarks', () => {
      let p = addBookmark(loadProgress(), bm);
      p = addBookmark(p, bm);
      expect(p.bookmarks).toHaveLength(1);
    });

    it('removes a bookmark', () => {
      let p = addBookmark(loadProgress(), bm);
      p = removeBookmark(p, bm.url);
      expect(p.bookmarks).toHaveLength(0);
    });
  });

  describe('clues', () => {
    const clue: Clue = { id: 'clue_shift_seven', text: 'test', foundAt: 'x', discoveredAt: 1 };

    it('discovers a clue', () => {
      const p = discoverClue(loadProgress(), clue);
      expect(p.discoveredClues).toHaveLength(1);
    });

    it('does not add duplicate clues', () => {
      let p = discoverClue(loadProgress(), clue);
      p = discoverClue(p, clue);
      expect(p.discoveredClues).toHaveLength(1);
    });
  });

  describe('completion', () => {
    it('marks game as complete with timestamp', () => {
      const p = markComplete(loadProgress());
      expect(p.completedAt).toBeGreaterThan(0);
    });
  });

  describe('getProgressPercentage', () => {
    it('returns 0 for fresh state', () => {
      expect(getProgressPercentage(loadProgress())).toBe(0);
    });

    it('returns 100 for fully completed state', () => {
      let p = loadProgress();
      // 12 pages, 3 puzzles, 15 clues
      for (let i = 0; i < 12; i++) p = recordVisit(p, `page-${i}`);
      p = solvePuzzle(p, 'caesar_cipher');
      p = solvePuzzle(p, 'word_pattern');
      p = solvePuzzle(p, 'coordinate_code');
      for (let i = 0; i < 15; i++) {
        p = discoverClue(p, { id: `clue-${i}`, text: '', foundAt: '', discoveredAt: 0 });
      }
      expect(getProgressPercentage(p)).toBe(100);
    });

    it('caps at 100 even with more than max', () => {
      let p = loadProgress();
      for (let i = 0; i < 50; i++) p = recordVisit(p, `extra-${i}`);
      expect(getProgressPercentage(p)).toBeLessThanOrEqual(100);
    });
  });
});
