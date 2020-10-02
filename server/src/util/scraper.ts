const cheerio = require('cheerio');

import got from 'got'

class TagsData {
    constructor() { }

    addTag(tagName: string) {
        if (this[tagName]) {
            this[tagName] += 1
        } else {
            this[tagName] = 1
        }
    }
}

let scraper = {
    getWikidotUserAvatar: async (username: string) => {
        const res = await got(`http://www.wikidot.com/user:info/${username.replace(/[\W_]+/g, '-').toLowerCase()}`).text()
        let $ = cheerio.load(res)
        return $('#page-content > div.col-md-9 > h1 > img').attr('src') as string
    },
    getTags: async (pageUnixName: string) => {
        const res = await got(`http://scp-zh-tr.wikidot.com/${pageUnixName}`).text()
        let $ = cheerio.load(res)
        let tags: Array<string> = []
        $('#main-content > div.page-tags > span').find('a').each((i: number, e: any) => {
            let tagName = $(e).text()
            tags.push(tagName)
        })
        return tags
    },
    getTagsFromPages: async (pagesUnixName: Array<string>) => {
        let data = new TagsData()
        for (const v of pagesUnixName) {
            const res = await got(`http://scp-zh-tr.wikidot.com/${v}`).text()
            let $ = cheerio.load(res)
            $('#main-content > div.page-tags > span').find('a').each((i: number, e: any) => {
                let tagName = $(e).text()
                data.addTag(tagName)
            })
        }
        return data
    },
    TagsData
}

export default scraper