const express = require('express')
const app = express();
const headlinesController = require('./headlineController');
const PORT = process.env.PORT || 3000;

app.get('/headlines', async function (req, res) {
  console.log("Received GET request")
  const recentHeadlines = await headlinesController.getHeadlines(req);
  res.send(recentHeadlines)
})

app.listen(PORT, () => { 
  console.log(`API Server is listening on port ${PORT}`);
})
