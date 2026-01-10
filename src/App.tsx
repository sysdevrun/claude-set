import { useGameState } from './hooks/useGameState';
import { Board } from './components/Board/Board';
import { ScoreDisplay } from './components/ScoreDisplay/ScoreDisplay';
import './App.css';

function App() {
  const {
    board,
    selectedCards,
    suggestedCards,
    replacingCardIds,
    setsFound,
    feedback,
    selectCard,
    suggestSet,
    cardsRemaining,
    gameOver,
  } = useGameState();

  return (
    <div className="app">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <pattern
            id="stripes-red"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#e74c3c" strokeWidth="3" />
          </pattern>
          <pattern
            id="stripes-green"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#27ae60" strokeWidth="3" />
          </pattern>
          <pattern
            id="stripes-purple"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#9b59b6" strokeWidth="3" />
          </pattern>
        </defs>
      </svg>

      <header className="header">
        <h1 className="title" onDoubleClick={suggestSet} style={{ cursor: 'pointer' }}>
          Set
        </h1>
        <div className="header-info">
          <ScoreDisplay setsFound={setsFound} />
          <div className="cards-remaining">
            <span className="cards-remaining-label">Deck:</span>
            <span className="cards-remaining-count">{cardsRemaining}</span>
          </div>
        </div>
      </header>

      <main className="main">
        {gameOver ? (
          <div className="game-over">
            <p>No more valid sets!</p>
            <p>Final score: {setsFound} sets found</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        ) : (
          <Board
            cards={board}
            selectedCards={selectedCards}
            suggestedCards={suggestedCards}
            replacingCardIds={replacingCardIds}
            feedback={feedback}
            onSelectCard={selectCard}
          />
        )}
      </main>
    </div>
  );
}

export default App;
