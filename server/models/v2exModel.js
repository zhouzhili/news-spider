/**
 * Created by ZZl.
 * DateTime: 2018/4/19 9:53
 * Description：
 */
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    title: String,
    url: String,
    time: String,
    content: String,
    replies: String,
    createTime: String
});

module.exports = mongoose.model('v2exs', schema);