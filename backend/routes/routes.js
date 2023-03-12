import express from "express";
import { showGames, showNextGame, showFullGameData, showTeamRecord, showGamesByTeamId, showTeams, showTeamById, showNextGameByTeamId } from "../controllers/schedule.js";

const router = express.Router();

router.get('/api/getTeamSchedule/:id', showGamesByTeamId);

router.get(`/api/getNextGame/:id`, showNextGameByTeamId);

router.get('/api/getTeamRecord/:id', showTeamRecord);

router.get('/api/getTeam/:id', showTeamById);

router.get('/api/getTeams', showTeams);


//deprecated
router.get('/api/games', showGames);
router.get('/api/nextGame', showNextGame);
router.get('/api/fullGameData', showFullGameData);

export default router;
//game by date?
