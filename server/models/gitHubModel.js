/**
 * Created by ZZl.
 * DateTime: 2018/4/19 9:53
 * Description：
 */
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    title: String,
    url: String,
    desc: String,
    language: String,
    star: String,
    createTime: String
});

module.exports = mongoose.model('githubs', schema);