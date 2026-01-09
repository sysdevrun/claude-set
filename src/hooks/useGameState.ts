import { useState, useCallback, useMemo } from 'react';
import type { Card, Feedback } from '../types';
import { createDeck, shuffleDeck } from '../utils/deck';
import { isValidSet, findValidSet } from '../utils/validation';

function initializeGame() {
  const fullDeck = shuffleDeck(createDeck());
  return {
    deck: fullDeck.slice(12),
    board: fullDeck.slice(0, 12),
  };
}

export function useGameState() {
  const [{ deck, board }, setGameState] = useState(initializeGame);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [setsFound, setSetsFound] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedCards, setSuggestedCards] = useState<Card[]>([]);

  const hasValidSet = useMemo(() => findValidSet(board) !== null, [board]);

  const replaceCards = useCallback((cardsToReplace: Card[]) => {
    setGameState((prev) => {
      const idsToReplace = new Set(cardsToReplace.map((c) => c.id));
      const newBoard = prev.board.filter((c) => !idsToReplace.has(c.id));
      const cardsNeeded = 12 - newBoard.length;
      const replacements = prev.deck.slice(0, cardsNeeded);
      const newDeck = prev.deck.slice(cardsNeeded);

      return {
        deck: newDeck,
        board: [...newBoard, ...replacements],
      };
    });
  }, []);

  const selectCard = useCallback(
    (card: Card) => {
      if (isProcessing) return;

      // Clear suggestions when user starts selecting cards
      if (suggestedCards.length > 0) {
        setSuggestedCards([]);
      }

      const isSelected = selectedCards.some((c) => c.id === card.id);

      if (isSelected) {
        setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
        return;
      }

      if (selectedCards.length < 2) {
        setSelectedCards([...selectedCards, card]);
        return;
      }

      const triplet = [...selectedCards, card] as [Card, Card, Card];
      setSelectedCards(triplet);
      setIsProcessing(true);

      if (isValidSet(triplet)) {
        setFeedback('correct');
        setSetsFound((s) => s + 1);

        setTimeout(() => {
          replaceCards(triplet);
          setSelectedCards([]);
          setFeedback(null);
          setIsProcessing(false);
        }, 600);
      } else {
        setFeedback('incorrect');

        setTimeout(() => {
          setSelectedCards([]);
          setFeedback(null);
          setIsProcessing(false);
        }, 600);
      }
    },
    [isProcessing, selectedCards, suggestedCards.length, replaceCards]
  );

  const suggestSet = useCallback(() => {
    if (isProcessing) return;

    const validSet = findValidSet(board);
    if (validSet) {
      setSuggestedCards(validSet);
      // Auto-clear suggestion after 3 seconds
      setTimeout(() => {
        setSuggestedCards([]);
      }, 3000);
    }
  }, [board, isProcessing]);

  const cardsRemaining = deck.length;
  const gameOver = !hasValidSet && cardsRemaining === 0;

  return {
    board,
    selectedCards,
    suggestedCards,
    setsFound,
    feedback,
    selectCard,
    suggestSet,
    cardsRemaining,
    hasValidSet,
    gameOver,
  };
}
