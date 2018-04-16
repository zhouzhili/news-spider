/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:05
 * Description：
 */
import React, {Component} from 'react'
import '../assets/css/header.css'

export default class Header extends Component {
    render() {
        return (
            <div className="app-header">
                <span>天气信息</span>
                <div className="about">
                    <span>关于</span>
                    <span>投诉建议</span>
                </div>
            </div>
        )
    }
}