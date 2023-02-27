import { showUpdateTeamRecords } from "../controllers/schedule.js";
import * as schedule from 'node-schedule';


export function scheduleUpdateJob() {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;
  rule.second = 0;
    console.log("Job Scheduled")
  schedule.scheduleJob(rule, showUpdateTeamRecords);
}
