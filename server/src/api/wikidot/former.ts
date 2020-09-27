const cheerio = require('cheerio')
const got = require("got")

import app from '../../app'
import { json, Request, Response } from 'express'
import wikidot from '../../util/wikidotHelper'

class PageData {
    public preview: string
    public rating: string

    constructor(public title: string, public url: string) {}

    addPreview(text: string) {
        this.preview = text
    }

    addRating(rating: string) {
        this.rating = rating
    }
}

export default {
    getTopsTag(username: string, limit: number) {
        wikidot.ZHTR.listPages({
            created_by: `${username}`,
            limit: limit,
            perPage: "10000",

        })
    },
    async getRecentArticles(req: Request, res: Response) {
        var $ = await wikidot.ZHTR.listPages({
            created_by: `${req.params.name}`,
            perPage: "10000",
            separate: "false",
            order: "rating desc",
            module_body: `%%title_linked%%\n%%preview%%\n%%created_at%%\n//%%rating%%//`
        })

        let data: Array<PageData> = [];
        $('body > div').find('a').each((i, e) => {
            let link = `${wikidot.ZHTR.base}${$(e).attr('href')}`
            let title = $(e).text()
            data.push(new PageData(title, link))
        })


        $('body > div').find('span:not(.odate)').each((i, e) => {
            let preview = $(e).text()
            data[i].addPreview(preview)
        })

        $('body > div').find('em').each((i, e) => {
            let rating = $(e).text()
            data[i].addRating(rating)
        })

        if (Object.keys(data).length === 0) {
            let ERR = `User ${req.params.name} hasn't post any articles!`
            res.json(ERR)
            return
        }

        if (app.debugMode)
            res.send($.html())

        console.log(data)
        res.json(data)
    }
}