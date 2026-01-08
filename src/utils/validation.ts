import type { Card } from '../types';

function isValidAttribute<T>(a: T, b: T, c: T): boolean {
  const allSame = a === b && b === c;
  const allDifferent = a !== b && b !== c && a !== c;
  return allSame || allDifferent;
}

export function isValidSet(cards: [Card, Card, Card]): boolean {
  const [c1, c2, c3] = cards;

  return (
    isValidAttribute(c1.number, c2.number, c3.number) &&
    isValidAttribute(c1.shape, c2.shape, c3.shape) &&
    isValidAttribute(c1.shading, c2.shading, c3.shading) &&
    isValidAttribute(c1.color, c2.color, c3.color)
  );
}

export function findValidSet(board: Card[]): [Card, Card, Card] | null {
  for (let i = 0; i < board.length - 2; i++) {
    for (let j = i + 1; j < board.length - 1; j++) {
      for (let k = j + 1; k < board.length; k++) {
        const triplet: [Card, Card, Card] = [board[i], board[j], board[k]];
        if (isValidSet(triplet)) {
          return triplet;
        }
      }
    }
  }
  return null;
}
