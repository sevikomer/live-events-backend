const express = require('express');
const router = express.Router();

const venueApiCtrl = require('../../controllers/venueApi');
const authAPI = require('../../middleware/authAPI');

/**
 * @swagger
 * /api/venue/:
 *   get:
 *     summary: Récupérer tous les lieux
 *     description: Cette route permet de récupérer tous les lieux.
 *     tags: [Venue]
 *     responses:
 *       200:
 *         description: Liste des lieux
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 */
router.get('/', venueApiCtrl.getAllVenues);


/**
 * @swagger
 * /api/venue/new:
 *   post:
 *     summary: Créer un nouveau lieu
 *     description: Cette route permet de créer un nouveau lieu en envoyant les détails dans le corps de la requête.
 *     tags: [Venue]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *     responses:
 *       201:
 *         description: Lieu créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 lat:
 *                   type: number
 *                 lng:
 *                   type: number
 *       400:
 *         description: Paramètres invalides
 */
router.post('/new', authAPI, venueApiCtrl.createVenue);

/**
 * @swagger
 * /api/venue/{id}:
 *   get:
 *     summary: Récupérer un lieu par son id
 *     description: Cette route permet de récupérer un lieu en utilisant son ID.
 *     tags: [Venue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'id unique du lieu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du lieu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 lat:
 *                   type: number
 *                 lng:
 *                   type: number
 *       404:
 *         description: Lieu non trouvé
 */
router.get('/:id', venueApiCtrl.getOneVenue);

/**
 * @swagger
 * /api/venue/{id}:
 *   put:
 *     summary: Mettre à jour un lieu existant
 *     description: Cette route permet de mettre à jour un lieu en envoyant les nouveaux détails dans le corps de la requête.
 *     tags: [Venue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID unique du lieu à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 lat:
 *                   type: number
 *                 lng:
 *                   type: number
 *     responses:
 *       200:
 *         description: Lieu mis à jour avec succès
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 lat:
 *                   type: number
 *                 lng:
 *                   type: number
 *       400:
 *         description: Paramètres invalides
 *       404:
 *         description: Lieu non trouvé
 */
router.put('/:id', authAPI, venueApiCtrl.modifyVenue);

/**
 * @swagger
 * /api/venue/{id}:
 *   delete:
 *     summary: Supprimer un lieu
 *     description: Cette route permet de supprimer un lieu en utilisant son ID.
 *     tags: [Venue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID unique du lieu à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lieu supprimé avec succès
 *       404:
 *         description: Lieu non trouvé
 */
router.delete('/:id', authAPI, venueApiCtrl.deleteVenue);

module.exports = router;