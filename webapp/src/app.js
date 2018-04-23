/**
 * Created by ZZl.
 * DateTime: 2018/4/13 15:54
 * Description：
 */
import React, {Component} from 'react'
import './assets/css/app.css'
import loading from './assets/images/loading_b.gif'
import axios from 'axios'
import Navigation from './components/Navigation'
import NewsList from './components/NewsList'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            loading: true
        }
    }

    componentWillMount() {
        this.getNewsListData();
    }

    getNewsListData = (url) => {
        this.setState({loading: true});
        let tagUrl = url || 'http://118.24.43.222:80/sina';
        axios.get(tagUrl).then(resp => {
            console.log(url, resp);
            this.setState({loading: false});
            if (resp.status === 200 && resp.data.succeed) {
                this.setState({newsList: resp.data.content});
            }
        }).catch((err) => {
            console.log(err);
            this.setState({loading: false});
        });
    };

    render() {
        let newsMain = this.state.loading ? (<div className="loading-wrap">
                <img src={loading}/>
            </div>)
            : (<NewsList list={this.state.newsList}/>);
        return (
            <div className="app">
                <Navigation changeSection={this.getNewsListData}/>
                <div className="main">
                    {newsMain}
                </div>
            </div>
        )
    }
}