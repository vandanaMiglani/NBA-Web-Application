import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    Tabs
} from 'antd'

import { getAllTeams, getPlayerPerformance } from '../fetcher'
import { getPlayerSeasons } from '../fetcher'
import { getPlayerName } from '../fetcher'
import { getPlayerOverview } from '../fetcher'
import { getPlayerInjuries } from '../fetcher'
import { getPlayerVsTeamPerformance } from '../fetcher'
import { getAvgPlayerVsTeamPerformance } from '../fetcher'
import { getPlayerSeasonTeamPerformance } from '../fetcher'

import MenuBar from '../components/MenuBar';
import './common.css'

const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const { Option } = Select;


class PlayerInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            playerID: window.location.pathname.split("/")[2],
            playerInfo: [],

            playerInjuries: [],
            playerName: null,

            page: null,
            pageSize: null,

            playerPerfomance: [],
            season: window.location.search ? window.location.search.split("=")[1] : null,
            allSeasons: [],
            playerName: null,
            fullSeason: [{ "Season": "AVG" }],

            teamName: "ALL",
            playerVsTeamPerfomance: [],
            avgPlayerVsTeamPerfomance: [],
            fullTeams: [{ "Team_Name": "ALL" }],
            allTeams: [],

            playerperf: []


        }

        this.changeOfSeason = this.changeOfSeason.bind(this)
        this.changeOfTeamName = this.changeOfTeamName.bind(this)
        this.updatePlayerInjuries = this.updatePlayerInjuries.bind(this)
        this.updatePlayerPerformance = this.updatePlayerPerformance.bind(this)
        this.updatePlayerVsTeamPerformance = this.updatePlayerVsTeamPerformance.bind(this)
        this.updatePlayerSeasonTeamPerformance = this.updatePlayerSeasonTeamPerformance.bind(this)
    }

    changeTab = activeKey => {
        console.log(activeKey)
        this.state.activeTab = activeKey
        console.log(this.state.activeTab)

        if (activeKey == "2") {
            this.updatePlayerInjuries()
        }
        else if (activeKey == "3") {
            this.updatePlayerPerformance()
        }
        else if (activeKey == "4") {
            this.updatePlayerVsTeamPerformance()
        }
        else if (activeKey == "5") {
            this.updatePlayerSeasonTeamPerformance()
        }

    }

    componentDidMount() {


        getPlayerOverview(this.state.playerID).then(res => {

            this.setState({ playerInfo: res.results[0] })
        })

        getPlayerName(this.state.playerID).then(res => {
            this.setState({ playerName: res.results[0].Player_Name })
        })

        getAllTeams('', null, null).then(res => {
            this.setState({ allTeams: this.state.fullTeams.concat(res.results) })

            console.log(this.state.allTeams)
        })


    }


    updatePlayerSeasonTeamPerformance() {

        console.log(this.state.playerID)
        getPlayerSeasonTeamPerformance(this.state.playerID).then(res => {
            this.setState({ playerperf: res.results })
            console.log(this.state.playerperf)
        })


    }

    updatePlayerInjuries() {
        getPlayerInjuries(this.state.page, this.state.pageSize, this.state.playerID).then(res => {

            res.results.forEach(function (a) {
                a.Date = a.Date.split('T')[0];
            });
            this.setState({ playerInjuries: res.results })
        })


    }



    updatePlayerPerformance() {


        getPlayerPerformance(this.state.playerID, this.state.season).then(res => {
            this.setState({ playerPerfomance: res.results[0] })
            console.log(this.state.playerPerfomance)

        })

        getPlayerSeasons(this.state.playerID).then(res => {

            this.setState({ allSeasons: this.state.fullSeason.concat(res.results) })
            console.log(this.state.allSeasons)
        })



    }

    updatePlayerVsTeamPerformance() {
        getPlayerVsTeamPerformance(this.state.playerID, this.state.teamName).then(res => {
            console.log(res.results)
            res.results.forEach(function (a) {
                a.Game_Date_EST = a.Game_Date_EST.split('T')[0];
            });
            console.log(res.results)
            this.setState({ playerVsTeamPerfomance: res.results })
        })

        getAvgPlayerVsTeamPerformance(this.state.playerID, this.state.teamName).then(res => {
            console.log(res.results)
            this.setState({ avgPlayerVsTeamPerfomance: res.results })
        })
    }

    changeOfSeason(event) {
        this.state.season = event.target.value
        console.log(this.state.season)
        getPlayerPerformance(this.state.playerID, this.state.season).then(res => {
            this.setState({ playerPerfomance: res.results[0] })
            console.log(this.state.playerPerfomance)

        })
    }

    changeOfTeamName(event) {
        this.state.teamName = event.target.value


        getPlayerVsTeamPerformance(this.state.playerID, this.state.teamName).then(res => {
            res.results.forEach(function (a) {
                a.Game_Date_EST = a.Game_Date_EST.split('T')[0];
            });
            console.log(res.results)
            this.setState({ playerVsTeamPerfomance: res.results })
        })
        getAvgPlayerVsTeamPerformance(this.state.playerID, this.state.teamName).then(res => {
            console.log(res.results)
            this.setState({ avgPlayerVsTeamPerfomance: res.results })
        })
    }


    render() {

        return (

            <div>

                <MenuBar />

                <Tabs defaultActiveKey="1" onChange={this.changeTab} style={{ paddingLeft: '24px' }}>
                    <TabPane tab="Player Overview" key="1" >
                        <div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                                <br></br>
                                <br></br>
                                <h3> <b> {this.state.playerName}</b> </h3>
                            </div>

                            {this.state.playerInfo ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                                <Card>

                                    <CardBody id="cb">

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Team Name: </b> {this.state.playerInfo.Team_Name}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Latest Season: </b> {this.state.playerInfo.Season}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Net Rating: </b> {this.state.playerInfo.Net_Rating}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Age: </b> {this.state.playerInfo.Age}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Height: </b> {this.state.playerInfo.Player_Height} cm</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Weight: </b> {this.state.playerInfo.Player_weight} lb</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Country: </b> {this.state.playerInfo.Country}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Draft Year: </b> {this.state.playerInfo.Draft_Year}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Draft Round: </b> {this.state.playerInfo.Draft_Round}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Draft Number: </b> {this.state.playerInfo.Draft_Number}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>College: </b> {this.state.playerInfo.College}</h5>
                                            </Col>
                                        </Row>

                                    </CardBody>

                                </Card>

                            </div> : null}


                        </div>
                    </TabPane>

                    <TabPane tab="Player Injuries" key="2" >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                            <br></br>
                            <br></br>
                            <h3> <b> {this.state.playerName}</b> </h3>
                        </div>

                        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

                            <Table dataSource={this.state.playerInjuries} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>

                                <Column title="Date" dataIndex="Date" key="Date" />
                                <Column title="Team Name" dataIndex="Team_Name" key="Team_Name" />
                                <Column title="Injury Info" dataIndex="Injury_Info" key="Injury_Info" />

                            </Table>

                        </div>
                    </TabPane>

                    <TabPane tab="Player Performance" key="3" >
                        <div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                                <br></br>
                                <br></br>
                                <h3> <b> {this.state.playerName}</b> </h3>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                                <Row>
                                    <Row>
                                        <h6 style={{ paddingRight: "8px" }}><b>Season</b></h6>
                                    </Row>

                                    <Row>
                                        <select onChange={this.changeOfSeason}>
                                            {this.state.allSeasons.map((option) => (
                                                <option value={option.Season.value}>{option.Season}</option>
                                            ))}
                                        </select>
                                    </Row>
                                </Row>
                            </div>

                            {this.state.playerPerfomance ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                                <Card>

                                    <CardBody id="cb">

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Games Played: </b> {this.state.playerPerfomance.Gp}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Points: </b> {this.state.playerPerfomance.Pts}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Rebounds: </b> {this.state.playerPerfomance.Reb}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Assists: </b> {this.state.playerPerfomance.Ast}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Net Rating: </b> {this.state.playerPerfomance.Net_Rating}</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Offensive Rebounds: </b> {this.state.playerPerfomance.Oreb_Pct}%</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Defensive Rebounds: </b> {this.state.playerPerfomance.Dreb_Pct}%</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Usage Percentage: </b> {this.state.playerPerfomance.Usg_Pct}%</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>True Shot Percentage: </b> {this.state.playerPerfomance.Ts_Pct}%</h5>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5><b>Assist Percentage: </b> {this.state.playerPerfomance.Ast_Pct}%</h5>
                                            </Col>
                                        </Row>

                                    </CardBody>

                                </Card>

                            </div> : null}


                        </div>
                    </TabPane>

                    <TabPane tab="Player Vs Team Performance" key="4" >

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                            <br></br>
                            <br></br>
                            <h3> <b> {this.state.playerName}</b> </h3>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                            <h6 style={{ paddingRight: "8px" }}><b>Opponent Team</b> </h6>
                            <select onChange={this.changeOfTeamName}>
                                {this.state.allTeams.map((option) => (
                                    <option value={option.Team_Name.value}>{option.Team_Name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ width: '70vw', margin: '15px', marginTop: '2vh' }}>

                            <br></br>

                            <h5 style={{ marginLeft: '3%' }}> <b> Average Performance</b> </h5>
                        </div>

                        <div style={{ width: '70vw', marginLeft: '3%', marginTop: '2vh' }}>
                            <Table dataSource={this.state.avgPlayerVsTeamPerfomance}>
                                <Column title="Minutes Played" dataIndex="Min" key="Min" />
                                <Column title="Points Scored" dataIndex="PTS" key="PTS" />
                                <Column title="Field Goal Made" dataIndex="FGM" key="FGM" />
                                <Column title="Field Goal Percentage" dataIndex="FG_PCT" key="FG_PCT" />
                                <Column title="Three Pointer Made" dataIndex="FG3M" key="FG3M" />
                                <Column title="Three Pointer Percentage" dataIndex="FG3_PCT" key="FG3_PCT" />
                                <Column title="Free Throw Made" dataIndex="FTM" key="FTM" />
                                <Column title="Free Throw Percentage" dataIndex="FT_PCT" key="FT_PCT" />
                                <Column title="Rebounds" dataIndex="REB" key="REB" />
                                <Column title="Assists" dataIndex="AST" key="AST" />
                                <Column title="Steals" dataIndex="STL" key="STL" />
                                <Column title="Blocks" dataIndex="BLK" key="BLK" />
                                <Column title="Turnover" dataIndex="Turnover" key="Turnover" />


                            </Table>

                        </div>


                        <div style={{ width: '70vw', marginLeft: '3%', alignItems: 'center', marginTop: '2vh' }}>
                            <Table dataSource={this.state.playerVsTeamPerfomance} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>

                                <Column title="Date" dataIndex="Game_Date_EST" key="Game_Date_EST" />
                                <Column title="Minutes Played" dataIndex="Min" key="Min" />
                                <Column title="Points Scored" dataIndex="PTS" key="PTS" />
                                <Column title="Field Goal Made" dataIndex="FGM" key="FGM" />
                                <Column title="Field Goal Percentage" dataIndex="FG_PCT" key="FG_PCT" />
                                <Column title="Three Pointer Made" dataIndex="FG3M" key="FG3M" />
                                <Column title="Three Pointer Percentage" dataIndex="FG3_PCT" key="FG3_PCT" />
                                <Column title="Free Throw Made" dataIndex="FTM" key="FTM" />
                                <Column title="Free Throw Percentage" dataIndex="FT_PCT" key="FT_PCT" />
                                <Column title="Rebounds" dataIndex="REB" key="REB" />
                                <Column title="Assists" dataIndex="AST" key="AST" />
                                <Column title="Steals" dataIndex="STL" key="STL" />
                                <Column title="Blocks" dataIndex="BLK" key="BLK" />
                                <Column title="Turnover" dataIndex="Turnover" key="Turnover" />


                            </Table>

                        </div>


                    </TabPane>


                    <TabPane tab="Player's Team Performance" key="5">

                        <div style={{ width: '70vw', marginLeft: '13%', marginTop: '2vh' }}>

                            <Table dataSource={this.state.playerperf} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>

                                <Column title="Team" dataIndex="Team_Name" key="Team_Name" />
                                <Column title="Season" dataIndex="season" key="season" />
                                <Column title="Minutes Played" dataIndex="Min" key="Min" />
                                <Column title="Points Scored" dataIndex="PTs" key="PTs" />
                                <Column title="Field Goal Made" dataIndex="FGM" key="FGM" />
                                <Column title="Three Pointer Made" dataIndex="F3GM" key="F3GM" />
                                <Column title="Free Throw Made" dataIndex="FTM" key="FTM" />
                                <Column title="Personal Fouls" dataIndex="PF" key="PF" />
                                <Column title="Points Contribution (%)" dataIndex="perc" key="perc" />
                            </Table>
                        </div>

                    </TabPane>
                </Tabs>
            </div>
        );

    }

}

export default PlayerInfo