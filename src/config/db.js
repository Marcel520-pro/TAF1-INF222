const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.log("Erreur de connexion à la base de données")
    } else {
        console.log("Connexion à la base de données réussie");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS articles(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        contenu TEXT NOT NULL,
        auteur TEXT NOT NULL,
        date TEXT,
        categorie TEXT,
        tags TEXT
    )
`, (err) => {
    if (err) {
        console.log("Erreur de création de la table")
    } else {
        console.log("Table créée avec succès");
    }
});

module.exports = db;
