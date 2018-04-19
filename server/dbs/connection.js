/**
 * Created by ZZl.
 * DateTime: 2018/4/17 16:51
 * Description：
 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/news');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
module.exports = db;
