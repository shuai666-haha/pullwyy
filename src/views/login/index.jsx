import React, { Component } from 'react'
// import { connect } from 'react-redux'
import pubsub from 'pubsub-js'
import cookies from 'js-cookie'
import { login } from '../../api/login'
// import store from '../../store/store'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            loginzt: true,
            loginnav: null,
            iphoneipt: '',
            psdipt: '',
        }
        this.ToLogin = this.ToLogin.bind(this)
    }

    componentDidMount() {
        pubsub.subscribe('loginzt', (msg, data) => {
            this.setState({
                loginnav: data
            })
        })

    }
    // 鼠标摁下设置model可移动
    move = (e) => {
        var e = e || window.event
        // 获取鼠标在页面中的位置
        var pagex = e.pageX || e.clientX + document.documentElement.scrollLeft
        var pageY = e.pageY || e.clientY + document.documentElement.scrollTop

        var loginbox = this.refs.login
        // 获取鼠标摁下一瞬间在盒子中的位置
        var boxX = pagex - loginbox.offsetLeft
        var boxY = pageY - loginbox.offsetTop
        // 鼠标在页面中移动，让盒子跟着移动
        document.onmousemove = function (e) {
            var e = e || window.event
            // 获取鼠标在页面上的坐标
            var pagex = e.pageX || e.clientX + document.documentElement.scrollLeft
            var pageY = e.pageY || e.clientY + document.documentElement.scrollTop
            // 让盒子跟着鼠标移动
            loginbox.style.left = pagex - boxX + "px"
            loginbox.style.top = pageY - boxY + "px"
            //清除选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
    // 鼠标弹起 盒子就不移动
    moveup = () => {
        document.onmousemove = null
    }
    // 点击到手机号登录
    numberlogin = () => {
        this.setState({ loginzt: false })
    }
    // 点击选择登录
    backlogin = () => {
        this.setState({ loginzt: true })
    }
    // 点击关闭登录界面
    closeloginfn = () => {
        this.setState({ loginnav: false })
    }

    oniphoneipt = (e) => {
        this.setState({ iphoneipt: e.target.value })
    }
    onpsdipt = (e) => {
        this.setState({ psdipt: e.target.value })
    }
    ToLogin() {
        if(this.state.iphoneipt === '' || this.state.psdipt ==='')
        return
        const data = {
            'phone': this.state.iphoneipt,
            'password': this.state.psdipt
        }
       login(data).then(
           
            res => {
                if (res.data.code === 200) {
                    cookies.set('token', res.data.token)
                    cookies.set('l_userID',res.data.account.id) //用户id
                    this.setState({
                        loginnav: false,
                        iphoneipt:'',
                        psdipt:''
                    })

                    window.location.reload()
                } else {
                    alert('请输入正确的账号和密码')
                }
               
            }
        )
        // this.setState({ loginnav: false })
    }
    render() {
        return (
            <div ref='loginmask' style={{ display: this.state.loginnav ? 'block' : 'none' }}>

                <div className='Login' ref='login' >
                    <div className="login-title" onMouseDown={this.move} onMouseUp={this.moveup}>
                        <div>登录</div>
                    </div>
                    <div className="login-main">
                        <div className="login-list" style={{ display: this.state.loginzt ? 'block' : 'none' }}>
                            <div className="u-main">
                                <div className="u-plt"></div>
                                <div className="f-mgt10" onClick={this.numberlogin}>
                                    <a href="#">
                                        <i>手机号登录</i>
                                    </a>
                                </div>
                                <div className="f-mgt10">
                                    <a href="#" className='zhuce'>
                                        <i>注册</i>
                                    </a>
                                </div>
                            </div>
                            <div className="u-alt">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i></i>
                                        微信登录
                                    </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i></i>
                                        QQ登录
                                    </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i></i>
                                       微博登录
                                    </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i></i>
                                        网易邮箱账号登录
                                    </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="u-official-terms">
                                <input type="checkbox" name="" id="" />
                                <label>同意</label>
                                <a href="#" target="_blank">《服务条款》</a>
                                <a href="#" target="_blank">《隐私政策》</a>
                                <a href="#" target="_blank">《儿童隐私政策》</a>
                            </div>
                        </div>
                        <div className="login-number" style={{ display: this.state.loginzt ? 'none' : 'block' }}>
                            <div className="n-log2-2">
                                <div className="j-mob">
                                    <div className="u-phonewrap">
                                        <a href="#">
                                            <span>+86</span>
                                            <span></span>
                                        </a>
                                        <div className="txtwrap">
                                            <input type="text" name="" id="" placeholder='请输入手机号' autocomplet="off" onBlur={this.oniphoneipt} />
                                        </div>
                                    </div>
                                </div>
                                <div className="f-mgt10">
                                    <input type="password" name="" id="" placeholder='请输入密码' autocomplet="off" onBlur={this.onpsdipt} />
                                </div>
                                <div className="f-mgt20">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" />自动登录
                                </label>
                                    <a href="#">忘记密码?</a>
                                </div>
                                <div className="f-mgt30">
                                    <a href="#" onClick={this.ToLogin}>
                                        <i>登　录</i>
                                    </a>
                                </div>
                            </div>
                            <div className="n-loglink2">
                                <a href="#" onClick={this.backlogin}>&lt;&nbsp;&nbsp;其他登录方式</a>
                                <a href="#">没有帐号？免费注册  &gt;</a>
                            </div>
                        </div>
                    </div>
                    <div className='closelogin' onClick={this.closeloginfn}>×</div>
                </div>
                <div className="mask" style={{ display: this.state.loginzt ? 'block' : 'none' }}></div>
            </div>

        )
    }
}

export default Login