import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PUZZLES } from '../engine/puzzles';
import { ALL_CLUES } from '../sites/pages';

export function Sidebar() {
  const { state, dispatch, navigate, submitPuzzleAnswer } = useApp();
  const { sidebarOpen, sidebarTab, progress } = state;
  const [puzzleOpen, setPuzzleOpen] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [showReset, setShowReset] = useState(false);

  if (!sidebarOpen) return null;

  function handlePuzzleSubmit(puzzleId: string) {
    const answer = answers[puzzleId] || '';
    const correct = submitPuzzleAnswer(puzzleId, answer);
    if (correct) {
      setFeedback(prev => ({ ...prev, [puzzleId]: '✓ Correct! Page unlocked.' }));
    } else {
      setFeedback(prev => ({ ...prev, [puzzleId]: '✗ Incorrect. Try again.' }));
    }
  }

  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={sidebarTab === 'history'}
          className={`sidebar-tab-btn ${sidebarTab === 'history' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_SIDEBAR_TAB', tab: 'history' })}
        >📜 History</button>
        <button
          role="tab"
          aria-selected={sidebarTab === 'bookmarks'}
          className={`sidebar-tab-btn ${sidebarTab === 'bookmarks' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_SIDEBAR_TAB', tab: 'bookmarks' })}
        >★ Bookmarks</button>
        <button
          role="tab"
          aria-selected={sidebarTab === 'notebook'}
          className={`sidebar-tab-btn ${sidebarTab === 'notebook' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_SIDEBAR_TAB', tab: 'notebook' })}
        >🗒 Notebook</button>
        <button
          className="sidebar-close"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          aria-label="Close sidebar"
        >✕</button>
      </div>

      <div className="sidebar-content" role="tabpanel">
        {/* ── HISTORY ─────────────────────────── */}
        {sidebarTab === 'history' && (
          <div className="sidebar-history">
            <h3>Visited Pages</h3>
            {progress.visitedUrls.length === 0 ? (
              <p className="sidebar-empty">No history yet. Start exploring!</p>
            ) : (
              <ul className="sidebar-list">
                {[...progress.visitedUrls].reverse().map(url => (
                  <li key={url} className="sidebar-list-item">
                    <button className="sidebar-link" onClick={() => navigate(url)}>
                      {url}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── BOOKMARKS ───────────────────────── */}
        {sidebarTab === 'bookmarks' && (
          <div className="sidebar-bookmarks">
            <h3>Bookmarks</h3>
            {progress.bookmarks.length === 0 ? (
              <p className="sidebar-empty">No bookmarks yet. Click ☆ to save a page.</p>
            ) : (
              <ul className="sidebar-list">
                {progress.bookmarks.map(b => (
                  <li key={b.url} className="sidebar-list-item sidebar-bookmark-item">
                    <button className="sidebar-link" onClick={() => navigate(b.url)}>
                      {b.title}
                    </button>
                    <button
                      className="sidebar-remove"
                      onClick={() => dispatch({ type: 'REMOVE_BOOKMARK', url: b.url })}
                      aria-label={`Remove bookmark for ${b.title}`}
                    >✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── NOTEBOOK ────────────────────────── */}
        {sidebarTab === 'notebook' && (
          <div className="sidebar-notebook">
            <h3>🗒 Clue Notebook</h3>
            <p className="sidebar-note-meta">
              {progress.discoveredClues.length} of {ALL_CLUES.length} clues discovered
            </p>

            {progress.discoveredClues.length === 0 ? (
              <p className="sidebar-empty">
                No clues yet — explore the web to find them!
              </p>
            ) : (
              <div className="notebook-clues">
                {progress.discoveredClues.map(c => {
                  const def = ALL_CLUES.find(d => d.id === c.id);
                  return (
                    <div key={c.id} className="notebook-clue">
                      <div className="clue-title">📌 {def?.title || c.id}</div>
                      <div className="clue-text">{c.text}</div>
                      <div className="clue-source">Found at: {c.foundAt}</div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="notebook-puzzles">
              <h3>🧩 Puzzles</h3>
              {PUZZLES.map(puzzle => {
                const solved = progress.solvedPuzzles.includes(puzzle.id);
                const isOpen = puzzleOpen === puzzle.id;
                return (
                  <div key={puzzle.id} className={`puzzle-card ${solved ? 'puzzle-solved' : ''}`}>
                    <div
                      className="puzzle-header"
                      onClick={() => setPuzzleOpen(isOpen ? null : puzzle.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && setPuzzleOpen(isOpen ? null : puzzle.id)}
                      aria-expanded={isOpen}
                    >
                      <span>{solved ? '✓' : '○'} {puzzle.name}</span>
                      <span className="puzzle-toggle">{isOpen ? '▲' : '▼'}</span>
                    </div>

                    {isOpen && (
                      <div className="puzzle-body">
                        <p className="puzzle-desc">{puzzle.description}</p>
                        {puzzle.hint && (
                          <details className="puzzle-hint">
                            <summary>💡 Hint</summary>
                            <p>{puzzle.hint}</p>
                          </details>
                        )}
                        {solved ? (
                          <p className="puzzle-success">
                            ✓ Solved! Unlocked: <em>{puzzle.unlocks}</em>
                          </p>
                        ) : (
                          <div className="puzzle-input-area">
                            <input
                              type="text"
                              className="puzzle-input"
                              placeholder="Enter your answer…"
                              value={answers[puzzle.id] || ''}
                              onChange={e =>
                                setAnswers(prev => ({ ...prev, [puzzle.id]: e.target.value }))
                              }
                              onKeyDown={e => {
                                if (e.key === 'Enter') handlePuzzleSubmit(puzzle.id);
                              }}
                              aria-label={`Answer for ${puzzle.name}`}
                            />
                            <button
                              className="puzzle-submit"
                              onClick={() => handlePuzzleSubmit(puzzle.id)}
                            >
                              SUBMIT
                            </button>
                            {feedback[puzzle.id] && (
                              <p
                                className={`puzzle-feedback ${
                                  feedback[puzzle.id].startsWith('✓')
                                    ? 'puzzle-feedback--ok'
                                    : 'puzzle-feedback--err'
                                }`}
                                role="alert"
                              >
                                {feedback[puzzle.id]}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="sidebar-reset">
              {!showReset ? (
                <button className="reset-btn" onClick={() => setShowReset(true)}>
                  ⚠ Reset All Progress
                </button>
              ) : (
                <div className="reset-confirm">
                  <p>All progress will be permanently erased.</p>
                  <div>
                    <button
                      className="reset-btn reset-btn--confirm"
                      onClick={() => {
                        dispatch({ type: 'RESET' });
                        setShowReset(false);
                      }}
                    >
                      Yes, Reset Everything
                    </button>
                    <button
                      className="reset-btn reset-btn--cancel"
                      onClick={() => setShowReset(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
