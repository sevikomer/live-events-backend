const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

(async () => {

    describe('API Information Routes', () => {

        let token;

        before(() => {
            const secret = process.env.RANDOM_TOKEN_SECRET;
            const user = { email: 'test@mail.fr', password: 'test123' };

            token = jwt.sign(
                { userId: '12345', email: user.email },
                secret,
                { expiresIn: '1h' }
            );
        });

        // Test de la route GET /information/
        it('should return all informations', async () => {
            const { expect } = await import('chai');

            const res = await request(app).get('/api/information/');

            expect(res.status).to.equal(200);  // Vérifier que le statut est 200
            expect(res.body).to.be.an('array');  // Vérifier que la réponse est un tableau
            expect(res.body[0]).to.have.property('_id');  // Vérifier que l'élément contient un id
            expect(res.body[0]).to.have.property('title');  // Vérifier que l'élément contient un title
            expect(res.body[0]).to.have.property('content');  // Vérifier que l'élément contient un title
        }).timeout(10000);;

        // Test de la route POST /information/:id
        it('should create a new information', async () => {
            const { expect } = await import('chai');

            const newInformation = {
                title: '',
                content: '',
            };

            const res = await request(app)
                .post('/api/information/new')
                .set('Authorization', `Bearer ${token}`)
                .send(newInformation);

            expect(res.status).to.equal(201);  // Vérifier que l'information a été créé
            expect(res.body).to.have.property('_id');  // Vérifier que la réponse contient un ID
            expect(res.body.title).to.equal(newInformation.title);  // Vérifier le titre de l'information
            expect(res.body.content).to.equal(newInformation.content);  // Vérifier le titre de l'information

        });

        // Test de la route GET /information/:id
        it('should return an information by id', async () => {
            const { expect } = await import('chai');

            const informationId = ''; // L'ID de l'information que vous voulez tester

            const res = await request(app)
                .get(`/api/information/${informationId}`);

            expect(res.status).to.equal(200);  // Vérifier que le statut de la réponse est 200
            expect(res.body).to.have.property('_id');  // Vérifier que la réponse contient un champ 'id'
            expect(res.body._id).to.equal(informationId);  // Vérifier que l'ID de l'information est bien celui qu'on a demandé
            expect(res.body).to.have.property('title');  // Vérifier que l'information a un titre
            expect(res.body).to.have.property('content');  // Vérifier que l'information a un contenu
        });

        // Test de la route PUT /information/:id
        it('should update an existing information', async () => {
            const { expect } = await import('chai');

            const informationId = ''; // ID de l'information à modifier
            const updatedInformation = {
                title: '',
                content: '',
            };

            const res = await request(app)
                .put(`/api/information/${informationId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedInformation);

            expect(res.status).to.equal(200);  // Vérifier que la mise à jour a réussi
            expect(res.body.title).to.equal(updatedInformation.title);  // Vérifier que le titre a bien été mis à jour
            expect(res.body.content).to.equal(updatedInformation.content);  // Vérifier que le contenu a bien été mise à jour
        });

        // Test de la route DELETE /information/:id
        it('should delete an information', async () => {
            const { expect } = await import('chai');

            const informationId = ''; // ID de l'information à supprimer

            const res = await request(app)
                .delete(`/api/information/${informationId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).to.equal(200);  // Vérifier que l'information a été supprimé
            expect(res.text).to.equal(`Information with id ${informationId} deleted`);  // Vérifier le message de confirmation
        });

    });

})();
