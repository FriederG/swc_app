<template
  ><div>
    <h1>Ergebnisse eintragen</h1>
    <br />
    <h4>Tag wählen:</h4>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-select
          name="day"
          label="Tag"
          id="day"
          v-model="day"
          required
          :items="singleDays"
          item-text="time"
          return-object
          solo
          ><template slot="selection" slot-scope="{ item }">
            {{ item.time | day }}
          </template>
          <template slot="item" slot-scope="{ item }">
            {{ item.time | day }}
          </template></v-select
        >
      </v-flex>
    </v-layout>

    <h4>Team hervorheben:</h4>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-select
          name="team1"
          label="Team wählen"
          id="team1"
          v-model="selectedTeam"
          required
          :items="teams"
          item-text="title"
          solo
          ><option>Fe</option></v-select
        >
      </v-flex>
    </v-layout>

    <v-container v-for="group in selectedGamesByDate" :key="group.id">
      <h1>{{ group.time | date }}</h1>
      <div v-for="game in group.characters" :key="game.id">
        <v-card
          class="mx-auto"
          max-width="400"
          v-bind:outlined="game.gameGender === 'female'"
        >
          <v-list-item
            three-line
            v-bind:class="[
              game.team1 === selectedTeam || game.team2 === selectedTeam
                ? { selectedTeam: true }
                : { selectedTeam: false },
            ]"
          >
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
            ><edit-results-dialog :game="game"></edit-results-dialog>
          </v-list-item> </v-card
        ><br />
      </div>
    </v-container></div
></template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      isActive: true,
      title: "",
      day: "2020-06-29T13:46:00.000Z",
      time: new Date(),
      selectedTeam: "",
      message: "",
    };
  },
  computed: {
    games() {
      return this.$store.getters.loadedGames;
    },
    teams() {
      return this.$store.getters.loadedTeams;
    },
    gamesByDate: function () {
      let sortedGames = _.groupBy(this.games, "time");
      //return _.orderBy(sortedGames, "time", "asc");

      return sortedGames;
    },
    //https://jsfiddle.net/crswll/pb0t0xbs/106/
    groupedByDate() {
      return (
        _.chain(this.games)
          .groupBy((character) => character.time)
          .map((characters, time) => ({ time, characters }))
          //Für die Anordnung wird nur noch die Uhrzeit ohne Doppelpunkt genutzt, um die korrekte Reihenfolge zu bekommen
          .orderBy(
            (group) => Number(group.time.slice(11, 16).replace(":", "")),
            ["asc"]
          )

          .value()
      );
    },
    selectedGamesByDate() {
      const searchDay = this.day.time;

      if (!searchDay) return this.groupedByDate;
      //filtern nach Inhalten, die am angegebenen Tag stattfinden
      return this.groupedByDate.filter((c) => c.time.indexOf(searchDay) > -1);
    },
    selectGamesByTeam() {
      const searchTeam = this.team1;

      if (!searchTeam) return this.groupedByDate;
      //filtern nach Inhalten, die am angegebenen Tag stattfinden
      return this.games.filter((c) => c.team1.indexOf(searchTeam) > -1);
    },
    singleDays() {
      return _.chain(this.games)
        .groupBy((character) => character.time.slice(0, 10))
        .map((characters, time) => ({ time, characters }))
        .orderBy((group) => Number(group.time), ["asc"])
        .value();
    },
  },
};
</script>

<style>
.selectedTeam {
  color: white;
  background-color: lightgreen;
}
.damenTeam {
  background-color: lightgray;
}
</style>
