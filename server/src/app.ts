"use strict"

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const admin = require('firebase-admin')

import { Request, Response } from 'express'
import authUnit from './api/post/auth'
import testUnit from './api/test/test'

admin.initializeApp({
    credential: admin.credential.cert(require('../secret/firebase-secret.json'))
})
const db = admin.firestore()

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

const PORT = process.env.PORT || 8081

app.post('/register', (req: Request, res: Response) => {
    authUnit.register(req, res, admin.auth())
})

app.post('/link', (req: Request, res: Response) => {
    authUnit.link(req, res, admin.firestore())
})

app.get('/link', (req: Request, res: Response) => {
    authUnit.getAccount(req, res, admin.firestore())
})

app.get('/test', (req: Request, res: Response) => {
    testUnit.test(req, res)
})

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`)
})