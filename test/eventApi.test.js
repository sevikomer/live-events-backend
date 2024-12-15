const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

(async () => {

    describe('API Event Routes', () => {

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

        // Test de la route GET /event/
        it('should return all events', async () => {
            const { expect } = await import('chai');

            const res = await request(app).get('/api/event/');

            expect(res.status).to.equal(200);  // Vérifier que le statut est 200
            expect(res.body).to.be.an('array');  // Vérifier que la réponse est un tableau
            expect(res.body[0]).to.have.property('_id');  // Vérifier que l'élément contient un id
            expect(res.body[0]).to.have.property('title');  // Vérifier que l'élément contient un title
        }).timeout(10000);;

        // Test de la route POST /event/:id
        it('should create a new event', async () => {
            const { expect } = await import('chai');

            const newEvent = {
                image: '',
                title: '',
                start_date: '2024-12-20',
                venue: '669cbed5e7742804cc8afd6e',
            };

            const res = await request(app)
                .post('/api/event/new')
                .set('Authorization', `Bearer ${token}`)
                .send(newEvent);

            expect(res.status).to.equal(201);  // Vérifier que l'événement a été créé
            expect(res.body).to.have.property('_id');  // Vérifier que la réponse contient un ID
            expect(res.body.title).to.equal(newEvent.title);  // Vérifier le titre de l'événement
        });

        // Test de la route GET /event/:id
        it('should return an event by id', async () => {
            const { expect } = await import('chai');

            const eventId = ''; // L'ID de l'événement que vous voulez tester

            const res = await request(app)
                .get(`/api/event/${eventId}`);

            expect(res.status).to.equal(200);  // Vérifier que le statut de la réponse est 200
            expect(res.body).to.have.property('_id');  // Vérifier que la réponse contient un champ 'id'
            expect(res.body._id).to.equal(eventId);  // Vérifier que l'ID de l'événement est bien celui qu'on a demandé
            expect(res.body).to.have.property('image');  // Vérifier que l'événement a une image
            expect(res.body).to.have.property('title');  // Vérifier que l'événement a une date
            expect(res.body).to.have.property('start_date');  // Vérifier que l'événement a une date de début
            expect(res.body).to.have.property('venue');  // Vérifier que l'événement a un lieu
        });

        // Test de la route PUT /event/:id
        it('should update an existing event', async () => {
            const { expect } = await import('chai');

            const eventId = ''; // ID de l'événement à modifier
            const updatedEvent = {
                image: '',
                title: '',
                start_date: '2024-12-25',
                venue: '669cbed5e7742804cc8afd6e',
            };

            const res = await request(app)
                .put(`/api/event/${eventId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedEvent);

            expect(res.status).to.equal(200);  // Vérifier que la mise à jour a réussi
            expect(res.body.image).to.equal(updatedEvent.image);  // Vérifier que l'image a bien été mise à jour
            expect(res.body.title).to.equal(updatedEvent.title);  // Vérifier que le titre a bien été mis à jour
            expect(new Date(res.body.start_date).toISOString()).to.equal(new Date(updatedEvent.start_date).toISOString());  // Vérifier que la date a bien été mise à jour
            expect(res.body.venue).to.equal(updatedEvent.venue);  // Vérifier que la date a bien été mise à jour
        });

        // Test de la route DELETE /event/:id
        it('should delete an event', async () => {
            const { expect } = await import('chai');

            const eventId = ''; // ID de l'événement à supprimer

            const res = await request(app)
                .delete(`/api/event/${eventId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).to.equal(200);  // Vérifier que l'événement a été supprimé
            expect(res.text).to.equal(`Event with id ${eventId} deleted`);  // Vérifier le message de confirmation
        });

    });

})();
