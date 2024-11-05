const API_SERVER_URL =
  import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3000'

export async function fetchHeadlines(searchWord) {
  if (searchWord && !searchWord.match(/^[ a-zA-Z0-9,.-:]{2,}$/)) {
    throw new Error('Invalid search phrase')
  }
  try {
    let res = await fetch(
      `${API_SERVER_URL}/headlines${searchWord ? '?search=' + encodeURI(searchWord) : ''}`,
    )
    res = await res.json()

    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  } catch (err) {
    console.error('failed to fetch headlines', err)
    throw new Error(err.message || 'Something went wrong')
  }
}
