const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

(async () => {

    describe('API Venue Routes', () => {

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

        // Test de la route GET /venue/
        it('should return all venues', async () => {
            const { expect } = await import('chai');

            const res = await request(app).get('/api/venue/');

            expect(res.status).to.equal(200);  // Vérifier que le statut est 200
            expect(res.body).to.be.an('array');  // Vérifier que la réponse est un tableau
            expect(res.body[0]).to.have.property('_id');  // Vérifier que l'élément contient un id
            expect(res.body[0]).to.have.property('name');  // Vérifier que l'élément contient un nom
            expect(res.body[0]).to.have.property('category');  // Vérifier que l'élément contient une catégorie
            expect(res.body[0]).to.have.property('lat');  // Vérifier que l'élément contient une latitude
            expect(res.body[0]).to.have.property('lng');  // Vérifier que l'élément contient une longitude
        }).timeout(10000);;

        // Test de la route POST /venue/:id
        it('should create a new venue', async () => {
            const { expect } = await import('chai');

            const newVenue = {
                name: '',
                category: 'wc',
                lat: 48.8,
                lng: 2.2
            };

            const res = await request(app)
                .post('/api/venue/new')
                .set('Authorization', `Bearer ${token}`)
                .send(newVenue);

            expect(res.status).to.equal(201);  // Vérifier que le lieu a été créé
            expect(res.body).to.have.property('_id');  // Vérifier que la réponse contient un ID
            expect(res.body.name).to.equal(newVenue.name);  // Vérifier le nom du lieu
            expect(res.body.category).to.equal(newVenue.category);  // Vérifier la catégorie du lieu
            expect(res.body.lat).to.equal(newVenue.lat);  // Vérifier la latitude du lieu
            expect(res.body.lng).to.equal(newVenue.lng);  // Vérifier la longitude du lieu
        });

        // Test de la route GET /venue/:id
        it('should return an venue by id', async () => {
            const { expect } = await import('chai');

            const venueId = ''; // L'ID du lieu que vous voulez tester

            const res = await request(app)
                .get(`/api/venue/${venueId}`);

            expect(res.status).to.equal(200);  // Vérifier que le statut de la réponse est 200
            expect(res.body).to.have.property('_id');  // Vérifier que la réponse contient un champ 'id'
            expect(res.body._id).to.equal(venueId);  // Vérifier que l'ID du lieu est bien celui qu'on a demandé
            expect(res.body).to.have.property('name');  // Vérifier que le lieu a un nom
            expect(res.body).to.have.property('category');  // Vérifier que le lieu a une catégorie
            expect(res.body).to.have.property('lat');  // Vérifier que le lieu a une latitude
            expect(res.body).to.have.property('lng');  // Vérifier que le lieu a une longitude
        });

        // Test de la route PUT /venue/:id
        it('should update an existing venue', async () => {
            const { expect } = await import('chai');

            const venueId = ''; // ID du lieu à modifier
            const updatedVenue = {
                name: '',
                category: 'wc',
                lat: 48.81,
                lng: 2.21
            };

            const res = await request(app)
                .put(`/api/venue/${venueId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedVenue);

            expect(res.status).to.equal(200);  // Vérifier que la mise à jour a réussi
            expect(res.body.name).to.equal(updatedVenue.name);  // Vérifier que le nnom a bien été mis à jour
            expect(res.body.category).to.equal(updatedVenue.category);  // Vérifier que la catégorie a bien été mise à jour
            expect(res.body.lat).to.equal(updatedVenue.lat);  // Vérifier que la latitude a bien été mise à jour
            expect(res.body.lng).to.equal(updatedVenue.lng);  // Vérifier que la longitude a bien été mise à jour
        });

        // Test de la route DELETE /venue/:id
        it('should delete an venue', async () => {
            const { expect } = await import('chai');

            const venueId = ''; // ID du lieu à supprimer

            const res = await request(app)
                .delete(`/api/venue/${venueId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).to.equal(200);  // Vérifier que le lieu a été supprimé
            expect(res.text).to.equal(`Venue with id ${venueId} deleted`);  // Vérifier le message de confirmation
        });

    });

})();
