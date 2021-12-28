import React from 'react';
import Card from "react-bootstrap/Card";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import CardDeck from '@bit/react-bootstrap.react-bootstrap.card-deck';

import './HomePage.css';
import MenuBarHomePage from '../components/MenuBarHomePage';

class HomePage extends React.Component {

    handlePlayersClick = () => {
        this.props.history.push("/allPlayers");
    }

    handleTeamsClick = () => {
        this.props.history.push("/allTeams");
    }

    handleGamesClick = () => {
        this.props.history.push("/allGames");
    }

    render() {

        return (
            
            <div >
                <MenuBarHomePage/>
                <div class="center-screen">
                <Row style={{ marginBottom: '10%' }}>
                    <Row style={{ marginBottom: '2%' }}>
                        <h3>Explore NBA!</h3>
                    </Row>
                    
                    <Row>

                        <Col>
                            <Card className="mycard">
                                <Card.Img variant="top" src={require("./player.png").default} />
                                <Card.Body className="mycardbody">
                                    <Button onClick={this.handlePlayersClick} variant="dark">Players</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card className="card">
                                <Card.Img variant="top" src={require("./bb.jpeg").default} />
                                <Card.Body className="cardbody">
                                    <Button onClick={this.handleGamesClick} variant="dark">Games</Button>
                                </Card.Body>
                               
                            </Card>
                        </Col>

                        <Col>
                            <Card className="card">
                                <Card.Img variant="top" src={require("./hoop.jpeg").default} />
                                <Card.Body className="cardbody">
                                    <Button onClick={this.handleTeamsClick} variant="dark">Teams</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Row>
                </div>
            </div>


        )
    }

}

export default withRouter(HomePage);

