import React from 'react';
import {
    Table,
    Pagination,
    Select,
    Tabs, Row, Col
} from 'antd'
import { Form, FormInput, FormGroup, Card, CardBody, CardImg, Progress, Button } from "shards-react"
import { getTeamInfo, getTeamStatsInfo, getTeamPerfInfo, getTeamPlayersInfo, getTeamStatsSeasons, getTeamPerfSeasons, getTeamPlayersSeasons, getPerfTeam, getTeamBestSeasons } from '../fetcher'
import MenuBar from '../components/MenuBar'
import './TeamInfo.css'



const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const winner = [
    {
        label: "Team Won",
        value: 1
    },
    {
        label: "Team Lost",
        value: 0
    }
]


class TeamInfo extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            teamid: this.props.match.params.teamid,
            teamResults: [],
            teamname: '',

            seasonstats: null,
            StatsResults: [],
            allstatsseasons: [],
            key: 1,
            activeTab: "1",
            bestseasons: [],

            versus_team_id: null,
            seasonperf: 2020,
            winner: 1,
            perfResults: [],
            allperfseasons: [],
            perfteam: [],

            playername: '',
            seasonplayer: '',
            playerResults: [],
            allplayerseasons: []
        }

        this.updateStatsSearchResults = this.updateStatsSearchResults.bind(this)
        this.SeasonStatsOnChange = this.SeasonStatsOnChange.bind(this)

        this.VersusTeamOnChange = this.VersusTeamOnChange.bind(this)
        this.updatePerfSearchResults = this.updatePerfSearchResults.bind(this)
        this.SeasonPerfOnChange = this.SeasonPerfOnChange.bind(this)
        this.WinnerOnChange = this.WinnerOnChange.bind(this)

        this.updatePlayerSearchResults = this.updatePlayerSearchResults.bind(this)
        this.SeasonPlayerOnChange = this.SeasonPlayerOnChange.bind(this)
        this.PlayerNameChange = this.PlayerNameChange.bind(this)
        this.updateStarPlayers = this.updateStarPlayers.bind(this)
    }

    changeTab = activeKey => {

        this.state.activeTab = activeKey

        if (activeKey == "2") {
            this.updateStatsSearchResults()
        }
        else if (activeKey == "3") {
            this.updatePerfSearchResults()
        }
        else if (activeKey == "4") {
            this.updatePlayerSearchResults()
        }

        else if (activeKey == "5") {
            this.updateStarPlayers()
        }
    }

    SeasonStatsOnChange(event) {
        this.state.seasonstats = event.target.value
    }

    updateStatsSearchResults() {
        getTeamStatsInfo(this.state.teamid, this.state.seasonstats).then(res => {
            this.setState({ StatsResults: res.results[0] })
        })

        getTeamStatsSeasons(this.state.teamid).then(res => {
            this.setState({ allstatsseasons: res.results })
        })
    }

    updateStarPlayers() {
        getTeamBestSeasons(this.state.teamid).then(res => {
            this.setState({ bestseasons: res.results })
        })
    }

    WinnerOnChange(event) {
        this.state.winner = event.target.value
        console.log(this.state.winner)
    }
    VersusTeamOnChange(event) {
        this.state.versus_team_id = event.target.value
        console.log(this.state.versus_team_id)
    }

    SeasonPerfOnChange(event) {

        this.state.seasonperf = event.target.value
        console.log(this.state.seasonperf)
    }

    updatePerfSearchResults() {
        getTeamPerfInfo(this.state.teamid, this.state.versus_team_id, this.state.seasonperf, this.state.winner, null, null).then(res => {
            res.results.forEach(function (a) {
                a.Game_Date_EST = a.Game_Date_EST.split('T')[0];
            });
            this.setState({ perfResults: res.results })
        })

        getTeamPerfSeasons(this.state.teamid).then(res => {
            this.setState({ allperfseasons: res.results })
        })

        getPerfTeam(this.state.teamid).then(res => {
            this.setState({ perfteam: res.results })

        })
    }

    PlayerNameChange(event) {
        this.state.playername = event.target.value
        this.setState({ playername: event.target.value })

    }

    SeasonPlayerOnChange(event) {
        this.state.seasonplayer = event.target.value

    }

    updatePlayerSearchResults() {


        getTeamPlayersInfo(this.state.teamid, this.state.playername, this.state.seasonplayer, null, null).then(res => {
            this.setState({ playerResults: res.results })
        })

        getTeamPlayersSeasons(this.state.teamid).then(res => {
            this.setState({ allplayerseasons: res.results })
        })

    }

    componentDidMount() {
        getTeamInfo(this.state.teamid).then(res => {
            this.setState({ teamResults: res.results[0] })

        })
    }

    render() {


        return (


            <div>

                <MenuBar />

                <Tabs defaultActiveKey="1" onChange={this.changeTab} style={{ paddingLeft: '24px' }}>
                    <TabPane tab="Team Info" key="1" class="tabs">
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                                <br></br>
                                <br></br>
                                <h3> <b> {this.state.teamResults.Team_Name}</b> </h3>
                            </div>

                            {this.state.teamResults ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

                                <Card style={{ marginTop: '2vh' }}>
                                    <CardBody id="cb">
                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5> <b>Team Name </b>: {this.state.teamResults.Team_Name}</h5>
                                                <h5><b>Year Founded </b> : {this.state.teamResults.Year_Founded}</h5>
                                                <h5><b>Abbreviation</b> : {this.state.teamResults.Abbreviation} </h5>
                                                <h5><b>Owner</b>: {this.state.teamResults.Owner}</h5>
                                                <h5><b>Head Coach</b> : {this.state.teamResults.Head_Coach}</h5>
                                                <h5><b>Arena</b>: {this.state.teamResults.Arena}</h5>
                                                <h5><b>Arena Capacity</b> : {this.state.teamResults.Arena_Capacity}</h5>
                                                <h5><b>Manager</b> : {this.state.teamResults.General_Manager}</h5>
                                                <h5><b>League Affiliation</b> : {this.state.teamResults.DLeague_Affiliation}</h5>
                                            </Col>
                                            <Col>
                                                <img src={"/images/" + this.state.teamid + ".png"} height='300' width='300' />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </div> : null}
                        </div>
                    </TabPane>

                    <TabPane tab="Team Statistics" key="2" class="tabs">
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                                <br></br>
                                <br></br>
                                <h3> <b> Team Season's Statistics</b></h3>
                            </div>
                            <div style={{ paddingLeft: '230px', fontSize: '15px' }}>
                                <h6><b>Season </b></h6>
                                <select onChange={this.SeasonStatsOnChange} defaultValue={null} class="select_drop">
                                    {this.state.allstatsseasons.map((option) => (
                                        <option value={option.Season}>{option.Season}</option>
                                    ))}
                                </select>
                                <Button onClick={this.updateStatsSearchResults} id="bt"  >Search</Button>
                            </div>
                            {this.state.StatsResults ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

                                <Card style={{ marginTop: '2vh' }}>
                                    <CardBody id="cb">
                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <h5> <b>Games Played </b>: {this.state.StatsResults.Games_Played}</h5>
                                                <h5><b>Wins </b> : {this.state.StatsResults.Wins}</h5>
                                                <h5><b>Losses</b> : {this.state.StatsResults.Losses} </h5>
                                                <h5><b>Win Percentage</b> : {this.state.StatsResults.Win_Percentage} </h5>
                                                <h5><b>Points</b> : {this.state.StatsResults.Points} </h5>
                                                <h5><b>Assits</b> : {this.state.StatsResults.Assists} </h5>
                                                <h5><b>Blocks</b> : {this.state.StatsResults.Blocks} </h5>
                                                <h5><b>Rebounds</b> : {this.state.StatsResults.Rebounds} </h5>
                                                <h5><b>Field_Goal_Percentage</b> : {this.state.StatsResults.Field_Goal_Percentage} </h5>
                                                <h5><b>Free_Throw_Percentage</b> : {this.state.StatsResults.Free_Throw_Percentage} </h5>
                                                <h5><b>Minutes_Played</b> : {this.state.StatsResults.Minutes_Played} </h5>
                                                <h5><b>Turnovers</b> : {this.state.StatsResults.Turnovers} </h5>
                                            </Col>
                                            <Col>
                                                <img src={"/images/" + this.state.teamid + ".png"} height='300' width='300' />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </div> : null}
                        </div>

                    </TabPane>

                    <TabPane tab="Team Performance" key="3" class="tabs">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                            <br></br>
                            <br></br>
                            <h3> <b> Team  Performance Info</b></h3>
                        </div>
                        <div style={{ width: '90vw', margin: '0 auto', marginTop: '5vh' }}>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col>
                                </Col>
                                <Col style={{ textAlign: 'left' }}>
                                    <h6> <b>Versus Teams</b></h6>
                                    <select onChange={this.VersusTeamOnChange}>
                                        {this.state.perfteam.map((option) => (
                                            <option value={option.Team_ID}>{option.Team_Name}</option>
                                        ))}
                                    </select>
                                </Col>
                                <Col style={{ textAlign: 'left' }}>
                                    <h6><b>Season</b></h6>
                                    <select onChange={this.SeasonPerfOnChange}>
                                        {this.state.allperfseasons.map((option) => (
                                            <option value={option.Season}>{option.Season}</option>
                                        ))}
                                    </select>
                                </Col>
                                <Col>
                                    <h6><b>Game Result</b></h6>
                                    <select onChange={this.WinnerOnChange}>
                                        {winner.map((option) => (
                                            <option value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Button style={{ marginTop: '4vh', marginBottom: '4vh' }} onClick={this.updatePerfSearchResults} id="bt"> Search</Button>
                            </Row>
                        </div>
                        <div>

                            <Table style={{ width: '-100vw', margin: '0 auto', marginTop: '2vh' }} onRow={(record, rowIndex) => { }} dataSource={this.state.perfResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                                <Column title="Game Date" dataIndex="Game_Date_EST" key="Game_Date_EST" />
                                <Column title="Points Away" dataIndex="PTS_Away" key="PTS_Away" />
                                <Column title="Points Home" dataIndex="PTS_Home" key="PTS_Home" />
                                <Column title="Assists Away" dataIndex="AST_Away" key="AST_Away" />
                                <Column title="Assists Home" dataIndex="AST_Home" key="AST_Home" />
                                <Column title="Free Throw Percentage Away" dataIndex="FT_PCT_Away" key="FT_PCT_Away" />
                                <Column title="Free Throw Percentage Home" dataIndex="FT_PCT_Home" key="FT_PCT_Home" />
                                <Column title="Three Point Percentage Away" dataIndex="FG3_PCT_Away" key="FG3_PCT_Away" />
                                <Column title="Three Point Percentage Home" dataIndex="FG3_PCT_Home" key="FG3_PCT_Home" />
                                <Column title="Final Goal Percentage Away" dataIndex="FG_PCT_Away" key="FG_PCT_Away" />
                                <Column title="Final Goal Percentage Home" dataIndex="FG_PCT_Home" key="FG_PCT_Home" />
                                <Column title="Rebounds Away" dataIndex="REB_Away" key="REB_Away" />
                                <Column title="Rebounds Home" dataIndex="REB_Home" key="REB_Home" />
                            </Table>
                        </div>

                    </TabPane>

                    <TabPane tab="Team Players" key="4" class="tabs">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                            <br></br>
                            <br></br>
                            <h3><b> Team Players</b></h3>
                        </div>
                        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                            <FormInput placeholder="Player Name" value={this.state.playername} onChange={this.PlayerNameChange} />

                            <div style={{ fontSize: '15px', marginTop: '5vh' }}>
                                <h6> <b>Season</b></h6>
                                <select onChange={this.SeasonPlayerOnChange}>
                                    {this.state.allplayerseasons.map((option) => (
                                        <option value={option.Season}>{option.Season}</option>
                                    ))}
                                </select>
                                <Button onClick={this.updatePlayerSearchResults} id="bt">Search</Button>
                            </div>
                            <Table onRow={(record, rowIndex) => {
                            }} dataSource={this.state.playerResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                                <Column title="Player Name" dataIndex="Player_Name" key="Player_Name" />
                            </Table>
                        </div>
                    </TabPane>
                    <TabPane tab="Star Players" key="5" class="tabs">
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                                <br></br>
                                <br></br>
                                <h3> <b> Star Players</b></h3>
                            </div>
                            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }} >
                                <Row align='middle' justify='center'>
                                    <Col flex={6}>
                                        <Table onRow={(record, rowIndex) => { }} dataSource={this.state.bestseasons}>
                                            <Column title="Season" dataIndex="Season" key="Season" />
                                            <Column title="Player Name" dataIndex="Player_Name" key="Player_Name" />
                                            <Column title="Max Points" dataIndex="MaxPts" key="MaxPts" />
                                        </Table>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

}

export default TeamInfo
