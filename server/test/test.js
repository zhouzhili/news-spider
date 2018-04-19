/**
 * Created by ZZl.
 * DateTime: 2018/4/19 10:44
 * Description：
 */
const sinaSpider = require('../spider/sinaSpider');
const spiderDataStorage = require('../dbs/spiderDataStorage');
let a = spiderDataStorage(sinaSpider.getNewsList, 'sinas').then(resp => {
    console.log(resp)
}).catch(err => {
    console.log(err);
});
