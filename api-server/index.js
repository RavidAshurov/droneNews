const express = require('express')
const app = express()
const cors = require('cors')
const headlinesController = require('./headlineController')
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: [/0.0.0.0/, /localhost/],
  })
)

app.get('/headlines', async function (req, res) {
  try {
    console.log('Received GET request')
    const recentHeadlines = await headlinesController.getHeadlines(req)
    res.send(recentHeadlines)
  } catch (err) {
    err.statusCode = 500
    res.send(err)
  }
})

app.listen(PORT, () => {
  console.log(`API Server is listening on port ${PORT}`)
})
