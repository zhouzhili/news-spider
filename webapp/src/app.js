/**
 * Created by ZZl.
 * DateTime: 2018/4/13 15:54
 * Description：
 */
import React, {Component} from 'react'
import {HashRouter} from 'react-router-dom'
import './assets/css/app.css'
import Navigation from './components/Navigation'
import Main from './components/Main'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div className="app">
                    <Navigation/>
                    <div className="main">
                        <Main/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}