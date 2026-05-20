// ! Importante:
// Es necesario componentes de Shadcn/ui
// https://ui.shadcn.com/docs/installation/vite

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { SkipForward, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

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

/* JUST TO REMEMBER SORT METHOD
const nums = [10, 2, 5];

// If you don't send the callback, JS convert it to strings and '10' goes first because
// of the '1' at the beggining

nums.sort((a, b) => {
  // ASCENDING ORDER. 10(a) - 2(b) is 8 (positive) so b is minor and goes first
  return a - b; 
  // DESCENDING ORDER. 2(b) - 10 (a) -8 (negative), so a is greater and goes first
  return b - a;
});

*/

// ! VERSIÓN DEL PROFE
// Esta función mezcla el arreglo para que siempre sea aleatorio
// const shuffleArray = (array: string[]) => {
//   return array.sort(() => Math.random() - 0.5);
// };

// ! FISHER-YATES SUFFLE
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

export const ScrambleWords = () => {
  const [words, setWords] = useState<string[]>(shuffleArray(GAME_WORDS));

  const [currentWord, setCurrentWord] = useState<string>(words[0]);
  const [scrambledWord, setScrambledWord] = useState<string>(scrambleWord(currentWord));
  const [guess, setGuess] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [maxAllowErrors, setMaxAllowErrors] = useState<number>(3);

  const [skipCounter, setSkipCounter] = useState(0);
  const [maxSkips, setMaxSkips] = useState(3);

  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuessSubmit = (e: React.FormEvent) => {
    // Previene el refresh de la página
    e.preventDefault();

    if (guess === currentWord) {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 }
      });

      const newWords = words.slice(1);
      setPoints(prev => prev + 1);
      setWords(newWords);
      setCurrentWord(newWords[0]);
      setScrambledWord(scrambleWord(newWords[0]));
      setGuess('');
      return;
    }

    setErrorCounter(prev => prev + 1);
    setGuess('');
    if (errorCounter + 1 >= maxAllowErrors) {
      setIsGameOver(true);
    }
  };

  const handleSkip = () => {
    setSkipCounter(prev => prev + 1);

    const newWords = words.slice(1);
    setWords(newWords);
    setCurrentWord(newWords[0]);
    setScrambledWord(scrambleWord(newWords[0]));
    setGuess('');
  };

  const handlePlayAgain = () => {

    const newShuffledWords = shuffleArray(GAME_WORDS);
    setWords(newShuffledWords);
    setCurrentWord(newShuffledWords[0]);
    setScrambledWord(scrambleWord(newShuffledWords[0]));
    setPoints(0);
    setErrorCounter(0);
    setSkipCounter(0);
    setIsGameOver(false);
  };

  //! Si ya no hay palabras para jugar, se muestra el mensaje de fin de juego
  if (words.length === 0) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">No hay palabras para jugar</p>
          <br />
          <div>Puntaje: {points}</div>
          <br />
          <div>Errores: {errorCounter}</div>
          <br />
          <div>Saltos: {skipCounter}</div>
          <br />
          <Button onClick={handlePlayAgain}>Jugar de nuevo</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">
            Desordena las letras para encontrar la palabra!
          </p>
        </div>

        {/* Main Game Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Scrambled Word Display */}
            <div className="mb-8">
              <h2 className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                Palabra Desordenada
                {isGameOver && (
                  <span className="text-red-500 text-xl"> {currentWord}</span>
                )}
              </h2>

              <div className="flex justify-center gap-2 mb-6">
                {scrambledWord.split('').map((letter, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Guess Input */}
            <form onSubmit={handleGuessSubmit} className="mb-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="guess"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Adivina la palabra
                  </label>
                  <Input
                    id="guess"
                    type="text"
                    value={guess}
                    onChange={(e) =>
                      setGuess(e.target.value.toUpperCase().trim())
                    }
                    placeholder="Ingresa tu palabra..."
                    className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
                    maxLength={scrambledWord.length}
                    disabled={isGameOver}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  disabled={!guess.trim() || isGameOver}
                >
                  Enviar Adivinanza
                </Button>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {points} / {GAME_WORDS.length}
                </div>
                <div className="text-sm text-green-700 font-medium">Puntos</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {errorCounter}/{maxAllowErrors}
                </div>
                <div className="text-sm text-red-700 font-medium">Errores</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                disabled={isGameOver || skipCounter >= maxSkips}
              >
                <SkipForward className="w-4 h-4" />
                Saltar ({skipCounter} / {maxSkips})
              </Button>
              <Button
                onClick={handlePlayAgain}
                variant="outline"
                className="border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Jugar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Desafíate con palabras desordenadas!
            <br />
            <br />
            {words.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};
