import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import type { Tab, Bookmark, Clue } from '../engine/types';
import {
  loadProgress,
  saveProgress,
  resetProgress as resetProgressStore,
  recordVisit,
  unlockPage,
  solvePuzzle,
  addBookmark,
  removeBookmark,
  discoverClue,
  markComplete,
} from '../engine/progress';
import type { ProgressState } from '../engine/types';
import {
  createInitialNavState,
  navigateTo as navTo,
  goBack as navBack,
  goForward as navForward,
  openNewTab as navOpenTab,
  closeTab as navCloseTab,
  switchTab as navSwitchTab,
  canGoBack,
  canGoForward,
  getCurrentUrl,
} from '../engine/navigation';
import type { NavigationState } from '../engine/navigation';
import { PAGES, ALL_CLUES } from '../sites/pages';
import { validateAnswer, PUZZLES } from '../engine/puzzles';

// ── State ─────────────────────────────────────────────────────────────────

interface AppState {
  progress: ProgressState;
  nav: NavigationState;
  sidebarTab: 'history' | 'bookmarks' | 'notebook';
  sidebarOpen: boolean;
  statusMessage: string;
  glitchActive: boolean;
  searchQuery: string;
}

// ── Actions ───────────────────────────────────────────────────────────────

type Action =
  | { type: 'NAV_PUSH'; url: string; title: string; favicon?: string }
  | { type: 'GO_BACK' }
  | { type: 'GO_FORWARD' }
  | { type: 'OPEN_TAB'; url?: string }
  | { type: 'CLOSE_TAB'; tabId: string }
  | { type: 'SWITCH_TAB'; tabId: string }
  | { type: 'RECORD_VISIT'; url: string }
  | { type: 'ADD_BOOKMARK'; bookmark: Bookmark }
  | { type: 'REMOVE_BOOKMARK'; url: string }
  | { type: 'DISCOVER_CLUE'; clue: Clue }
  | { type: 'UNLOCK_PAGE'; pageUrl: string }
  | { type: 'SOLVE_PUZZLE'; puzzleId: string; unlocks: string }
  | { type: 'MARK_COMPLETE' }
  | { type: 'RESET' }
  | { type: 'SET_SIDEBAR_TAB'; tab: 'history' | 'bookmarks' | 'notebook' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_STATUS'; message: string }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'GLITCH' };

function buildInitialState(): AppState {
  const progress = loadProgress();
  const nav = createInitialNavState();
  // Restore saved tabs
  if (progress.tabs && progress.tabs.length > 0) {
    nav.tabs = progress.tabs;
    nav.activeTabId = progress.tabs[0].id;
    // restore histories as empty (we only persist tab URLs, not full history stacks)
    nav.tabHistories = {};
    progress.tabs.forEach(t => {
      nav.tabHistories[t.id] = { past: [], future: [] };
    });
  }
  return {
    progress,
    nav,
    sidebarTab: 'history',
    sidebarOpen: false,
    statusMessage: 'Welcome to the Dead Internet.',
    glitchActive: false,
    searchQuery: '',
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'NAV_PUSH': {
      const newNav = navTo(state.nav, action.url, action.title, action.favicon);
      return { ...state, nav: newNav };
    }
    case 'GO_BACK': {
      if (!canGoBack(state.nav)) return state;
      return { ...state, nav: navBack(state.nav) };
    }
    case 'GO_FORWARD': {
      if (!canGoForward(state.nav)) return state;
      return { ...state, nav: navForward(state.nav) };
    }
    case 'OPEN_TAB':
      return { ...state, nav: navOpenTab(state.nav, action.url) };
    case 'CLOSE_TAB':
      return { ...state, nav: navCloseTab(state.nav, action.tabId) };
    case 'SWITCH_TAB':
      return { ...state, nav: navSwitchTab(state.nav, action.tabId) };
    case 'RECORD_VISIT':
      return { ...state, progress: recordVisit(state.progress, action.url) };
    case 'ADD_BOOKMARK':
      return { ...state, progress: addBookmark(state.progress, action.bookmark) };
    case 'REMOVE_BOOKMARK':
      return { ...state, progress: removeBookmark(state.progress, action.url) };
    case 'DISCOVER_CLUE':
      return { ...state, progress: discoverClue(state.progress, action.clue) };
    case 'UNLOCK_PAGE':
      return { ...state, progress: unlockPage(state.progress, action.pageUrl) };
    case 'SOLVE_PUZZLE': {
      const p1 = solvePuzzle(state.progress, action.puzzleId);
      const p2 = unlockPage(p1, action.unlocks);
      return { ...state, progress: p2 };
    }
    case 'MARK_COMPLETE':
      return { ...state, progress: markComplete(state.progress) };
    case 'RESET':
      resetProgressStore();
      return buildInitialState();
    case 'SET_SIDEBAR_TAB':
      return { ...state, sidebarTab: action.tab, sidebarOpen: true };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_STATUS':
      return { ...state, statusMessage: action.message };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query };
    case 'GLITCH':
      return { ...state, glitchActive: !state.glitchActive };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  navigate: (url: string) => void;
  currentUrl: string;
  currentTab: Tab | undefined;
  canBack: boolean;
  canFwd: boolean;
  isBookmarked: (url: string) => boolean;
  submitPuzzleAnswer: (puzzleId: string, answer: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);
  const prevUrl = useRef<string>('');

  const currentUrl = getCurrentUrl(state.nav);

  // Persist progress + tabs on every change
  useEffect(() => {
    const progressWithTabs = { ...state.progress, tabs: state.nav.tabs };
    saveProgress(progressWithTabs);
  }, [state.progress, state.nav.tabs]);

  // Side-effects on URL change: record visit + auto-discover clues
  useEffect(() => {
    if (currentUrl === prevUrl.current) return;
    prevUrl.current = currentUrl;

    // Skip locked pseudo-urls
    if (currentUrl.startsWith('locked://')) return;

    const page = PAGES[currentUrl];
    if (!page) return;

    // Record visit
    dispatch({ type: 'RECORD_VISIT', url: currentUrl });

    // Auto-discover clues
    if (page.clueIds) {
      page.clueIds.forEach(clueId => {
        const clueDef = ALL_CLUES.find(c => c.id === clueId);
        if (clueDef) {
          dispatch({
            type: 'DISCOVER_CLUE',
            clue: {
              id: clueDef.id,
              text: clueDef.text,
              foundAt: currentUrl,
              discoveredAt: Date.now(),
            },
          });
        }
      });
    }

    // Update title on the active tab
    dispatch({ type: 'NAV_PUSH', url: currentUrl, title: page.title, favicon: page.favicon });
    dispatch({ type: 'SET_STATUS', message: `Loaded: ${currentUrl}` });
  }, [currentUrl]);

  // Occasional glitch
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        dispatch({ type: 'GLITCH' });
        setTimeout(() => dispatch({ type: 'GLITCH' }), 200);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useCallback(
    (url: string) => {
      const page = PAGES[url];
      if (!page) {
        dispatch({ type: 'SET_STATUS', message: `ERROR: Page not found — ${url}` });
        return;
      }
      // Check locked
      if (page.unlockKey && !state.progress.unlockedPages.includes(url)) {
        dispatch({ type: 'SET_STATUS', message: 'ACCESS DENIED — Solve the puzzle first.' });
        dispatch({ type: 'NAV_PUSH', url: 'locked://' + url, title: page.title + ' [LOCKED]', favicon: '🔒' });
        return;
      }
      dispatch({ type: 'NAV_PUSH', url, title: page.title, favicon: page.favicon });
    },
    [state.progress.unlockedPages]
  );

  const isBookmarked = useCallback(
    (url: string) => state.progress.bookmarks.some(b => b.url === url),
    [state.progress.bookmarks]
  );

  const submitPuzzleAnswer = useCallback(
    (puzzleId: string, answer: string): boolean => {
      const correct = validateAnswer(puzzleId, answer);
      if (correct) {
        const puzzle = PUZZLES.find(p => p.id === puzzleId);
        if (puzzle) {
          dispatch({ type: 'SOLVE_PUZZLE', puzzleId, unlocks: puzzle.unlocks });
          dispatch({
            type: 'SET_STATUS',
            message: `✓ Puzzle solved! "${puzzle.name}" — ${puzzle.unlocks} unlocked.`,
          });
          const nowSolved = state.progress.solvedPuzzles.includes(puzzleId)
            ? state.progress.solvedPuzzles.length
            : state.progress.solvedPuzzles.length + 1;
          if (nowSolved >= PUZZLES.length) {
            dispatch({ type: 'MARK_COMPLETE' });
          }
        }
      }
      return correct;
    },
    [state.progress.solvedPuzzles]
  );

  const currentTab = state.nav.tabs.find(t => t.id === state.nav.activeTabId);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        navigate,
        currentUrl,
        currentTab,
        canBack: canGoBack(state.nav),
        canFwd: canGoForward(state.nav),
        isBookmarked,
        submitPuzzleAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
