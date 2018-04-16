/**
 * Created by ZZl.
 * DateTime: 2018/4/10 17:28
 * Description：gitHub
 */
const ajax = require('./spiderCommon').ajax;
const cheerio = require('cheerio');

module.exports.getGitHubTrending = function (query) {
    //weekly,monthly
    let url = query ? 'https://github.com/trending' : `https://github.com/trending?since=${query}`;
    return new Promise((resolve, reject) => {
        ajax.get(url).then(data => {
            let $ = cheerio.load(data);
            let $li = $('.repo-list').find('li');
            let result = [];
            $li.each(function (index, item) {
                let $title = $(this).find('h3');
                //名称
                let name = $title.text().replace(/\s*|\t|\r|\n/g, '');
                //链接
                let href = 'https://github.com' + $($title[0]).find('a').attr('href');
                //描述
                let desc = $(this).find('.py-1').text().replace(/\s*|\t|\r|\n/g, '');
                let mt = $(this).find('.f6');
                //语言
                let language = $(mt[0]).find('span').eq(2).text().replace(/\s*|\t|\r|\n/g, '');
                //星
                let star = $(mt[0]).find('a').eq(0).text().replace(/\s*|\t|\r|\n/g, '');
                result.push({
                    title: name,
                    url: href,
                    desc,
                    language,
                    star
                });
            });
            resolve({
                data: result,
                message: '获取GitHub趋势数据成功',
                succeed: true
            })
        }).catch(err => {
            resolve({
                data: [],
                message: err,
                succeed: false
            })
        })
    })
}

