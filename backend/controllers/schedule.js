import { getGames, getNextGame, getFullGameData } from "../models/scheduleModel.js";

export const showGames = (req,res) => {
    getGames((err, results) => {
        if (err) {
            res.send(err);
        } else {
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
    })
}