const express = require('express');
const mysql = require('mysql');
 
const routes = require('./routes')
const config = require('./config.json')
 


const cors = require('cors');
 
const app = express();
app.use(cors({
    origin: '*'
}));
 
app.get('/playerInjuries/:playerID', routes.injuries)

app.get('/playerPerformance/:playerID', routes.playerPerformance)
 
app.get('/allPlayers', routes.allPlayers)
 
app.get('/playerInfo/:playerID', routes.latestPlayerInfo)
 
app.get('/allSeasons/:playerID', routes.allSeasons)
 
app.get('/teamPerformance/:team_id', routes.team_performance)
 
app.get('/teamStats/:team_id', routes.team_stats)
 
app.get('/allGames', routes.all_games)
 
app.get('/allGames/gameInfo/AvgPerformance/:GameID/:Team_ID', routes.Avg_Performance)
 
app.get('/allGames/gameInfo/:GameID', routes.game_info_front)
 
app.get('/allGames/gameInfo/gameStats/:GameID', routes.game_stats)
 
app.get('/allGames/gameInfo/HomeTeamPlayers/:GameID/:Home_Team_ID', routes.HomeTeamPlayers)
 
app.get('/allGames/gameInfo/AwayTeamPlayers/:GameID/:Away_Team_ID', routes.AwayTeamPlayers)
 
app.get('/teamInfo/:teamId', routes.teamInfo)
 
app.get('/teamInfo/:teamId/player', routes.teamInfo_player)
 
app.get('/allTeams', routes.all_teams)
 
app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});
 
app.get('/playerName/:playerID', routes.playerName) 
 
app.get('/playerVsTeamPerformance/:playerID/:teamName', routes.playerVsTeamPerformance)
 
app.get('/avgPlayerVsTeamPerformance/:playerID/:teamName', routes.avgPlayerVsTeamPerformance)
 
app.get('/teamPerformanceSeasons/:team_id',routes.team_performance_season)
 
app.get('/PerformanceTeam/:team_id',routes.performance_team)
 
app.get('/teamStatsSeasons/:team_id',routes.team_stats_season)
 
app.get('/teambestseason/:team_id',routes.team_bestplayer_season)
 
app.get('/teamInfo/:teamId/player_seasons', routes.teamInfo_player_seasons)
 
app.get('/playerSeasonTeamPerformance/:playerID',routes.playerSeasonTeamPerformance)
 
module.exports = app;
 