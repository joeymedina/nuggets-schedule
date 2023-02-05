import express from "express";
import { showGames, showNextGame, showFullGameData } from "../controllers/schedule.js";

const router = express.Router();

router.get('/games', showGames);

router.get('/nextGame', showNextGame);

router.get('/fullGameData', showFullGameData);


export default router;
//game by date?
