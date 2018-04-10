/**
 * Created by ZZl.
 * DateTime: 2018/4/9 17:33
 * Description：
 */
const ajax=require('./spiderCommon').ajax;
const cheerio = require('cheerio');

const osChinaUrl='https://www.oschina.net/news';

function getOsChinaNewsList() {
    return new Promise((resolve, reject) => {
        ajax.get({url: osChinaUrl}).then(data => {
            let $ = cheerio.load(data);
            let news = $('#all-news').find('.title');
            let newsObj = [];
            news.each(function (index, item) {
                let $a = $(this);
                let href = $a.attr('href');
                let link = href.slice(0, 4) === 'http' ? href : 'https://www.oschina.net' + href;
                newsObj.push({
                    title: $a.text(),
                    link: link
                });
            });
            resolve(newsObj);
        }).catch(err => {
            reject(err);
        })
    })
}
