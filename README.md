# API Backend Express - Live Events

## Description

Ce projet est une API backend développée avec **Node.js** et **Express** pour la gestion des événements du festival. Elle permet de récupérer des informations sur des événements, informations ou lieux, de les créer, de les mettre à jour et de les supprimer. Cette API peut être utilisée avec un frontend React ou toute autre application cliente pour afficher et interagir avec les événements.

## Fonctionnalités

- Récupération de la liste des événements, des informations et des lieux.
- Récupération des détails d'un événement, d'une information ou d'un lieu spécifique en utilisant son **ID** ou **slug**.
- Création, mise à jour et suppression d'événements, d'informations et de lieux.
- Validation des données d'entrée pour garantir l'intégrité de l'API.
- Utilisation de **MongoDB** pour stocker les données.

## Prérequis

Avant de pouvoir installer et utiliser ce projet, vous devez avoir les outils suivants installés sur votre machine :

- **Node.js** (version 14 ou plus)
- **npm** (ou **yarn**) pour la gestion des dépendances
- **MongoDB**

## Installation

1. Clonez ce projet sur votre machine locale :
   ```bash
   git clone https://github.com/sevikomer/live-events-backend.git

2. Allez dans le dossier du projet :
cd nom-du-projet

3. Installez les dépendances avec npm ou yarn :
Avec npm :
npm install
Avec yarn :
yarn install

Démarrer l'application
Pour démarrer l'API en mode développement, exécutez la commande suivante :
Si vous utilisez npm :
npm start
Si vous utilisez yarn :
yarn start
L'API sera accessible à l'adresse suivante dans votre navigateur ou via des outils comme Postman :
http://localhost:4200

Structure du Projet
Voici la structure de base de votre projet backend avec Express :
live-events-backend/
│
├── controllers/             # Gestion des logiques métier (fonctionnalités)
│   ├── event.js             # Logique de gestion des événements
│   ├── eventApi.js          # Logique de gestion des événements pour l'API
│   ├── information.js       # Logique de gestion des informations
│   ├── informationApi.js    # Logique de gestion des informations pour l'API
│   ├── user.js              # Logique de gestion des utilisateurs
│   ├── userApi.js           # Logique de gestion des utilisateurs pour l'API
│   ├── venue.js             # Logique de gestion des lieux
│   ├── venueApi.js          # Logique de gestion des lieux pour l'API
│
├── images/                  # Images utilisées
│
├── middleware/              # Middleware pour validation, authentification, etc.
│   ├── auth.js              # Authentification des utilisateurs
│   ├── authAPI.js           # Authentification des utilisateurs pour l'API
│   ├── multer-config.js     # Validation des images
│
├── models/                  # Modèles de données (par exemple Mongoose pour MongoDB)
│   ├── Event.js             # Modèle des événements
│   ├── Information.js       # Modèle des informations
│   ├── User.js              # Modèle des utilisateurs
│   ├── Venue.js             # Modèle des lieux
│
├── routes/                  # Définitions des routes
│   ├── api/                 # Définitions des routes pour l'API
│   │   ├── eventApi.js      # Routes pour les événements pour l'API
│   │   ├── informationApi.js # Routes pour les informations pour l'API
│   │   ├── userApi.js       # Routes pour les utilisateurs pour l'API
│   │   ├── venueApi.js      # Routes pour les lieux pour l'API
│   ├── event.js             # Routes pour les événements
│   ├── information.js       # Routes pour les informations
│   ├── user.js              # Routes pour les utilisateurs
│   ├── venue.js             # Routes pour les lieux
│
├── views/                  # Définitions des vues
│   ├── edit-events.ejs     # Vues permettant de modifier un évènement
│   ├── edit-information.ejs # Vues permettant de modifier une information
│   ├── edit-venue.ejs      # Vues permettant de modifier un lieu
│   ├── event.ejs           # Vues pour les évènements
│   ├── head.ejs            # Vues pour les head
│   ├── header.ejs          # Vues pour les header
│   ├── home.ejs            # Vues pour la page d'accueil
│   ├── information.ejs     # Vues pour les informations
│   ├── login.ejs           # Vues pour la connexion
│   ├── venue.ejs           # Vues pour les lieux
│   ├── view-event.ejs      # Vues permettant de visualiser un évènement
│   ├── view-information.ejs  # Vues permettant de visualiser une information
│   ├── view-venue.ejs      # Vues permettant de visualiser un lieu
│
├── .env                     # Variables d'environnement (ex : clé API, URI DB)
├── app.js                   # Configuration de l'application
├── server.js                # Point d'entrée de l'application (serveur Express)
├── package.json             # Dépendances et scripts du projet
└── README.md                # Ce fichier


Liste des dépendances du projet :
"dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-session": "^2.1.0",
    "crypto-js": "^4.2.0",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.1",
    "mongoose-unique-validator": "^5.0.0",
    "multer": "^1.4.5-lts.1"
  },
  

Routes de l'API :

Pour le modèle Event:
### 1. **GET api/event**
Récupère la liste de tous les événements.
### 2. **GET api/event/:id**
Récupère un événement par son **id**.
### 3. **POST api/event/new**
Crée un nouvel événement.
- **Body** : `{ image, title, start_date, venue }`
### 4. **PUT api/event/:id**
Met à jour un événement par son **id**.
- **Body** : `{ image, title, start_date, venue }`
### 5. **DELETE api/event/:id**
Supprime un événement par son **id**.

Pour le modèle Information:
### 1. **GET api/information**
Récupère la liste de tous les informations.
### 2. **GET api/information/:id**
Récupère uns information par son **id**.
### 3. **POST api/information/new**
Crée une nouvelle information.
- **Body** : `{ title, content }`
### 4. **PUT api/information/:id**
Met à jour une information par son **id**.
- **Body** : `{ title, content}`
### 5. **DELETE api/information/:id**
Supprime une information par son **id**.

Pour le modèle Venue:
### 1. **GET api/venue**
Récupère la liste de tous les lieux.
### 2. **GET api/venue/:id**
Récupère un lieu par son **id**.
### 3. **POST api/venue/new**
Crée un nouveau lieu.
- **Body** : `{ name, category, lat, lng }`
### 4. **PUT api/venue/:id**
Met à jour un lieu par son **id**.
- **Body** : `{ name, category, lat, lng }`
### 5. **DELETE api/venue/:id**
Supprime un lieu par son **id**.


Base de données
Si vous utilisez MongoDB pour stocker vos événements, assurez-vous d'installer et de configurer MongoDB sur votre machine locale ou d'utiliser une base de données distante (comme MongoDB Atlas). N'oubliez pas de mettre à jour le fichier .env pour inclure votre URI MongoDB.
Exemple de fichier .env :
MONGO_URI=mongodb://localhost:27017/gestion-evenements
PORT=5000

Déploiement
L'API peut être déployée sur des services comme Heroku, DigitalOcean, AWS, ou Azure. Voici les étapes générales pour déployer votre API sur Heroku :

Créez un compte sur Heroku si vous n'en avez pas déjà un.
Installez Heroku CLI et connectez-vous avec la commande :
heroku login
Créez une nouvelle application Heroku :
heroku create nom-de-l-app
Ajoutez votre dépôt Git à Heroku :
git remote add heroku https://git.heroku.com/nom-de-l-app.git
Déployez l'application sur Heroku :
git push heroku master
L'API sera accessible à l'adresse fournie par Heroku.

Contribuer
Si vous souhaitez contribuer à ce projet, voici comment procéder :

Comment contribuer
Forkez ce dépôt.
Créez une branche pour votre fonctionnalité (git checkout -b feature/nouvelle-fonctionnalité).
Committez vos modifications (git commit -am 'Ajout d'une nouvelle fonctionnalité').
Poussez la branche (git push origin feature/nouvelle-fonctionnalité).
Ouvrez une pull request pour que vos modifications soient examinées et intégrées.









