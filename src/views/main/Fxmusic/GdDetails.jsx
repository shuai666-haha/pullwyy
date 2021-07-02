import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Redirect, withRouter } from 'react-router-dom'

// import { withRouter } from 'react-router-dom'
import moment from 'moment';

class GdDetails extends Component {



    // 设置空数据
    state = {
        Songsdata: [],
        Songslist: [],
        username: [],
        songnum: [],
        liskGd: [],
        comments: []

    }


    componentDidMount() {
        // 获取数据 歌单详情   /playlist/detail?id=6627053767
        const id = this.props.match.params.id
        // console.log(id);
        axios.get('http://localhost:3000/playlist/detail?id=' + id + '').then((response) => {
            // console.log(response);
            const songs = response.data.playlist
            const songnum = response.data.playlist.trackIds
            const username = songs.creator
            const liskGd = songs.subscribers
            // console.log(songs.creator);
            const Songslist = songs.tracks
            // console.log(Songslist);
            // 转换时间
            const Ztime = songs.createTime
            const time = moment(parseInt(Ztime)).format('YYYY-MM-DD')
            // console.log(time);

            // 设置空数据接收数据
            this.setState({
                Songsdata: songs,
                Songslist,
                username,
                songnum,
                liskGd,
                time
            })
        })

        // 获取歌单评论
        // var nums = axios.get('http://localhost:3000/comment/playlist?id=' + id + '')[2]
        // console.log(nums);
        axios.get('http://localhost:3000/comment/playlist?id=' + id + '&limit=20').then((res) => {
            // console.log(res);
            const comments = res.data
            const commentlist = res.data.comments
            // console.log(commentlist);

            // 转换时间
            // for (var i = 0; i < commentlist.length; i++) {
            //     const Ztime = commentlist[i].time
            //     console.log(Ztime);
            //     const time_2 = moment(parseInt(Ztime)).format('YYYY-MM-DD HH-mm-SS')
            //     console.log(time_2);
            // }

            this.setState({
                comments,
                commentlist,
                // time_2
            })
        })
    }

    toplay = (id) => {
        let obj = {
            pathname: '/GqDetails',
            state: {
                id
            }

        }
        this.props.history.push(obj)
        // this.props.match.PARAMS
        // console.log(id);
    }

    render() {
        // console.log(this.props);    time_2
        const { Songsdata, Songslist, username, songnum, liskGd, time, comments, commentlist } = this.state
        // {time_2}
        // console.log(time_2);
        // console.log(commentlist);
        // console.log(Songslist);
        // Songsdata.tags.forEach((item)=>{
        //     console.log(item);
        // })


        return (
            <div>
                <div className="Maincon Gditem">
                    <div className="Toppicks Gditem-t ">
                        <div className="Gditem-t-left">
                            <img src={Songsdata.coverImgUrl} alt="" />
                            <span></span>
                        </div>
                        <div className="Gditem-t-right">
                            <div className="Gditem-t-right-hd">
                                <i></i>
                                <h2>{Songsdata.name}</h2>
                            </div>
                            <div className="Gditem-t-right-user">
                                <span>
                                    <img src={username.avatarUrl} alt="" />
                                </span>
                                <span>
                                    {/* <a href="###">{Songsdata.creator.nickname}</a> */}
                                    <a href="###">{username.nickname}</a>
                                    <img src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4761340159/e2c1/6fb5/f49b/353e6d1857f7c5f46426beb533427e53.png" alt="" />
                                </span>
                                <span>
                                    <p>{time}&nbsp;创建</p>
                                </span>
                            </div>
                            <div className="Gditem-t-right-btns">
                           
                                <a href="###" >
                                {Songslist.map((item) => {
                                    return (
                                        <i onClick={() => { this.toplay(item.id) }}>
                                        <em></em>
                                        播放
                                    </i>
                                    )
                                })}
                                </a>
                                <a href="###"></a>
                                <a href="###">
                                    <i>
                                        ({Songsdata.subscribedCount})
                                    </i>
                                </a>
                                <a href="###">
                                    <i>
                                        ({Songsdata.shareCount})
                                    </i>
                                </a>
                                <a href="###">
                                    <i>
                                        下载
                                    </i>
                                </a>
                                <a href="###">
                                    <i>
                                        ({Songsdata.commentCount})
                                    </i>
                                </a>
                            </div>
                            <div className="Gditem-t-right-tags">
                                <b>标签:</b>
                                {
                                    Songsdata.tags == undefined ? "" : Songsdata.tags.map((item, index) => {
                                        return <a href="###" key={index}><i>{item}</i></a>
                                    })
                                }


                                {/* <a href="###">
                                    <i>
                                        {Songsdata.tags}
                                    </i>
                                </a> */}
                            </div>
                            <p className='Gditem-t-right-intr'>
                                <b>介绍:</b>
                                {Songsdata.description}
                                {/* 音乐是黄金 歌手是宝藏<br />
                                    有种旋律，会深深牵动著内心某个开关，<br />
                                    有种记忆，会随著旋律若隐若现的出现。<br />
                                    听歌就是发现一个宝藏，然后...<br /> */}
                            </p>
                            <div className="Gditem-t-right-f-cb">
                                <a href="###">
                                    展开
                                    <i></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="newdish songlist">
                        <div className="songtitle">
                            <h3>歌曲列表</h3>
                            <span>{songnum.length}首歌</span>
                            <div className="playcount">
                                播放：
                                <strong>{Songsdata.playCount}</strong>次
                            </div>
                        </div>
                        <div className="sontlist-item">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div>&nbsp;</div>
                                        </th>
                                        <th>
                                            <div>歌曲标题</div>
                                        </th>
                                        <th>
                                            <div>时长</div>
                                        </th>
                                        <th>
                                            <div>歌手</div>
                                        </th>
                                        <th>
                                            <div>专辑</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Songslist.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className='td_1'>
                                                            <span>{index + 1}</span>
                                                            <span></span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='td_2'>
                                                            {/* onClick={this.toplay()} */}
                                                            <span onClick={() => { this.toplay(item.id) }} >{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='td_3'>
                                                            <span>03:07</span>
                                                            <div className="td_show">
                                                                <a href="###"></a>
                                                                <span></span>
                                                                <span></span>
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='td_4'>
                                                            <span>{item.ar[0].name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='td_4'>
                                                            <span>{item.al.name}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="moredown">
                                <h3>查看更多内容，请下载客户端</h3>
                                <a href="###">立即下载</a>
                            </div>
                        </div>
                    </div>
                    <div className="newdish  songlist Commentary">
                        <div className="songtitle">
                            <h3>评论</h3>
                            <span>共{comments.total}条评论</span>
                        </div>
                        <div className="CommentaryCon">
                            <div className="iptarea">
                                <div className="head">
                                    <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="" />
                                </div>
                                <div className="j-flag">
                                    <div className="m-cmmtipt">
                                        <textarea placeholder='评论'></textarea>
                                        <div className="corr">
                                            <em>◆</em>
                                            <span>◆</span>
                                        </div>
                                    </div>
                                    <div className="j-flag-btns">
                                        <a href="###">评论</a>
                                        <span>140</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cmmts">
                            <h3>最新评论（{comments.total}）</h3>
                            {
                                commentlist === undefined ? '' : commentlist.map((item, index) => {
                                    return (
                                        <div className="cmmte-item" key={index}>
                                            <div className="head">
                                                <a href="###">
                                                    <img src={item.user.avatarUrl} alt="" />
                                                </a>
                                            </div>
                                            <div className="cntwrap">
                                                <div className="cntwrap-top">
                                                    <a href="###">{item.user.nickname}</a>
                                                    <img src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213923094/81eb/9288/68a5/a427a0dbf899d616c3f715272a71ee59.png" alt="" />
                                        : {item.content}
                                                </div>
                                                <div className="cntwrap-bottom">
                                                    {/* <p>{time_2}</p> */}
                                                    <p>10:30</p>
                                                    {/* <p>{item.time}</p> */}
                                                    <a href="###"><b>({item.likedCount})</b></a>
                                                    <span>|</span>
                                                    <a href="###">回复</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="Gditem-right">
                        <div className="Singer">
                            <h3>
                                <span>喜欢这个歌单的人</span>
                            </h3>
                            <ul className='like-item'>
                                {
                                    liskGd.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <a href="###" title={item.nickname}>
                                                    <img src={item.avatarUrl} alt="" />
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="Gditem-right-down">
                                <h3>
                                    <span>网易云音乐端下载</span>

                                </h3>
                                <ul>
                                    <li>
                                        <a href="###">IPHONE</a>
                                    </li>
                                    <li>
                                        <a href="###">PC</a>
                                    </li>
                                    <li>
                                        <a href="###">Android</a>
                                    </li>
                                </ul>
                                <p>同步歌单，随时畅听320k好音乐</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(GdDetails)