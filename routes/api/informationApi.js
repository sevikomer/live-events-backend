const express = require('express');
const router = express.Router();

const informationApiCtrl = require('../../controllers/informationApi');
const authAPI = require('../../middleware/authAPI');

/**
 * @swagger
 * /api/information/:
 *   get:
 *     summary: Récupérer toutes les informations
 *     description: Cette route permet de récupérer toutes les informations.
 *     tags: [Information]
 *     responses:
 *       200:
 *         description: Liste des informations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get('/', informationApiCtrl.getAllInformations);

/**
 * @swagger
 * /api/information/new:
 *   post:
 *     summary: Créer une nouvelle information
 *     description: Cette route permet de créer une nouvelle information en envoyant les détails dans le corps de la requête.
 *     tags: [Information]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Information créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       400:
 *         description: Paramètres invalides
 */
router.post('/new', authAPI, informationApiCtrl.createInformation);

/**
 * @swagger
 * /api/information/{id}:
 *   get:
 *     summary: Récupérer une information par son id
 *     description: Cette route permet de récupérer une information en utilisant son ID.
 *     tags: [Information]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'id unique de l'information
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: Information non trouvée
 */
router.get('/:id', informationApiCtrl.getOneInformation);

/**
 * @swagger
 * /api/information/{id}:
 *   put:
 *     summary: Mettre à jour une information existante
 *     description: Cette route permet de mettre à jour une information en envoyant les nouveaux détails dans le corps de la requête.
 *     tags: [Information]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID unique de l'information à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *     responses:
 *       200:
 *         description: Information mise à jour avec succès
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       400:
 *         description: Paramètres invalides
 *       404:
 *         description: Information non trouvée
 */
router.put('/:id', authAPI, informationApiCtrl.modifyInformation);

/**
 * @swagger
 * /api/information/{id}:
 *   delete:
 *     summary: Supprimer une information
 *     description: Cette route permet de supprimer une information en utilisant son ID.
 *     tags: [Information]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID unique de l'information à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Information supprimée avec succès
 *       404:
 *         description: Information non trouvée
 */
router.delete('/:id', authAPI, informationApiCtrl.deleteInformation);

module.exports = router;