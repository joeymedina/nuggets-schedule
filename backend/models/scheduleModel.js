import db from "../config/database.js";
import axios from "axios";
import { appCache } from "../index.js";

export const getGames = (result) => {
  const query = "SELECT * FROM Schedule";
  const key = "games";
  useCache(null, result, query, key);
};

export const getNextGame = (result) => {
  const query = `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo,T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
                  FROM Schedule
                  JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
                  JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
                  WHERE Schedule.time >= CURDATE() LIMIT 1`;
  //   WHERE CONVERT_TZ(Schedule.time, 'UTC', 'America/Chicago') >= CURDATE() LIMIT 1`,
  const key = "nextGame";
  useCache(null, result, query, key);
};

export const getNextGameByTeamId = (req, result) => {
  const query = `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo,T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
                   FROM FullSchedule as Schedule
                   JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
                   JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
                   WHERE ((Schedule.homeTeam = '${req.params.id}' OR Schedule.awayTeam = '${req.params.id}') AND Schedule.time > CURDATE())
                   ORDER BY Schedule.time ASC
                   LIMIT 1`;
    console.log(query);
  const key = `${req.params.id}-nextGame`;
  useCache(req, result, query, key);
};

export const getGamesByTeamId = (req, result) => {
  const query = `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo, T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
                   FROM FullSchedule as Schedule
                   JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
                   JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
                   WHERE Schedule.homeTeam = ${req.params.id} or Schedule.awayTeam = ${req.params.id}
                   ORDER BY Schedule.time`;
  const key = `${req.params.id}`;
  useCache(req, result, query, key);
};

export const getFullGameData = (result) => {
  const query = `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo, T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
                   FROM Schedule
                   JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
                   JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
                   ORDER BY Schedule.time`;
  const key = "fullGame";
  useCache(null, result, query, key);
};

export const getTeams = (result) => {
  const query = `SELECT id, name, city from Teams`;
  const key = "teams";
  useCache(null, result, query, key);
};

export const getTeamById = (req, result) => {
  const query = `SELECT id, name, city, record, logo from Teams WHERE id = ${req.params.id}`;
  const key = `team-${req.params.id}`;
  useCache(null, result, query, key);
};

export const getTeamRecord = (req, result) => {
  const query = `SELECT id, record FROM Teams WHERE id = ${req.params.id}`;
  const key = `${req.params.id}-record`;
  useCache(req, result, query, key);
};

function deleteNextGameCacheKeys() {
  db.query(`SELECT id from Teams`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      results.forEach((teamId) => {
        console.log(`${teamId.id}-nextGame deleted`);
        appCache.del(`${teamId.id}-nextGame`);
      });
    }
  });
}

export const updateTeamRecords = async (result) => {
  // remove nextGame cache
  deleteNextGameCacheKeys();
  const recordData = await fetchRecords();
  let updateSql = "";

  recordData.forEach(
    (team) =>
      (updateSql += `UPDATE Teams SET record = '${team[16]}' WHERE id = ${team[2]};`)
  );
  db.query(updateSql, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

function useCache(req, result, query, key) {
  if (appCache.has(key)) {
    console.log(`${key} from Cache`);
    result(null, appCache.get(key));
  } else {
    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        appCache.set(key, results);
        console.log(`${key} from DB`);
        result(null, results);
      }
    });
  }
}

async function fetchRecords() {
  const baseUrl =
    "https://stats.nba.com/stats/leaguestandings?LeagueID=00&Season=2022-23&SeasonType=Regular+Season&SeasonYear=";

  const res = await axios.get(baseUrl, {
    headers: {
      Host: "stats.nba.com",
      Connection: "keep-alive",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://www.nba.com/",
    },
  });
  return res.data.resultSets[0].rowSet;
}

//==================

// export const getTeams = (result) => {
//   db.query(`SELECT id, name, city from Teams`, (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results);
//     }
//   });
// };

// export const getTeamRecord = (req, result) => {
//   db.query(
//     `SELECT id, record
//      FROM Teams
//      WHERE id = ${req.params.id}`,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// export const getFullGameData = (result) => {
//   db.query(
//     `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo, T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
//               FROM Schedule
//               JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
//               JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
//               ORDER BY Schedule.time`,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// export const getGames = (result) => {
//     if(appCache.has('games')) {
//         console.log("CACHE GET");
//         result(null,appCache.get('games'));
//     } else {
//         db.query("SELECT * FROM Schedule", (err, results) => {
//           if (err) {
//             console.log(err);
//             result(err, null);
//           } else {
//             appCache.set('games',results);
//             console.log("DB GET");
//             result(null, results);

//           }
//         });
//     }
// };

// export const getNextGame = (result) => {
//   db.query(
//     `SELECT Schedule.id, Schedule.time AS GameTime, T1.City AS HomeCity, T1.Name AS HomeState, T1.logo AS HomeLogo,T1.record as HomeTeamRecord, T2.City AS AwayCity, T2.Name AS AwayState, T2.logo AS AwayLogo, T2.record as AwayTeamRecord
//               FROM Schedule
//               JOIN Teams AS T1 ON Schedule.homeTeam = T1.id
//               JOIN Teams AS T2 ON Schedule.awayTeam = T2.id
//               WHERE Schedule.time >= CURDATE() LIMIT 1`,
//     //   WHERE CONVERT_TZ(Schedule.time, 'UTC', 'America/Chicago') >= CURDATE() LIMIT 1`,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// export const getGamesByTeamId = (req, result) => {
//   db.query(
//     `SELECT * FROM FullSchedule where homeTeam = ${req.params.id} or awayTeam = ${req.params.id}`,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };
