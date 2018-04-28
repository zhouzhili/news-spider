/**
 * Created by ZZl.
 * DateTime: 2018/4/26 15:05
 * Description：
 */
import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import RouterConf from './RouteConf'

export default class Main extends Component {
    render() {
        return (
            <Switch>
                {
                    RouterConf.map((item, index) => {
                        return (
                            <Route exact={item.exact} key={item.path} path={item.path} component={item.component}/>
                        )
                    })
                }
            </Switch>
        )
    }
}