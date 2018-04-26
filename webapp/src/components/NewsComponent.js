/**
 * Created by ZZl.
 * DateTime: 2018/4/26 14:44
 * Description：
 */
import React, {Component} from 'react'
import Loading from './Loading'
import moment from 'moment'

import '../assets/css/newsList.css'
import '../assets/css/newsItem.css'
import CommonNewsComponent from './CommonNewsComponent'

export default class NewsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            newsList: []
        }
    }

    updateData(tag, data) {
        if (tag === 'succeed') {
            this.setState({showLoading: false, newsList: data})
        } else {
            this.setState({showLoading: false});
        }
    }

    render() {
        let NewsCom = this.props.newsList.map((item, index) => {
            let TimeSpan = ('');
            if (item.time) {
                TimeSpan = (
                    <span className="time">{moment(item.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>);
            }
            return (
                <div className="newItem">
                    <div>
                        <span className="index">{index + 1}、</span>
                        <a href={item.url} target="_blank">{item.title}</a>
                    </div>
                    {TimeSpan}
                </div>
            )
        });
        return (
            this.props.showLoading ? <Loading/> : <NewsCom/>
        )
    }
}