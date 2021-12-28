import config from './config.json'
 
const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getAllTeams = async (name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allTeams?name=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log(res.results);
    return res.json()
}
 
const getAllPlayers = async (name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allPlayers?name=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET'
    })
    return res.json()
}
 
const getAllGames = async (hometeam, awayteam, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allGames?HomeTeam=${hometeam}&AwayTeam=${awayteam}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET'
    })
    
    return res.json()
}
 
const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
 
 
const getPlayerOverview = async (playerID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playerInfo/${playerID}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getPlayerInjuries = async (page, pagesize, playerID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playerInjuries/${playerID}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log(res)
    return res.json()
}
 
const getPlayerPerformance = async (playerID, season) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playerPerformance/${playerID}?season=${season}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getPlayerSeasons = async (playerID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allSeasons/${playerID}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getPlayerName = async (playerID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playerName/${playerID}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getPlayerVsTeamPerformance = async (playerID, teamName) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playerVsTeamPerformance/${playerID}/${teamName}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getAvgPlayerVsTeamPerformance = async(playerID, teamName) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/avgPlayerVsTeamPerformance/${playerID}/${teamName}`, {
        method: 'GET',
    })
    return res.json()
}
 
const getGameDetails = async (GameID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allGames/gameInfo/gameStats/${GameID}` , {
        method: 'GET',
    })
    return res.json()
}
 
const getHomeTeamDetails = async (GameID, Home_Team_ID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allGames/gameInfo/HomeTeamPlayers/${GameID}/${Home_Team_ID}` , {
        method: 'GET',
    })
    return res.json()
}
 
const getAwayTeamDetails = async (GameID, Away_Team_ID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allGames/gameInfo/AwayTeamPlayers/${GameID}/${Away_Team_ID}` , {
        method: 'GET',
    })
    return res.json()
}
 
const getHomeTeamAvg = async (GameID, Team_ID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allGames/gameInfo/AvgPerformance/${GameID}/${Team_ID}` , {
        method: 'GET',
    })
    return res.json()
}
 
const getAwayTeamAvg = async (GameID, Team_ID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allGames/gameInfo/AvgPerformance/${GameID}/${Team_ID}` , {
        method: 'GET',
    })
    return res.json()
}
 
const getTeamInfo = async(teamid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teamInfo/${teamid}`,{
        method: 'GET',
    })
    return res.json()
}
 
const getTeamPerfInfo = async(teamid,versus_team_id,season,winner,page,pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teamPerformance/${teamid}?versus_team_id=${versus_team_id}&season=${season}&winner=${winner}&page=${page}&pagesize=${pagesize}`,{
        method: 'GET',
    })
    return res.json()
}
 
const getTeamPerfSeasons = async(teamid) =>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teamPerformanceSeasons/${teamid}`,{
        method: 'GET',
    })
    return res.json()
}
 
const getPerfTeam = async(teamid) =>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/PerformanceTeam/${teamid}`,{
        method: 'GET',
    })
    return res.json()
}
 
const getTeamStatsInfo = async(teamid,season) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teamStats/${teamid}?season=${season}`,{
        method: 'GET',
    })
    return res.json()
}
 
const getTeamStatsSeasons = async(teamid) =>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teamStatsSeasons/${teamid}`,{
        method: 'GET',
    })
    return res.json()
}
const getTeamPlayersInfo = async(teamid,playername,season,page,pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teamInfo/${teamid}/player/?playerName=${playername}&season=${season}&page=${page}&pagesize=${pagesize}`,{
        method: 'GET',
    })
    return res.json()
}
 
const getTeamPlayersSeasons = async(teamid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teamInfo/${teamid}/player_seasons`,{
        method: 'GET',
    })
    return res.json()
}
 
const getTeamBestSeasons = async(teamid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teambestseason/${teamid}`,{
        method: 'GET',
    })
    return res.json()
}
 
 
const getPlayerSeasonTeamPerformance = async(playerID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playerSeasonTeamPerformance/${playerID}`,{
        method: 'GET',
    })
    return res.json()
   
}
 
export {
    getAllMatches,
    getAllTeams,
    getAllPlayers,
    getAllGames,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch, 
    getPlayerOverview,
    getPlayerInjuries,
    getPlayerPerformance,
    getPlayerSeasons,
    getPlayerName,
    getPlayerVsTeamPerformance,
    getAvgPlayerVsTeamPerformance,
    getGameDetails,
    getHomeTeamDetails,
    getAwayTeamDetails,
    getHomeTeamAvg,
    getAwayTeamAvg, 
    getTeamInfo,
    getTeamPerfInfo,
    getTeamPerfSeasons,
    getPerfTeam,
    getTeamStatsInfo,
    getTeamStatsSeasons,
    getTeamPlayersInfo,
    getTeamPlayersSeasons,
    getTeamBestSeasons,
    getPlayerSeasonTeamPerformance
}
 
 