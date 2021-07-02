import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import FxMusic from '../main/Fxmusic/index'
import MyMusic from '../main/Mymusic/index.jsx'
import Friend from '../main/Friend/index.jsx'
import GdDetails from '../main/Fxmusic/GdDetails.jsx'
import GqDetails from './Fxmusic/GqDetails.jsx'


class Main extends Component {
    render() {
        return (
            <div className='main-dw'>
                <Switch>
                    <Route path='/FxMusic' component={FxMusic}></Route>
                    <Route path='/MyMusic' component={MyMusic}></Route>
                    <Route path='/Friend' component={Friend}></Route>
                    <Route path='/GdDetails/:id' component={GdDetails}></Route>
                    <Route path='/GqDetails' component={GqDetails}></Route>
                </Switch>
            </div>
        )
    }
}

export default Main