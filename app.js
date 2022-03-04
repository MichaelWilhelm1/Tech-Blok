const express = require('express')

const app = express()

const port = 3000

app.use(express.static('public'))

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
app.get('/formulier', (req, res) => {
    res.send('formulier');
})
app.get('*', function (req, res) {

    res.send('CANNOT FIND PAGE ERROR 404 (oepsie)', 404);

});
/*webserver starten*/

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})