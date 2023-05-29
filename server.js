const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

let db;

const dbName = 'socialDB';

client.connect()
    .then(() => {
        console.log('Connected successfully to MongoDB');
        db = client.db(dbName);
        
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Mongo connection error: ', err.message)
    });

    app.use(express.json());

    //crete new user
    app.post('/createuser', (req, res) => {
        db.collection('newUser').insertOne(
            { username: req.body.username, email: req.body.email, thoughts: req.body.email, friends: req.body.friends}
        )
            .then(results => res.json(results))
            .catch(err => {
                if(err) throw err;
            });
    });

    app.post('/createthought', (req, res) => {
        db.collection('newThought').insertOne(
            { thoughtText: req.body.thoughtText, createdAt: req.body.createdAt, username: req.body.username, reactions: req.body.reactions}
        )
            .then(results => res.json(results))
            .catch(err => {
                if(err) throw err;
            });
    });

    app.get('/users', (req, res) => {
        db.collection('users')
        .find()
        .toArray()
        .then(results => res.json(results))
        .catch(err => {
            if (err) throw err;
        });
    });