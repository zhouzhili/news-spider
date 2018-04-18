/**
 * Created by ZZl.
 * DateTime: 2018/4/13 15:42
 * Description：
 */
const mongoose = require('mongoose');
const sinaSpider = require('../spider/sinaSpider');

mongoose.connect('mongodb://localhost:27017/test');
const con = mongoose.createConnection('mongodb://localhost/news', {config: {autoIndex: false}});

con.on('error', function (err) {
    console.log('数据库连接失败');
});


//抓取数据存储到数据库中
async function insertNewsData() {
    //新浪schema--表结构
    let sinaSchema = new mongoose.Schema({
        channel: Object,
        title: String,
        url: String,
        type: String,
        pic: String,
        time: Number
    });
    //新浪model
    let SinaNews = con.model('SinaNews', sinaSchema);
    try {
        let data = await sinaSpider.getNewsList(null);
        let resp = {
            data: [],
            succeed: false,
            message: ''
        };
        if (data.succeed && data.data.length > 0) {
            let result = await SinaNews.create(data.data);
            if (result.length === data.data.length) {
                resp.data = result;
                resp.succeed = true;
            }
        }
        return resp;
    } catch (err) {
        console.log(err);
    }
}

async function getNewsData() {
    try {
        let resp = await SinaNews.find({}, null, {limit: 10});
        return {
            data: resp,
            succeed: true,
            message: '获取数据成功'
        };
        ;
    } catch (err) {
        console.log(err);
        return {
            data: [],
            succeed: false,
            message: err
        };
    }
}

getNewsData().then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});


