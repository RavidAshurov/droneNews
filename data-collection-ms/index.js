const NewsAPI = require('newsapi')
const stringHash = require('string-hash')
const { HeadlinesModel } = require('@droneNews/commons')
const HEADLINE_TTL_MS = process.env.HEADLINE_TTL_MS || 1000 * 60 * 60 * 24 * 5 // default to 5 days if not provided
const SYNC_HEADLINES_INTERVAL_MS = 3 * 60 * 1000 // 3 minutes
const SEARCH_KEYWORDS = [
  // This could be maintained in the db, if list grows or changes frequently.
  'drone',
  'uav',
  'unmanned aerial vehicle',
]

setInterval(() => fetchHeadlines(), SYNC_HEADLINES_INTERVAL_MS)
fetchHeadlines() // Invoke on init

async function fetchHeadlines() {
  console.log('Searching for new headlines...')
  const newsApi = new NewsAPI(process.env.API_KEY)
  const requests = SEARCH_KEYWORDS.map(keyword =>
    newsApi.v2.topHeadlines({
      q: keyword,
    })
  )
  const responses = await Promise.allSettled(requests)

  // Reduce all responses into unique headline records
  let headlinesToSave = responses.reduce((headlinesMap, res, index) => {
    if (res.status === 'fulfilled') {
      console.log(
        `Headlines for keyword ${SEARCH_KEYWORDS[index]} fetched successfully. Retrieved ${res.value?.articles?.length} articles.`
      )

      // Normalize results to db records
      res.value?.articles?.forEach(article => {
        const publishTime = new Date(article.publishedAt).getTime()
        const id = stringHash(article.title + publishTime + article.author) // Generate id as it is not provided by the api
        const headline = {
          ...article,
          ttl: new Date(publishTime + HEADLINE_TTL_MS),
          id,
          source_id: article.source?.id,
        }
        headlinesMap[id] = headline // use hash to avoid duplication across keywords
      })

      return headlinesMap
    } else {
      console.error(
        `Failed to fetch headlines for keyword ${SEARCH_KEYWORDS[index]}`,
        res
      )
    }
  }, {})

  headlinesToSave = Object.values(headlinesToSave)
  if (headlinesToSave.length) {
    try {
      console.log(`Storing ${headlinesToSave.length} new headlines.`)
      await HeadlinesModel.bulkCreate(headlinesToSave, {
        ignoreDuplicates: true,
      })
      console.log(`Processing done: headlines stored successfully.`)
    } catch (err) {
      console.error(
        `Failed to store headlines to db - next interval will reattempt`,
        err
      )
    }
  } else {
    console.log('Processing done: no new headlines to store.')
  }
}
