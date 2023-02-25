import db from "../config/database.js";

const today = new Date();

export const getGames = (result) => {
    db.query("SELECT * FROM Schedule", (err, results) => 
    {
        if(err) {
            console.log(err);
            result(err,null);
        } else {
            result(null, results)
        }
    });
}

export const getNextGame = (result) => {
    db.query(`select Schedule.id, Schedule.time as GameTime, T1.City AS HomeCity, T1.Name as HomeState, T1.logo as HomeLogo, T2.City as AwayCity, T2.Name as AwayState, T2.logo as AwayLogo
              from Schedule
              join Teams AS T1 on Schedule.homeTeam = T1.id
              join Teams AS T2 on Schedule.awayTeam = T2.id
              WHERE DATE(Schedule.time) >= DATE('${today.toISOString()}') LIMIT 1`, (err, results) => 
    {
        if(err) {
            console.log(err);
            result(err,null);
        } else {
            result(null, results)
        }
    });
}

export const getFullGameData = (result) => {
    db.query(`select Schedule.id, Schedule.time as GameTime, T1.City AS HomeCity, T1.Name as HomeState, T1.logo as HomeLogo, T2.City as AwayCity, T2.Name as AwayState, T2.logo as AwayLogo
              from Schedule
              join Teams AS T1 on Schedule.homeTeam = T1.id
              join Teams AS T2 on Schedule.awayTeam = T2.id
              order by Schedule.time`, (err, results) => 
              {
                if(err) {
                    console.log(err);
                    result(err,null);
                } else {
                    result(null, results);
                }
            });
}

// select schedule.id, CONVERT(schedule.time, DATETIME) as GameTime, T1.City AS HomeCity, T1.Name as HomeState, T1.logo as HomeLogo, T2.City as AwayCity, T2.Name as AwayState, T2.logo as AwayLogo
// from Schedule
// join Teams AS T1 on Schedule.homeTeam = T1.id
// join Teams AS T2 on Schedule.awayTeam = T2.id
// order by time
