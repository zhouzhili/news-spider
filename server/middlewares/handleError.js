/**
 * Created by ZZl.
 * DateTime: 2018/4/16 15:12
 * Description：
 */
module.exports = function () {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || '500';
            ctx.response.type = 'html';
            ctx.response.body = `<h3>出错了</h3><br><p>${err}</p>`;
            ctx.app.emit('error', err, ctx);
        }
    }
};