"use strict";

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin');

var authUnit = require('./api/post/auth');
var testUnit = require('./api/test/test')

admin.initializeApp({
    credential: admin.credential.cert(require('../secret/firebase-secret.json'))
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.post('/register', (req: any, res: any) => {
    authUnit.register(req, res, admin.auth());
})

app.get('/test', (req: any, res: any) => {
    testUnit.test(req, res)
})

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`)
})