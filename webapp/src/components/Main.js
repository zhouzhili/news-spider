/**
 * Created by ZZl.
 * DateTime: 2018/4/26 15:05
 * Description：
 */
import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import WrapWithLoadData from './WrapWithLoadData'
import NewsComponent from './NewsComponent'
import GitHub from './GitHub'

export default class Main extends Component {
    renderComponent(path) {
        let comObj = {
            '/news': {
                component: NewsComponent,
                url: '/sina'
            },
            '/daily': {
                component: NewsComponent,
                url: '/zhihu'
            },
            '/open': {
                component: NewsComponent,
                url: '/oschina'
            },
            '/git': {
                component: GitHub,
                url: '/github'
            },
        };
        let url = path === '/' ? '/news' : path;
        let NewsCom = WrapWithLoadData(comObj[url].component, comObj[url].url);
        return (<NewsCom/>);
    }
    render() {
        return (
            <Switch>
                <Route exact path="/" render={(props) => this.renderComponent(props.match.path)}/>
                <Route exact path="/daily" render={(props) => this.renderComponent(props.match.path)}/>
                <Route exact path="/open" render={(props) => this.renderComponent(props.match.path)}/>
                <Route exact path="/git" render={(props) => this.renderComponent(props.match.path)}/>
            </Switch>
        )
    }
}