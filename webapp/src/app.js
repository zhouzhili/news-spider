/**
 * Created by ZZl.
 * DateTime: 2018/4/13 15:54
 * Description：
 */
import React, {Component, PropTypes} from 'react'
import './css/app.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import NewsList from './components/NewsList'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <div className="main">
                    <Navigation/>
                    <NewsList/>
                </div>
            </div>
        )
    }
}