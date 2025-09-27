export default async function fetchWikiSummary(query) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('no article found');
    const data = await response.json();
    return data.extract || "Sorry, no summary available.";
  } catch {
    return "Sorry, I couldn't fetch information.";
  }
}
