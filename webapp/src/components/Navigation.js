/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:06
 * Description：
 */
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import '../assets/css/navigation.css'

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav">
                <span>程序员头条</span>
                <ul>
                    <li>
                        <NavLink to="/" active="true" activeClassName="active-li">新浪</NavLink>
                    </li>
                    <li>
                        <NavLink to="/zhihu" activeClassName="active-li">日报</NavLink>
                    </li>
                    <li>
                        <NavLink to="/oschina" activeClassName="active-li">开源</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}