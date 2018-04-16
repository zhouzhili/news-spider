/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:38
 * Description：
 */
import React, {Component} from 'react'
import PropsType from 'prop-types'
import NewsItem from './NewsItem'
import '../assets/css/newsList.css'

export default class NewsList extends Component {
    static propTypes = {
        list: PropsType.array
    };

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="news-wrap">
                {
                    this.props.list.map((item, index) => <NewsItem key={index} newsItem={item} index={index}/>)
                }
            </div>
        )
    }
}
