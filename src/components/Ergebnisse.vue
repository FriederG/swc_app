<template>
  <div>
    <h1>Punkte</h1>
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

    <div v-if="!loading">
      <h4>Deine Gruppe:</h4>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-select
            name="day"
            label="Gruppe"
            id="day"
            v-model="modelGroup"
            required
            :items="singleGroups"
            item-text="group"
            return-object
            solo
            ><template slot="selection" slot-scope="{ item }">
              {{ item.group }}
            </template>
            <template slot="item" slot-scope="{ item }">
              {{ item.group }}
            </template></v-select
          >
        </v-flex>
      </v-layout>

      <v-container v-for="group in selectedGroups" :key="group.groupTitle">
        <h1>Gruppe: {{ group.groupTitle }} {{ modelGroup.group }}</h1>

        <div id="list-complete-demo">
          <transition-group name="list-complete" tag="p">
            <div
              v-for="team in group.characters"
              :key="team.title"
              class="list-complete-item"
            >
              <v-card class="mx-auto" max-width="400">
                <v-list-item>
                  <v-list-item-content
                    ><v-card-title>{{ team.title }}</v-card-title>

                    <v-card-text
                      ><b>Punkte: {{ team.points }} </b><br /><br />Siege:
                      {{ team.wins }}<br />
                      Unentschieden: {{ team.draw }}<br />Niederlagen:
                      {{ team.losses }}
                    </v-card-text>
                  </v-list-item-content>
                </v-list-item> </v-card
              ><br />
            </div>
          </transition-group>
        </div>
      </v-container>

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
      modelGroup: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
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
      return _.orderBy(this.dbTeams, "points", "desc");
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

    singleGroups() {
      return _.chain(this.teamsByWins)
        .groupBy((character) => character.group)
        .map((characters, group) => ({ group, characters }))
        .orderBy((group) => Number(group.group), ["asc"])
        .value();
    },

    selectedGroups() {
      const searchGroupSel = this.modelGroup.group;

      if (!searchGroupSel) return this.groupedByGroup;
      //Filtern nach
      return this.singleGroups.filter((c) => c.group === searchGroupSel);
    },
  },
};
</script>
<style scoped>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
