import React from 'react';
import { useApp } from '../context/AppContext';
import { PAGES } from '../sites/pages';
import { SearchResultsPage } from './SearchResultsPage';
import { getProgressPercentage } from '../engine/progress';

export function PageRenderer() {
  const { currentUrl, navigate, state, dispatch } = useApp();

  // Locked page intercept
  if (currentUrl.startsWith('locked://')) {
    const lockedUrl = currentUrl.replace('locked://', '');
    const page = PAGES[lockedUrl];
    return (
      <div className="page-locked">
        <div className="locked-icon">🔒</div>
        <h2>Access Restricted</h2>
        <p>This page requires a puzzle solution to access.</p>
        {page?.unlockKey && (
          <p>
            Solve the puzzle in the{' '}
            <button
              className="locked-notebook-link"
              onClick={() => dispatch({ type: 'SET_SIDEBAR_TAB', tab: 'notebook' })}
            >
              🗒 Notebook
            </button>{' '}
            to unlock it.
          </p>
        )}
        <p className="locked-url">
          Attempting to access: <code>{lockedUrl}</code>
        </p>
      </div>
    );
  }

  // Search results overlay on AltaVault
  if (currentUrl === 'altavault://search' && state.searchQuery) {
    return <SearchResultsPage query={state.searchQuery} />;
  }

  const page = PAGES[currentUrl];

  if (!page) {
    return (
      <div className="page-404">
        <div className="p404-code">404</div>
        <h2>Page Not Found</h2>
        <p>
          The page <code>{currentUrl}</code> could not be found on this network.
        </p>
        <p>It may have been removed, moved, or it never existed.</p>
        <button onClick={() => navigate('altavault://search')} className="p404-home">
          ↩ Return to AltaVault Search
        </button>
      </div>
    );
  }

  const style: React.CSSProperties = {
    backgroundColor: page.bgColor || '#fff',
    color: page.textColor || '#000',
    fontFamily: page.fontFamily || 'inherit',
  };

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const anchor = (e.target as HTMLElement).closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto')) return;
    e.preventDefault();
    navigate(href);
  }

  // Inject completion stats into endpoint page
  let html = page.html;
  if (currentUrl === 'endpoint://the-endpoint') {
    const pct = getProgressPercentage(state.progress);
    const statsHtml = `
      <div class="endpoint-stats">
        <p>Pages explored: ${state.progress.visitedUrls.length} / 12</p>
        <p>Clues discovered: ${state.progress.discoveredClues.length} / 15</p>
        <p>Puzzles solved: ${state.progress.solvedPuzzles.length} / 3</p>
        <p>Completion: ${pct}%</p>
      </div>`;
    html = html.replace('<!-- Dynamic stats injected by React -->', statsHtml);
  }

  return (
    <div className="page-content" style={style} onClick={handleClick}>
      <div className="page-inner" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
