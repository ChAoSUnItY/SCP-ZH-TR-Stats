import app from '../../app'
import { Request, Response } from 'express'
import wikidot from '../../util/wikidotHelper'
import scraper from '../../util/scraper'

class PageData {
    public preview: string
    public rating: string

    constructor(public title: string, public url: string) { }

    addPreview(text: string) {
        this.preview = text
    }

    addRating(rating: string) {
        this.rating = rating
    }
}

export default {
    getTopsTag(username: string, limit: number) { //UNUSED FUNCTION
        wikidot.ZHTR.listPages({
            created_by: `${username}`,
            limit: limit,
            perPage: "10000",
        })
    },
    async getRecentArticles(req: Request, res: Response, response: boolean = true) {
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
        if (response) {
            if (Object.keys(data).length === 0) {
                let ERR = `User ${req.params.name} hasn't post any articles!`
                res.json(ERR)
                return
            }

            if (app.debugMode)
                res.send($.html())

            res.json(data)
        }
        return data
    },
    async getAvatarURL(req: Request, res: Response) {
        scraper
            .getWikidotUserAvatar(req.params.name)
            .then(result => {
                res.json({ avatarURL: result })
            })
            .catch(err => {
                console.log(err)
            })
    },
    async getPageTag(req: Request, res: Response) {
        scraper
            .getTags(req.params.postName)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    async getPagesTag(req: Request, res: Response) {
        scraper
            .getTagsFromPages(req.body)
            .then(result => {
                res.json(result)
            })
    }
}