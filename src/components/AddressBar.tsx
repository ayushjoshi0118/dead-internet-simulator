import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { search } from '../engine/search';

interface AddressBarProps {
  onSearch: (query: string) => void;
}

export function AddressBar({ onSearch }: AddressBarProps) {
  const { currentUrl, navigate, canBack, canFwd, dispatch, state, isBookmarked } = useApp();
  const [inputValue, setInputValue] = useState(currentUrl);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof search>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep input in sync when navigation changes
  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setInputValue(currentUrl);
    }
  }, [currentUrl]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setInputValue(v);
    if (v.length > 1) {
      setSuggestions(search(v).slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = inputValue.trim();
    setShowSuggestions(false);
    if (!v) return;
    if (v.includes('://')) {
      navigate(v);
    } else {
      onSearch(v);
      navigate('altavault://search');
    }
    inputRef.current?.blur();
  }

  function handleSuggestionClick(url: string) {
    setInputValue(url);
    setShowSuggestions(false);
    navigate(url);
  }

  function handleBookmark() {
    const url = currentUrl;
    if (url.startsWith('locked://') || url === '') return;
    if (isBookmarked(url)) {
      dispatch({ type: 'REMOVE_BOOKMARK', url });
      dispatch({ type: 'SET_STATUS', message: `Bookmark removed: ${url}` });
    } else {
      const tab = state.nav.tabs.find(t => t.id === state.nav.activeTabId);
      dispatch({
        type: 'ADD_BOOKMARK',
        bookmark: { url, title: tab?.title || url, addedAt: Date.now() },
      });
      dispatch({ type: 'SET_STATUS', message: `Bookmarked: ${url}` });
    }
  }

  const bookmarked = isBookmarked(currentUrl);

  return (
    <div className="addressbar">
      <div className="addressbar-nav">
        <button
          className="nav-btn"
          onClick={() => dispatch({ type: 'GO_BACK' })}
          disabled={!canBack}
          title="Back (Alt+←)"
          aria-label="Go back"
        >◀</button>
        <button
          className="nav-btn"
          onClick={() => dispatch({ type: 'GO_FORWARD' })}
          disabled={!canFwd}
          title="Forward (Alt+→)"
          aria-label="Go forward"
        >▶</button>
        <button
          className="nav-btn"
          onClick={() => navigate('altavault://search')}
          title="Home"
          aria-label="Go home"
        >🏠</button>
      </div>
      <form className="addressbar-form" onSubmit={handleSubmit} role="search">
        <div className="addressbar-input-wrap">
          <input
            ref={inputRef}
            className="addressbar-input"
            value={inputValue}
            onChange={handleInput}
            onFocus={() => inputRef.current?.select()}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Address bar"
            placeholder="Enter a URL or search..."
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="addressbar-suggestions" role="listbox">
              {suggestions.map(s => (
                <div
                  key={s.url}
                  className="addressbar-suggestion"
                  role="option"
                  aria-selected="false"
                  onMouseDown={() => handleSuggestionClick(s.url)}
                >
                  <span className="suggestion-url">{s.url}</span>
                  <span className="suggestion-title">{s.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="nav-btn addressbar-go" aria-label="Navigate">GO</button>
      </form>
      <button
        className={`nav-btn bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
        onClick={handleBookmark}
        title={bookmarked ? 'Remove bookmark' : 'Bookmark this page'}
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        aria-pressed={bookmarked}
      >
        {bookmarked ? '★' : '☆'}
      </button>
    </div>
  );
}
