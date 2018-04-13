/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:41
 * Description：
 */
import React, {Component, PropTypes} from 'react'
import '../css/newsItem.css'
import moment from 'moment'

export default class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="newItem">
                <a href={this.props.newsItem.url} target="_blank">{this.props.newsItem.title}</a>
                <span>{moment(this.props.newsItem.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
        )
    }
}