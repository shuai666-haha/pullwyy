import React, { Component } from 'react'
import pubsub from 'pubsub-js'

class Tab extends Component {
    constructor() {
        super()
        this.state = {
            loginmy: true
        }
    }
    toLogin = () => {
        pubsub.publish('loginzt', this.state.loginmy)
    }
    render() {
        return (
            <div className="myMusic">
                <div className="mymusicCon">
                    <h2>我的音乐</h2>
                    <a href="###" onClick={this.toLogin}>我的音乐</a>
                </div>
            </div>

        )
    }
}

export default Tab