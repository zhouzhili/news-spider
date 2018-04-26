/**
 * Created by ZZl.
 * DateTime: 2018/4/26 15:05
 * Description：
 */
import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import CommonNewsComponent from './CommonNewsComponent'

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => {
                    let Component = CommonNewsComponent('sina');
                    return <Component/>;
                }}/>
                <Route exact path="/zhihu" render={() => {
                    let Component = CommonNewsComponent('zhihu');
                    return <Component/>;
                }}/>
                <Route exact path="/oschina" render={() => {
                    let Component = CommonNewsComponent('oschina');
                    return <Component/>;
                }}/>
            </Switch>
        )
    }
}