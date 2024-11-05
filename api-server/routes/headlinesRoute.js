const express = require('express')
const headlineController = require('../controllers/headlineController')
const router = express.Router()

router.route('/').get(async function (req, res) {
  try {
    console.log('Received GET request')
    const recentHeadlines = await headlineController.getHeadlines(req)
    res.send({
      data: recentHeadlines,
      success: true,
      message: 'Headlines fetched successfully',
    })
  } catch (err) {
    res.status(500)
    res.send({
      success: false,
      data: null,
      message: err?.message || 'Something went wrong',
    })
  }
})
module.exports = router
