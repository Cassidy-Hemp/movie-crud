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
      db = client.db(dbName)
      console.log(`Connected to ${dbName} Database`)
    }).catch(err => {
      console.log({err})
    })

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.get('/', async (req,res) =>{

      const movieItems = await db.collection('movies').find().toArray()
      res.render('index.ejs', { items : movieItems})

  
})

app.post('/addMovie', (req,res) => {
    db.collection('movies').insertOne({ thing: req.body.movieItems })
    .then(result => {
        console.log(`movie added`)
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

app.put('/rateMovie', (req, response) => {
    db.collection('movies').insertOne({ thing: req.body.movieFromJS }, {
        $set: {
            stars: {1:1, 2:1, 3:1, 4:1, 5:1}, 
            new: true
        }
        .then(result => {
            console.log('Movie Rated')
            response.json('Movie Rated')
        })
        .catch(error => console.error(error))
    
    })
  
  });

app.delete('/deleteMovie', (req,res) => {
    db.collection('movies').deleteOne({ thing: req.body.movieFromJS})
    .then(result => {
        console.log('Movie Deleted')
        res.json('Movie Deleted')
    })
    .catch(err => console.error(err))
})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})