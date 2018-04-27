/**
 * Created by ZZl.
 * DateTime: 2018/4/27 14:42
 * Description：GitHub组件
 */
import React, {Component} from 'react'

export default class GitHub extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.newsList);
        return (
            this.props.newsList.map((item, index) => {
                return (
                    <div className="newItem github" key={index}>
                        <div>
                            <span className="index">{index + 1}、</span>
                            <a href={item.url} target="_blank">{item.title}</a>
                        </div>
                        <div className="desc">
                            <span>{item.desc}</span>
                        </div>
                        <div className="starWrap">
                            <div>
                                <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                                    <path
                                        d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path>
                                </svg>
                                {item.star}
                            </div>
                            {item.language ? (
                                <div className="language">
                                    <span></span>{item.language}
                                </div>
                            ) : ''}
                        </div>
                    </div>
                )
            })
        )
    }
}
