import { getGames, getNextGame, getFullGameData, updateTeamRecords, getTeamRecord, getGamesByTeamId } from "../models/scheduleModel.js";

export const showGames = (req,res) => {
    getGames((err, results) => {
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
        } else{
            res.send(results[0].record);
        }
    });
}

