const express = require('express');
const router = express.Router();
const controller = require('../controllers/article.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - titre
 *         - contenu
 *         - auteur
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'article
 *         titre:
 *           type: string
 *           description: Titre de l'article
 *         contenu:
 *           type: string
 *           description: Contenu de l'article
 *         auteur:
 *           type: string
 *           description: Nom de l'auteur
 *         date:
 *           type: string
 *           description: Date de publication
 *         categorie:
 *           type: string
 *           description: Catégorie de l'article
 *         tags:
 *           type: string
 *           description: Tags séparés par des virgules
 */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article créé
 *       400:
 *         description: Champs obligatoires manquants
 */
router.post('/articles', controller.createArticle);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *     responses:
 *       200:
 *         description: Liste des articles
 */
router.get('/articles', controller.getArticles);

/**
 * @swagger
 * /articles/search:
 *   get:
 *     summary: Rechercher des articles par texte
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Texte à rechercher dans le titre ou le contenu
 *     responses:
 *       200:
 *         description: Liste des articles correspondant à la recherche
 *       400:
 *         description: Paramètre query manquant
 */
router.get('/articles/search', controller.searchArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 */
router.get('/articles/:id', controller.getArticle);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Modifier un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article modifié
 *       404:
 *         description: Article non trouvé
 */
router.put('/articles/:id', controller.updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Supprimer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 */
router.delete('/articles/:id', controller.deleteArticle);

module.exports = router;