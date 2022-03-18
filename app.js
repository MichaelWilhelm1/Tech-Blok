//express zorgt ervoor dat je jouw site localhost kan hosten 
//en pagina's kan maken met app.get

const express = require('express')

const app = express()

const port = process.env.PORT || 3000;

const dotenv = require('dotenv').config();
const {
    MongoClient
} = require('mongodb');
const {
    ObjectId
} = require('mongodb');

// connect mongoose
const mongoose = require("mongoose");
const myId = mongoose.Types.ObjectId;

const fetch = require('node-fetch');

let db = null;
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
// gebruik van ejs
app.set('view engine', 'ejs');
/* routes */

app.get('/', async (req, res) => {

    const ress = await fetch('https://restcountries.com/v2/all');
    const countries = await ress.json();

    res.render('home', {
        countries: countries

    });

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
/*app.get('/contact', async (req, res) => {
    const ress = await fetch('https://restcountries.com/v2/all');
    const countries = await ress.json();

    res.render('contact', {
        countries: countries

    });

})*/
app.get('/header', (req, res) => {
    res.render('header');
})

// mijn lijst, rendert een title en allelanden dus landen.land etc die later worden ingesteld
app.get('/mijnlijst', async (req, res) => {
    const allelanden = await db.collection('landen').find().toArray();
    const title = "Mijn landen";
    res.render('mijnlijst', {
        title,
        allelanden
    });
})
app.get('*', function (req, res) {

    res.send('CANNOT FIND PAGE ERROR 404 (oepsie)', 404);

});

/*****************************************************
 * Connect to database
 ****************************************************/
// Sonja haar uitleg
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

    // landinfo toevoegen via het id die in script.js is aangegeven in het aanmaken van formulier

    let form = {

        land: req.body.land,

        populatie: req.body.populatie,

        regio: req.body.regio,

        capital: req.body.capital,

        language: req.body.language
    };

    // connection
    // stuurt het als een form
    await db.collection('landen').insertOne(form);

    const allelanden = await db.collection('landen').find().toArray();


    // render de gestuurde data naar pagina

    const title = "Mijn landen";

    res.render('mijnlijst', {
        title,
        allelanden
    });

});

// delete functie
app.post("/delete/:id",
    async (req, res) => {

        db.collection('landen').deleteOne({
            _id: ObjectId(req.params.id)
        })
        res.redirect("/mijnlijst");
    });

//Sam slotenmaker vertelde over ObjectId(req.params.id) ipv dat ik _id: MyId moest gebruiken