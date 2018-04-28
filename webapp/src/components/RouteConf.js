/**
 * Created by ZZl.
 * DateTime: 2018/4/28 11:18
 * Description：路由配置
 */
import React from 'react'
import WrapWithLoadData from './WrapWithLoadData'
import NewsComponent from './NewsComponent'
import GitHub from './GitHub'

function wrapCommonNewsComponent(url, component = NewsComponent) {
    return WrapWithLoadData(component, url);
}

export default [
    {
        exact: true,
        path: '/',
        component: wrapCommonNewsComponent('/sina')
    },
    {
        exact: true,
        path: '/daily',
        component: wrapCommonNewsComponent('/zhihu')
    },
    {
        exact: true,
        path: '/open',
        component: wrapCommonNewsComponent('/oschina')
    },
    {
        exact: true,
        path: '/git',
        component: wrapCommonNewsComponent('/github', GitHub)
    }
]