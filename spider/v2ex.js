/**
 * Created by ZZl.
 * DateTime: 2018/4/11 15:01
 * Description：v2ex
 */
const ajax = require('./spiderCommon').ajax;

function getV2exList() {
    let url = 'https://www.v2ex.com/api/topics/hot.json';
    return new Promise((resolve, reject) => {
        ajax.get(url).then(data => {
            let result = [];
            let d = eval(data);
            if (d && d.length > 0) {
                d.forEach((item, index) => {
                    result.push({
                        title: item.title,
                        url: item.url,
                        content: item.content_rendered,
                        replies: item.replies,
                        created: item.created
                    })
                });
            }
            resolve({
                data: result,
                message: '',
                succeed: true
            })
        }).catch(err => {
            resolve({
                data: [],
                message: err,
                succeed: false
            })
        })
    })
}