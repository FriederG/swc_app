<template>
  <div>
    {{ dbTeams[3].games["-MB3eVKYS_S9vz6G3IZj"].selfScore }}

    <!--
    {{ games }}

    <br /><br />

    {{ selectGamesByTeamID }}
    <br /><br />

    {{ selectScore1 }}-->
    <!--Test zur Kalkulation --------------------------------------------------------------------->
    <!--
    <div v-for="team in teams" v-bind:key="team.id">
      {{ team }}
      <h2>{{ team.title }}</h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Month</th>
            <th>Number of orders</th>
            <th>Total revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in team.games" v-bind:key="game.id">
            <td>{{ game.id }} {{ game.year }}</td>
            <td>{{ game.selfScore }}</td>
            <td>{{ game.otherScore }}</td>
          </tr>
        </tbody>
        <tfoot v-if="teams">
          <tr>
            <td>Total {{ team.year }}</td>

            <td>{{ totalOrders(team.games) }}</td>
            <td>£{{ totalRevenue(team.games) }}</td>
            {{
              team.games
            }}
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    {{ teams }}<br /><br />
     {{ teamsTitle }}

      {{ teamsLoop }}


    {{ teams }}
    {{ dbTeamGames }}
    {{ dbTeams }}
    {{ dbTeams }}-->

    <br /><br />
    <!--
    <div v-for="team in dbTeams" v-bind:key="team.id">
      {{ team.title }}<br /><br />
      Eigene Punkte:
      <div v-for="game in team.games" v-bind:key="game.id">
        <v-card-text small v-model="point">{{ game.selfScore }}</v-card-text>
      </div>
      Gegner Punkte:
      <div v-for="game in team.games" v-bind:key="game.id">
        <v-card-text small v-model="point">{{ game.otherScore }}</v-card-text>
      </div>
    </div>
    {{ test_data }}
    -->
    <!-- Ende Test -------->

    <h1>Punkte</h1>
    <br />

    <h2>Gruppenphase</h2>
    <!--Duch die Gruppen loopen -->
    <v-container fluid v-for="group in groups" :key="group.id">
      <v-row align="center">
        <v-col>
          <v-card width="400px">
            <v-card-title>Gruppe: {{ group.groupName }} </v-card-title>
            <v-card-text>{{ group.groupTeam1 }} </v-card-text>
            <v-card-text>{{ group.groupTeam1 }} </v-card-text>
            <!-- Durch Games loopen, in denen das Team beteiligt ist -->
            <v-container
              v-for="game in selectGamesByTeam"
              :id="game.id"
              v-bind:key="game.id"
              v-model="selectedTeam"
            >
              <div v-if="(game.team1 === group.Team1)">{{ group.team1 }}</div>
            </v-container>

            <v-card-text>{{ group.groupTeam2 }}</v-card-text>
            <v-card-text v-if="group.groupTeam3">{{
              group.groupTeam3
            }}</v-card-text>
            <v-card-text v-if="group.groupTeam4">{{
              group.groupTeam4
            }}</v-card-text>
            <v-card-text v-if="group.groupTeam5">{{
              group.groupTeam5
            }}</v-card-text>
            <v-card-text v-if="group.groupTeam6">{{
              group.groupTeam6
            }}</v-card-text>
            <v-card-text v-if="group.groupTeam7">{{
              group.groupTeam7
            }}</v-card-text>
            <v-card-text v-if="group.groupTeam8">{{
              group.groupTeam8
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-for="game in selectGamesByTeam" :key="game.id"
      >{{ game }}{{ game.team1 }} punkte: {{ game.scoreTeam1 }}</v-container
    >

    <v-container fluid>
      <h2>Viertelfinale</h2>
      <v-row align="center">
        <v-col>
          <v-card width="400px" color="green">
            <v-card-title>Viertelfinale 1</v-card-title>
            <v-card-text>Team 1 - Team 2</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="400px" color="green">
            <v-card-title>Viertelfinale 1</v-card-title>
            <v-card-text>Team 1 - Team 2</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="400px" color="green">
            <v-card-title>Viertelfinale 1</v-card-title>
            <v-card-text>Team 1 - Team 2</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="400px" color="green">
            <v-card-title>Viertelfinale 1</v-card-title>
            <v-card-text>Team 1 - Team 2</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <h2>Halbfinale</h2>
      <v-row align="center" justify="center">
        <v-col>
          <v-card width="400px" color="blue">
            <v-card-title>Halbfinale 1</v-card-title>
            <v-card-text>Team 1 - Team 2</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="400px" color="blue">
            <v-card-title>Halbfinale 2</v-card-title>
            <v-card-text>Team 1 - Team 2</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <h2>Finale</h2>
      <v-row align="center" justify="center">
        <v-col>
          <v-card width="400px" color="red">
            <v-card-title>Finale</v-card-title>
            <v-card-text>Team 1 - Team 2</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [
        {
          title: "adler",
          games: [
            { id: "Jan", selfScore: "3", otherScore: "50.00" },
            { id: "Feb", selfScore: "5", otherScore: "50.00" },
          ],
        },
        {
          title: "zeit",
          games: [
            { id: "Jan", selfScore: "23", otherScore: "50.00" },
            { id: "Feb", selfScore: "53", otherScore: "50.00" },
          ],
        },
      ],
      title: "",
      gender: "",
      time: new Date(),

      point: 1,
    };
  },
  computed: {
    games() {
      return this.$store.getters.loadedGames;
    },

    selectGamesByTeamID() {
      const searchTeam = this.selectedTeam;

      if (!searchTeam) return this.games;
      //filtern nach Inhalten, die am angegebenen Tag stattfinden
      return this.games.filter(
        (c) => c.team1.indexOf("-MB3XYJbrvLKgjBXAN-n") > -1
      );
    },
    selectScore1() {
      var team = [];
      for (let i = 0; i < this.selectGamesByTeam.length; i++) {
        team[i] = {
          team: this.selectGamesByTeamID[i].title,
          //name: this.dbTeams[i].title,
          score: this.selectGamesByTeamID[i].scoreTeam1,
        };
      }
      return team;
    },

    groups() {
      return this.$store.getters.loadedGroups;
    },

    dbTeams() {
      return this.$store.getters.loadedTeams;
    },

    dbTeamsGames() {
      var team = [];
      //schreibt für alle Teams (Länge i) die Spiele in ein Array.
      //z.B. dbTeams[0].games, dbTeams[1].games
      for (let i = 0; i < this.dbTeams.length; i++) {
        team[i] = {
          team: this.dbTeams[i].title,
          //name: this.dbTeams[i].title,
          games: this.dbTeams[i].games,
        };
      }
      return team[0];
    },

    test_data() {
      var games = [];
      var formatted2 = [];
      var formatted3 = [];
      //durch das Array der Teams loopen. Als Games werden die Objekte in games zugewiesen
      for (let i = 0; i < this.dbTeams.length; i++) {
        games[i] = {
          id: [i],
          //name: this.dbTeams[i].title,
          games: this.dbTeams[i].games,
        };
        for (let y = 0; y < games.length; y++) {
          formatted2[y] = {
            gameID: games[y].games,
            //games: this.dbTeams[y].games,
          };
          for (let z = 0; z < formatted2.length; z++) {
            formatted3[z] = {
              gameScore: formatted2[z].gameID,
              //games: this.dbTeams[y].games,
            };
          }
        }
      }
      return formatted3;
      //return games[1].games["-MAk9QEWgf1kStR57bQi"];

      // return games[1].games[formatted2];

      //return formatted2;
      //so kann auf genau das Game zugegriffen werden
    },

    /*
    test_data_2() {
      var data2 = []
      for (x in this.dbTeams()) {

      }
    }, */

    dbTeamGames() {
      return this.$store.getters.loadedTeamGames;
    },

    gamesOfTeam() {
      var games = this.games;
      let result = "";
      for (let i = 0; i < games.length; i++) {
        result = games[i].team1;
      }
      return result;
    },

    selectGamesByTeam() {
      const searchTeam = this.selectedTeam;

      if (!searchTeam) return this.games;
      //filtern nach Inhalten, die am angegebenen Tag stattfinden
      return this.games.filter((c) => c.team1.indexOf(searchTeam) > -1);
    },

    teamsTitle() {
      var teamTitles = [];
      //durch das Array der Teams loopen. Als Games werden die Objekte in games zugewiesen
      for (let i = 0; i < this.dbTeams.length; i++) {
        teamTitles[i] = {
          id: [i],
          //name: this.dbTeams[i].title,
          title: this.dbTeams[i].title.substr(0, 2),
        };
      }
      return teamTitles;
    },
  },
  methods: {
    totalOrders: function (games) {
      return games.reduce((acc, val) => {
        return acc + parseInt(val.selfScore);
      }, 0);
    },

    totalSelfPoints: function (games) {
      return games.reduce((acc, val) => {
        return acc + parseInt(val.selfScore);
      }, 0);
    },
    totalRevenue: function (games) {
      return games.reduce((acc, val) => {
        return acc + parseInt(val.otherScore);
      }, 0);
    },
  },
};
</script>
