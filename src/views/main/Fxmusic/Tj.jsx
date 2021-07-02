import React, { Component } from 'react'
import { Carousel } from 'antd';
import { BrowserRouter as Router, Link, Route, Redirect, withRouter } from 'react-router-dom'
import pubsub from 'pubsub-js'
import cookies from 'js-cookie'
import axios from 'axios'
import { userInfo } from '../../../api/login'

const contentStyle = {
    height: '285px',
    color: '#fff',
    lineHeight: '285px',
    textAlign: 'center',
    background: '#364d79',
};

class Tj extends Component {
    // 设置空数据
    state = {
        // 轮播图空数组
        bannerList: [],
        // 热门数据空数组
        Toppicks: [],
        // 新碟数据空数组
        newdishlist: [],
        // 飙升榜
        Soaring: [],
        // 新歌榜
        Newlist: [],
        // 原创榜
        Originallist: [],
        // 入驻歌手
        Singerlist: [],
        // 最热主播
        HotAnchorlist: [],
        logintj: true,
        msg: null,
        userdata: [],
        level: ''
    }
    componentWillMount() {

        if (cookies.get('token') === undefined) {

        } else {
            console.log(cookies.get('l_userID'))
            const id = cookies.get('l_userID')
            userInfo(id).then((res) => {
                console.log(res, 'dlres');
                this.setState({ userdata: res.data.profile, level: res.data.level })
            })
        }



        pubsub.subscribe('tologin', (msg, data) => {
            this.setState({ msg: data })
        })
        // 获取数据 轮播图
        axios.get('http://localhost:3000/banner?type=0').then((response) => {
            // console.log(response);
            const bannerimg = response.data.banners
            // console.log(bannerimg);
            // 设置空数据接收数据
            this.setState({
                bannerList: bannerimg
            })

        })

        // 获取热门推荐数据
        axios.get('http://localhost:3000/personalized?limit=8').then((res) => {
            // console.log(res, '热门推荐');
            const Hotlist = res.data.result
            this.setState({
                Toppicks: Hotlist
            })
        })

        // 获取新碟上架数据
        axios.get('http://localhost:3000/top/album?offset=2&limit=5&year=2021&month=3').then((res) => {
            // console.log(res, '新碟上架');
            const Neslist = res.data.albums
            this.setState({
                newdishlist: Neslist
            })
        })


        // 获取榜单数据
        axios.get('http://localhost:3000/toplist').then((res) => {
            // console.log(res, '新碟上架');
            // const Thelist = res.data.list
            // this.setState({
            //     Soaring: Thelist[0]
            // })
        })
        // new Promise((resolve,reject) => {
        //     axios.get('http://localhost:3000/toplist').then((res) => {
        //         console.log(res, '新碟上架');
        //         const Thelist = res.data.list
        //         this.setState({
        //             Soaring: Thelist[0]
        //         })
        //     })
        // }).then(()=>{})

        // 获取榜单歌曲   /playlist/detail?id=24381616
        // 飙升榜
        axios.get('http://localhost:3000/playlist/detail?id=19723756').then((res) => {
            // console.log(res, '飙升榜');
            const Thelist = res.data.playlist.tracks
            const Thelist_10 = Thelist.slice(0, 10)
            // console.log(Thelist_10);
            this.setState({
                Soaring: Thelist_10
            })
        })
        // 新歌榜
        axios.get('http://localhost:3000/playlist/detail?id=3779629').then((res) => {
            // console.log(res, '新碟上架');
            const Thelist = res.data.playlist.tracks
            const Thelist_10 = Thelist.slice(0, 10)
            // console.log(Thelist_10);
            this.setState({
                Newlist: Thelist_10
            })
        })
        // 原创榜 2884035
        axios.get('http://localhost:3000/playlist/detail?id=2884035').then((res) => {
            // console.log(res, '新碟上架');
            const Thelist = res.data.playlist.tracks
            const Thelist_10 = Thelist.slice(0, 10)
            // console.log(Thelist_10);
            this.setState({
                Originallist: Thelist_10
            })
        })

        // 歌手   /top/artists?offset=0&limit=5
        axios.get('http://localhost:3000/top/artists?offset=0&limit=5').then((res) => {
            // console.log(res, '新碟上架');
            const Thelist = res.data.artists
            this.setState({
                Singerlist: Thelist
            })
        })

        // 主播  /dj/toplist/popular?limit=30
        axios.get('http://localhost:3000/dj/toplist/popular?limit=5').then((res) => {
            // console.log(res, '新碟上架');
            const Thelist = res.data.data.list
            this.setState({
                HotAnchorlist: Thelist
            })
        })
    }

    next = () => {
        this.refs.ele.next()
    }
    prev = () => {
        this.refs.ele.prev()
    }
    tologin = () => {
        pubsub.publish('loginzt', this.state.logintj)
    }

    render() {
        // ES6解构赋值 将state中的数据赋值给bannerList
        const { bannerList, Toppicks, newdishlist, Soaring, Newlist, Originallist, Singerlist, HotAnchorlist, userdata, level } = this.state
        // console.log(HotAnchorlist);
        return (
            <div className='bgposition'>
                <div className="banbg">
                    <Carousel autoplay effect="fade" dots='false' ref='ele'>
                        {/* 循环遍历数据 */}
                        {
                            bannerList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <h3 style={contentStyle}>
                                            <img src={item.imageUrl} alt="banner" />
                                        </h3>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    {/* <img src="http://p1.music.126.net/rXlJVQAZiMkExm2G9MS9qA==/109951165828799546.jpg?imageView&blur=40x20" alt=""/> */}
                </div>
                <div className='bannerbg' >
                    <div className='warp'>
                        <div className='bannerBtn'>
                            {/* <span>&#60;</span>
                        <span>&#62;</span> */}
                            <span onClick={this.prev}> </span>
                            <span onClick={this.next}></span>
                        </div>
                        <div className='banner'>
                            <Carousel autoplay effect="fade" ref='ele'>
                                {/* 循环遍历数据 */}
                                {
                                    bannerList.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <h3 style={contentStyle}>
                                                    <img src={item.imageUrl} alt="banner" />
                                                </h3>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="download">
                            <a href="###">下载客户端</a>
                            <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                        </div>
                    </div>
                </div>
                <div className="Maincon">
                    <div className="Toppicks">
                        <div className="Toptitle">
                            <h2>热门推荐</h2>
                            <ul>
                                <li>华语<span>|</span></li>
                                <li>流行<span>|</span></li>
                                <li>摇滚<span>|</span></li>
                                <li>民谣<span>|</span></li>
                                <li>电子</li>
                            </ul>
                            <div className="more">更多<span></span></div>
                        </div>
                        <ul className='Toplist'>
                            {
                                Toppicks.map((item, index) => {
                                    return (
                                        <Link to={`/GdDetails/${item.id}`} key={index} className='TopTo'>
                                            <div className="list-img">
                                                <a href="###">
                                                    <img src={item.picUrl} alt="" />
                                                </a>
                                                <div className="list-bottom">
                                                    <span className='erji'></span>
                                                    <span className='nb'>{item.playCount / 10000}万</span>
                                                    <span className='play'></span>
                                                </div>
                                            </div>
                                            <div className="list-text">
                                                <a href="###">
                                                    {item.name}
                                                </a>
                                            </div>
                                        </Link>
                                        // <Route path='/GdDetails' component={GdDetails}></Route>

                                        // <li key={index}>
                                        //     <div className="list-img">
                                        //         <a href="###">
                                        //             <img src={item.picUrl} alt="" />
                                        //         </a>
                                        //         <div className="list-bottom">
                                        //             <span className='erji'></span>
                                        //             <span className='nb'>{item.playCount / 10000}万</span>
                                        //             <span className='play'></span>
                                        //         </div>
                                        //     </div>
                                        //     <div className="list-text">
                                        //         <a href="###">
                                        //             {item.name}
                                        //         </a>
                                        //     </div>
                                        // </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    <div className="newdish">
                        <div className="newtitle">
                            <h2>新碟上架</h2>
                            <div className="more">更多<span></span></div>
                        </div>
                        <div className="newlist">
                            <Carousel dots={false}>
                                <div className='list-item'>
                                    <div className="list-btn">
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <ul>
                                        {
                                            newdishlist.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <a href="###">
                                                            <img src={item.blurPicUrl} alt="" />
                                                        </a>
                                                        <p>{item.name}</p>
                                                        <span>{item.artist.name}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div>
                                    <h3>2</h3>
                                </div>
                                <div>
                                    <h3>3</h3>
                                </div>
                                <div>
                                    <h3>4</h3>
                                </div>
                            </Carousel>,
                        </div>
                    </div>
                    <div className="thelist">
                        <div className="thetitle">
                            <h2>榜单</h2>
                            <div className="more">更多<span></span></div>
                        </div>
                        <div className="thelistCon">
                            <dl>
                                <dt>
                                    <div className="top-left">
                                        <a href="###">
                                            <img src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100" alt="" />
                                        </a>
                                    </div>
                                    <div className="top-right">
                                        <h3>飙升榜</h3>
                                        <div className="ritgh-btn">
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ol>
                                        {
                                            Soaring.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>{index + 1}</span>
                                                        <a href="###">{item.name}</a>
                                                        <div className="oper">
                                                            <i></i>
                                                            <i></i>
                                                            <i></i>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ol>
                                    <div className="themore">
                                        <a href="###">查看更多</a>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <div className="top-left">
                                        <a href="###">
                                            <img src="http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100" alt="" />
                                        </a>
                                    </div>
                                    <div className="top-right">
                                        <h3>新歌榜</h3>
                                        <div className="ritgh-btn">
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ol>
                                        {
                                            Newlist.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>{index + 1}</span>
                                                        <a href="###">{item.name}</a>
                                                        <div className="oper">
                                                            <i></i>
                                                            <i></i>
                                                            <i></i>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ol>
                                    <div className="themore">
                                        <a href="###">查看更多</a>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <div className="top-left">
                                        <a href="###">
                                            <img src="http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100" alt="" />
                                        </a>
                                    </div>
                                    <div className="top-right">
                                        <h3>原创榜</h3>
                                        <div className="ritgh-btn">
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </dt>
                                <dd>
                                    <ol>
                                        {
                                            Originallist.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>{index + 1}</span>
                                                        <a href="###">{item.name}</a>
                                                        <div className="oper">
                                                            <i></i>
                                                            <i></i>
                                                            <i></i>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ol>
                                    <div className="themore">
                                        <a href="###">查看更多</a>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="Main-right">
                        <div className="user-login" style={{ display: cookies.get('token') ? 'none' : 'block' }}>
                            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                            <a href="javacript:;" onClick={this.tologin}>用户登录</a>
                        </div>
                        <div className='user-logins' style={{ display: cookies.get('token') ? 'block' : 'none' }}>
                            <div className='user-img'>
                                <a href="###" className='user-imgs'>
                                    <img src={userdata.avatarUrl} alt="" />
                                </a>
                                <div className='user-info'>
                                    <h4>
                                        <a href="###">{userdata.nickname}</a>
                                        <span></span>
                                    </h4>
                                    <p>
                                        <a href="###">
                                            {level}
                                            <i></i>
                                        </a>
                                    </p>
                                    <div className="btnwarp">
                                        <a href="###"><i>签到</i></a>
                                    </div>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <a href="###">
                                        <strong>{userdata.djStatus}</strong>
                                        <span>动态</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="###">
                                        <strong>{userdata.gender}</strong>
                                        <span>关注</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="###">
                                        <strong>{userdata.followeds}</strong>
                                        <span>粉丝</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="Singer">
                            <h3>
                                <span>入驻歌手</span>
                                <a href="###">查看全部 &#62;</a>
                            </h3>
                            <ul>
                                {
                                    Singerlist.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <a href="###">
                                                    <div className="listhead">
                                                        <img src={item.picUrl} alt="" />
                                                    </div>
                                                    <div className="listifo">
                                                        <h4>{item.name}</h4>
                                                        <p>找不到数据</p>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="Application">
                                <a href="###">申请成为网易音乐人</a>
                            </div>
                        </div>
                        <div className="HotAnchor">
                            <h3>热门主播</h3>
                            <ul>
                                {
                                    HotAnchorlist.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <a href="###">
                                                    <img src={item.avatarUrl} alt="" />
                                                </a>
                                                <div className="listifo">
                                                    <h4>{item.nickName}</h4>
                                                    <p>数据找不到</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default Tj