/**
 * Created by ZZl.
 * DateTime: 2018/4/9 17:33
 * Description：
 */
const request=require('request-promise');

const userAgent={
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    Connection:'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Content-Type': 'text/html',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4,sr;q=0.2'
};

let ajax=request.defaults({
    headers:userAgent,
    gzip:true
});

exports={
    ajax
};
