/**
 * Created by ZZl.
 * DateTime: 2018/4/13 16:06
 * Description：
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../assets/css/navigation.css'

export default class Navigation extends Component {
    static propTypes = {
        changeSection: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.sections = ['新闻', '日报', '开源', '趋势', '社区'];
        //标记活跃的导航栏
        this.state = {
            current: 0
        };
        //主机地址
        this.host = 'localhost:8000';
    }

    sectionClickHandle = (item, index) => {
        let url = `http://${this.host}`;
        switch (item) {
            case '新闻':
                url = `${url}/sinaList`;
                break;
            case '日报':
                url = `${url}/zhihu`;
                break;
            case '开源':
                url = `${url}/osChina`;
                break;
            case '趋势':
                url = `${url}/gitHub`;
                break;
            case '社区':
                url = `${url}/v2ex`;
                break;
            default:
                url = `${url}/sinaList`;
        }
        this.setState({current: index});
        this.props.changeSection(url);
    };

    render() {
        return (
            <div className="nav">
                <span>程序员头条</span>
                <ul>
                    {
                        this.sections.map((item, index) => {
                            let className = this.state.current === index ? 'active-li' : '';
                            return <li className={className} key={index}
                                       onClick={() => this.sectionClickHandle(item, index)}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}