import type { Card as CardType, Feedback } from '../../types';
import { Diamond } from './shapes/Diamond';
import { Oval } from './shapes/Oval';
import { Squiggle } from './shapes/Squiggle';
import './Card.css';

interface CardProps {
  card: CardType;
  isSelected: boolean;
  isSuggested: boolean;
  feedback: Feedback;
  onSelect: (card: CardType) => void;
}

const shapeComponents = {
  diamond: Diamond,
  oval: Oval,
  squiggle: Squiggle,
};

export function Card({ card, isSelected, isSuggested, feedback, onSelect }: CardProps) {
  const ShapeComponent = shapeComponents[card.shape];

  const shapes = Array.from({ length: card.number }, (_, i) => (
    <ShapeComponent key={i} color={card.color} shading={card.shading} />
  ));

  const classNames = [
    'card',
    isSelected ? 'selected' : '',
    isSuggested ? 'suggested' : '',
    feedback || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={() => onSelect(card)}>
      <div className="shapes-container">{shapes}</div>
    </div>
  );
}
