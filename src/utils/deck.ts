import type { Card, CardNumber, CardShape, CardShading, CardColor } from '../types';

const numbers: CardNumber[] = [1, 2, 3];
const shapes: CardShape[] = ['diamond', 'oval', 'squiggle'];
const shadings: CardShading[] = ['solid', 'striped', 'empty'];
const colors: CardColor[] = ['red', 'green', 'purple'];

export function createDeck(): Card[] {
  const cards: Card[] = [];

  for (const number of numbers) {
    for (const shape of shapes) {
      for (const shading of shadings) {
        for (const color of colors) {
          cards.push({
            id: `${number}-${shape}-${shading}-${color}`,
            number,
            shape,
            shading,
            color,
          });
        }
      }
    }
  }

  return cards;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
