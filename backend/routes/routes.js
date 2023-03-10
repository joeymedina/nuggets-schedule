import express from "express";
import { showGames, showNextGame, showFullGameData, showTeamRecord, showGamesByTeamId } from "../controllers/schedule.js";

const router = express.Router();

router.get('/api/games', showGames);

router.get('/api/nextGame', showNextGame);

router.get('/api/fullGameData', showFullGameData);

router.get('/api/getTeamRecord/:id', showTeamRecord);

router.get('/api/getTeamSchedule/:id', showGamesByTeamId);

export default router;
//game by date?
