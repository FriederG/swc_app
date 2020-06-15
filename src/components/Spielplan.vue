<template
  ><div>
    <h2>Spielplan</h2>
    <br />

    <v-container v-for="group in groupedByDate" :key="group.id">
      <h1>{{ group.time | date }}</h1>
      <div v-for="game in group.characters" :key="game.id">
        <v-card class="mx-auto" max-width="400">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-subtitle
                >Platz: {{ game.pitch }}</v-list-item-subtitle
              >
              <v-list-item-title
                ><b>{{ game.team1 }}</b></v-list-item-title
              >
              <v-list-item-title>vs.</v-list-item-title>
              <v-list-item-title
                ><b>{{ game.team2 }}</b></v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
              <v-list-item-title
                >{{ game.scoreTeam1 }} :
                {{ game.scoreTeam2 }}</v-list-item-title
              ></v-list-item-content
            >
          </v-list-item>
        </v-card>
      </div>
    </v-container>

    <!--
    <br />
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz B</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>23 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
    <br />
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz C</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>32 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
    <br /><br />
    <h4>10:30h</h4>
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz A</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>32 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
    <br />
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz A</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>32 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
    -->
  </div></template
>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      title: "",
      time: new Date(),
    };
  },
  computed: {
    games() {
      return this.$store.getters.loadedGames;
    },
    gamesByDate: function () {
      let sortedGames = _.groupBy(this.games, "time");
      //return _.orderBy(sortedGames, "time", "asc");

      return sortedGames;
    },
    //https://jsfiddle.net/crswll/pb0t0xbs/106/
    groupedByDate() {
      return _.chain(this.games)
        .groupBy((character) => character.time)
        .map((characters, time) => ({ time, characters }))
        .orderBy((group) => Number(group.time), ["asc"])
        .value();
    },
  },
};
</script>
