### 项目简介

基于 KOA2 和 React 的前后端栈，计划是一个新闻页面。

数据存储采用 MongoDB，前端展示采用 react

目前爬取了:

1. 新浪新闻
2. 开源中国新闻
3. 知乎日报
4. v2ex 最热
5. github 趋势

> 部门爬虫可能受网站影响已失效

### 项目运行

```bash
# 服务端安装依赖
$ cd server
$ npm install # Or yarn install
# 服务端默认运行在 localhost:8000
$ npm start

# 前端安装依赖
$ cd webapp
$ npm install # Or yarn install
# 运行前端代码
$ npm start # Or yarn start
```

#### 工作进展

2018-04-20：基本完成了数据爬取，存储以及定时任务，设置定时任务，每天低频率爬取数据并存
储到数据库，请求数据时直接从数据库中获取，相比直接实时爬取数据并发送给前端要快很多，
后端先告一段落，接下来重点完成前端和手机端任务。

### 总结

1. react 渲染数组的时候使用 map 方法，react 会把数组中的要素按照组件进行渲染

2. 高阶组件其实就是一个函数，对组件进行封装返回一个新的组件，主要用途是封装组件相同的操作，
   例如初始化相关数据，封装 AJAX 请求等其他内容，返回的是一个新的数组。

3. 路由主要组件为 BrowserRouter，Router，Navigation，Link 组件

4. BrowserRouter 为现代浏览器 H5 提供的支持，需要服务器端的支持，而 HashRouter 是 hash 地址，例如
   访问/abc,BrowserRouter:http://localhost:80/abc，而HashRouter是http://localhost:80/#/abc
   因此，如果直接访问/abc 将读取服务器根目录下的 abc 文件，如果不存在将会报 404 错误，而 hash 地址则访问的是
   根目录下的 index 页面#号后面的地址不会做处理，由前端处理，因此使用 BrowserRouter 刷新后会报 404 错误，
   而 HashRouter 不会报错。

## 注意：本仓库短期已不再维护
