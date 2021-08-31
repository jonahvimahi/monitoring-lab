const express = require("express")
const path = require('path')
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: "359cb8a0be214ca2aeb1cd8e5f61050c",
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`we are up and running on ${port}`))