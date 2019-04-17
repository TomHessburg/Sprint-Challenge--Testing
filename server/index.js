const express = require('express');
const server = express();
const db = require('./dbConfig.js');

server.use(express.json());

server.get('/', (req,res) => {
    res.send('up and working')
})

server.get('/games', (req,res) => {
    db('games')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
})

server.get('/games/:id', (req,res) => {
    const id = req.params.id

    db('games')
        .where({id})
        .then(game => {
            if(game.length){
                res.status(200).json(game)
            }else{
                res.status(404).json({msg: "game not found"})
            }
        })
        .catch(err => res.status(500).json(err))
})

server.post('/games', (req,res) => {
    db('games')
        .insert(req.body)
        .then(response => {
            const [id] = response;

            db('games')
                .where({id})
                .then(game => res.status(201).json(game))
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.status(422).json({errMsg: "please provide all the required data"}));
})

module.exports = server;