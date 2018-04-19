/**
 * Created by ZZl.
 * DateTime: 2018/4/9 17:33
 * Description：开源中国新闻
 */
const ajax=require('./spiderCommon').ajax;
const cheerio = require('cheerio');
const moment = require('moment');

module.exports.getOsChinaNewsList = function () {
    let osChinaUrl = 'https://www.oschina.net/news';
    return new Promise((resolve, reject) => {
        ajax.get({url: osChinaUrl}).then(data => {
            let $ = cheerio.load(data);
            let news = $('#all-news').find('.title');
            let newsObj = [];
            let now = moment().format('YYYY-MM-DD HH:mm:ss');
            news.each(function (index, item) {
                let $a = $(this);
                let href = $a.attr('href');
                let link = href.slice(0, 4) === 'http' ? href : 'https://www.oschina.net' + href;
                newsObj.push({
                    title: $a.text(),
                    url: link,
                    createTime: now
                });
            });
            resolve({
                data: newsObj,
                message: '',
                succeed: true
            });
        }).catch(err => {
            resolve({
                data: [],
                message: err,
                succeed: false
            });
        })
    })
}
