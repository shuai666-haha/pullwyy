import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import './css/tab.css'
import './css/mainFxmusic.css'
import './css/bottom.css'
import './css/mymusic.css'
import './css/Friend.css'  
import './css/GdDetails.css'  
import './css/GqDetails.css'  
import './css/login.css'
import {BrowserRouter} from "react-router-dom"
// import store from "./store/store"

import 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// store.subscribe(()=>{
   
// })
// console.log(store.subscribe);

 ReactDom.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById('root'))