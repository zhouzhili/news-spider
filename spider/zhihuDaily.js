/**
 * Created by ZZl.
 * DateTime: 2018/4/10 11:18
 * Description：知乎日报
 */
const ajax = require('./spiderCommon').ajax;
const cheerio = require('cheerio');

function getZhihuDailyList() {
    let url = 'http://daily.zhihu.com';
    return new Promise((resolve, reject) => {
        ajax.get(url).then(data => {
            let $ = cheerio.load(data);
            let lists = $('.box');
            let listArray = [];
            lists.each(function (index, item) {
                let div = $(this);
                let href = url + div.find('a').attr('href');
                let title = div.find('span').text();
                listArray.push({
                    href,
                    title
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
