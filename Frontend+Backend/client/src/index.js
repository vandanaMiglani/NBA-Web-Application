import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import TeamsPage from './pages/TeamsPage';
import GamesPage from './pages/GamesPage';
import CarouselPage from './pages/CarouselPage';
import PlayerInfo from './pages/PlayerInfo';
import GameInfo from './pages/GameInfo';
import TeamInfo from './pages/TeamInfo';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
    <div>
        <Router>
            <Switch>
                <Route exact
                    path="/"
                    render={() => (
                        <CarouselPage />
                    )} />
                <Route exact
                    path="/home"
                    render={() => (
                        <HomePage />
                    )} />
                <Route exact
                    path="/allPlayers"
                    render={() => (
                        <PlayersPage />
                    )} />

                <Route exact
                    path="/allGames"
                    render={() => (
                        <GamesPage />
                    )} />

                <Route exact
                    path="/allTeams"
                    render={() => (
                        <TeamsPage />
                    )} />

                <Route exact
                    path="/player/:playerID/:teamName"
                    render={() => (
                        <PlayerInfo />
                    )} />

                <Route exact
                    path="/GameInfo/:GameID"
                    render={() => (
                        <GameInfo />
                    )} />

                <Route exact 
                    path="/teamInfo/:teamid" component={TeamInfo}></Route>

            </Switch>
        </Router>
    </div>,
    document.getElementById('root')
);

