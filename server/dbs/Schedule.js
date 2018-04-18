/**
 * Created by ZZl.
 * DateTime: 2018/4/18 16:54
 * Description：定时任务
 */
const schedule = require('node-schedule');
const allStorage = require('./allStorage');

function mySchedule() {
    let rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    schedule.scheduleJob(rule, function () {
        console.log('执行爬取任务,' + new Date().toLocaleString());
        allStorage()
    })
}

mySchedule();