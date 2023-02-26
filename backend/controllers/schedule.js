import { getGames, getNextGame, getFullGameData, updateTeamRecords, getTeamRecord } from "../models/scheduleModel.js";
import * as schedule from 'node-schedule';

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
    });
}

export const showUpdateTeamRecords = (req,res) => {
    updateTeamRecords((err,results) => {
        if(err) {
            res.send(err);
        } else{
            req.app.locals.lastUpdate = new Date();
            res.send(results);
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
export const checkDailyLimit = (req, res, next)  => {
    const now = new Date();
  
    // Set the rule to trigger every day at 00:00:00
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    rule.second = 0;
    
    // Check if the endpoint has already been called today
    if (req.app.locals.lastUpdate && req.app.locals.lastUpdate.toDateString() === now.toDateString()) {
      // Return an error response indicating that the endpoint cannot be called again until the next day
      return res.status(429).json({ message: 'Records are up-to-date.' });
    }
    // Schedule a job to reset the daily limit at 00:00:00 the next day
    const job = schedule.scheduleJob(rule, function() {
      req.app.locals.lastUpdate = null;
    });
    
    // Call the next middleware function in the chain
    next();
}