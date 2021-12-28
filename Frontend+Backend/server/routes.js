const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
 
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();
 
async function injuries(req, res) {
    const playerID = req.params.playerID ? req.params.playerID : ''
 
    if (req.query.page && !isNaN(req.query.page)) {
 
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        var offsetValue = pagesize * (page - 1)
 
        connection.query(`SELECT Date, Injury_Info, Team_Name from Injuries JOIN Teams ON Injuries.Team_ID = Teams.Team_ID WHERE Player_ID = '${playerID}' ORDER BY Date DESC LIMIT ${pagesize} OFFSET ${offsetValue};`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
 
    } else {
 
        connection.query(`SELECT Date, Injury_Info, Team_Name from Injuries JOIN Teams ON Injuries.Team_ID = Teams.Team_ID WHERE Player_ID = '${playerID}' ORDER BY Date DESC;`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
 
    }
 
}

async function playerPerformance(req, res) {
 
    const playerID = req.params.playerID ? req.params.playerID : ''
 
    if (req.query.season && !isNaN(req.query.season)) {
        
        season = req.query.season;
 
        connection.query(`SELECT Player_ID, ROUND(Gp, 2) AS Gp, ROUND(Pts, 2) AS Pts, ROUND(Reb, 2) AS Reb, ROUND(Ast, 2) AS Ast, ROUND(Net_Rating, 2) AS Net_Rating, ROUND(Oreb_Pct * 100, 2) AS Oreb_Pct, ROUND(Dreb_Pct* 100, 2) AS Dreb_Pct, ROUND(Usg_Pct * 100, 2) AS Usg_Pct, ROUND(Ts_Pct * 100, 2) AS Ts_Pct, ROUND(Ast_Pct *100, 2) AS Ast_Pct FROM PlayerStats WHERE Player_ID = '${playerID}' AND Season = '${season}'`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
 
 
    } else {
 
        connection.query(`SELECT Player_ID, ROUND(AVG(Gp), 2) AS Gp, ROUND(AVG(Pts), 2) AS Pts, ROUND(AVG(Reb), 2) AS Reb, ROUND(AVG(Ast), 2) AS Ast, ROUND(AVG(Net_Rating), 2) AS Net_Rating, ROUND(AVG(Oreb_Pct)*100, 2) AS Oreb_Pct, ROUND(AVG(Dreb_Pct)*100, 2) AS Dreb_Pct, ROUND(AVG(Usg_Pct)*100, 2) AS Usg_Pct, ROUND(AVG(Ts_Pct)*100, 2) AS Ts_Pct, ROUND(AVG(Ast_Pct)*100, 2) AS Ast_Pct FROM PlayerStats WHERE Player_ID = '${playerID}' GROUP BY Player_ID`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
 
    }
 
}
 
async function allPlayers(req, res) {
 
    if (req.query.page && !isNaN(req.query.page)) {
 
        const name = req.query.name
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        var offsetValue = pagesize * (page - 1)
 
        connection.query(`SELECT DISTINCT(Player_Name), Player_ID from Players WHERE Player_Name LIKE '${name}%' ORDER BY Player_Name ASC LIMIT ${pagesize} OFFSET ${offsetValue};`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
 
 
    } else {
 
        const name = req.query.name
        connection.query(`SELECT DISTINCT(Player_Name), Player_ID from Players WHERE Player_Name LIKE '${name}%' ORDER BY Player_Name ASC;`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}
 
async function latestPlayerInfo(req, res) {
 
    const playerID = req.params.playerID ? req.params.playerID : ''
 
    connection.query(`WITH MaxAgeQuery (playerID, maxAge) AS (
        SELECT Player_ID, MAX(Age) AS MaxAge from PlayerStats GROUP BY Player_ID
    ),
    PlayerInfoMaxAge AS (
        SELECT * from PlayerStats, MaxAgeQuery WHERE PlayerStats.Player_ID = MaxAgeQuery.playerID AND PlayerStats.Age = MaxAgeQuery.maxAge
    ) SELECT  PlayerInfoMaxAge.Player_ID, Player_Name, Team_Name, Season, Age, Player_Height, Player_weight, College, Country, Draft_Year, Draft_Round, Draft_Number, Net_Rating from PlayerInfoMaxAge JOIN Players ON PlayerInfoMaxAge.Player_ID = Players.Player_ID JOIN Teams ON PlayerInfoMaxAge.Team_ID = Teams.Team_ID WHERE Players.Player_ID = '${playerID}'`, function (error, results, fields) {
 
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
 
    });
 
}
 
async function allSeasons(req, res) {
 
    const playerID = req.params.playerID ? req.params.playerID : ''
 
    connection.query(`SELECT Season from PlayerStats WHERE Player_ID = '${playerID}' ORDER BY Season DESC`, function (error, results, fields) {
 
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
 
    });
}
 
async function playerName(req, res) {
 
    const playerID = req.params.playerID ? req.params.playerID : ''
 
    connection.query(`SELECT Player_Name from Players WHERE Player_ID = '${playerID}'`, function (error, results, fields) {
 
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
 
    });
}
async function playerVsTeamPerformance(req, res) {
    const playerID = req.params.playerID ? req.params.playerID : ''
    const teamName = req.params.teamName ? req.params.teamName : ''
 
    if (teamName == "ALL") {
        connection.query(`
        select G.Game_Date_EST, GameStats.Min, GameStats.PTS,
        GameStats.FGM, GameStats.FGA, GameStats.FG_PCT,
        GameStats.FG3_PCT, GameStats.FT_PCT, 
        GameStats.FG3M, GameStats.FTM,
        GameStats.FG3A, GameStats.FTA,
        GameStats.REB,
        GameStats.AST, GameStats.STL, GameStats.BLK, GameStats.Turnover
 from GameStats join Game G on G.Game_ID = GameStats.Game_ID
  where GameStats.Player_ID = '${playerID}'
 ORDER BY G.Game_Date_EST DESC`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
    }
 
    else {
        connection.query(`WITH TeamID AS ( select Team_ID
            from Teams
            where Team_Name = '${teamName}' ),
            GameInfo AS ( select Game_ID, Game_Date_EST
            from Game, TeamID
            where Home_Team_ID = TeamID.Team_ID
               or Visitor_Team_ID = TeamID.Team_ID )
       select GameInfo.Game_Date_EST, GameStats.Min, 
            GameStats.PTS,
              GameStats.FGM, GameStats.FGA, GameStats.FG_PCT,
              GameStats.FG3_PCT, GameStats.FT_PCT, 
              GameStats.FG3M, GameStats.FTM,
              GameStats.FG3A, GameStats.FTA,
              GameStats.REB,
              GameStats.AST, GameStats.STL, GameStats.BLK, GameStats.Turnover
       from GameStats
           JOIN
           TeamID
               ON GameStats.Team_ID != TeamID.Team_ID
           JOIN
           GameInfo
               ON GameInfo.Game_ID = GameStats.Game_ID
        where GameStats.Player_ID = '${playerID}'
       ORDER BY GameInfo.Game_Date_EST DESC`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
    }
 
 
}
 
async function avgPlayerVsTeamPerformance(req, res) {
    const playerID = req.params.playerID ? req.params.playerID : ''
    const teamName = req.params.teamName ? req.params.teamName : ''
 
    if (teamName == "ALL") {
        connection.query(`
        select ROUND(AVG(GameStats.Min),2) as Min, ROUND(AVG(GameStats.PTS),2) as PTS,
            ROUND(AVG(GameStats.FGM),2) as FGM, ROUND(AVG(GameStats.FGA),2) as FGA, ROUND(AVG(GameStats.FG_PCT)*100,2) as FG_PCT,
                ROUND(AVG(GameStats.FG3_PCT)*100,2) as FG3_PCT, ROUND(AVG(GameStats.FT_PCT)*100,2) as FT_PCT, 
                    ROUND(AVG(GameStats.FG3M),2) as FG3M, ROUND(AVG(GameStats.FTM),2) as FTM,
                        ROUND(AVG(GameStats.FG3A),2) as FG3A, ROUND(AVG(GameStats.FTA),2) as FTA,
                            ROUND(AVG(GameStats.REB),2) as REB,
                                ROUND(AVG(GameStats.AST),2) as AST, ROUND(AVG(GameStats.STL),2) as STL, 
                                ROUND(AVG(GameStats.BLK),2) as BLK, ROUND(AVG(GameStats.Turnover),2) as Turnover
 from GameStats join Game G on G.Game_ID = GameStats.Game_ID
  where GameStats.Player_ID = '${playerID}'
 ORDER BY G.Game_Date_EST DESC`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
    }
 
    else {
        connection.query(`WITH TeamID AS ( select Team_ID
            from Teams
            where Team_Name = '${teamName}' ),
            GameInfo AS ( select Game_ID, Game_Date_EST
            from Game, TeamID
            where Home_Team_ID = TeamID.Team_ID
               or Visitor_Team_ID = TeamID.Team_ID )
               select ROUND(AVG(GameStats.Min),2) as Min, ROUND(AVG(GameStats.PTS),2) as PTS,
            ROUND(AVG(GameStats.FGM),2) as FGM, ROUND(AVG(GameStats.FGA),2) as FGA, ROUND(AVG(GameStats.FG_PCT)*100,2) as FG_PCT,
                ROUND(AVG(GameStats.FG3_PCT)*100,2) as FG3_PCT, ROUND(AVG(GameStats.FT_PCT)*100,2) as FT_PCT, 
                    ROUND(AVG(GameStats.FG3M),2) as FG3M, ROUND(AVG(GameStats.FTM),2) as FTM,
                        ROUND(AVG(GameStats.FG3A),2) as FG3A, ROUND(AVG(GameStats.FTA),2) as FTA,
                            ROUND(AVG(GameStats.REB),2) as REB,
                                ROUND(AVG(GameStats.AST),2) as AST, ROUND(AVG(GameStats.STL),2) as STL, 
                                ROUND(AVG(GameStats.BLK),2) as BLK, ROUND(AVG(GameStats.Turnover),2) as Turnover
       from GameStats
           JOIN
           TeamID
               ON GameStats.Team_ID != TeamID.Team_ID
           JOIN
           GameInfo
               ON GameInfo.Game_ID = GameStats.Game_ID
        where GameStats.Player_ID = '${playerID}'
       ORDER BY GameInfo.Game_Date_EST DESC`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
    }
 
}
 

async function team_performance(req, res) {
 
    const Team_id = req.params.team_id
    const versus_team_id = req.query.versus_team_id 
    const season = req.query.season ? req.query.season : 2020
    const winner = req.query.winner ? req.query.winner : 1
 
    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
 
    if (req.query.page && !isNaN(req.query.page) && !isNaN(versus_team_id)) {
       
        const n = (page-1)*pagesize  
 
        connection.query( `With teamgame AS (
            Select * from Game
            where Home_Team_ID = ${Team_id} OR Visitor_Team_ID = ${Team_id})
            Select * from teamgame t1
            WHERE t1.Visitor_Team_Id = ${versus_team_id} and t1.season = ${season}
            and t1.Home_Team_wins = ${winner}
            Union
            Select * from teamgame t1
            WHERE t1.Home_Team_Id = ${versus_team_id} and t1.season = ${season} and
            t1.Home_Team_wins <> ${winner}
            Limit ${pagesize} OFFSET ${n}`,function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
   
    } 
    else if(!isNaN(versus_team_id)) {
        
        connection.query( `With teamgame AS (
            Select * from Game
            where Home_Team_ID = ${Team_id} OR Visitor_Team_ID = ${Team_id})
            Select * from teamgame t1
            WHERE t1.Visitor_Team_Id = ${versus_team_id} and t1.season = ${season}
            and t1.Home_Team_wins = ${winner}
            Union
            Select * from teamgame t1
            WHERE t1.Home_Team_Id = ${versus_team_id} and t1.season = ${season} and
            t1.Home_Team_wins <> ${winner}`,function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
    }
 
    else {
        connection.query( `With teamgame AS (
            Select * from Game
            where Home_Team_ID = ${Team_id} OR Visitor_Team_ID = ${Team_id})
            Select * from teamgame t1
            WHERE  t1.season = ${season}
            and t1.Home_Team_wins = ${winner}`,function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
        
    }
    
}
 
async function team_performance_season(req,res){
    const Team_id = req.params.team_id    
        connection.query( `Select Distinct Season from Game
        where Home_Team_ID = ${Team_id} OR Visitor_Team_ID = ${Team_id}`,function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
}
 
async function performance_team(req,res){
    const Team_id = req.params.team_id    
        connection.query( `With team1(teamid) as (Select Distinct Home_Team_ID as teamid from Game
        where Home_Team_ID <> ${Team_id}
        Union
        Select Distinct Visitor_Team_ID as teamid from Game
        where Visitor_Team_ID <> ${Team_id})
        SELECT Team_Name,Team_ID
        From Teams join team1 on Teams.Team_ID = team1.teamid`,function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
}
 
async function team_stats(req, res) {
 
    const Team_id = req.params.team_id
 
    if (req.query.season && !isNaN(req.query.season)) {
 
        const season = req.query.season
        console.log(season)
 
        connection.query( `SELECT GP as Games_Played,W as Wins,L as Losses, Win_Percentage as Win_Percentage,MIN,2 as Minutes_Played,PTS as Points,FGM as Field_Goals_Made,
        FGA as Field_Goals_Attempted,FG_percentage as Field_Goal_Percentage,3PM as 3_Point_Field_Goals_Made,3PA as 3_Point_Field_Goals_Attempted,
        3P_percentage as 3_Point_Field_Goal_Percentage,FTM as Free_Throws_Made,FTA as Free_Throws_Attempted,
        FT_percentage as Free_Throw_Percentage,OREB as Offensive_Rebounds,
        DREB as Defensive_Rebounds,REB as Rebounds,AST as Assists,TOV as Turnovers,STL as Steals,BLK as Blocks,
        BLKA as Blocked_Field_Goal_Attempts
        FROM TeamStats
        WHERE Team_ID = ${Team_id} and Season = ${season}
        GROUP BY Team_ID;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
 
    }
    else {
        
        connection.query( `SELECT Sum(GP) as Games_Played,Sum(W) as Wins,Sum(L) as Losses,Round(AVG(Win_Percentage),2) as Win_Percentage,Round(AVG(MIN),2) as Minutes_Played,Round(AVG(PTS),2) as Points,Round(AVG(FGM),2) as Field_Goals_Made,
        Round(AVG(FGA),2) as Field_Goals_Attempted,Round(AVG(FG_percentage),2) as Field_Goal_Percentage,Round(AVG(3PM),2) as 3_Point_Field_Goals_Made,Round(AVG(3PA),2) as 3_Point_Field_Goals_Attempted,
        Round(AVG(3P_percentage),2) as 3_Point_Field_Goal_Percentage,Round(AVG(FTM),2) as Free_Throws_Made,Round(AVG(FTA),2) as Free_Throws_Attempted,
        Round(AVG(FT_percentage),2) as Free_Throw_Percentage,Round(AVG(OREB),2) as Offensive_Rebounds,
        Round(AVG(DREB),2) as Defensive_Rebounds,Round(AVG(REB),2) as Rebounds,Round(AVG(AST),2) as Assists,Round(AVG(TOV),2) as Turnovers,Round(AVG(STL),2) as Steals,Round(AVG(BLK),2) as Blocks,
        Round(AVG(BLKA),2) as Blocked_Field_Goal_Attempts
        FROM TeamStats
        WHERE Team_ID = ${Team_id}
        GROUP BY Team_ID;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
    
}
 
async function team_stats_season(req,res){
    const Team_id = req.params.team_id    
        connection.query( `SELECT Season
        FROM TeamStats
        WHERE Team_ID = ${Team_id}`,function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
}
 
 
async function team_bestplayer_season(req,res){
    const Team_id = req.params.team_id    
        connection.query( `
        WITH GameIDResults (teamId, Season, gameId) AS (
            SELECT TS.Team_ID, TS.Season, G.Game_ID 
            from TeamStats TS JOIN Game G ON G.Home_Team_ID = TS.Team_ID
            where TS.Team_ID = ${Team_id}
            UNION
            SELECT TS.Team_ID, TS.Season, G.Game_ID 
            from TeamStats TS JOIN Game G ON G.Visitor_Team_ID = TS.Team_ID
            where TS.Team_ID = ${Team_id}
            ),
            PlayerResults AS (
            SELECT GS.Player_ID, GResults.teamId, GResults.Season, GResults.gameId, GS.PTS
            FROM GameIDResults GResults JOIN GameStats GS ON GResults.gameId = GS.Game_ID
            AND GResults.teamId = GS.Team_ID
            ),
            TopPlayers AS (
            SELECT MAX(PTS) AS PtsScored, PR.Player_ID, Season, gameId
            FROM PlayerResults PR
            GROUP BY Season, gameId
            ORDER BY PTS DESC
            )
            SELECT MAX(PtsScored) AS MaxPts, TP.Player_ID, P.Player_Name, TP.gameId, Season FROM
            TopPlayers TP
            JOIN
            Players P
            ON P.Player_ID = TP.Player_ID
            GROUP BY Season
            ORDER BY MaxPts DESC
            LIMIT 5`,
        function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
}
 
 
async function player_team_season(req,res){
    const player_id = req.params.playerID
           
        connection.query( `
        With playerinfo (pid,pteam_id,num_seasons) as
(select p1.Player_ID,p1.Team_ID,count(p1.Season) as num_seasons
from PlayerStats p1
where p1.Player_ID= ${player_id}
group by p1.Team_ID
having num_seasons > 2),
gameinfo (gameid,teamid,points,season) as (
select g.Game_ID,g.Home_Team_ID as team,g.PTS_Home as points,Season
from Game g join playerinfo pi on (pi.pteam_id = g.Home_Team_ID)
where g.Home_Team_Wins = 1
UNION
select  g.Game_ID,g.Visitor_Team_ID as team,g.PTS_Away as points,Season
from Game g join playerinfo pi on (pi.pteam_id = g.Visitor_Team_ID)
where g.Home_Team_Wins <> 1),
player_gameinfo(Game_ID,Team_ID,pid,Min,FGM,F3GM,FTM,REB,AST,PF,PTs,perc,season) as (
select gs.Game_ID,gs.Team_ID,pi.pid,gs.Min,gs.FGM,gs.FG3M,gs.FTM,gs.REB,gs.AST,gs.PF,gs.PTS,round((gs.PTS/gi.points)*100,2) as percentage,gi.season
from GameStats gs join gameinfo gi on (gi.gameid = gs.Game_ID  and gi.teamid = gs.Team_ID)
                  join playerinfo pi on (pi.pid = gs.Player_ID)
order by percentage DESC)
select  DISTINCT pgi.Game_ID,pgi.Team_ID,t.Team_Name,pgi.pid,pgi.Min,pgi.FGM,pgi.F3GM,pgi.FTM,pgi.REB,pgi.AST,pgi.PF,pgi.PTs,pgi.perc,pgi.season
from player_gameinfo pgi join Teams t on pgi.Team_ID = t.Team_ID
order by perc DESC;


        `,
        function (error, results, fields) {
                if (error) {
                   console.log(error)
                   res.json({ error: error })
               } else if (results) {
                   res.json({ results: results })
               }
           });
}
 
 
async function all_games(req, res) {
    
    var HomeTeam = req.query.HomeTeam ? req.query.HomeTeam : ''
    HomeTeam = HomeTeam + '%'
    var AwayTeam = req.query.AwayTeam ? req.query.AwayTeam : ''
    AwayTeam = AwayTeam + '%'
 
    if (req.query.page && !isNaN(req.query.page)) {
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const page = req.query.page ? req.query.page : 1
        const offset = (page - 1) * pagesize
        connection.query(` 
        WITH TeamsGameHomeTeam AS (
            SELECT Game.Game_ID as Game_ID1, Game.Game_Date_EST as Game_Date,
            Teams.Team_ID as Home_Team_ID, Teams.Team_Name as Home_Team, Game.PTS_home as Home_Team_Points,
            Game.FG_PCT_home as Home_Team_Final_Goal_Percentage, Game.FT_PCT_home as
            Home_Team_Free_Throw_Percentage, AST_home as Home_Team_Assists, REB_home as Home_Team_Rebounds
            FROM Teams Join Game ON Teams.Team_ID = Game.Home_Team_ID),
        TeamsGameAwayTeam AS (
            Select Game.Game_ID as Game_ID2, 
            Teams.Team_ID as Away_Team_ID, Teams.Team_Name as Away_Team, Game.PTS_Away
            as Away_Team_Points, Game.FG_PCT_Away as Away_Team_Final_Goal_Percentage,
            Game.FT_PCT_Away as Away_Team_Free_Throw_Percentage, AST_Away as Away_Team_Assists,
            REB_Away as Away_Team_Rebounds
            FROM (Teams Join Game ON Teams.Team_ID = Game.Visitor_Team_ID)
        )
        SELECT TeamsGameHomeTeam.Game_ID1, TeamsGameHomeTeam.Game_Date, 
        TeamsGameHomeTeam.Home_Team_ID, TeamsGameHomeTeam.Home_Team, 
        TeamsGameAwayTeam.Away_Team_ID, TeamsGameAwayTeam.Away_Team,
        TeamsGameHomeTeam.Home_Team_Points, TeamsGameAwayTeam.Away_Team_Points
        FROM (TeamsGameHomeTeam JOIN TeamsGameAwayTeam ON Game_ID1 = Game_ID2)
        WHERE Home_Team LIKE '${HomeTeam}' AND Away_Team LIKE '${AwayTeam}'
        ORDER BY TeamsGameHomeTeam.Game_Date DESC
        LIMIT ${pagesize} OFFSET ${offset};
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ results: results })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(` 
        WITH TeamsGameHomeTeam AS (
            SELECT Game.Game_ID as Game_ID1, Game.Game_Date_EST as Game_Date,
            Teams.Team_ID as Home_Team_ID, Teams.Team_Name as Home_Team, Game.PTS_home as Home_Team_Points,
            Game.FG_PCT_home as Home_Team_Final_Goal_Percentage, Game.FT_PCT_home as
            Home_Team_Free_Throw_Percentage, AST_home as Home_Team_Assists, REB_home as Home_Team_Rebounds
            FROM Teams Join Game ON Teams.Team_ID = Game.Home_Team_ID),
        TeamsGameAwayTeam AS (
            Select Game.Game_ID as Game_ID2, 
            Teams.Team_ID as Away_Team_ID, Teams.Team_Name as Away_Team, Game.PTS_Away
            as Away_Team_Points, Game.FG_PCT_Away as Away_Team_Final_Goal_Percentage,
            Game.FT_PCT_Away as Away_Team_Free_Throw_Percentage, AST_Away as Away_Team_Assists,
            REB_Away as Away_Team_Rebounds
            FROM (Teams Join Game ON Teams.Team_ID = Game.Visitor_Team_ID)
        )
        SELECT TeamsGameHomeTeam.Game_ID1, TeamsGameHomeTeam.Game_Date, 
        TeamsGameHomeTeam.Home_Team_ID, TeamsGameHomeTeam.Home_Team, 
        TeamsGameAwayTeam.Away_Team_ID, TeamsGameAwayTeam.Away_Team,
        TeamsGameHomeTeam.Home_Team_Points, TeamsGameAwayTeam.Away_Team_Points
        FROM (TeamsGameHomeTeam JOIN TeamsGameAwayTeam ON Game_ID1 = Game_ID2)
        WHERE Home_Team LIKE '${HomeTeam}' AND Away_Team LIKE '${AwayTeam}'
        ORDER BY TeamsGameHomeTeam.Game_Date DESC;
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ results: results })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

}
 

async function game_info_front(req, res) {
    
    var gameID = req.params.GameID
    connection.query(` 
    WITH TeamsGameHomeTeam AS (
        SELECT Game.Game_ID as Game_ID1, Game.Game_Date_EST as Game_Date,
        Teams.Team_ID as Home_Team_ID, Teams.Team_Name as Home_Team, Game.PTS_home as Home_Team_Points,
        Game.FG_PCT_home as Home_Team_Final_Goal_Percentage, Game.FT_PCT_home as
        Home_Team_Free_Throw_Percentage, AST_home as Home_Team_Assists, REB_home as Home_Team_Rebounds
        FROM Teams Join Game ON Teams.Team_ID = Game.Home_Team_ID),
    TeamsGameAwayTeam AS (
        Select Game.Game_ID as Game_ID2, Teams.Team_ID as Away_Team_ID,
        Teams.Team_Name as Away_Team, Game.PTS_Away
        as Away_Team_Points, Game.FG_PCT_Away as Away_Team_Final_Goal_Percentage,
        Game.FT_PCT_Away as Away_Team_Free_Throw_Percentage, AST_Away as Away_Team_Assists,
        REB_Away as Away_Team_Rebounds
        FROM (Teams Join Game ON Teams.Team_ID = Game.Visitor_Team_ID)
    )
    SELECT TeamsGameHomeTeam.Game_ID1, TeamsGameHomeTeam.Game_Date, 
           TeamsGameHomeTeam.Home_Team_ID, TeamsGameHomeTeam.Home_Team, 
           TeamsGameAwayTeam.Away_Team_ID, TeamsGameAwayTeam.Away_Team,
           TeamsGameHomeTeam.Home_Team_Points, TeamsGameAwayTeam.Away_Team_Points
    FROM (TeamsGameHomeTeam JOIN TeamsGameAwayTeam ON Game_ID1 = Game_ID2)
    WHERE TeamsGameHomeTeam.Game_ID1 = ${gameID};
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ results: results })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 

async function game_stats(req, res) {
    
    var gameID = req.params.GameID
    connection.query(` 
    WITH TeamsGameHomeTeam AS (
        SELECT Game.Game_ID as Game_ID1, Game.Game_Date_EST as Game_Date,
        Teams.Team_ID as Home_Team_ID, Teams.Team_Name as Home_Team, Game.PTS_home as Home_Team_Points,
        ROUND(Game.FG_PCT_home*100,2) as Home_Team_Final_Goal_Percentage, ROUND(Game.FT_PCT_home*100,2) as
        Home_Team_Free_Throw_Percentage, AST_home as Home_Team_Assists, REB_home as Home_Team_Rebounds
        FROM Teams Join Game ON Teams.Team_ID = Game.Home_Team_ID),
    TeamsGameAwayTeam AS (
        Select Game.Game_ID as Game_ID2, Teams.Team_ID as Away_Team_ID,
        Teams.Team_Name as Away_Team, Game.PTS_Away
        as Away_Team_Points, ROUND(Game.FG_PCT_Away*100,2) as Away_Team_Final_Goal_Percentage,
        ROUND(Game.FT_PCT_Away*100,2) as Away_Team_Free_Throw_Percentage, AST_Away as Away_Team_Assists,
        REB_Away as Away_Team_Rebounds
        FROM (Teams Join Game ON Teams.Team_ID = Game.Visitor_Team_ID)
    )
    SELECT Game_Date,Home_Team_ID,Home_Team,Home_Team_Points,Home_Team_Final_Goal_Percentage,Home_Team_Free_Throw_Percentage,Home_Team_Assists,Home_Team_Rebounds,
    Away_Team_ID,Away_Team,Away_Team_Points,Away_Team_Final_Goal_Percentage,Away_Team_Free_Throw_Percentage,Away_Team_Assists,Away_Team_Rebounds
    FROM (TeamsGameHomeTeam JOIN TeamsGameAwayTeam on Game_ID1 = Game_ID2)
    WHERE TeamsGameHomeTeam.Game_ID1 = ${gameID};
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ results: results })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 
async function HomeTeamPlayers(req, res) {
    connection.query(` 
    SELECT Players.Player_Name, PTS as Points_Scored_by_the_Player, Min as Minutes_Played, FGM as Field_Goals_Made, FGA as Field_Goals_Attempted,
    FG_PCT as Field_Goal_Percentage, FG3M as Three_Pointers_Made, FG3A as Three_Pointers_Attempted, FG3_PCT as Three_Point_Percentage,
    FTM as Free_Throws_Made, FTA as Free_Throws_Attempted, FT_PCT as Free_Throw_Percentage, OREB as Offensive_Rebounds,
    DREB as Defensive_Rebounds, REB as Rebounds, AST as Assists, STL as Steals, BLK as Blocked_Shots, PF as Personal_Foul, PLUS_MINUS
    FROM Players JOIN GameStats ON Players.Player_ID = GameStats.Player_ID
    WHERE GameStats.Game_ID = ${req.params.GameID}  AND GameStats.Team_ID = ${req.params.Home_Team_ID};
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ results: results })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 
 
async function AwayTeamPlayers(req, res) {

    connection.query(` 
    SELECT Players.Player_Name, PTS as Points_Scored_by_the_Player, Min as Minutes_Played, FGM as Field_Goals_Made, FGA as Field_Goals_Attempted,
    FG_PCT as Field_Goal_Percentage, FG3M as Three_Pointers_Made, FG3A as Three_Pointers_Attempted, FG3_PCT as Three_Point_Percentage,
    FTM as Free_Throws_Made, FTA as Free_Throws_Attempted, FT_PCT as Free_Throw_Percentage, OREB as Offensive_Rebounds,
    DREB as Defensive_Rebounds, REB as Rebounds, AST as Assists, STL as Steals, BLK as Blocked_Shots, PF as Personal_Foul, PLUS_MINUS
    FROM Players JOIN GameStats ON Players.Player_ID = GameStats.Player_ID
    WHERE GameStats.Game_ID = ${req.params.GameID}  AND GameStats.Team_ID = ${req.params.Away_Team_ID};
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ results: results })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 
async function Avg_Performance(req, res) {
    
    console.log(req.params.GameID)
    connection.query(` 
    WITH TeamPlayerIDS AS (
        SELECT P2.Player_ID
        FROM (Players P2 JOIN GameStats GS2 ON P2.Player_ID = GS2.Player_ID)
        WHERE GS2.Game_ID = ${req.params.GameID}  AND GS2.Team_ID = ${req.params.Team_ID}
    )
    SELECT P.Player_Name,
    ROUND(AVG(GS.PTS),2) as AVG_Points_Scored_by_the_Player, ROUND(AVG(GS.Min),2) as AVG_Minutes_Played,
    ROUND(AVG(GS.FGM),2) as AVG_Field_Goals_Made, ROUND(AVG(GS.FGA),2) as AVG_Field_Goals_Attempted,
    ROUND(AVG(GS.FG_PCT),2) as AVG_Field_Goal_Percentage,ROUND(AVG(GS.FG3M),2) as AVG_Three_Pointers_Made,
    ROUND(AVG(GS.FG3A),2) as AVG_Three_Pointers_Attempted,ROUND(AVG(GS.FG3_PCT),2) as AVG_Three_Point_Percentage,
    ROUND(AVG(GS.FTM),2) as AVG_Free_Throws_Made,ROUND(AVG(GS.FTA),2) as AVG_Free_Throws_Attempted,
    ROUND(AVG(GS.FT_PCT),2) as AVG_Free_Throw_Percentage,ROUND(AVG(GS.OREB),2) as AVG_Offensive_Rebounds,
    ROUND(AVG(GS.DREB),2) as AVG_Defensive_Rebounds,ROUND(AVG(GS.REB),2) as AVG_Rebounds,
    ROUND(AVG(GS.AST),2) as AVG_Assists,ROUND(AVG(GS.STL),2) as AVG_Steals,
    ROUND(AVG(GS.BLK),2) as AVG_Blocked_Shots,ROUND(AVG(GS.PF),2) as AVG_Personal_Foul,
    ROUND(AVG(GS.PLUS_MINUS),2) as AVG_PLUS_MINUS
    FROM (GameStats GS JOIN Game G on GS.Game_ID = G.Game_ID)
    JOIN Players P on P.Player_ID = GS.Player_ID
    JOIN Teams T on T.Team_ID = GS.Team_ID
    JOIN TeamStats TS on T.Team_ID = TS.Team_ID
    WHERE G.Season IN (SELECT G2.Season FROM Game G2 WHERE G2.Game_ID = ${req.params.GameID})
    AND P.Player_ID IN (SELECT Player_ID FROM TeamPlayerIDS)
    GROUP BY P.Player_ID, P.Player_Name;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ results: results })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 
 
 
async function teamInfo(req, res) {
 
    const teamId = req.params.teamId
 
    connection.query(`SELECT Team_ID, Abbreviation, Year_Founded, Team_Name, Arena, Arena_Capacity, Owner,
    General_Manager, Head_Coach, DLeague_Affiliation
    From Teams
    WHERE Team_ID = '${teamId}'`, function (error, results, fields) {
 
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 
async function teamInfo_player(req, res) {
 
    const teamId = req.params.teamId
    const playerName = req.query.playerName ? req.query.playerName : ''
    const season = req.query.season ? req.query.season : ''
 
    if (req.query.page && !isNaN(req.query.page)) {
 
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const end = req.query.page * pagesize
        const start = end - pagesize
 
        if (season == '') {
            connection.query(`WITH PlayerInfo (PID) AS (
                SELECT DISTINCT Player_ID 
                From Teams Join PlayerStats On 
                Teams.Team_ID = PlayerStats.Team_ID 
                WHERE Teams.Team_ID = '${teamId}') 
                SELECT Player_ID, Player_Name 
                FROM Players p JOIN PlayerInfo pi On 
                p.Player_ID = pi.PID 
                WHERE p.Player_Name LIKE '${playerName}%' 
                ORDER BY p.Player_Name 
                LIMIT ${pagesize} OFFSET ${start}`, function (error, results, fields) {
 
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
        else {
            connection.query(`WITH PlayerInfo (PID) AS (
                SELECT DISTINCT Player_ID
                From Teams Join PlayerStats On Teams.Team_ID = PlayerStats.Team_ID
                WHERE PlayerStats.Season = '${season}' AND 
                Teams.Team_ID = '${teamId}')
                SELECT Player_ID, Player_Name
                FROM Players as p JOIN PlayerInfo as pi On p.Player_ID = pi.PID
                WHERE p.Player_Name LIKE '${playerName}%'
                ORDER BY p.Player_Name
                LIMIT ${pagesize} OFFSET ${start}`, function (error, results, fields) {
 
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
 
 
 
    }
    else {
 
        if (season == '') {
            connection.query(`WITH PlayerInfo (PID) AS (
                SELECT DISTINCT Player_ID 
                From Teams Join PlayerStats On 
                Teams.Team_ID = PlayerStats.Team_ID 
                WHERE Teams.Team_ID = '${teamId}') 
                SELECT Player_ID, Player_Name 
                FROM Players p JOIN PlayerInfo pi On 
                p.Player_ID = pi.PID 
                WHERE p.Player_Name LIKE '${playerName}%' 
                ORDER BY p.Player_Name`, function (error, results, fields) {
 
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
        else {
            connection.query(`WITH PlayerInfo (PID) AS (
                SELECT DISTINCT Player_ID
                From Teams Join PlayerStats On Teams.Team_ID = PlayerStats.Team_ID
                WHERE PlayerStats.Season = '${season}' AND 
                Teams.Team_ID = '${teamId}')
                SELECT Player_ID, Player_Name
                FROM Players as p JOIN PlayerInfo as pi On p.Player_ID = pi.PID
                WHERE p.Player_Name LIKE '${playerName}%'
                ORDER BY p.Player_Name`, function (error, results, fields) {
 
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    }
 
}
 
async function all_teams(req, res) {
 
    if (req.query.page && !isNaN(req.query.page)) {
 
        const name = req.query.name
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        var offsetValue = pagesize * (page - 1)
 
        connection.query(`SELECT Team_ID, Abbreviation, Team_Name from Teams WHERE Team_Name LIKE '${name}%' ORDER BY Team_Name ASC LIMIT ${pagesize} OFFSET ${offsetValue};`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
 
        });
 
 
    } else {
 
        const name = req.query.name
        connection.query(`SELECT Team_ID, Abbreviation, Team_Name from Teams WHERE Team_Name LIKE '${name}%' ORDER BY Team_Name ASC;`, function (error, results, fields) {
 
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}
 
async function teamInfo_player_seasons(req, res){
 
    const teamId = req.params.teamId
 
    connection.query(`
        SELECT DISTINCT Season
        From Teams Join PlayerStats On Teams.Team_ID = PlayerStats.Team_ID 
        WHERE Teams.Team_ID = ${teamId}
        ORDER by Season `, function (error, results, fields) {
 
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 
 
async function playerSeasonTeamPerformance(req, res){
 
    const playerID = req.params.playerID
 
    connection.query(`   
    With playerinfo (pid,pteam_id,num_seasons) as
    (select p1.Player_ID,p1.Team_ID,count(p1.Season) as num_seasons
    from PlayerStats p1
    where p1.Player_ID= ${playerID}
    group by p1.Team_ID
    having num_seasons > 2),
    gameinfo (gameid,teamid,points,season) as (
    select g.Game_ID,g.Home_Team_ID as team,g.PTS_Home as points,Season
    from Game g join playerinfo pi on (g.Home_Team_ID = pi.pteam_id)
    where g.Home_Team_Wins = 1
    UNION
    select  g.Game_ID,g.Visitor_Team_ID as team,g.PTS_Away as points,Season
    from Game g join playerinfo pi on (g.Visitor_Team_ID = pi.pteam_id)
    where g.Home_Team_Wins <> 1),
    player_gameinfo(Game_ID,Team_ID,pid,season,Min,FGM,F3GM,FTM,REB,AST,PF,PTs,perc) as (
    select gs.Game_ID,gs.Team_ID,pi.pid,gi.season,gs.Min,gs.FGM,gs.FG3M,gs.FTM,gs.REB,gs.AST,gs.PF,gs.PTS,round((gs.PTS/gi.points)*100,2) as percentage
    from GameStats gs join gameinfo gi on (gs.Game_ID = gi.gameid and gs.Team_ID = gi.teamid)
                      join playerinfo pi on (gs.Player_ID = pi.pid)
    order by percentage DESC)
    select pgi.Game_ID,pgi.Team_ID,t.Team_Name,pgi.pid,pgi.season,pgi.Min,pgi.FGM,pgi.F3GM,pgi.FTM,pgi.REB,pgi.AST,pgi.PF,pgi.PTs,pgi.perc
    from player_gameinfo pgi join Teams t on pgi.Team_ID = t.Team_ID 
    order by perc DESC;`, function (error, results, fields) {
 
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
 
 
module.exports = {
    injuries,
    playerPerformance,
    allPlayers,
    latestPlayerInfo,
    allSeasons,
    team_performance,
    team_performance_season,
    performance_team,
    team_stats,
    team_stats_season,
    all_games,
    game_info_front,
    game_stats,
    Avg_Performance,
    HomeTeamPlayers,
    AwayTeamPlayers,
    teamInfo,
    teamInfo_player,
    playerName,
    all_teams,
    playerVsTeamPerformance,
    avgPlayerVsTeamPerformance,
    teamInfo_player_seasons,
    team_bestplayer_season,
    playerSeasonTeamPerformance
}