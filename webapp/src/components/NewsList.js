/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:38
 * Description：
 */
import React, {Component, PropTypes} from 'react'
import NewsItem from './NewsItem'
import axios from 'axios'
import '../css/newsList.css'

export default class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8000/sinaList').then(resp => {
            console.log(resp);
        })
    }


    render() {
        return (
            <div className="news-wrap">
                {
                    this.state.list.map((item, index) => <NewsItem key={index} newsItem={item}/>)
                }
            </div>
        )
    }
}