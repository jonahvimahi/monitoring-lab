const express = require("express")
const path = require('path')
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: "359cb8a0be214ca2aeb1cd8e5f61050c",
    captureUncaught: true,
    captureUnhandledRejections: true
})


const person = []
const app = express()
app.use(express.json())

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/main.js'))
  });
app.use('/css', express.static('public/styles.css'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/main.js"))
    rollbar.info("main.js served successfully")
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
    rollbar.info("html file served successfully")
})
app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(personName=> personName ===name)

    if(index === -1 && name !== ''){
        person.push(name)
        rollbar.log('person added successfully', {author: 'Jonah'})
        res.status(200).send(person)
    } else if (name === '') {
        rollbar.error('No name given')
        res.status(400).send('must provide a name')
    } else {
        rollbar.error("this person was already added to the list")
        res.status(400).send('That person was already added')
    }
})

const port = process.env.PORT || 5500

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`we are up and running on ${port}`))