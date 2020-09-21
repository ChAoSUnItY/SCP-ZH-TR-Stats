const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin');

var auth = require('./api/post/auth');

admin.initializeApp({
    credential: admin.credential.cert(require('../secret/firebase-secret.json'))
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.post('/register', (req, res) => {
    auth.register(req, res, db);
})

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`)
})