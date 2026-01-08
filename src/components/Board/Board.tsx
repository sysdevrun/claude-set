import type { Card as CardType, Feedback } from '../../types';
import { Card } from '../Card/Card';
import './Board.css';

interface BoardProps {
  cards: CardType[];
  selectedCards: CardType[];
  feedback: Feedback;
  onSelectCard: (card: CardType) => void;
}

export function Board({ cards, selectedCards, feedback, onSelectCard }: BoardProps) {
  return (
    <div className="board">
      {cards.map((card) => {
        const isSelected = selectedCards.some((c) => c.id === card.id);
        const cardFeedback = isSelected ? feedback : null;

        return (
          <Card
            key={card.id}
            card={card}
            isSelected={isSelected}
            feedback={cardFeedback}
            onSelect={onSelectCard}
          />
        );
      })}
    </div>
  );
}
