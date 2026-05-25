
const GAME_WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML',
  'ANGULAR',
  'SOLID',
  'NODE',
  'VUEJS',
  'SVELTE',
  'EXPRESS',
  'MONGODB',
  'POSTGRES',
  'DOCKER',
  'KUBERNETES',
  'WEBPACK',
  'VITE',
  'TAILWIND',
];

// FISHER-YATES SUFFLE
const shuffleArray = (array: string[]): string[] => {
  // Creamos una copia para mantener la inmutabilidad
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    // Elegimos un índice aleatorio entre 0 e i
    const j = Math.floor(Math.random() * (i + 1));

    // Intercambiamos los elementos (Destructuring assignment)
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = ''): string => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

export type ScrambleWordsAction =
  | { type: 'SET_GUESS', payload: string }
  | { type: 'CHECK_ANSWER' }
  | { type: 'SKIP_WORD' }
  | { type: 'START_NEW_GAME', payload: ScrambleWordsState }

export const getInitialState = (): ScrambleWordsState => {

  const shuffledWords = shuffleArray(GAME_WORDS);

  return {
    currentWord: shuffledWords[0],
    errorCounter: 0,
    guess: '',
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffledWords[0]),
    skipCounter: 0,
    words: shuffledWords,
    totalWords: shuffledWords.length
  }

}

export const scrambleWordsReducer = (state: ScrambleWordsState, action: ScrambleWordsAction): ScrambleWordsState => {

  switch (action.type) {

    case 'SET_GUESS':
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      }

    case 'CHECK_ANSWER': {
      if (state.currentWord === state.guess) {
        const newWords = state.words.slice(1);

        return {
          ...state,
          words: newWords,
          points: state.points + 1,
          currentWord: newWords[0],
          // This is against the rule of the reducer of a pure function
          // This gonna be an exception and not a rule
          scrambledWord: scrambleWord(newWords[0]),
          guess: '',
        }
      }

      return {
        ...state,
        guess: '',
        errorCounter: state.errorCounter + 1,
        isGameOver: (state.errorCounter + 1) >= state.maxAllowErrors
      }
    }

    case "SKIP_WORD": {
      if (state.skipCounter >= state.maxSkips) return state

      const updatedWords = state.words.slice(1);

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        words: updatedWords,
        currentWord: updatedWords[0],
        scrambledWord: scrambleWord(updatedWords[0]),
        guess: ''
      }
    }

    case "START_NEW_GAME":
      return action.payload;

    default:
      return state;
  }

}