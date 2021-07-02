import React, { Component } from 'react'
import { Tabs } from 'antd';
import Tj from './Tj.jsx'
// import { Route } from 'react-router-dom'
// import GdDetails from './GdDetails.jsx'


const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
class Fxnusic extends Component {

    render() {
        return (
            <div>
                <div className='Tab'>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="推荐" key="1">
                            <Tj>
                                {/* <Route path='/GdDetails' component={GdDetails}></Route> */}

                            </Tj>
                        </TabPane>
                        <TabPane tab="排行榜" key="2">
                            排行榜
                        </TabPane>
                        <TabPane tab="歌单" key="3">
                            歌单
                        </TabPane>
                        <TabPane tab="主播电台" key="4">
                            主播电台
                        </TabPane>
                        <TabPane tab="歌手" key="5">
                            歌手
                        </TabPane>
                        <TabPane tab="新碟上架" key="6">
                            新碟上架
                        </TabPane>
                    </Tabs>
                </div>


            </div>

        )
    }
}

export default Fxnusic
