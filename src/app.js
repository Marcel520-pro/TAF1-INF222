const express = require('express');
require('./config/db');

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Yo nigga mon serveur donne free ")
});

app.listen(3000, () => {
    console.log("Le serveur tourne sur le port 3000")
});
