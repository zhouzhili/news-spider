/**
 * Created by ZZl.
 * DateTime: 2018/4/26 15:05
 * Description：
 */
import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import WrapWithLoadData from './WrapWithLoadData'
import NewsComponent from './NewsComponent'

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={(props) => {
                    console.log(props);
                    let NewsCom = WrapWithLoadData(NewsComponent, 'sina');
                    return (<NewsCom/>);
                }}/>
            </Switch>
        )
    }
}