const express = require('express')
const app = express()
// database
require("dotenv").config()
const { MongoClient } = require("mongodb");

// body parser for the data in the request
const bodyParser = require('body-parser')
 // creates an object from the form data and stores it in the request body property
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())
let db,
    databaseURI = process.env.MONGO_URI,
    dbName = "tasks"

MongoClient.connect(databaseURI, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to the ${dbName} database`)
        db = client.db(dbName)
    })
    .catch(err => {
        console.error(err)  
    })

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.post('/createTask', (request, response) => {
    let task = {
        task: request.body.task, 
        completed: false
    }
    db.collection('tasks').insertOne(task)
    .then(res => response.redirect('/'))
    .catch(err => {
        console.error(err)
    })
})
app.listen(5000, console.log("The server is running!"))