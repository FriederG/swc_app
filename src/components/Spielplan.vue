<template
  ><div>
    <h1>Spielplan</h1>
    <br />
    <!--Loading Bereich --------------------------------------------------------------------->
    <v-layout v-if="loading"
      ><v-flex xs12 class="text-center" style="padding: 30px;"
        ><v-progress-circular
          indeterminate
          color="green"
          style="padding: 30px;"
        ></v-progress-circular
        ><v-card-text
          >Lädt Daten<br />Bitte Internet-Verbindung herstellen</v-card-text
        ></v-flex
      ></v-layout
    >
    <!--Ende Loading -->

    <div v-if="!loading">
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
            outlined
            ><template slot="selection" slot-scope="{ item }">
              {{ item.time | day }}
            </template>
            <template slot="item" slot-scope="{ item }">
              {{ item.time | day }}
            </template></v-select
          >
        </v-flex>
      </v-layout>
    </div>

    <div v-if="!loading">
      <h4>Dein Team:</h4>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-autocomplete
            name="team1"
            label="Team wählen"
            id="team1"
            v-model="selectedTeam"
            required
            :items="teams"
            item-text="title"
            outlined
            ><option>Fe</option></v-autocomplete
          >
        </v-flex>
      </v-layout>
    </div>
    <!--
    <v-data-table
      mobile-breakpoint="200px"
      :headers="headers"
      :items="games"
      :items-per-page="100"
      item-key="name"
      group-by="time"
      class="elevation-1"
    ></v-data-table>
-->
    <div v-if="day === ''">
      <v-alert type="info">Bitte Turniertag auswählen</v-alert>
    </div>

    <div v-if="!loading && day != ''">
      <v-simple-table v-for="group in selectedGamesByDate" :key="group.id">
        <thead>
          <tr>
            <h4>{{ group.time | date }}</h4>
          </tr>
          <tr>
            <th class="text-left">Feld</th>
            <th class="text-left">Team 1</th>
            <th class="text-left">Team 2</th>
            <th>Ergebnis</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="game in group.characters"
            :key="game.id"
            v-bind:class="[
              game.team1Title === selectedTeam ||
              game.team2Title === selectedTeam
                ? { selectedTeam: true }
                : { selectedTeam: false },
            ]"
          >
            <!--
            <v-list-item
              three-line
              v-bind:class="[
                game.team1Title === selectedTeam ||
                game.team2Title === selectedTeam
                  ? { selectedTeam: true }
                  : { selectedTeam: false },
              ]"
            >-->
            <td>{{ game.pitch }}</td>
            <td>
              <b>{{ game.team1Title }}</b>
            </td>
            <td>
              <b>{{ game.team2Title }}</b>
            </td>

            <td>
              <v-list-item-title
                >{{ game.scoreTeam1 }} :
                {{ game.scoreTeam2 }}</v-list-item-title
              >
            </td>
            <!--
            </v-list-item>--><br />
          </tr>
        </tbody>
      </v-simple-table>
    </div>

    <!--
    <div v-if="!loading">
      <v-container v-for="group in selectedGamesByDate" :key="group.id">
        <h4>{{ group.time | date }}</h4>
        <div v-for="game in group.characters" :key="game.id">
          <v-card
            class="mx-auto"
            max-width="400"
            v-bind:outlined="game.gameGender === 'female'"
          >
            <v-list-item
              three-line
              v-bind:class="[
                game.team1Title === selectedTeam ||
                game.team2Title === selectedTeam
                  ? { selectedTeam: true }
                  : { selectedTeam: false },
              ]"
            >
              <v-list-item-content>
                <v-list-item-subtitle
                  >Platz: {{ game.pitch }}</v-list-item-subtitle
                >
                <v-list-item-title
                  ><b>{{ game.team1Title }}</b></v-list-item-title
                >
                <v-list-item-title>vs.</v-list-item-title>
                <v-list-item-title
                  ><b>{{ game.team2Title }}</b></v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
                <v-list-item-title
                  >{{ game.scoreTeam1 }} :
                  {{ game.scoreTeam2 }}</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item> </v-card
          ><br />
        </div>
      </v-container>
    </div>
-->
    <!--Finalspiele ----------------------------------------------------------------------------------->

    <br /><br />
    <div v-if="!loading && day != ''">
      <h2>Finalspiele</h2>
      <v-container v-for="group in finalsGroupedByDate" :key="group.id">
        <h4>{{ group.time | date }}</h4>
        <div v-for="game in group.characters" :key="game.id">
          <v-card
            class="mx-auto"
            max-width="400"
            v-bind:outlined="game.gameGender === 'female'"
          >
            <v-list-item
              three-line
              v-bind:class="[
                game.team1Title === selectedTeam ||
                game.team2Title === selectedTeam
                  ? { selectedTeam: true }
                  : { selectedTeam: false },
              ]"
            >
              <v-list-item-content>
                <v-list-item-subtitle v-if="game.gameGender === 'male'"
                  >Herren</v-list-item-subtitle
                >
                <v-list-item-subtitle v-if="game.gameGender === 'female'"
                  >Damen</v-list-item-subtitle
                >
                <v-list-item-title
                  ><b>{{ game.gameType }}</b></v-list-item-title
                >
                <v-list-item-subtitle
                  >Platz: {{ game.pitch }}</v-list-item-subtitle
                >

                <v-list-item-title
                  ><b>{{ game.team1Title }}</b></v-list-item-title
                >
                <v-list-item-title>vs.</v-list-item-title>
                <v-list-item-title
                  ><b>{{ game.team2Title }}</b></v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
                <v-list-item-title
                  >{{ game.scoreTeam1 }} :
                  {{ game.scoreTeam2 }}</v-list-item-title
                ></v-list-item-content
              >
              <!--Alter Score wird als Prop übergeben, damit er abgezogen werden kann, um bei Änderung nicht den total Score zu verfälschen -->
            </v-list-item> </v-card
          ><br />
        </div>
      </v-container>
    </div></div
></template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      isActive: true,
      title: "",
      day: "",
      time: new Date(),
      selectedTeam: "",
      message: "",
      headers: [
        {
          text: "Team 1",
          align: "start",
          sortable: false,
          value: "team1Title",
        },
        { text: "Team 2", value: "team2Title", sortable: false },
        { text: "Score", value: "scoreTeam1", sortable: false },
        { text: "Score", value: "scoreTeam2", sortable: false },
      ],
    };
  },
  mounted() {
    if (localStorage.selectedTeam) {
      this.selectedTeam = localStorage.selectedTeam;
    }
  },
  watch: {
    selectedTeam(newTeam) {
      localStorage.selectedTeam = newTeam;
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    games() {
      return this.$store.getters.loadedGames;
    },
    finalGames() {
      return this.$store.getters.loadedFinalGames;
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
    finalsGroupedByDate() {
      return (
        _.chain(this.finalGames)
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
  color: black;
  background-color: green;
}
.damenTeam {
  background-color: lightgray;
}
</style>
