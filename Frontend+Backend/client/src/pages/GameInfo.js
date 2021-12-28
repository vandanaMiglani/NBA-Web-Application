import React from 'react';
import {
  Table,
  Pagination,
  Select,
  Tabs,
  Button, Row, Col
} from 'antd'
import { Form, FormInput, FormGroup, Card, CardBody, CardTitle, Progress } from "shards-react"
import { getGameDetails, getHomeTeamDetails, getAwayTeamDetails, getHomeTeamAvg, getAwayTeamAvg } from '../fetcher'
 
import MenuBar from '../components/MenuBar';
import './common.css'
 
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const { Option } = Select;
 
 
class GameInfo extends React.Component {
 
  constructor(props) {
    super(props)
 
    this.state = {
      GameID: window.location.pathname.split('/')[2],
      homeTeamID: null,
      awayTeamID: null,
      GameDetails : [],
      HomeTeamDetails: [],
      AwayTeamDetails: [],
      HomeTeamAvg: [],
      AwayTeamAvg: []
    }
 
    this.updateHomeTeamDetails = this.updateHomeTeamDetails.bind(this)
    this.updateAwayTeamDetails = this.updateAwayTeamDetails.bind(this)
    this.updateHomeTeamAvg = this.updateHomeTeamAvg.bind(this)
    this.updateAwayTeamAvg = this.updateAwayTeamAvg.bind(this)
    
  } 
 
  componentDidMount() {
    getGameDetails(this.state.GameID).then(res => {
      res.results[0].Game_Date = res.results[0].Game_Date.split('T')[0]
      this.setState({ GameDetails: res.results[0] })
      this.state.homeTeamID = this.state.GameDetails.Home_Team_ID
      this.state.awayTeamID = this.state.GameDetails.Away_Team_ID
    })
  }
 
  changeTab = activeKey => {
    if (activeKey == "2") {
      this.updateHomeTeamDetails()
    }
    else if (activeKey == "3") {
      this.updateAwayTeamDetails()
    }
    else if (activeKey == "4") {
      this.updateHomeTeamAvg()
    }
    else if (activeKey == "5") {
      this.updateAwayTeamAvg()
    }
  }
 
  updateHomeTeamDetails() {
    getHomeTeamDetails(this.state.GameID, this.state.homeTeamID).then(res => {
      this.setState({ HomeTeamDetails: res.results })
    })
  }
 
  updateAwayTeamDetails() {
    getAwayTeamDetails(this.state.GameID, this.state.awayTeamID).then(res => {
      this.setState({ AwayTeamDetails: res.results })
    })
  }
 
  updateHomeTeamAvg() {
    getHomeTeamAvg(this.state.GameID, this.state.homeTeamID).then(res => {
      
      this.setState({ HomeTeamAvg: res.results })
    })
  }
 
  updateAwayTeamAvg() {
    getAwayTeamAvg(this.state.GameID, this.state.awayTeamID).then(res => {
      
      this.setState({ AwayTeamAvg: res.results })
    })
  }
 
  render() {
 
    return (
      
      <div>
        <MenuBar/>
        <Tabs defaultActiveKey="1" onChange={this.changeTab} style={{paddingLeft: '24px'}}>
 
          <TabPane tab="Game Info" key="1" >
            {this.state.GameDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh'}}>
            
              <Card class="col d-flex justify-content-center" style={{justify: 'center', align: 'center'}}>
 
                <CardBody id="cb">
 
                  <Row gutter='30' align='middle' justify='center'>
                    <Col span={9} style={{ textAlign: 'left' }}>
                        <h3>{this.state.GameDetails.Home_Team}</h3>
                    </Col >
                    <Col span={6} style={{ textAlign: 'center' }}>
                    {this.state.GameDetails.Game_Date}
                    </Col >
                    <Col span={9} style={{ textAlign: 'right' }}>
                    <h3>{this.state.GameDetails.Away_Team}</h3>
                    </Col >
                  </Row>
 
                  <Row gutter='30' align='middle' justify='center'>
                    <Col span={9} style={{ textAlign: 'left' }}>
                      <h3>{this.state.GameDetails.Home_Team_Points}</h3>
                    </Col >
                    <Col span={6} style={{ textAlign: 'center' }}>
                      Points
                    </Col >
                    <Col span={9} style={{ textAlign: 'right' }}>
                      <h3>{this.state.GameDetails.Away_Team_Points}</h3>
                    </Col >
                  </Row>
 
 
                  <Row gutter='30' align='middle' justify='center'>
                    <Col span={9} style={{ textAlign: 'left' }}>
                      <h5>{this.state.GameDetails.Home_Team_Final_Goal_Percentage}</h5>
                    </Col >
                    <Col span={6} style={{ textAlign: 'center' }}>
                      Team Final Goal Percentage
                    </Col >
                    <Col span={9} style={{ textAlign: 'right' }}>
                      <h5>{this.state.GameDetails.Away_Team_Final_Goal_Percentage}</h5>
                    </Col >
                  </Row>
 
 
                  <Row gutter='30' align='middle' justify='center'>
                    <Col span={9} style={{ textAlign: 'left' }}>
                      <h5>{this.state.GameDetails.Home_Team_Free_Throw_Percentage}</h5>
                    </Col >
                    <Col span={6} style={{ textAlign: 'center' }}>
                      Free Throw Percentage
                    </Col >
                    <Col span={9} style={{ textAlign: 'right' }}>
                      
                      <h5>{this.state.GameDetails.Away_Team_Free_Throw_Percentage}</h5>
                    </Col>
                  </Row>
 
 
                  <Row gutter='30' align='middle' justify='center'>
                    <Col span={9} style={{ textAlign: 'left' }}>
                      <h5>{this.state.GameDetails.Home_Team_Assists}</h5>
                    </Col >
                    <Col span={6} style={{ textAlign: 'center' }}>
                      Team Assists
                    </Col >
                    <Col span={9} style={{ textAlign: 'right' }}>
                      <h5>{this.state.GameDetails.Away_Team_Assists}</h5>
                    </Col>
                  </Row>
 
 
                  <Row gutter='30' align='middle' justify='center'>
                    <Col span={9} style={{ textAlign: 'left' }}>
                      <h5>{this.state.GameDetails.Home_Team_Rebounds}</h5>
                    </Col >
                    <Col span={6} style={{ textAlign: 'center' }}>
                      Rebounds
                    </Col >
                    <Col span={9} style={{ textAlign: 'right' }}>
                      <h5>{this.state.GameDetails.Away_Team_Rebounds}</h5>
                    </Col>
                  </Row>
 
                </CardBody>
 
              </Card>
 
            </div> : null}
          </TabPane>
  
          <TabPane tab = {this.state.GameDetails.Home_Team + " Game Stats"}  key="2" >
            {this.state.HomeTeamDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <Table
                dataSource={this.state.HomeTeamDetails} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 20, showQuickJumper:true }}>
                <Column width="15%" title="Player Name" dataIndex="Player_Name"  key="Player_Name"/>
                <Column title="Points Scored" dataIndex="Points_Scored_by_the_Player" key="Points_Scored_by_the_Player" />
                <Column title="Min Played" dataIndex="Minutes_Played" key="Minutes_Played" />
                <Column title="Field Goals" dataIndex="Field_Goals_Made" key="Field_Goals_Made" />
                <Column title="Free Throws" dataIndex="Free_Throws_Made" key="Free_Throws_Made" />
                <Column title="Rebounds" dataIndex="Rebounds" key="Rebounds" />
                <Column title="Assists" dataIndex="Assists" key="Assists" />
                <Column title="Steals" dataIndex="Steals" key="Steals" />
                <Column title="Blocked Shots" dataIndex="Blocked_Shots" key="Blocked_Shots" />
                <Column title="Personal Fouls" dataIndex="Personal_Foul" key="Personal_Foul" />
                <Column title="Plus Minus" dataIndex="PLUS_MINUS" key="PLUS_MINUS" />
            </Table>
            </div> : null}
          </TabPane>
 
          <TabPane tab={this.state.GameDetails.Away_Team + " Game Stats"} key="3" >
            {this.state.AwayTeamDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <Table 
                dataSource={this.state.AwayTeamDetails} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 20, showQuickJumper:true }}>
                <Column width="15%" title="Player Name" dataIndex="Player_Name"  key="Player_Name"/>
                <Column title="Points Scored" dataIndex="Points_Scored_by_the_Player" key="Points_Scored_by_the_Player" />
                <Column title="Min Played" dataIndex="Minutes_Played" key="Minutes_Played" />
                <Column title="Field Goals" dataIndex="Field_Goals_Made" key="Field_Goals_Made" />
                <Column title="Free Throws" dataIndex="Free_Throws_Made" key="Free_Throws_Made" />
                <Column title="Rebounds" dataIndex="Rebounds" key="Rebounds" />
                <Column title="Assists" dataIndex="Assists" key="Assists" />
                <Column title="Steals" dataIndex="Steals" key="Steals" />
                <Column title="Blocked Shots" dataIndex="Blocked_Shots" key="Blocked_Shots" />
                <Column title="Personal Fouls" dataIndex="Personal_Foul" key="Personal_Foul" />
                <Column title="Plus Minus" dataIndex="PLUS_MINUS" key="PLUS_MINUS" />
            </Table>
            </div> : null}
          </TabPane>

          <TabPane tab={this.state.GameDetails.Home_Team+" Season Stats"} key="4" >
            {this.state.HomeTeamAvg ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <Table 
                dataSource={this.state.HomeTeamAvg} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 20, showQuickJumper:true }}>
                <Column width="15%" title="Player Name" dataIndex="Player_Name"  key="Player_Name"/>
                <Column title="Avg Points Scored" dataIndex="AVG_Points_Scored_by_the_Player" key="AVG_Points_Scored_by_the_Player" />
                <Column title="Avg Min Played" dataIndex="AVG_Minutes_Played" key="AVG_Minutes_Played" />
                <Column title="Avg Field Goals" dataIndex="AVG_Field_Goals_Made" key="AVG_Field_Goals_Made" />
                <Column title="Avg Free Throws" dataIndex="AVG_Free_Throws_Made" key="AVG_Free_Throws_Made" />
                <Column title="Avg Rebounds" dataIndex="AVG_Rebounds" key="AVG_Rebounds" />
                <Column title="Avg Assists" dataIndex="AVG_Assists" key="AVG_Assists" />
                <Column title="Avg Steals" dataIndex="AVG_Steals" key="AVG_Steals" />
                <Column title="Avg Blocked Shots" dataIndex="AVG_Blocked_Shots" key="AVG_Blocked_Shots" />
                <Column title="Avg Personal Fouls" dataIndex="AVG_Personal_Foul" key="AVG_Personal_Foul" />
                <Column title="Avg Plus Minus" dataIndex="AVG_PLUS_MINUS" key="AVG_PLUS_MINUS" />
            </Table>
            </div> : null}
          </TabPane>

          <TabPane tab={this.state.GameDetails.Away_Team+" Season Stats"}key="5" >
            {this.state.AwayTeamAvg ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <Table 
                dataSource={this.state.AwayTeamAvg} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 20, showQuickJumper:true }}>
                <Column width="15%" title="Player Name" dataIndex="Player_Name"  key="Player_Name"/>
                <Column title="Avg Points Scored" dataIndex="AVG_Points_Scored_by_the_Player" key="AVG_Points_Scored_by_the_Player" />
                <Column title="Avg Min Played" dataIndex="AVG_Minutes_Played" key="AVG_Minutes_Played" />
                <Column title="Avg Field Goals" dataIndex="AVG_Field_Goals_Made" key="AVG_Field_Goals_Made" />
                <Column title="Avg Free Throws" dataIndex="AVG_Free_Throws_Made" key="AVG_Free_Throws_Made" />
                <Column title="Avg Rebounds" dataIndex="AVG_Rebounds" key="AVG_Rebounds" />
                <Column title="Avg Assists" dataIndex="AVG_Assists" key="AVG_Assists" />
                <Column title="Avg Steals" dataIndex="AVG_Steals" key="AVG_Steals" />
                <Column title="Avg Blocked Shots" dataIndex="AVG_Blocked_Shots" key="AVG_Blocked_Shots" />
                <Column title="Avg Personal Fouls" dataIndex="AVG_Personal_Foul" key="AVG_Personal_Foul" />
                <Column title="Avg Plus Minus" dataIndex="AVG_PLUS_MINUS" key="AVG_PLUS_MINUS" />
            </Table>
            </div> : null}
          </TabPane>
 
        </Tabs>
 
      </div>
    )
  }
}
 
 
 
export default GameInfo
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
