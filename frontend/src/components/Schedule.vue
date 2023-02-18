<template>
  <div>
    <div class="box" id="heading">
      <h1>Denver Nuggets 2022-2023</h1>
    </div>

    <div v-if="loadedNextGame">

      <div class="box">
        <div style="text-align: center">
          <h2>Tip Off:</h2>
          <h3>{{ format_date(nextGame[0]?.GameTime) }} </h3>
        </div>

        <div class="container">
          <div v-if="nextGame[0].HomeCity !== 'Denver'" class="logo-container">
            <img class="logo" :src="nextGame[0].HomeLogo" alt="Team 1 logo">
            <div class="team-name">{{ nextGame[0].HomeCity }} {{ nextGame[0].HomeState }} </div>
          </div>

          <div v-else class="logo-container">
            <img class="logo" :src="nextGame[0].AwayLogo" alt="Team 2 logo">
            <div class="team-name">{{ nextGame[0].AwayCity }} {{ nextGame[0].AwayState }}</div>
          </div>
        </div>

      </div>


      <div v-for="game in games" :key="game.id">
        <div class="box2" v-if="game?.GameTime > nextGame[0]?.GameTime">
          <h3 v-if="game.HomeCity === 'Denver'" class="team-name">HOME</h3>
          <h3 v-else class="team-name">AWAY</h3>

          <div class="container">
            <div v-if="game.HomeCity !== 'Denver'" class="logo-container">
              <img class="logo2" :src="game.HomeLogo" alt="Team 1 logo">
              {{ game.HomeCity }} {{ game.HomeState }}
            </div>
            <div v-else class="logo-container">
              <img class="logo2" :src="game.AwayLogo" alt="Team 2 logo">
              {{ game.AwayCity }} {{ game.AwayState }}
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
import axios from "axios";
import moment from "moment-timezone";
// import { NODE_ENV } from '../../../backend/config/config.js';

export default {
  name: "ListSchedule",
  data() {
    return {
      games: [],
      nextGame: []
    };
  },

  created() {
    const allGamesCached = localStorage.getItem('allGamesCached');
    const nextGameCached = localStorage.getItem('nextGameCached');
    const cachedDataExpires = localStorage.getItem('cachedDataExpires');

    if (allGamesCached && nextGameCached && cachedDataExpires) {
      const now = new Date();
      const expires = new Date(cachedDataExpires);
      
      if (now < expires) {
        this.games = JSON.parse(allGamesCached);
        this.nextGame = JSON.parse(nextGameCached);
      } else {
        this.loadData();
      }
    } else {
      this.loadData();
    }
  },

  computed: {
    loadedGames() {
      return this.games.length;
    },
    loadedNextGame() {
      return this.nextGame.length;
    }
  }
  ,

  methods: {
    async loadData() {
      const allGames = await this.getGames();
      const nextGame = await this.getNextGame();

      this.games = allGames;
      this.nextGame = nextGame;

      localStorage.setItem('allGamesCached', JSON.stringify(allGames));
      localStorage.setItem('nextGameCached', JSON.stringify(nextGame));

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      localStorage.setItem('cachedDataExpires', tomorrow);
    },

    // Get All Games
    async getGames() {
      try {
        const response = await axios.get(`http://localhost:3000/fullGameData`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Get Next Game >= Today 
    async getNextGame() {
      try {
        const response = await axios.get(`http://localhost:3000/nextGame`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    }
    ,
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

h1 {
  color: #fff;
  padding: 10px;
}

h2 {
  padding: 10px;
}

body {
  background-color: #1a2f82;
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

.logo {
  width: 150px;
  height: 150px;
}

.logo2 {
  width: 75px;
  height: 75px;
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

}

.flex-child:first-child {
  margin-right: 20px;
}


.box {
  max-width: 800px;
  margin: 25px auto;
  background: white;
  border-radius: 5px;
  box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);
}

.box2 {
  max-width: 600px;
  margin: 25px auto;
  background: white;
  border-radius: 5px;
  box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);
  padding: 10px 0 0 10px
}


#heading {
  background-color: #4287f5;
  text-align: center;
}

.item {
  min-height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.item:last-child {
  border-bottom: 0;
}

input:checked+p {
  text-decoration: line-through;
  text-decoration-color: #4287f5;
}

input[type="checkbox"] {
  margin: 20px;
}

p {
  margin: 0;
  padding: 0 20px 20px 20px;
  font-size: 20px;
  font-weight: 200;
  color: #00204a;
}

form {
  text-align: center;
  margin-left: 20px;
}

button {
  border-color: transparent;
  background-color: #4287f5;
  color: #fff;
  font-size: 14px;
  border-width: 0;
}

input[type="text"] {
  text-align: center;
  height: 60px;
  top: 10px;
  border: none;
  background: transparent;
  font-size: 20px;
  font-weight: 200;
  width: 313px;
}

input[type="text"]:focus {
  outline: none;
  box-shadow: inset 0 -3px 0 0 #4287f5;
}

::placeholder {
  color: grey;
  opacity: 1;
}

footer {
  color: white;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
</style>