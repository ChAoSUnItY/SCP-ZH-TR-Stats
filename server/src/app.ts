"use strict"

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

import { Request, Response } from 'express'
import admin from 'firebase-admin'
import wikidotUnit from './api/wikidot/former'
import authUnit from './api/user/auth'
import testUnit from './api/test/test'
import scraper from './util/scraper'

admin.initializeApp({
    credential: admin.credential.cert(require('../secret/firebase-secret.json'))
})
const db = admin.firestore()

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.set('json spaces', 4)

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

//WIKIDOT
// BY USER

app.get('/user/:name/posts', (req: Request, res: Response) => {
    wikidotUnit.getRecentArticles(req, res)
})

app.get('/user/:name/avatar', (req: Request, res: Response) => {
    wikidotUnit.getAvatarURL(req, res)
})

app.get('/user/:name/posts/tags', (req: Request, res: Response) => {
    wikidotUnit
        .getRecentArticles(req, res, false)
        .then(result => {
            if (result.length === 0)
                res.json({ ERR: `User ${req.params.name} has no articles with tags.` })
            else {
                let links: Array<string> = []
                result.forEach(v => {
                    links.push(v.url.substring(v.url.lastIndexOf('/') + 1))
                })
                scraper
                    .getTagsFromPages(links)
                    .then(result => {
                        res.json(result)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } 
        })
})

// BY POSTS

app.get('/post/:postName/tags', (req: Request, res: Response) => {
    wikidotUnit.getPageTag(req, res)
})

app.get('/posts/tags', (req: Request, res: Response) => {
    wikidotUnit.getPagesTag(req, res)
})

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`)
})

export default {
    debugMode: false
}