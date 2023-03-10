import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import Router from "./routes/routes.js";
import { HOST, PORT } from './config/config.js'
import { scheduleUpdateJob } from './jobs/updateJob.js';
import NodeCache from "node-cache"
//file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = __dirname + '/public/'
const app = express();
export const appCache = new NodeCache();

app.use(express.json());
app.use(express.static(path));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(Router);

app.get('*', function (req,res) {
    res.sendFile(path + "index.html");
  });
  scheduleUpdateJob();
app.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));
