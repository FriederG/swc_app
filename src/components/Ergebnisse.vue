<template>
  <div>
    <h1>Punkte</h1>
    <br />

    <h2>Gruppenphase</h2>
    <v-container fluid v-for="group in groups" :key="group.id">
      <v-row align="center">
        <v-col>
          <v-card width="400px">
            <v-card-title>Gruppe: {{ group.groupName }} </v-card-title>

            <v-card-text>{{ group.groupTeam1 }} </v-card-text>
            <div v-for="game in games" :id="game.id" v-bind:key="game.id">
              <div v-if="game.team1 === group.groupTeam1">{{ game.team1 }}</div>
            </div>

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

    <v-container v-for="game in games" :key="game.id"
      >{{ game }}{{ game.team1 }} punkte: {{ game.scoreTeam1 }}</v-container
    >
    <v-container v-for="teamGame in gamesOfTeam" :key="teamGame.id">
      Games of Team: {{ teamGame }}</v-container
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
      title: "",
      gender: "",
      time: new Date(),
    };
  },
  computed: {
    groups() {
      return this.$store.getters.loadedGroups;
    },
    games() {
      return this.$store.getters.loadedGames;
    },
    gamesOfTeam() {
      var games = this.games;
      let result = "";
      for (let i = 0; i < games.length; i++) {
        result = games[i].team1;
      }
      return result;
    },
  },
};
</script>
