export default function funnyMathResponse(result) {
  const funnyPhrases = [
    `Easy! The answer is ${result} — and that’s no joke!`,
    `I crunched the numbers and got ${result}. Boom!`,
    `The math gods say it’s ${result}.`,
    `${result}! Pretty neat, huh?`,
    `Calculations complete: ${result}. I’m basically a math wizard. 🧙‍♂️`
  ];
  return funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
}
