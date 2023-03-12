import { getGames, getNextGame, getFullGameData, updateTeamRecords, getTeamRecord, getGamesByTeamId, getTeams, getTeamById, getNextGameByTeamId } from "../models/scheduleModel.js";

export const showGames = (req,res) => {
    getGames((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
}
export const showTeams = (req,res) => {
    getTeams((err,results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
}
export const showGamesByTeamId = (req,res) => {
    getGamesByTeamId(req, (err,results) => {
        if(err) {
            res.send(err);
        } else{
            res.send(results);
        }
    });
}
export const showNextGame = (req,res) => {
    getNextGame((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
}
export const showNextGameByTeamId = (req,res) => {
    getNextGameByTeamId(req,(err,results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
}
export const showFullGameData = (req,res) => {
    getFullGameData((err,results) => {
        if(err) {
            res.send(err);
        } else{
            res.send(results);
        }
    });
}

export const showUpdateTeamRecords = (req,res) => {
    updateTeamRecords((err,results) => {
        if(err) {
            console.log(err); 
        } else{
            
            console.log(results);
        }
    });
}

export const showTeamRecord = (req,res) => {
    getTeamRecord(req, (err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.send(results[0].record);
        }
    });
}


export const showTeamById = (req,res) => {
    getTeamById(req, (err,results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
}
