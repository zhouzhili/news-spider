/**
 * Created by ZZl.
 * DateTime: 2018/4/18 16:54
 * Description：定时任务
 */
const schedule = require('node-schedule');
const allStorage = require('./allStorage');

//半小时执行一次
function mySchedule() {
    let rule = new schedule.RecurrenceRule();
    rule.minute = [0, 30];
    schedule.scheduleJob(rule, function () {
        console.log('执行爬取任务,' + new Date().toLocaleString());
        allStorage()
    })
}

try {
    mySchedule();
} catch (err) {
    console.log(new Date().toLocaleString(), err);
}