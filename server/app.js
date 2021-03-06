const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const path = require('path')
//const RouterLoader = require('./middlewares/RouterLoader');
const handleError = require('./middlewares/handleError');
const router = require('./routes');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

//
app.use(cors())

app.use(json())
app.use(logger())
//static directory
app.use(require('koa-static')(path.join(__dirname, '../webapp/build')));
// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});
//自定义错误处理
app.use(handleError());
// routes
app.use(router.routes(), router.allowedMethods());
// app.use(RouterLoader(app));

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
