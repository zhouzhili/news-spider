/**
 * Created by ZZl.
 * DateTime: 2018/4/10 11:18
 * Description：知乎日报
 */
const ajax = require('./spiderCommon').ajax;
const cheerio = require('cheerio');
const moment = require('moment');

module.exports.getZhihuDailyList = function () {
    let url = 'http://daily.zhihu.com';
    return new Promise((resolve, reject) => {
        ajax.get(url).then(data => {
            let $ = cheerio.load(data);
            let lists = $('.box');
            let listArray = [];
            let now = moment().format('YYYY-MM-DD HH:mm:ss');
            lists.each(function (index, item) {
                let div = $(this);
                let href = url + div.find('a').attr('href');
                let title = div.find('span').text();
                listArray.push({
                    url: href,
                    title,
                    createTime: now
                });
            });
            resolve({
                data: listArray,
                message: '',
                succeed: true
            });
        }).catch(err => {
            resolve({
                data: [],
                message: err,
                succeed: false
            });
        });
    })
}
