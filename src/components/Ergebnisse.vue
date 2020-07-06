<template>
  <div>
    <br /><br />

    <h1>Punkte</h1>
    <br />
    <!--
    <h4>Gesamtes Turnier</h4>
    <v-container>
      <v-card v-for="team in teamsByWins" v-bind:key="team.id"
        >{{ team.title }} - {{ team.totalScore }}</v-card>
    </v-container>
    -->

    <v-container v-for="group in groupedByGroup" :key="group.id">
      <h1>Gruppe: {{ group.groupTitle }}</h1>
      <div v-for="team in group.characters" :key="team.id">
        <v-card class="mx-auto" max-width="400">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                >Team: {{ team.title }}</v-list-item-subtitle
              >
              <v-card-text>{{ team.wins }}</v-card-text>
            </v-list-item-content>
          </v-list-item> </v-card
        ><br />
      </div>
    </v-container>

    <h2>Gruppenphase</h2>
    <!--Duch die Gruppen loopen
    <v-container fluid v-for="group in groups" :key="group.id">
      <v-row align="center">
        <v-col>
          <v-card width="400px">
            <v-card-title>Gruppe: {{ group.groupName }} </v-card-title>
            <v-card-text>{{ group.groupTeam1 }} </v-card-text>
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
    -->

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
import _ from "lodash";

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
      selectdTeam: "",
      point: 1,
    };
  },
  computed: {
    games() {
      return this.$store.getters.loadedGames;
    },

    /*
    groups() {
      return this.$store.getters.loadedGroups;
    },*/

    dbTeams() {
      return this.$store.getters.loadedTeams;
    },

    teamsByWins: function () {
      return _.orderBy(this.dbTeams, "wins", "desc");
    },

    groupedByGroup() {
      return (
        _.chain(this.teamsByWins)
          .groupBy((character) => character.group)
          .map((characters, groupTitle) => ({ groupTitle, characters }))
          //Für die Anordnung wird nur noch die Uhrzeit ohne Doppelpunkt genutzt, um die korrekte Reihenfolge zu bekommen
          .orderBy((group) => Number(group.group), ["asc"])
          .value()
      );
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
