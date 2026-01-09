# Claude Set - Project Documentation

## Overview

Claude Set is a web implementation of the classic Set card game, built with React 19, TypeScript, and Vite. The game challenges players to identify valid "sets" of three cards based on pattern recognition rules.

**Live Demo:** [https://sysdevrun.github.io/claude-set/](https://sysdevrun.github.io/claude-set/)

## Game Rules

### Card Attributes

Each card in the game has four attributes, each with three possible values:

1. **Number**: 1, 2, or 3 shapes on the card
2. **Shape**: Diamond, Oval, or Squiggle
3. **Shading**: Solid, Striped, or Empty
4. **Color**: Red, Green, or Purple

### What Makes a Valid Set?

A valid Set consists of three cards where **each attribute** is either:
- **All the same** across the three cards, OR
- **All different** across the three cards

All four attributes must satisfy this rule for the set to be valid.

### Examples

**Valid Set:**
- Card 1: 1 red solid diamond
- Card 2: 2 green striped diamond
- Card 3: 3 purple empty diamond
- ✓ Number: all different (1, 2, 3)
- ✓ Shape: all same (diamond)
- ✓ Shading: all different (solid, striped, empty)
- ✓ Color: all different (red, green, purple)

**Invalid Set:**
- Card 1: 1 red solid diamond
- Card 2: 1 red solid oval
- Card 3: 1 green solid diamond
- ✓ Number: all same (1, 1, 1)
- ✗ Shape: neither all same nor all different (diamond, oval, diamond)

## Project Architecture

### Directory Structure

```
src/
├── components/
│   ├── Board/          # Game board container
│   ├── Card/           # Individual card display
│   │   └── shapes/     # SVG shape components (Diamond, Oval, Squiggle)
│   └── ScoreDisplay/   # Score tracking UI
├── hooks/
│   └── useGameState.ts # Core game state management
├── types/
│   └── index.ts        # TypeScript type definitions
├── utils/
│   ├── deck.ts         # Deck generation and shuffling
│   └── validation.ts   # Set validation and finding logic
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

### Key Components

#### 1. **Type System** (`src/types/index.ts`)

Defines the core data structures:
- `Card`: Represents a single card with id, number, shape, shading, color
- `CardNumber`, `CardShape`, `CardShading`, `CardColor`: Union types for valid attribute values
- `Feedback`: Tracks correct/incorrect user selections

#### 2. **Deck Management** (`src/utils/deck.ts`)

- **`createDeck()`**: Generates all 81 possible card combinations (3^4 = 81)
- **`shuffleDeck()`**: Fisher-Yates shuffle algorithm for randomization

#### 3. **Set Validation** (`src/utils/validation.ts`)

- **`isValidAttribute()`**: Checks if three attribute values are all same or all different
- **`isValidSet()`**: Validates if three cards form a valid set (checks all 4 attributes)
- **`findValidSet()`**: Brute-force search through all combinations to find any valid set
  - Time complexity: O(n³) where n is the number of cards on the board
  - For 12 cards: checks 220 possible triplets (12 choose 3)

#### 4. **Game State Hook** (`src/hooks/useGameState.ts`)

Central state management using React hooks:

**State Variables:**
- `deck`: Remaining undealt cards
- `board`: Currently visible 12 cards
- `selectedCards`: Cards the user has clicked (max 3)
- `suggestedCards`: Cards highlighted by the hint feature
- `setsFound`: Score counter
- `feedback`: Visual feedback (correct/incorrect/null)
- `isProcessing`: Lock during validation animation

**Key Functions:**
- `selectCard()`: Handles card selection, validates when 3 cards selected
- `replaceCards()`: Replaces matched cards with new cards from deck
- `suggestSet()`: Finds and highlights a valid set for 3 seconds
- `hasValidSet`: Computed value checking if any valid sets exist
- `gameOver`: True when no valid sets exist and deck is empty

#### 5. **UI Components**

**Board** (`src/components/Board/Board.tsx`):
- Renders the 12-card grid
- Manages card selection and suggestion states
- Passes feedback to individual cards

**Card** (`src/components/Card/Card.tsx`):
- Renders a single card with shapes
- Applies visual states: selected (blue), suggested (gold), correct (green), incorrect (red)
- Handles click events

**Shape Components** (`src/components/Card/shapes/`):
- SVG-based Diamond, Oval, and Squiggle shapes
- Support for three shading patterns: solid fill, striped pattern, empty stroke

## Algorithms

### Set Detection Algorithm

The validation algorithm leverages a mathematical property:

```typescript
function isValidAttribute<T>(a: T, b: T, c: T): boolean {
  const allSame = a === b && b === c;
  const allDifferent = a !== b && b !== c && a !== c;
  return allSame || allDifferent;
}
```

This XOR-like condition must be true for all four attributes:
- Number
- Shape
- Shading
- Color

### Card Replacement Flow

When a valid set is found (`src/hooks/useGameState.ts:68-73`):

1. Show green feedback for 600ms
2. Filter out the 3 matched cards from the board
3. Calculate cards needed to maintain 12 cards
4. Draw replacements from the top of the deck
5. Update board with remaining + new cards
6. Clear selection and feedback

### Finding Valid Sets

The `findValidSet()` function uses triple nested loops to check all possible combinations:

```typescript
for (let i = 0; i < board.length - 2; i++) {
  for (let j = i + 1; j < board.length - 1; j++) {
    for (let k = j + 1; k < board.length; k++) {
      if (isValidSet([board[i], board[j], board[k]])) {
        return [board[i], board[j], board[k]];
      }
    }
  }
}
```

## Features

### Core Gameplay
- 81-card deck with all possible combinations
- 12-card board display
- Click to select up to 3 cards
- Automatic validation when 3 cards selected
- Visual feedback for correct/incorrect sets
- Score tracking
- Game over detection when no valid sets remain

### Set Suggestion (Hint System)
- Double-click on "Set" title to get a hint
- Highlights 3 cards that form a valid set
- Golden border with pulsing animation
- Auto-clears after 3 seconds
- Clears immediately if user starts selecting cards

### Responsive Design
- Mobile-optimized with touch support
- Desktop-optimized with larger cards
- All cards visible without scrolling on mobile

## Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Deployment
The project uses GitHub Actions for automatic deployment to GitHub Pages on pushes to the main branch.

## Tech Stack

- **React 19**: UI framework with latest features
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and dev server
- **CSS3**: Styling with animations and responsive design
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: CI/CD pipeline

## Code Quality

- ESLint configuration for code linting
- TypeScript strict mode enabled
- Functional components with React hooks
- Immutable state updates
- Separation of concerns (components, hooks, utils)

## Future Enhancement Ideas

- Timer mode with speed scoring
- Multiplayer support
- Difficulty levels (different board sizes)
- Daily challenge mode
- Statistics tracking (win rate, average time)
- Accessibility improvements (keyboard navigation, screen reader support)
- Tutorial mode for new players
- Undo/redo functionality

## Performance Notes

- O(n³) set finding algorithm is acceptable for n=12 (220 checks)
- React's virtual DOM handles efficient re-renders
- CSS transitions provide smooth visual feedback
- Memoized computed values (`useMemo`) prevent unnecessary recalculations
- Debounced processing state prevents rapid clicking issues

## License

This project is open source and available for educational purposes.

---

Built with ❤️ using Claude Code
