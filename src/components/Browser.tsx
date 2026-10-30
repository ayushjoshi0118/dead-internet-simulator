import { useEffect, useState } from 'react';
import { TabBar } from './TabBar';
import { AddressBar } from './AddressBar';
import { PageRenderer } from './PageRenderer';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { useApp } from '../context/AppContext';

function WelcomeOverlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="welcome-overlay" role="dialog" aria-modal="true" aria-label="Welcome">
      <div className="welcome-box">
        <div className="welcome-title">◈ DEAD INTERNET SIMULATOR ◈</div>
        <div className="welcome-subtitle">NetVault Browser v3.2 — Dead Internet Edition</div>
        <p className="welcome-body">
          You are browsing the archived remnants of a corner of the internet that went dark in 2002.
          <br /><br />
          Somewhere in these pages is a story — and a mystery that needs solving.
          <br /><br />
          <strong>Explore. Follow links. Read carefully. Take notes.</strong>
          <br /><br />
          Open the <strong>🗒 Notebook</strong> (top-right) to track clues and submit puzzle answers.
        </p>
        <div className="welcome-controls">
          <div className="welcome-control"><kbd>Click link</kbd> — Navigate</div>
          <div className="welcome-control"><kbd>☆</kbd> — Bookmark page</div>
          <div className="welcome-control"><kbd>◧</kbd> — Open sidebar</div>
          <div className="welcome-control"><kbd>Alt + ←/→</kbd> — Back / Forward</div>
        </div>
        <button className="welcome-start" onClick={onDismiss}>
          ▶ Enter the Dead Internet
        </button>
      </div>
    </div>
  );
}

export function Browser() {
  const { dispatch, state } = useApp();
  const [showWelcome, setShowWelcome] = useState(
    () => state.progress.visitedUrls.length === 0
  );

  function handleSearch(query: string) {
    dispatch({ type: 'SET_SEARCH', query });
  }

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        dispatch({ type: 'GO_BACK' });
      }
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        dispatch({ type: 'GO_FORWARD' });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  return (
    <div className={`browser ${state.glitchActive ? 'browser--glitch' : ''}`}>
      {showWelcome && (
        <WelcomeOverlay onDismiss={() => setShowWelcome(false)} />
      )}

      {/* Browser Chrome */}
      <div className="browser-chrome">
        <div className="browser-titlebar">
          <div className="browser-window-controls" aria-hidden="true">
            <span className="wc wc-close" />
            <span className="wc wc-min" />
            <span className="wc wc-max" />
          </div>
          <span className="browser-name">
            ◈ NetVault Browser v3.2 — Dead Internet Edition
          </span>
          <div className="browser-toolbar-right">
            <button
              className="toolbar-btn"
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
              title="Toggle sidebar"
              aria-label="Toggle sidebar"
              aria-pressed={state.sidebarOpen}
            >
              {state.sidebarOpen ? '◨' : '◧'}
            </button>
            <button
              className="toolbar-btn"
              onClick={() => dispatch({ type: 'SET_SIDEBAR_TAB', tab: 'notebook' })}
              title="Open Notebook"
              aria-label="Open notebook"
            >
              🗒
            </button>
          </div>
        </div>
        <TabBar />
        <AddressBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <div className="browser-body">
        <div className="browser-viewport">
          <PageRenderer />
        </div>
        {state.sidebarOpen && <Sidebar />}
      </div>

      <StatusBar />
    </div>
  );
}
