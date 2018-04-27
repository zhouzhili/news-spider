/**
 * Created by ZZl.
 * DateTime: 2018/4/26 9:54
 * Description：高阶组件，封装组件的数据请求
 */
import React, {Component} from 'react'
import Loading from './Loading'

import axios from 'axios'
import '../assets/css/newsList.css'

export default (WrappedComponent, url) => {
    class NewComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                showLoading: true,
                newsList: [],
                error: false
            }
        }

        componentDidMount() {
            let requestUrl = `http://118.24.43.222:80${url}`;
            console.log(requestUrl);
            axios.get(requestUrl).then(resp => {
                this.setState({showLoading: false});
                if (resp.status === 200 && resp.data.succeed) {
                    this.setState({newsList: resp.data.content});
                }
            }).catch((err) => {
                console.log(err);
                this.setState({showLoading: false, error: true});
            });
        }

        render() {
            let Main = (
                <div className="news-wrap">
                    {this.state.error ? (<p className="error-info">获取数据出错</p>)
                        : <WrappedComponent newsList={this.state.newsList}/>}
                </div>
            );
            return this.state.showLoading ? <Loading/> : Main;
        }
    }

    return NewComponent;
}
