export default async function fetchJoke() {
  try {
    const url = `https://official-joke-api.appspot.com/jokes/random`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('something went wrong');
    const data = await response.json();
    return `${data.setup} ... ${data.punchline}`;
  } catch {
    return "Sorry, I couldn't fetch a joke right now.";
  }
}
