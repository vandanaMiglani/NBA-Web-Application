import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { getAllTeams } from '../fetcher'

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

const teamsColumns = [
    {
        title: 'Abbreviation',
        dataIndex: 'Abbreviation',
        key: 'Abbreviation',
    },
    {
        title: 'Team Name',
        dataIndex: 'Team_Name',
        key: 'Team_Name',
        sorter: (a, b) => a.Team_Name.localeCompare(b.Team_Name),
        render: (text, row) => <a href={`/teamInfo/${row.Team_ID}`}>{text}</a>
    }
];


class TeamsPage extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            nameQuery: '',
            teamsResults: [],
            
            pagination: null
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)

    }

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    updateSearchResults() {

        getAllTeams(this.state.nameQuery, null, null).then(res => {
            this.setState({ teamsResults: res.results })
        })

    }

    componentDidMount() {

        getAllTeams(this.state.nameQuery, null, null).then(res => {
            console.log(res.results)
            this.setState({ teamsResults: res.results })
        })


    }

    render() {
        return (

            <div>

                
                <MenuBar/>
                <br></br>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Teams</h3>
                    <Form style={{ width: '40vw', marginTop: '5vh' }}>
                        <Row>
                            <Col flex={2}><FormGroup style={{ width: '20vw' }}>
                                <label>Team Name</label>
                                <FormInput placeholder="Team Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                            </FormGroup></Col>
                            <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                                <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                            </FormGroup></Col>
                        </Row>


                    </Form>
                    <br></br>
                    <Table dataSource={this.state.teamsResults} columns={teamsColumns} rowKey="Id" pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
                </div>

                <Divider />

            </div>
        )
    }
}

export default TeamsPage

