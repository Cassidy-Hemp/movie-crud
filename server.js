const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const PORT = 2222;


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'movies'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.get('/', async (req,res) =>{
    const movieItems = await db.collection('movies').find().toArray()
    res.render('index.js', { items : movieItems})
})

app.post('/addMovie', (req,res) => {
    db.collection('movies').insertOne({ thing: request.body.movieItems })
    .then(result => {
        console.log(`movie added`)
        res.redirect('/')
    })
    .catch(err => console.error(err))
})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})