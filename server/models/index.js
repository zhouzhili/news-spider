/**
 * Created by ZZl.
 * DateTime: 2018/4/19 10:40
 * Description：所有的model
 */
const connection = require('../dbs/connection');

const gitHubModel = require('../models/gitHubModel');
const osChianModel = require('../models/osChinaModel');
const sinaModel = require('../models/sinaModel');
const v2exModel = require('../models/v2exModel');
const zhihuModel = require('../models/zhihuModel');

module.exports = {
    'sinas': sinaModel,
    'githubs': gitHubModel,
    'oschinas': osChianModel,
    'v2exs': v2exModel,
    'zhihus': zhihuModel
};