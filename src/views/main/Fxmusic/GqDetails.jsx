import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment';

class GqDetails extends Component {



    // 设置空数据
    state = {
        songs: [],
        picurls: [],
        Songsdata: [],
        Songslist: [],
        username: [],
        songnum: [],
        liskGd: [],
        comments: [],
        geshou: [],
        gec: [],
        hotComments: [],
        newcomments: [],
        comment: [],
        musicurl: []

    }


    componentDidMount() {
        // 获取数据 歌单详情   /playlist/detail?id=6627053767
        const id = this.props.location.state.id
        axios.get(`http://localhost:3000/song/detail?ids=${id}`).then((res) => {
            // console.log(res);
            const songs = res.data.songs[0]
            const picurls = songs.al
            const geshou = songs.ar[0]
            this.setState({
                // comments,
                // commentlist,
                songs,
                picurls,
                geshou
            })
        })
        axios.get(`http://localhost:3000/song/url?id=${id}`).then((res) => {
            console.log(res);
            const musicurl = res.data.data[0]
            // const picurls = songs.al
            // const geshou = songs.ar[0]
            this.setState({
                musicurl
            })
        })


        // 歌词数据 /lyric?id=33894312
        axios.get(`http://localhost:3000/lyric?id=${id}`).then((res) => {
            // console.log(res);
            const gec = res.data.lrc
            this.setState({
                gec
            })
        })

        // 评论 /comment/music?id=186016&limit=1
        axios.get(`http://localhost:3000/comment/music?id=${id}&limit=20`).then((res) => {
            // console.log(res);
            const comment = res.data
            const hotComments = comment.hotComments
            const newcomments = comment.comments
            // const gec = res.data.lrc
            this.setState({
                comment,
                hotComments,
                newcomments
            })
        })
    }


    toplay = () => {
        if (this.refs.bf.className != 'plays') {
            this.refs.audio.play()
            this.refs.bf.classList.add('plays')
            this.refs.bottom.style.bottom = 0
        } else {
            this.refs.audio.pause()
            this.refs.bf.classList.remove('plays')
            this.refs.bottom.style.bottom = '-53px'

        }
    }

    render() {
        // console.log(this.props);
        const { Songsdata, Songslist, username, songnum, liskGd, time, comments, commentlist, songs, picurls, geshou, gec, hotComments, newcomments, comment, musicurl } = this.state
        // console.log(songs);
        // console.log(Songslist);
        // Songsdata.tags.forEach((item)=>{
        //     console.log(item);
        // })


        return (
            <div>
                <div className="musicaudio">
                    <audio src={musicurl.url} ref='audio' ></audio>
                </div>
                <div className="Maincon Gditem">
                    <div className="Toppicks Gditem-t music-left">
                        <div className="Gditem-t-left songimg">
                            <img src={picurls.picUrl} alt="" />
                            <span></span>
                        </div>
                        <div className="Gditem-t-right music-right">
                            <div className="Gditem-t-right-hd">
                                <i></i>
                                <h2>
                                    {songs.name}
                                </h2>
                            </div>

                            <div className="Gditem-t-right-tags biaoqian">
                                <b>标签:</b>
                                <span>
                                    {
                                        geshou.name
                                    }
                                </span>
                            </div>
                            <p className='Gditem-t-right-intr'>
                                <b>所属专辑:</b>
                                <span>
                                    {picurls.name}

                                </span>
                            </p>
                            <div className="Gditem-t-right-btns">
                                <a href="###">
                                    <i onClick={this.toplay}>
                                        <em></em>
                                        播放
                                    </i>
                                </a>
                                <a href="###"></a>
                                <a href="###">
                                    <i>
                                        收藏
                                    </i>
                                </a>
                                <a href="###">
                                    <i>
                                        分享
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
                                <b>作词:</b>
                                {
                                    gec.lyric
                                }
                            </div>
                            <div className="Gditem-t-right-f-cb">
                                <a href="###">
                                    展开
                                    <i></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="newdish  songlist Commentary">
                        <div className="songtitle">
                            <h3>评论</h3>
                            <span>共{comment.total}条评论</span>
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
                            <h3>精彩评论</h3>
                            {
                                hotComments.map((item, index) => {
                                    return (
                                        <div className="cmmte-item">
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
                                                <div className="cntwrap-bottom count-mar">
                                                    <p>10:31</p>
                                                    {/* <a href="###"><b>({item.likedCount})</b></a>/ */}
                                                    <a href="###"><b>({item.likedCount})</b></a>
                                                    <span>|</span>
                                                    <a href="###">回复</a>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }

                            <h3>最新评论（{comment.total}）</h3>
                            {
                                newcomments.map((item, index) => {
                                    return (
                                        <div className="cmmte-item">
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
                                                <div className="cntwrap-bottom count-mar">
                                                    <p>10:31</p>
                                                    {/* <a href="###"><b>({item.likedCount})</b></a>/ */}
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
                <div className="play-bottom" ref='bottom'>
                    <div className="play-bottomcon">
                        <div className="bottom-left-btns">
                            <a href="###">上一首</a>
                            <a href="###" ref='bf' onClick={this.toplay}>播放/暂停</a>
                            <a href="###">下一首</a>
                        </div>
                        <div className="bottom-left-head">
                            <img src={picurls.picUrl} alt="" />
                            <a href="###"></a>
                        </div>
                        <div className="bottom-left-musicname">
                            <a href="###">{songs.name}</a>
                            <span>{geshou.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GqDetails