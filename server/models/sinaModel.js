/**
 * Created by ZZl.
 * DateTime: 2018/4/19 9:52
 * Description：新浪的model
 */
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    title: String,
    url: String,
    time: String,
    type: String,
    pic: String,
    channel: Object,
    createTime: String
});

module.exports = mongoose.model('sinas', schema);