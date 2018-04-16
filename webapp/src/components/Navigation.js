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
        this.state = {
            current: 0
        };
    }

    sectionClickHandle = (item, index) => {
        let url = 'http://localhost:8000/sinaList';
        switch (item) {
            case '新闻':
                url = 'http://localhost:8000/sinaList';
                break;
            case '日报':
                url = 'http://localhost:8000/zhihu';
                break;
            case '开源':
                url = 'http://localhost:8000/osChina';
                break;
            case '趋势':
                url = 'http://localhost:8000/gitHub';
                break;
            case '社区':
                url = 'http://localhost:8000/v2ex';
                break;
            default:
                url = 'http://localhost:8000/sinaList'
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