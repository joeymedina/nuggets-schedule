import db from "../config/database.js";
import axios from 'axios';
const today = new Date();

export const getGames = (result) => {
  db.query("SELECT * FROM Schedule", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getGamesByTeamId = (req,result) => {
    db.query(`SELECT * FROM FullSchedule where homeTeam = ${req.params.id} or awayTeam = ${req.params.id}`, (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
};

export const getNextGame = (result) => {
  db.query(
    `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo,T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
              FROM Schedule
              JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
              JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
              WHERE CONVERT_TZ(Schedule.time, 'UTC', 'America/Chicago') >= CURDATE() LIMIT 1`,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getFullGameData = (result) => {
  db.query(
    `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo, T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
              FROM Schedule
              JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
              JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
              ORDER BY Schedule.time`,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getTeamRecord = (req,result) => {
    db.query(
    `SELECT id, record 
     FROM Teams
     WHERE id = ${req.params.id}`,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const updateTeamRecords = async (result) => {
    const recordData = await fetchRecords();
    let updateSql = '';

    recordData.forEach((team) => updateSql += `UPDATE Teams SET record = '${team[16]}' WHERE id = ${team[2]};`);
    db.query(updateSql, (err,results) => {
        if (err) {
            console.log(err);
            result(err,null);
        } else {
            result(null,results);
        }
    });
};

async function fetchRecords() {
  const baseUrl =
    "https://stats.nba.com/stats/leaguestandings?LeagueID=00&Season=2022-23&SeasonType=Regular+Season&SeasonYear=";
    
  const res = await axios.get(baseUrl, {
    headers: {
      Host: "stats.nba.com",
      Connection: "keep-alive",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://www.nba.com/",
    },
  });
  return res.data.resultSets[0].rowSet;
}
