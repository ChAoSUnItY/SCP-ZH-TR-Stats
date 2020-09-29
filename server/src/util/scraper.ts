const cheerio = require('cheerio');

import got from 'got'

export default {
    getWikidotUserAvatar: async (username: string) => {
        const res = await got(`http://www.wikidot.com/user:info/${username.replace(/[\W_]+/g,'-').toLowerCase()}`).text()
        let $ = cheerio.load(res)
        return $('#page-content > div.col-md-9 > h1 > img').attr('src') as string
    }
}