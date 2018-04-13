/**
 * Created by ZZl.
 * DateTime: 2018/4/13 11:01
 * Description：自动加载routes下面的路由
 */
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

function initRoutes(app) {
    return async (ctx, next) => {
        let dic = path.join(__dirname, '../routes');
        let files = fs.readdirSync(dic);
        let jsFile = files.filter(f => {
            return f.endsWith('.js');
        });

        for (let f of jsFile) {
            console.log(`process routes ${f}`);
            let routesFile = require(dic + '/' + f);
            routesFile(router);
        }
        app.use(router.routes(), router.allowedMethods());

        await next();
    }
}

module.exports = initRoutes;

