import { useApp } from '../context/AppContext';
import { getProgressPercentage } from '../engine/progress';

export function StatusBar() {
  const { state } = useApp();
  const { statusMessage, glitchActive, progress } = state;
  const pct = getProgressPercentage(progress);

  return (
    <div className={`statusbar ${glitchActive ? 'statusbar--glitch' : ''}`}>
      <span className="statusbar-msg">{statusMessage}</span>
      <div className="statusbar-right">
        <span className="statusbar-clues">
          🗒 {progress.discoveredClues.length} clues
        </span>
        <span className="statusbar-puzzles">
          🧩 {progress.solvedPuzzles.length}/3 solved
        </span>
        <div className="statusbar-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-label">{pct}%</span>
        </div>
        {progress.completedAt && (
          <span className="statusbar-complete">✓ COMPLETE</span>
        )}
      </div>
    </div>
  );
}
