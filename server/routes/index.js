const sinaSpider = require('../spider/sinaSpider');
const zhihuSpider = require('../spider/zhihuDaily');
const osChinaSpider = require('../spider/oschinaSpider');
const v2ex = require('../spider/v2ex');
const gitHub = require('../spider/github');

module.exports = function (router) {
    router.get('/sinaList', async (ctx, next) => {
        await next();
        let col = ctx.request.body.col || '';
        let type = ctx.request.body.type || '';
        let num = ctx.request.body.num || '';
        ctx.response.body = await sinaSpider.getNewsList({col, type, num});
    });

    router.get('/zhihu', async (ctx, next) => {
        await next();
        ctx.response.body = await zhihuSpider.getZhihuDailyList();
    });

    router.get('/osChina', async (ctx, next) => {
        await next();
        ctx.response.body = await osChinaSpider.getOsChinaNewsList();
    });

    router.get('/v2ex', async (ctx, next) => {
        await next();
        ctx.response.body = await v2ex.getV2exList();
    });

    router.get('/gitHub', async (ctx, next) => {
        await next();
        ctx.response.body = await gitHub.getGitHubTrending();
    })
};


