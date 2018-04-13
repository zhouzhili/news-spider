/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:06
 * Description：
 */
import React, {Component, PropTypes} from 'react'
import '../css/navigation.css'

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <span>程序员头条</span>
                <ul>
                    <li className="active-li">新闻</li>
                    <li>日报</li>
                    <li>开源</li>
                    <li>趋势</li>
                    <li>社区</li>
                </ul>
            </div>
        )
    }
}