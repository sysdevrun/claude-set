import type { Card as CardType, Feedback } from '../../types';
import { Card } from '../Card/Card';
import './Board.css';

interface BoardProps {
  cards: CardType[];
  selectedCards: CardType[];
  suggestedCards: CardType[];
  feedback: Feedback;
  onSelectCard: (card: CardType) => void;
}

export function Board({
  cards,
  selectedCards,
  suggestedCards,
  feedback,
  onSelectCard,
}: BoardProps) {
  return (
    <div className="board">
      {cards.map((card) => {
        const isSelected = selectedCards.some((c) => c.id === card.id);
        const isSuggested = suggestedCards.some((c) => c.id === card.id);
        const cardFeedback = isSelected ? feedback : null;

        return (
          <Card
            key={card.id}
            card={card}
            isSelected={isSelected}
            isSuggested={isSuggested}
            feedback={cardFeedback}
            onSelect={onSelectCard}
          />
        );
      })}
    </div>
  );
}
