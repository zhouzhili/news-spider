/**
 * Created by ZZl.
 * DateTime: 2018/4/26 9:54
 * Description：
 */
import React, {Component} from 'react'
import Loading from './Loading'
import axios from 'axios'
import moment from 'moment'

export default (newsUrl) => {
    class CommonNews extends Component {
        constructor(props) {
            super(props);
            this.state = {
                showLoading: true,
                newsList: []
            }
        }

        componentDidMount() {
            let url = `http://118.24.43.222:80/${newsUrl}`;
            axios.get(url).then(resp => {
                console.log(url, resp);
                this.setState({showLoading: false});
                if (resp.status === 200 && resp.data.succeed) {
                    this.setState({newsList: resp.data.content});
                }
            }).catch((err) => {
                console.log(err);
                this.setState({showLoading: false});
            });
        }

        render() {
            let NewsCom = this.state.newsList.map((item, index) => {
                console.log(item);
                // let TimeSpan ='';
                // if (item.time) {
                //     TimeSpan = (
                //         <span className="time">{moment(item.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
                //     );
                // }
                return (
                    <div className="newItem">
                        <div>
                            <span className="index">{index + 1}、</span>
                            <a href={item.url} target="_blank">{item.title}</a>
                        </div>
                        {/*{TimeSpan}*/}
                    </div>
                )
            });
            return (
                this.state.showLoading ? <Loading/> : <NewsCom/>
            )
        }
    }

    return CommonNews;
}