import React from 'react';
import { useApp } from '../context/AppContext';
export function TabBar() {
  const { state, dispatch } = useApp();
  const { nav } = state;

  function handleTabClick(tabId: string) {
    dispatch({ type: 'SWITCH_TAB', tabId });
  }

  function handleCloseTab(e: React.MouseEvent, tabId: string) {
    e.stopPropagation();
    dispatch({ type: 'CLOSE_TAB', tabId });
  }

  function handleNewTab() {
    dispatch({ type: 'OPEN_TAB' });
  }

  return (
    <div className="tabbar">
      <div className="tabbar-tabs">
        {nav.tabs.map(tab => (
          <div
            key={tab.id}
            className={`tabbar-tab ${tab.id === nav.activeTabId ? 'tabbar-tab--active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            title={tab.url}
          >
            <span className="tab-favicon">{tab.favicon || '🌐'}</span>
            <span className="tab-title">{tab.title}</span>
            {nav.tabs.length > 1 && (
              <button
                className="tab-close"
                onClick={e => handleCloseTab(e, tab.id)}
                title="Close tab"
              >×</button>
            )}
          </div>
        ))}
      </div>
      <button className="tabbar-new" onClick={handleNewTab} title="New tab">+</button>
    </div>
  );
}
