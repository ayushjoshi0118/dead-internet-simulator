// Navigation engine — manages URL resolution, history stack, and tab routing

import type { Tab, BrowserHistory } from './types';

export const HOME_URL = 'altavault://search';

export interface NavigationState {
  activeTabId: string;
  tabs: Tab[];
  tabHistories: Record<string, BrowserHistory>;
}

export function createInitialNavState(): NavigationState {
  const tab: Tab = { id: 'tab-1', url: HOME_URL, title: 'AltaVault Search', favicon: '🔍' };
  return {
    activeTabId: 'tab-1',
    tabs: [tab],
    tabHistories: { 'tab-1': { past: [], future: [] } },
  };
}

export function navigateTo(
  state: NavigationState,
  url: string,
  title: string,
  favicon?: string
): NavigationState {
  const { activeTabId, tabs, tabHistories } = state;
  const currentTab = tabs.find(t => t.id === activeTabId)!;
  const currentHistory = tabHistories[activeTabId] || { past: [], future: [] };

  const newHistory: BrowserHistory = {
    past: [...currentHistory.past, currentTab.url],
    future: [], // clear forward stack on new navigation
  };

  const updatedTab: Tab = { ...currentTab, url, title, favicon };
  return {
    ...state,
    tabs: tabs.map(t => (t.id === activeTabId ? updatedTab : t)),
    tabHistories: { ...tabHistories, [activeTabId]: newHistory },
  };
}

export function goBack(state: NavigationState): NavigationState {
  const { activeTabId, tabs, tabHistories } = state;
  const history = tabHistories[activeTabId];
  if (!history || history.past.length === 0) return state;

  const currentTab = tabs.find(t => t.id === activeTabId)!;
  const prevUrl = history.past[history.past.length - 1];

  const newHistory: BrowserHistory = {
    past: history.past.slice(0, -1),
    future: [currentTab.url, ...history.future],
  };

  // Title will be updated by PageRenderer on render
  const updatedTab: Tab = { ...currentTab, url: prevUrl };
  return {
    ...state,
    tabs: tabs.map(t => (t.id === activeTabId ? updatedTab : t)),
    tabHistories: { ...tabHistories, [activeTabId]: newHistory },
  };
}

export function goForward(state: NavigationState): NavigationState {
  const { activeTabId, tabs, tabHistories } = state;
  const history = tabHistories[activeTabId];
  if (!history || history.future.length === 0) return state;

  const currentTab = tabs.find(t => t.id === activeTabId)!;
  const nextUrl = history.future[0];

  const newHistory: BrowserHistory = {
    past: [...history.past, currentTab.url],
    future: history.future.slice(1),
  };

  const updatedTab: Tab = { ...currentTab, url: nextUrl };
  return {
    ...state,
    tabs: tabs.map(t => (t.id === activeTabId ? updatedTab : t)),
    tabHistories: { ...tabHistories, [activeTabId]: newHistory },
  };
}

export function openNewTab(state: NavigationState, url?: string): NavigationState {
  const tabUrl = url || HOME_URL;
  const id = `tab-${Date.now()}`;
  const tab: Tab = { id, url: tabUrl, title: 'New Tab', favicon: '🌐' };
  return {
    ...state,
    activeTabId: id,
    tabs: [...state.tabs, tab],
    tabHistories: { ...state.tabHistories, [id]: { past: [], future: [] } },
  };
}

export function closeTab(state: NavigationState, tabId: string): NavigationState {
  if (state.tabs.length === 1) return state; // can't close last tab
  const newTabs = state.tabs.filter(t => t.id !== tabId);
  const newActiveId =
    state.activeTabId === tabId
      ? newTabs[newTabs.length - 1].id
      : state.activeTabId;
  const newHistories = { ...state.tabHistories };
  delete newHistories[tabId];
  return { ...state, tabs: newTabs, activeTabId: newActiveId, tabHistories: newHistories };
}

export function switchTab(state: NavigationState, tabId: string): NavigationState {
  if (!state.tabs.find(t => t.id === tabId)) return state;
  return { ...state, activeTabId: tabId };
}

export function canGoBack(state: NavigationState): boolean {
  const h = state.tabHistories[state.activeTabId];
  return !!h && h.past.length > 0;
}

export function canGoForward(state: NavigationState): boolean {
  const h = state.tabHistories[state.activeTabId];
  return !!h && h.future.length > 0;
}

export function getCurrentUrl(state: NavigationState): string {
  const tab = state.tabs.find(t => t.id === state.activeTabId);
  return tab?.url || HOME_URL;
}

export function normalizeUrl(url: string): string {
  return url.toLowerCase().trim();
}
