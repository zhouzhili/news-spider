/**
 * Created by ZZl.
 * DateTime: 2018/4/18 16:01
 * Description：所有爬虫的存储
 */
const sinaSpider = require('../spider/sinaSpider');
const osChianSpider = require('../spider/oschinaSpider');
const zhihuSpider = require('../spider/zhihuDaily');
const v2exSpider = require('../spider/v2ex');
const githubSpider = require('../spider/github');
const spiderDataStorage = require('./spiderDataStorage');
const fs = require('fs');
const moment = require('moment');

//写入存储日志
function storageLog(results) {
    let fileName = moment().format('YYYY-MM-DD');
    let hour = new Date().getHours();
    results.forEach((item, index) => {
        let status = 'succeed', info = '';
        if (!item.result.succeed) {
            info = item.result;
        }
        let msg = `${hour}--${status}--${item.name}:${info}\n`;
        fs.writeFile(`c:\\logs\\${fileName}.txt`, msg, {flag: 'a'}, function (err) {
            if (err) {
                console.log(`${fileName}:${hour}写入${item.name}失败`, err);
            } else {
                console.log(`${fileName}:${hour}写入${item.name}成功`);
            }
        })
    })
}

//执行所有爬虫的存储
module.exports = async function () {
    let sina = await spiderDataStorage(sinaSpider.getNewsList, 'sinas');
    let osChina = await spiderDataStorage(osChianSpider.getOsChinaNewsList, 'oschinas');
    let zhiHu = await spiderDataStorage(zhihuSpider.getZhihuDailyList, 'zhihus');
    let v2ex = await spiderDataStorage(v2exSpider.getV2exList, 'v2exs');
    let gitHub = await spiderDataStorage(githubSpider.getGitHubTrending, 'githubs');
    storageLog([{
        name: 'sina',
        result: sina
    }, {
        name: 'osChina',
        result: osChina
    }, {
        name: 'zhihu',
        result: zhiHu
    }, {
        name: 'v2ex',
        result: v2ex
    }, {
        name: 'gitHub',
        result: gitHub
    }]);
    return '';
};

