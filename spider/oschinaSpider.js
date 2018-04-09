/**
 * Created by ZZl.
 * DateTime: 2018/4/9 17:33
 * Description：
 */
const ajax=require('./spiderCommon').ajax;

const osChinaUrl='https://www.oschina.net/news';

async function getOsChinaNewsList() {
    try{
        let osNews=await ajax.get({
            url:osChinaUrl
        });
        return osNews;
    }catch (err){
        console.log(err);
        return err;
    }

}

getOsChinaNewsList().then(function (data) {
    console.log(data);
});