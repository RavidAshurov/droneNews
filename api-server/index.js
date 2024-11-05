const express = require('express')
const app = express()
const cors = require('cors')
const headlineRoute = require('./routes/headlinesRoute')
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: [/0.0.0.0/, /localhost/],
  })
)

app.use('/headlines', headlineRoute)

app.listen(PORT, () => {
  console.log(`API Server is listening on port ${PORT}`)
})
