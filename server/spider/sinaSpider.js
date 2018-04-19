/**
 * Created by ZZl.
 * DateTime: 2018/4/9 11:23
 * Description：新浪新闻
 */
const iconv = require('iconv-lite');
const ajax = require('./spiderCommon').ajax;
const moment = require('moment');

/**
 * 获取新浪新闻信息
 * col:新闻类型.89:全部,90:国内，91：国际，92：社会，93：体育，94：娱乐，95：军事，96：科技，97：财经，98：股市，99：美股
 * type：是否图片.null:全部，2：图片，3：视频。
 * num：显示的条数
 * @param params
 * @returns jsonData
 */
async function getNewsList(params) {
    let p = params ? params : {col: 89, type: '', num: 10};
    let newsUrl = `http://roll.news.sina.com.cn/interface/rollnews_ch_out_interface.php?col=${p.col}&type=${p.type}&num=${p.num}`;
    try {
        let getCookie = await ajax.get({
            url: newsUrl,
            encoding: null
        });
        let result = iconv.decode(getCookie, 'gb2312');
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        eval(result);
        if (jsonData.list) {
            jsonData.list.map(item => item.createTime = now);
        }
        return {
            data: jsonData.list,
            message: '',
            succeed: true
        };
    } catch (err) {
        return {
            data: [],
            message: err,
            succeed: false
        };
    }
}


module.exports = {
    getNewsList
};
