const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3000/';
export async function fetchHeadlines(searchWord) { 
  try {
    const res = await fetch(`${API_SERVER_URL}/headlines${searchWord? '?search='+searchWord : ''}`);
    return await res.json();
  } catch (err) {
    console.error("failed to fetch headlines", err);
    throw new Error("Something went wrong");
  }
}