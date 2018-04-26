/**
 * Created by ZZl.
 * DateTime: 2018/4/26 10:02
 * Description：
 */
import React, {Component} from 'react'
import loading from '../assets/images/loading_b.gif'

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-wrap">
                <img src={loading}/>
            </div>
        )
    }
}