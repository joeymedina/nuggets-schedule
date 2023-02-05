import express from "express";

import cors from "cors";

import bodyParser from 'body-parser';

import Router from "./routes/routes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(Router);

app.listen(3000, () => console.log('Server running at https://localhost:3000'));