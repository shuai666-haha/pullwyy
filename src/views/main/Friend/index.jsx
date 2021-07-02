import React, { Component } from 'react'
import pubsub from 'pubsub-js'




class Tab extends Component {
    constructor() {
        super()
        this.state = {
            loginmy: true
        }
    }

    componentDidMount() {
       
    }



    toLogin = () => {
        pubsub.publish('loginzt', this.state.loginmy)
    }
    render() {
        return (
            <div className="Friend">
                <div className="FriendCon">
                    <span>
                        <p>你可以关注明星和好友品味他们的私房歌单</p>
                        <p>通过他们的动态发现更多精彩音乐</p>
                    </span>
                    <a href="###" onClick={this.toLogin}>立即登录</a>
                </div>
            </div>

        )
    }
}

export default Tab