import { useApp } from '../context/AppContext';
import { search } from '../engine/search';
import { PAGES } from '../sites/pages';

interface SearchResultsPageProps {
  query: string;
}

export function SearchResultsPage({ query }: SearchResultsPageProps) {
  const { navigate, state } = useApp();
  const results = search(query);

  // Filter out locked pages that haven't been unlocked
  const visibleResults = results.filter(r => {
    const page = PAGES[r.url];
    if (!page) return true;
    if (page.unlockKey && !state.progress.unlockedPages.includes(r.url)) {
      // Show it but mark as restricted
      return true;
    }
    return true;
  });

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <div className="av-logo-text-small">Alta<span className="av-logo-vault">Vault</span></div>
        <div className="search-results-meta">
          Results for: <strong>"{query}"</strong> — {visibleResults.length} found
        </div>
      </div>

      {visibleResults.length === 0 ? (
        <div className="search-results-none">
          <p>No results found for "{query}".</p>
          <p>The page may have been removed from our index.</p>
        </div>
      ) : (
        <div className="search-results-list">
          {visibleResults.map(r => {
            const page = PAGES[r.url];
            const isLocked = page?.unlockKey && !state.progress.unlockedPages.includes(r.url);
            return (
              <div key={r.url} className="search-result-item">
                <div
                  className={`search-result-title ${isLocked ? 'search-result--locked' : ''}`}
                  onClick={() => navigate(r.url)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(r.url)}
                >
                  {r.title} {isLocked && '🔒'}
                </div>
                <div className="search-result-url">{r.url}</div>
                <div className="search-result-desc">{r.description}</div>
                <div className="search-result-tags">
                  {r.tags.map(t => <span key={t} className="search-result-tag">{t}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="search-results-footer">
        <p>AltaVault Search — indexed {new Date('2002-10-15').toLocaleDateString()}</p>
      </div>
    </div>
  );
}
