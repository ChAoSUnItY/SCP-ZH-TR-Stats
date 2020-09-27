const got = require('got');
const cheerio = require('cheerio');

class WD {
    base: string
    baseURL: string

    // Modified from https://github.com/resure/wikidot-ajax/blob/master/index.js
    constructor(baseURL: string) {
        this.base = `${baseURL}`;
        this.baseURL = `${baseURL}/ajax-module-connector.php`;
    }
    async req(url: string, params: object) {
        const wikidotToken7 = Math.random().toString(36).substring(4);
        return await got.post(url, {
            headers: { Cookie: `wikidot_token7=${wikidotToken7}` },
            form: Object.assign({ wikidot_token7: wikidotToken7, callbackIndex: 0 }, params)
        }).json();
    };

    async module(moduleName: string, params: object) {
        return await this.req(this.baseURL, Object.assign({ moduleName: moduleName }, params))
    }

    async getUser(username: string) {
        return await this.module("users/UserSearchModule", {
            query: username
        })
    }

    async source(page: string) {
        let pg = await got.get(`${this.base}/${page}`).text()
        pg = cheerio.load(pg)
        let page_id;
        pg(pg("head").children("script")
            .filter((i, el) => pg(el).html().includes("WIKIREQUEST"))).html()
            .replace(/WIKIREQUEST\.info\.pageId *?= *?(\d+);/g, (_, id) => {
                page_id = id
            })
        let info = await this.module("viewsource/ViewSourceModule", {
            page_id: page_id
        })
        return info.body
    }

    async getRevs(info, id, perpage, page) {
        info = await this.module("userinfo/UserChangesListModule", {
            userId: `${id}`,
            perpage: `${perpage}`,
            page: page
        })
        return { body: info.body, ex: info.body.trim() !== `Sorry, no revisions matching your criteria.` }
    }

    async getPosts(info, id, perpage, page) {
        info = await this.module("userinfo/UserRecentPostsListModule", {
            userId: `${id}`,
            limit: `${perpage}`,
            page: page
        })
        return cheerio.load(info.body)
    }

    // https://www.wikidot.com/doc-modules:listpages-module
    async listPages(params: object) {
        let lp = await this.module('list/ListPagesModule', Object.assign({
            category: ".",
            perPage: "20",
            separate: "true",
            module_body: ``
        }, params))
        return cheerio.load(lp.body)
    }

    // https://www.wikidot.com/doc-modules:tagcloud-module
    async tagCloud(params: object) {
        return await this.module('pagestagcloud/PagesTagCloudModule', Object.assign({
            limit: "50",
            target: "system:page-tags",
            showHidden: "false"
        }, params))
    }

    getBaseLink() {
        return this.baseURL
    }
}

export default {
    ZHTR: new WD('http://scp-zh-tr.wikidot.com')
}