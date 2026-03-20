const Article = require('../models/article.model');

exports.createArticle = (req, res) => {
    const { titre, contenu, auteur } = req.body;

    if (!titre || !contenu || !auteur) {
        return res.status(400).json({
            message: "titre, contenu et auteur sont obligatoires"
        });
    }

    Article.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json({
            message: "Article créé",
            id: result.id
        });
    });
};

exports.getArticles = (req, res) => {
    Article.getAll(req.query, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data);
    });
};

exports.getArticle = (req, res) => {
    const id = req.params.id;

    Article.getById(id, (err, data) => {
        if (err) return res.status(500).json(err);

        if (!data) {
            return res.status(404).json({
                message: "Article non trouvé"
            });
        }

        res.json(data);
    });
};

exports.updateArticle = (req, res) => {
    const id = req.params.id;

    Article.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Article non trouvé"
            });
        }

        res.json({
            message: "Article modifié"
        });
    });
};

exports.deleteArticle = (req, res) => {
    const id = req.params.id;

    Article.delete(id, (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Article non trouvé"
            });
        }

        res.json({
            message: "Article supprimé"
        });
    });
};

exports.searchArticles = (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({
            message: "Paramètre query requis"
        });
    }

    Article.search(query, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
};