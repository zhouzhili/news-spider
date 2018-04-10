/**
 * Created by ZZl.
 * DateTime: 2018/4/10 17:28
 * Description：gitHub
 */
const gitHub = require('octonode');
const client = gitHub.client({
    username: 'zhouzhili',
    password: ''
});

const url = 'https://github.com/trending';

client.get('/user', {}, function (err, status, body, header) {
    console.log('err', err);
    console.log('status', status);
    console.log('body', body);
    console.log()
});

