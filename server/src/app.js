const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.get('/status', (req, res) => {
    res.json({status:'ACPT'})
})

app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}! Your user was registered! Have fun!`
    })
})

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`)
})