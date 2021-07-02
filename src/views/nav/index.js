import React, { Component } from 'react'
import axios from 'axios'
import pubsub from 'pubsub-js'
import cookies from 'js-cookie'
import { userInfo,signout } from '../../api/login'
// 路由使用
// hash模式
// import { HashRouter as Router, Link, Route } from 'react-router=dom'
// history模式/后端匹配使用
import { Link, Redirect, withRouter } from 'react-router-dom'

import Login from '../login'
// import store from '../../store/store'
class Nav extends Component {
    constructor() {
        super()
        this.state = {
            // 单曲
            songs: [],
            // 歌单
            playlists: [],
            // 专辑
            Album: [],
            // 歌手
            artists: [],
            loginnav: true,
            msg: null,
            logindata: null,
            tologin: null,
            userimg:''
        }
        // this.toLogin = this.toLogin.bind(this)
    }
    componentDidMount() {
        if (cookies.get('token') === undefined)
            return;
        const id = cookies.get('l_userID')
        userInfo(id).then((res) => {
            this.setState({userimg:res.data.profile.avatarUrl})
        })
    }
    toLogin = () => {
        pubsub.publish('loginzt', this.state.loginnav)
    }
    signout = () => {
        signout().then((res)=>{
            console.log(res,'tc');
        })
        cookies.remove('token')   
        cookies.remove('l_userID')   
        window.location.reload()
    }
    render() {
        const { artists, songs, Album, playlists, logindata, userimg } = this.state

        return (
            <div className='nav'>
                <div className="navCon w">
                    <div className='logo'></div>
                    <ul>
                        <Redirect to='/FxMusic'>发现音乐</Redirect>
                        <Link to='/FxMusic'>发现音乐</Link>
                        <Link to='/MyMusic'>我的音乐</Link>
                        <Link to='/Friend'>朋友</Link>
                        <Link to='/'>商城</Link>
                        <Link to='/'>音乐人</Link>
                        <Link to='/'>下载客户端</Link>
                    </ul>

                    <div className='search'>
                        <div className='searchinput'>
                            <input type='text' placeholder='音乐/视频/电台/用户' ref='ele' onFocus={this.showsearch} onBlur={this.hidesearch} onChange={this.onChangEvent} />
                            <div className='searchlist' ref='input' >
                                <h2>搜相关用户&#62;</h2>
                                <div className="rap">
                                    <div className='rap-item'>
                                        <div className='rap-item-left'>
                                            <i></i>
                                            <h3>单曲</h3>
                                        </div>
                                        <ul className='rap-item-right'>
                                            {
                                                songs.map((item, index) => {
                                                    console.log(item)
                                                    return (
                                                        <li key={index} onMouseDown={() => { this.tosearch(item.id) }}>
                                                            {item.name}-{item.artists[0].name}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className='rap-item'>
                                        <div className='rap-item-left'>
                                            <i></i>
                                            <h3>歌手</h3>
                                        </div>
                                        <ul className='rap-item-right'>

                                            {
                                                artists.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {item.name}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className='rap-item'>
                                        <div className='rap-item-left'>
                                            <i></i>
                                            <h3>专辑</h3>
                                        </div>
                                        <ul className='rap-item-right'>
                                            {
                                                Album.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {item.name}-{item.artist.name}
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </div>
                                    <div className='rap-item'>
                                        <div className='rap-item-left'>
                                            <i></i>
                                            <h3>歌单</h3>
                                        </div>
                                        <ul className='rap-item-right'>
                                            {
                                                playlists.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {item.name}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span>创作者中心</span>
                        <a href='###' className='login' onClick={this.toLogin} style={{ display: cookies.get('token') ? 'none' : 'block' }}>登录</a>
                        <div className='loginbox' style={{ display: cookies.get('token') ? 'block' : 'none' }}>
                            <div className='loginbox-user'>
                                <img src={userimg}></img>
                            </div>
                            <div className='loginbox-hide'>
                                <ul>
                                    <li>
                                        <a href='#'>
                                            <i></i>
                                            <em>我的主页</em>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i></i>
                                            <em>我的消息</em>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i></i>
                                            <em>我的等级</em>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i></i>
                                            <em>VIP会员</em>
                                        </a>
                                    </li>
                                </ul>
                                <ul className='loginbox-hideborder'>
                                    <li>
                                        <a href='#'>
                                            <i></i>
                                            <em>个人设置</em>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i></i>
                                            <em>实名认证</em>
                                        </a>
                                    </li>
                                </ul>
                                <ul>
                                    <li onClick={this.signout}>
                                        <a href='#'>
                                            <i></i>
                                            <em>退出</em>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Login ></Login>
                </div>
            </div>
        )
    }

    tosearch = (id) => {
        // console.log('测试搜索');
        let obj = {
            pathname: '/GqDetails',
            state: {
                id
            }
        }
        this.props.history.push(obj)
    }


    // 获取焦点事件
    showsearch = () => {
        // console.log(this.refs.input);
        // 判断，输入框不等于空的时候，搜索列表显示，等于空的时候，搜索列表隐藏
        if (this.refs.ele.value !== '') {
            this.refs.input.style.display = 'block'
        } else {
            this.refs.input.style.display = 'none'
        }
    }
    // 失去焦点事件
    hidesearch = () => {
        this.refs.input.style.display = 'none'
        // this.refs.ele.value = ''
    }
    // 输入框输入内容 获取数据
    onChangEvent = () => {
        // console.log(this.refs.ele.value);
        let url = this.refs.ele.value
        // 获取歌曲和歌手
        axios.get('http://localhost:3000/search/suggest?keywords=' + url + '').then((res) => {
            // console.log(res);
            // 歌单
            const playlists = res.data.result.playlists || []
            // 单曲
            const songs = res.data.result.songs || []
            // 专辑
            const Album = res.data.result.albums || []
            // 歌手
            const artists = res.data.result.artists || []
            // console.log(searchname_4);
            this.setState({
                songs,
                playlists,
                Album,
                artists
            })
            console.log(songs);
        })
        // if(this.refs.ele.value != ''){
        //     this.refs.input.style.display = 'block'
        // }else{
        //     this.refs.input.style.display = 'none'

        // }
        // 输入内容在进行判断 输入框没内容的时候隐藏搜索列表，否则显示
        this.showsearch()
    }
}

export default withRouter(Nav)