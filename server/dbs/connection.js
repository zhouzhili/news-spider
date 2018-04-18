/**
 * Created by ZZl.
 * DateTime: 2018/4/17 16:51
 * Description：
 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/news');
const con = mongoose.createConnection('mongodb://localhost/news', {config: {autoIndex: false}});

con.on('error', function (err) {
    console.log('数据库连接失败');
});
module.exports = con;
