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
            '/sina': NewsComponent,
            '/zhihu': NewsComponent,
            '/oschina': NewsComponent,
            '/github': GitHub
        };
        let url = path === '/' ? '/sina' : path;
        let NewsCom = WrapWithLoadData(comObj[url], url);
        return (<NewsCom/>);
    }
    render() {
        return (
            <Switch>
                <Route exact path="/" render={(props) => this.renderComponent(props.match.path)}/>
                <Route exact path="/zhihu" render={(props) => this.renderComponent(props.match.path)}/>
                <Route exact path="/oschina" render={(props) => this.renderComponent(props.match.path)}/>
                <Route exact path="/github" render={(props) => this.renderComponent(props.match.path)}/>
            </Switch>
        )
    }
}