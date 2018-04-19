/**
 * Created by ZZl.
 * DateTime: 2018/4/18 15:29
 * Description：所有爬虫的存储
 */
const models = require('../models');

module.exports = async function (spiderMethod, modelName) {
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
};
