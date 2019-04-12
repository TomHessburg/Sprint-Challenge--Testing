const request = require('supertest');
const server = require('./index.js');

const db = require('./dbConfig.js');

beforeEach(async () => {
    await db('games').truncate();
});

describe('games', () => {

    describe('/games GET', () => {
        it('should return a 200 on GET', () => {
            return request(server)
                .get('/games')
                .then(response => {
                expect(response.status).toBe(200);
                })  
                .catch();
        })
        it('should always return an array on GET', () => {
            
            return request(server)
                .get('/games')
                .then(response => {
                    expect(response.text).toEqual("[]");
                })  
                .catch();
        })
        describe('/games/:id GET', () => {
            it('should return a 404 if the game dosnt exists', () => {
                return request(server)
                    .get('/games/20')
                    .then(response => {
                    expect(response.status).toBe(404);
                    })  
                    .catch();
            })
            it('should return a 200 if game exists', () => {
                
                request(server)
                    .post('/games')
                    .send({title: "game 4", genre: 'fantasy', releaseYear: 2015})
                    .then(response => {
                        request(server)
                            .get('/games/1')
                            .then(response => {
                                expect(response.status).toBe(200);
                            })  
                    })
                    
            })
        })
    })

    describe('/games POST', () => {
        it('should return a 201 on POST', () => {
            return request(server)
                .post('/games')
                .send({title: "game 4", genre: 'fantasy', releaseYear: 2015})
                .then(response => {
                    expect(response.status).toBe(201);
                })  
                .catch();
        })
        it('should return a 422 if all info isnt provided', () => {
            return request(server)
                .post('/games')
                .send({title: "game 4", releaseYear: 2015})
                .then(response => {
                    expect(response.status).toBe(422);
                })  
                .catch();
        })
        it('should return the new game', () => {
            return request(server)
                .post('/games')
                .send({title: "game 4", genre: 'fantasy', releaseYear: 2015})
                .then(response => {
                    expect(response.text).toEqual('[{\"id\":1,\"title\":\"game 4\",\"genre\":\"fantasy\",\"releaseYear\":2015}]');
                })  
                .catch();
        })
    })

})