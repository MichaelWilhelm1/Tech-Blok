const express = require('express')

const app = express()

const port = 3000

const dotenv = require('dotenv').config();
const {
    MongoClient
} = require('mongodb');
const {
    ObjectId
} = require('mongodb');

let db = null;
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');
/* routes */

app.get('/', (req, res) => {

    res.render('home');

})
app.get('/profile/:name', function (req, res) {
    var data = {
        leeftijd: 20,
        geslacht: 'man'
    };
    res.render('profile', {
        person: req.params.name,
        data: data
    });
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/header', (req, res) => {
    res.render('header');
})
app.get('/mijnlijst', (req, res) => {
    res.render('mijnlijst');
})
app.get('*', function (req, res) {

    res.send('CANNOT FIND PAGE ERROR 404 (oepsie)', 404);

});

/*****************************************************
 * Connect to database
 ****************************************************/
async function connectDB() {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
    } catch (error) {
        throw error;
    }
}

/*webserver starten*/

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
    connectDB().then(() => console.log("We have a connection to Mongo!"));
})

//database inhoud sturen en ophalen: hulp van Sonja
/*
app.post("/save-countries", (req, res) => {
    console.log(req.body)

    res.redirect("/mijnlijst")
})*/

app.post('/mijnlijst', async (req, res) => {

    // landinfo toevoegen

    let form = {

        land: req.body.land,

        populatie: req.body.populatie,

        regio: req.body.regio,

        capital: req.body.capital,

        language: req.body.language
    };

    // connection

    await db.collection('landen').insertOne(form);



    // RENDER PAGE

    const title = "land toegevoegd";

    res.render('mijnlijst')

});