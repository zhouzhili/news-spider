/**
 * Created by ZZl.
 * DateTime: 2018/4/18 15:29
 * Description：新浪新闻的存储
 */
const connection = require('./connection');
const mongoose = require('mongoose');

module.exports = async function (spiderMethod, modelName) {
    try {
        let hour = new Date().getHours();
        let Schema = new mongoose.Schema({
            data: Object,
            succeed: Boolean,
            message: String,
            hour: Number
        });

        let model = mongoose.model(modelName, Schema);
        let data = await spiderMethod();
        let storage = {...data, hour};
        return await model.create(storage);
    } catch (err) {
        return err;
    }
};
