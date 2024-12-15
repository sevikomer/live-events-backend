const express = require('express');
const router = express.Router();

const multer = require('../../middleware/multer-config');

const eventApiCtrl = require('../../controllers/eventApi');
const authAPI = require('../../middleware/authAPI');


/**
 * @swagger
 * /api/event/:
 *   get:
 *     summary: Récupérer tous les événements
 *     description: Cette route permet de récupérer tous les événements.
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Liste des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   image:
 *                     type: string
 *                   title:
 *                     type: string
 *                   start_date:
 *                     type: date
 *                   venue:
 *                     type: string
 */
router.get('/', eventApiCtrl.getAllEvents);

/**
 * @swagger
 * /api/event/new:
 *   post:
 *     summary: Créer un nouvel événement
 *     description: Cette route permet de créer un nouvel événement en envoyant les détails dans le corps de la requête.
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               title:
 *                 type: string
 *               start_date:
 *                 type: date
 *               venue:
 *                 type: string
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 image:
 *                   type: string
 *                 title:
 *                   type: string
 *                 start_date:
 *                   type: date
 *                 venue:
 *                   type: string
 *       400:
 *         description: Paramètres invalides
 */
router.post('/new', authAPI, multer, eventApiCtrl.createEvent);

/**
 * @swagger
 * /api/event/{id}:
 *   get:
 *     summary: Récupérer un événement par son id
 *     description: Cette route permet de récupérer un événement en utilisant son ID.
 *     tags: [Event]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'id unique de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'événement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 image:
 *                   type: string
 *                 title:
 *                   type: string
 *                 start_date:
 *                   type: date
 *                 venue:
 *                   type: string
 *       404:
 *         description: Événement non trouvé
 */
router.get('/:id', eventApiCtrl.getOneEvent);

/**
 * @swagger
 * /api/event/{id}:
 *   put:
 *     summary: Mettre à jour un événement existant
 *     description: Cette route permet de mettre à jour un événement en envoyant les nouveaux détails dans le corps de la requête.
 *     tags: [Event]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID unique de l'événement à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                 title:
 *                   type: string
 *                 start_date:
 *                   type: date
 *                 venue:
 *                   type: string
 *     responses:
 *       200:
 *         description: Événement mis à jour avec succès
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 image:
 *                   type: string
 *                 title:
 *                   type: string
 *                 start_date:
 *                   type: date
 *                 venue:
 *                   type: string
 *       400:
 *         description: Paramètres invalides
 *       404:
 *         description: Événement non trouvé
 */
router.put('/:id', authAPI, multer, eventApiCtrl.modifyEvent);

/**
 * @swagger
 * /api/event/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     description: Cette route permet de supprimer un événement en utilisant son ID.
 *     tags: [Event]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID unique de l'événement à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Événement supprimé avec succès
 *       404:
 *         description: Événement non trouvé
 */
router.delete('/:id', authAPI, eventApiCtrl.deleteEvent);

module.exports = router;