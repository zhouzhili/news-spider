/**
 * Created by ZZl.
 * DateTime: 2018/4/20 15:00
 * Description：
 */
const models = require('../models');

//从数据库查询数据,查询最新的数据
module.exports = async function (modelName, num) {
    try {
        let data = await models[modelName].find().limit(num).sort({createTime: -1});
        return {
            succeed: true,
            content: data,
            message: `获取${modelName}数据成功`
        };
    } catch (err) {
        return {
            succeed: false,
            content: [],
            message: `获取${modelName}数据失败`
        }
    }
};