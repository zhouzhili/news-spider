//路由
const queryData = require('../dbs/queryData');
const router = require('koa-router')();

router.get('/sina', async (ctx, next) => {
    await next();
    ctx.response.body = await queryData('sinas', 20);
});

router.get('/zhihu', async (ctx, next) => {
    await next();
    ctx.response.body = await queryData('zhihus', 30);
});

router.get('/oschina', async (ctx, next) => {
    await next();
    ctx.response.body = await queryData('oschinas', 20);
});

// router.get('/v2ex', async (ctx, next) => {
//     await next();
//     ctx.response.body = await queryData('v2exs', 8);
// });

router.get('/github', async (ctx, next) => {
    await next();
    ctx.response.body = await queryData('githubs', 25);
});

module.exports = router;


