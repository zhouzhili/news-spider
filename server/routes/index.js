const sinaSpider = require('../spider/sinaSpider')


module.exports = function (router) {
    router.get('/sinaList', async (ctx, next) => {
        let col = ctx.request.body.col || '';
        let type = ctx.request.body.type || '';
        let num = ctx.request.body.num || '';
        return await sinaSpider.getNewsList({col, type, num});
    });
};


