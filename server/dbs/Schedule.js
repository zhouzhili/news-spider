/**
 * Created by ZZl.
 * DateTime: 2018/4/18 16:54
 * Description：定时任务
 */
const schedule = require('node-schedule');
const fs = require('fs');
const moment = require('moment');
const models = require('../models');
const sinaSpider = require('../spider/sinaSpider');
const osChianSpider = require('../spider/oschinaSpider');
const zhihuSpider = require('../spider/zhihuDaily');
const v2exSpider = require('../spider/v2ex');
const githubSpider = require('../spider/github');

/**
 * 存储爬取到的数据
 * @param spiderMethod 爬取方法
 * @param modelName 数据model名
 * @returns {Promise.<*>}
 */
async function storageSpiderData(spiderMethod, modelName) {
    try {
        //获取爬虫数据
        let data = await spiderMethod();
        //获取数据成功就存储,否则返回错误
        if (data.succeed) {
            return await models[modelName].create(data.data);
        } else {
            return data.message;
        }
    } catch (err) {
        return err;
    }
}

/**
 * 写入存储日志
 * @param resp 数据存储返回的结果
 * @param name 执行爬虫的名字
 */
function storageLog(resp, name) {
    let fileName = moment().format('YYYY-MM-DD');
    let time = moment().format("HH:mm:ss");

    let status = 'succeed', info = 'succeed';
    if (resp.length === 0) {
        status = 'error';
        info = resp.result;
    }
    let msg = `${time}--${status}--${name}: ${info}\n`;
    fs.writeFile(`c:\\logs\\${fileName}.txt`, msg, {flag: 'a'}, function (err) {
        if (err) {
            console.log(`${fileName}:${time} 写入${name}失败`, err);
        } else {
            console.log(`${fileName}:${time} 写入${name}成功`);
        }
    })
}

//执行存储和日志
function executeStorage(spiderMethod, modelName) {
    console.log(`${new Date().toLocaleString()}--执行爬取${modelName}任务`);
    storageSpiderData(spiderMethod, modelName).then(resp => {
        storageLog(resp, modelName);
    });

}

//从7点到19点，每隔四个小时爬取一次
function newsSchedule() {
    let rule = new schedule.RecurrenceRule();
    rule.hour = [7, 11, 17, 19];
    rule.minute = 30;
    rule.second = 0;
    schedule.scheduleJob(rule, function () {
        //executeStorage(v2exSpider.getV2exList, 'v2exs');
        executeStorage(sinaSpider.getNewsList, 'sinas');
    })
}

//只需每天7点爬取一次的
function sevenSchedule() {
    let rule = new schedule.RecurrenceRule();
    rule.hour = 7;
    rule.minute = 0;
    rule.second = 0;
    schedule.scheduleJob(rule, function () {
        executeStorage(osChianSpider.getOsChinaNewsList, 'oschinas');
        executeStorage(zhihuSpider.getZhihuDailyList, 'zhihus');
        executeStorage(githubSpider.getGitHubTrending, 'githubs');
    })
}


try {
    newsSchedule();
    sevenSchedule();
} catch (err) {
    console.log(new Date().toLocaleString(), err);
}