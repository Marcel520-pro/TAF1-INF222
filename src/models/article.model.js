const db = require('../config/db');

const Article = {

    create: (article, callback) => {
        const { titre, contenu, auteur, date, categorie, tags } = article;

        const sql = `
            INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(sql, [titre, contenu, auteur, date, categorie, tags], function (err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        });
    },

    getAll: (filters, callback) => {
        let sql = "SELECT * FROM articles WHERE 1=1";

        if (filters.categorie) {
            sql += " AND categorie = ?";
        }

        if (filters.auteur) {
            sql += " AND auteur = ?";
        }

        let params = [];
        if (filters.categorie) params.push(filters.categorie);
        if (filters.auteur) params.push(filters.auteur);

        db.all(sql, params, callback);
    },

    getById: (id, callback) => {
        db.get("SELECT * FROM articles WHERE id = ?", [id], callback);
    },


    update: (id, article, callback) => {
        const { titre, contenu, categorie, tags } = article;

        db.run(
            `UPDATE articles SET titre=?, contenu=?, categorie=?, tags=? WHERE id=?`,
            [titre, contenu, categorie, tags, id],
            function (err) {
                callback(err, { changes: this.changes });
            }
        );
    },

    delete: (id, callback) => {
        db.run("DELETE FROM articles WHERE id=?", [id], function (err) {
            callback(err, { changes: this.changes });
        });
    },


    search: (query, callback) => {
        db.all(
            `SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?`,
            [`%${query}%`, `%${query}%`],
            callback
        );
    }
};

module.exports = Article;