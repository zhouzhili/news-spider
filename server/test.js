/**
 * Created by ZZl.
 * DateTime: 2018/5/2 13:47
 * Description：测试
 */
const models = require('./models');
const github = require('./spider/github')

github.getGitHubTrending().then(data => {
    if (data.succeed) {
        models.githubs.create(data.data).then(resp => {
            console.log('存储数据成功');
        })
    } else {
        console.log('爬取数据失败', data.message);
    }
}).catch(e => {
    console.log('错误', e);
});