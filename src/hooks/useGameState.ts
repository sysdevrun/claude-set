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
  const [replacingCardIds, setReplacingCardIds] = useState<Set<string>>(new Set());

  const hasValidSet = useMemo(() => findValidSet(board) !== null, [board]);

  const replaceCards = useCallback((cardsToReplace: Card[]) => {
    setGameState((prev) => {
      const idsToReplace = new Set(cardsToReplace.map((c) => c.id));
      const cardsFromDeck = prev.deck.slice(0, cardsToReplace.length);
      const newDeck = prev.deck.slice(cardsToReplace.length);

      // Create empty placeholder cards if deck doesn't have enough cards
      const replacements: Card[] = [];
      for (let i = 0; i < cardsToReplace.length; i++) {
        if (i < cardsFromDeck.length) {
          replacements.push(cardsFromDeck[i]);
        } else {
          // Create empty placeholder card
          replacements.push({
            id: `empty-${Date.now()}-${i}`,
            number: 1,
            shape: 'diamond',
            shading: 'solid',
            color: 'red',
            isEmpty: true,
          });
        }
      }

      // Replace cards at their original positions
      let replacementIndex = 0;
      const newBoard = prev.board.map((card) => {
        if (idsToReplace.has(card.id)) {
          return replacements[replacementIndex++];
        }
        return card;
      });

      return {
        deck: newDeck,
        board: newBoard,
      };
    });
  }, []);

  const selectCard = useCallback(
    (card: Card) => {
      if (isProcessing || card.isEmpty) return;

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

        // Start flip animation after showing correct feedback
        setTimeout(() => {
          setReplacingCardIds(new Set(triplet.map((c) => c.id)));
        }, 300);

        // Replace cards at the midpoint of flip (when cards are edge-on)
        setTimeout(() => {
          replaceCards(triplet);
        }, 600);

        // Clear everything after animation completes
        setTimeout(() => {
          setReplacingCardIds(new Set());
          setSelectedCards([]);
          setFeedback(null);
          setIsProcessing(false);
        }, 900);
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
    replacingCardIds,
    setsFound,
    feedback,
    selectCard,
    suggestSet,
    cardsRemaining,
    hasValidSet,
    gameOver,
  };
}
