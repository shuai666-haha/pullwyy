import request from './api'

// 获取登录接口数据
export function login(data) {
    return request({
        method:'POST',
        url:'/login/cellphone',
        data:data
    })
} 
//登录后用户id  
export function userInfo(data) {
    return request({
        method:'get',
        url:`/user/detail?uid=${data}`,
    })
} 
//退出  
export function signout() {
    return request({
        method:'post',
        url:'/logout',
    })
} 