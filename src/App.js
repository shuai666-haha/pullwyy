import React from 'react'
import {Route} from "react-router-dom"
import Nav from './views/nav/index'
import Main from './views/main/index'
import Bottom from './views/bottom/index.jsx'
// import GqDetails from './views/main/Fxmusic/GqDetails.jsx'


class App extends React.Component{
    render(){
        return(
            <div>
                <Nav></Nav>
                <Main></Main>
                {/* <Route path='/GqDetails' component={GqDetails}></Route> */}
                <Bottom></Bottom>
            </div>
        )
    }
}

export default App