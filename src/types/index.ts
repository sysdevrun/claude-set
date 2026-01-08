export type CardNumber = 1 | 2 | 3;
export type CardShape = 'diamond' | 'oval' | 'squiggle';
export type CardShading = 'solid' | 'striped' | 'empty';
export type CardColor = 'red' | 'green' | 'purple';

export interface Card {
  id: string;
  number: CardNumber;
  shape: CardShape;
  shading: CardShading;
  color: CardColor;
}

export type Feedback = 'correct' | 'incorrect' | null;
