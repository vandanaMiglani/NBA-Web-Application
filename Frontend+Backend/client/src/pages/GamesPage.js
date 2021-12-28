import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { getAllGames } from '../fetcher'

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate
} from 'antd'

import { format } from 'd3-format';
import MenuBar from '../components/MenuBar';

const wideFormat = format('.3r');

const gamesColumns = [
    {
        title: 'Date',
        dataIndex: 'Game_Date',
        key: 'Game_Date',
    },
    {
        title: 'Home Team',
        dataIndex: 'Home_Team',
        key: 'Home_Team',
        sorter: (a, b) => a.Home_Team.localeCompare(b.Home_Team),
    },
    {
        title: 'Away Team',
        dataIndex: 'Away_Team',
        key: 'Away_Team',
        sorter: (a, b) => a.Away_Team.localeCompare(b.Away_Team),
        
    },
    {
        title: 'Home Team Points',
        dataIndex: 'Home_Team_Points',
        key: 'Home_Team_Points',
        sorter: (a, b) => a.Home_Team_Points - b.Home_Team_Points

    },
    {
        title: 'Away Team Points',
        dataIndex: 'Away_Team_Points',
        key: 'Away_Team_Points',
        sorter: (a, b) => a.Away_Team_Points - b.Away_Team_Points

    }
];


class GamesPage extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            gamesResults: [],
            homeTeamQuery: '',
            awayTeamQuery: '',
            pagination: null
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleHomeTeamQueryChange = this.handleHomeTeamQueryChange.bind(this)
        this.handleAwayTeamQueryChange = this.handleAwayTeamQueryChange.bind(this)

    }

    handleHomeTeamQueryChange(event) {
        this.setState({ homeTeamQuery: event.target.value })
    }

    handleAwayTeamQueryChange(event) {
        this.setState({ awayTeamQuery: event.target.value })
    }

    goToMatch(GameID) {
        window.location = `/GameInfo/${GameID}`
    }

    updateSearchResults() {

        getAllGames(this.state.homeTeamQuery, this.state.awayTeamQuery, null, null).then(res => {
            res.results.forEach(function (a) {
                a.Game_Date = a.Game_Date.split('T')[0];
            });
            console.log(res.results)
            this.setState({ gamesResults: res.results })
        })

    }


    componentDidMount() {

        getAllGames(this.state.homeTeamQuery, this.state.awayTeamQuery, null, null).then(res => {
            res.results.forEach(function (a) {
                a.Game_Date = a.Game_Date.split('T')[0];
            });
            console.log(res.results)
            this.setState({ gamesResults: res.results })
        })


    }


    render() {
        return (

            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <br></br>
                    <h3>Games</h3>
                    <Form style={{ width: '70vw', marginTop: '5vh' }}>
                        <Row>
                            <Col flex={2}><FormGroup style={{ width: '20vw' }}>
                                <label>Home Team</label>
                                <FormInput placeholder="Home Team" value={this.state.homeTeamQuery} onChange={this.handleHomeTeamQueryChange} />
                            </FormGroup></Col>
                            <Col flex={2}><FormGroup style={{ width: '20vw' }}>
                                <label>Away Team</label>
                                <FormInput placeholder="Away Team" value={this.state.awayTeamQuery} onChange={this.handleAwayTeamQueryChange} />
                            </FormGroup></Col>
                            <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                                <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                            </FormGroup></Col>
                        </Row>


                    </Form>

                    <br></br>

                    <Table onRow={(record, rowIndex) => {
                        return {
                            onClick: event => { this.goToMatch(record.Game_ID1) },   
                        };
                    }} dataSource={this.state.gamesResults} columns={gamesColumns} rowKey="Id" pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
                </div>

                <Divider />

            </div>
        )
    }
}

export default GamesPage

