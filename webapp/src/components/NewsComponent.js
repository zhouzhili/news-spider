/**
 * Created by ZZl.
 * DateTime: 2018/4/26 14:44
 * Description：
 */
import React, {Component} from 'react'

import moment from 'moment'

import '../assets/css/newsItem.css'

export default class NewsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.newsList.map((item, index) => {
                let TimeSpan = ('');
                if (item.time) {
                    TimeSpan = (
                        <span className="time">{moment(item.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>);
                }
                return (
                    <div className="newItem" key={item._id}>
                        <div>
                            <span className="index">{index + 1}、</span>
                            <a href={item.url} target="_blank">{item.title}</a>
                        </div>
                        {TimeSpan}
                    </div>
                )
            })
        )
    }
}