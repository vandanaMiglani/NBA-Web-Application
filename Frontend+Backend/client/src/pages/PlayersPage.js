import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { getAllPlayers } from '../fetcher'

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

const playerColumns = [
    {
        title: 'Name',
        dataIndex: 'Player_Name',
        key: 'Player_Name',
        sorter: (a, b) => a.Player_Name.localeCompare(b.Player_Name),
        render: (text, row) => <a href={`/player/${row.Player_ID}/ALL`}>{text}</a>
    }
];


class PlayersPage extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            playersResults: [],
            nameQuery: '',
            pagination: null
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)

    }

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    updateSearchResults() {

        getAllPlayers(this.state.nameQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })

    }

    componentDidMount() {

        getAllPlayers(this.state.nameQuery, null, null).then(res => {
            console.log(res.results)
            this.setState({ playersResults: res.results })
        })


    }


    render() {
        return (

            <div>
                <MenuBar/>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <br></br>
                    <h3>Players</h3>

                    <Form style={{ width: '40vw', marginTop: '5vh' }}>
                        <Row>
                            <Col flex={2}><FormGroup style={{ width: '20vw' }}>
                                <label>Name</label>
                                <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                            </FormGroup></Col>
                            <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                                <Button class="btn btn-dark" style={{ marginTop: '4vh', variant:"dark" }} onClick={this.updateSearchResults}>Search</Button>
                            </FormGroup></Col>
                        </Row>
                        <br></br>

                    </Form>

                    <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
                </div>

                <Divider />

            </div>
        )
    }
}

export default PlayersPage

