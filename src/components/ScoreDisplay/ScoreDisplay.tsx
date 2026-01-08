import './ScoreDisplay.css';

interface ScoreDisplayProps {
  setsFound: number;
}

export function ScoreDisplay({ setsFound }: ScoreDisplayProps) {
  return (
    <div className="score-display">
      <span className="score-label">Sets Found:</span>
      <span className="score-value">{setsFound}</span>
    </div>
  );
}
