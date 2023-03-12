<template>
  <div>
    <div class="box" id="heading">
      <h1 v-if="loadedTeam">{{ team[0].city }} {{ team[0].name }}</h1>
      <h2 v-if="loadedTeam">({{ team[0].record }})</h2>
    </div>

    <div class="box">
      <div class="container">
        <div class="dropdown" v-if="loadedTeams">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Select Team
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" v-for="team in teams" :key="team.id" :href="team.id">{{ team.name }}</a></li>
          </ul>
        </div>
        <br>
        <button type="button"  @click="setDefault" class="btn btn-link">Set as Default</button>
      </div>
    </div>
    <div v-if="loadedNextGame">

      <div class="box">
        <div style="text-align: center">
          <h2>Tip Off:</h2>
          <h3>{{ format_date(nextGame[0]?.GameTime) }} </h3>
        </div>

        <div class="container">
          <div v-if="nextGame[0].HomeCity !== team[0].city" class="logo-container">
            <img class="logo" :src="nextGame[0].HomeLogo" alt="Team 1 logo">
            <div class="team-name">{{ nextGame[0].HomeCity }} {{ nextGame[0].HomeState }} </div>
            <div class="team-record">({{ nextGame[0].HomeTeamRecord }})</div>
          </div>

          <div v-else class="logo-container">
            <img class="logo" :src="nextGame[0].AwayLogo" alt="Team 2 logo">
            <div class="team-name">{{ nextGame[0].AwayCity }} {{ nextGame[0].AwayState }}</div>
            <div class="team-record">({{ nextGame[0].AwayTeamRecord }})</div>
          </div>
        </div>

      </div>


      <div v-for="game in games" :key="game.id">
        <div class="box2" v-if="game?.GameTime > nextGame[0]?.GameTime">
          <h3 v-if="game.HomeCity === team[0].city" class="team-name">HOME</h3>
          <h3 v-else class="team-name">AWAY</h3>

          <div class="container">
            <div v-if="game.HomeCity !== team[0].city" class="logo-container">
              <img class="logo2" :src="game.HomeLogo" alt="Team 1 logo">
              {{ game.HomeCity }} {{ game.HomeState }}
              <div class="team-record">({{ game.HomeTeamRecord }})</div>
            </div>
            <div v-else class="logo-container">
              <img class="logo2" :src="game.AwayLogo" alt="Team 2 logo">
              {{ game.AwayCity }} {{ game.AwayState }}
              <div class="team-record">({{ game.AwayTeamRecord }})</div>

            </div>
          </div>

          <div style="text-align:center">
            <p>{{ format_date(game?.GameTime) }}</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import http from "../http-common.js";
import moment from "moment-timezone";

export default {
  name: "ListSchedule",
  props: ["id"],
  data() {
    return {
      games: [],
      nextGame: [],
      teams: [],
      team: [],
      defaultTeam: 1610612743
    };
  },

  async created() {
    this.loadData();
  },

  computed: {
    loadedGames() {
      return this.games.length;
    },
    loadedNextGame() {
      return this.nextGame.length;
    },
    loadedTeams() {
      return this.teams.length;
    },
    loadedTeam() {
      return this.team.length;
    }
  }
  ,

  methods: {
    async loadData() {
      const cachedDefaultTeam = localStorage.getItem('defaultTeam');
      const defaultTeam = cachedDefaultTeam !== undefined ? cachedDefaultTeam : this.defaultTeam
      this.defaultTeam = defaultTeam;

      const allGames = await this.getGamesByTeamId(this.id);
      const nextGame = await this.getNextGameByTeamId(this.id);
      const team = await this.getTeam(this.id);
      const allTeams = await this.getTeams();

      this.team = team;
      this.teams = allTeams;
      this.games = allGames;
      this.nextGame = nextGame;

    },
    setDefault(){
      localStorage.removeItem('defaultTeam')
      localStorage.setItem('defaultTeam',this.team[0].id)
    },
    // Get All Games
    async getGames() {
      try {
        const response = await http.get(`/api/fullGameData`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    //Get All Games for Team
    async getGamesByTeamId(id) {
      try {
        let teamId = id !== undefined ? id : this.defaultTeam
        const response = await http.get(`/api/getTeamSchedule/${teamId}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Get Next Game >= Today 
    async getNextGame() {
      try {
        const response = await http.get(`/api/nextGame`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Get Next Game >= Today by Team
    async getNextGameByTeamId(id) {
      try {
        let teamId = id !== undefined ? id : this.defaultTeam
        const response = await http.get(`/api/getNextGame/${teamId}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getTeamRecord(id) {
      try {
        const response = await http.get(`/api/getTeamRecord/${id}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getTeams() {
      try {
        const response = await http.get(`/api/getTeams/`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getTeam(id) {
      try {
        let teamId = id !== undefined ? id : this.defaultTeam
        const response = await http.get(`/api/getTeam/${teamId}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Convert from UTC to CST
    format_date(value) {
      if (value) {
        return moment(String(value)).tz('America/Chicago').format(`dddd, MMMM Do YYYY, h:mm a`);
      }
    },
  },
};
</script>
  
<style>
html {
  background-color: #e4e9fd;
  background-image: -webkit-linear-gradient(90deg, #641711 50%, #eee646 50%);
  min-height: 1000px;
  font-family: "Lucida Console";
}

body {
  background-color: #1a2f82;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #F5F5F5;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px 20px 50px;
}

.logo-container img {
  max-width: 80px;
  max-height: 80px;
}

.logo {
  width: 120px;
  height: 120px;
  margin: 10px auto;
}

.logo2 {
  width: 60px;
  height: 60px;
  margin: 10px auto;
}

.team-name {
  text-align: center;

}

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-child {
  flex: 2;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.flex-child:last-child {
  margin-right: 0;
}

.box {
  background-color: #FFF;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
}

.box2 {
  background-color: #FFF;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 10px auto;
  max-width: 800px;
}

.box h1 {
  font-size: 36px;
  margin: 0;
}

.box h2 {
  font-size: 24px;
  margin: 10px 0 0;
  color: #333;
}

#heading {
  background-color: #4287f5;
  text-align: center;
  margin: 0;
}

.item {
  min-height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  padding: 5px;
}

.item:last-child {
  border-bottom: 0;
}

.team-record {
  margin: 0;
  padding: 5px;
  font-size: 14px;
  font-weight: 200;
  color: #00204a;
}

p {
  margin: 0;
  padding: 20px;
  font-size: 20px;
  font-weight: 200;
  color: #00204a;
}

footer {
  color: white;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
</style>
