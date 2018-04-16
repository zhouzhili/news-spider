/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:41
 * Description：
 */
import React, {Component} from 'react'
import '../assets/css/newsItem.css'
import moment from 'moment'

export default class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //时间,sina和v2ex
        let TimeSpan = ('');
        if (this.props.newsItem.time) {
            TimeSpan = (
                <span className="time">{moment(this.props.newsItem.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>);
        }
        return (
            <div className="newItem">
                <div>
                    <span className="index">{this.props.index + 1}、</span>
                    <a href={this.props.newsItem.url} target="_blank">{this.props.newsItem.title}</a>
                </div>
                {TimeSpan}
            </div>
        )
    }
}