import { describe, it, expect, beforeEach } from 'vitest';
import {
  createInitialNavState,
  navigateTo,
  goBack,
  goForward,
  openNewTab,
  closeTab,
  switchTab,
  canGoBack,
  canGoForward,
  getCurrentUrl,
} from '../engine/navigation';

describe('Navigation Engine', () => {
  let state = createInitialNavState();

  beforeEach(() => {
    state = createInitialNavState();
  });

  it('starts with the home URL', () => {
    expect(getCurrentUrl(state)).toBe('altavault://search');
  });

  it('navigates to a new URL', () => {
    const s = navigateTo(state, 'hollow://webring', 'The Hollow Webring');
    expect(getCurrentUrl(s)).toBe('hollow://webring');
  });

  it('can go back after navigation', () => {
    let s = navigateTo(state, 'hollow://webring', 'Webring');
    expect(canGoBack(s)).toBe(true);
    s = goBack(s);
    expect(getCurrentUrl(s)).toBe('altavault://search');
  });

  it('can go forward after going back', () => {
    let s = navigateTo(state, 'hollow://webring', 'Webring');
    s = goBack(s);
    expect(canGoForward(s)).toBe(true);
    s = goForward(s);
    expect(getCurrentUrl(s)).toBe('hollow://webring');
  });

  it('clears forward stack on new navigation', () => {
    let s = navigateTo(state, 'hollow://webring', 'Webring');
    s = goBack(s);
    s = navigateTo(s, 'valdris://home', 'Valdris');
    expect(canGoForward(s)).toBe(false);
  });

  it('cannot go back from the first page', () => {
    expect(canGoBack(state)).toBe(false);
  });

  it('opens a new tab', () => {
    const s = openNewTab(state, 'room://404');
    expect(s.tabs.length).toBe(2);
    expect(getCurrentUrl(s)).toBe('room://404');
  });

  it('closes a tab and switches to another', () => {
    let s = openNewTab(state, 'room://404');
    const secondTabId = s.activeTabId;
    s = closeTab(s, secondTabId);
    expect(s.tabs.length).toBe(1);
    expect(s.tabs[0].url).toBe('altavault://search');
  });

  it('cannot close the last tab', () => {
    const s = closeTab(state, state.tabs[0].id);
    expect(s.tabs.length).toBe(1);
  });

  it('switches between tabs', () => {
    let s = openNewTab(state, 'room://404');
    const secondId = s.activeTabId;
    s = switchTab(s, state.tabs[0].id);
    expect(getCurrentUrl(s)).toBe('altavault://search');
    s = switchTab(s, secondId);
    expect(getCurrentUrl(s)).toBe('room://404');
  });

  it('maintains independent history per tab', () => {
    let s = navigateTo(state, 'hollow://webring', 'Webring');
    s = openNewTab(s, 'valdris://home');
    // Back on second tab should not affect first tab's history
    expect(canGoBack(s)).toBe(false); // new tab has no history
    s = switchTab(s, s.tabs[0].id);
    expect(canGoBack(s)).toBe(true);
  });
});
