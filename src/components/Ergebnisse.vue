<template>
  <div>
    <h1>{{ $t("Gruppentabelle") }}</h1>
    {{ $t("AufPlusKlicken") }}<br /><br />
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
      <v-data-table
        ref="table"
        mobile-breakpoint="200px"
        :headers="headers"
        :items="teamsByWins"
        :items-per-page="100"
        item-key="name"
        group-by="group"
        class="elevation-1"
        hide-default-footer
        disable-filtering
      >
        <template v-slot:group.header="{ items, isOpen, toggle }">
          <th colspan="6">
            <v-icon @click="toggle"
              >{{ isOpen ? "mdi-minus" : "mdi-plus" }}
            </v-icon>
            {{ $t("Gruppe") }}: {{ items[0].group }}
          </th>
        </template>
      </v-data-table>

      <!-- Finalspiele anzeigen ------------------------------------------------------------>
      <v-container v-for="finalGame in groupedByFinal" :key="finalGame.id">
        <h1>{{ finalGame.gameType }}</h1>
        <div v-for="game in finalGame.characters" :key="game.id">
          <v-card
            class="mx-auto"
            max-width="400"
            v-bind:outlined="game.gameGender === 'female'"
            color="green"
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
                <v-list-item-subtitle v-if="game.gameGender === 'male'">{{
                  $t("Herren")
                }}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="game.gameGender === 'female'">{{
                  $t("Damen")
                }}</v-list-item-subtitle>
                <v-list-item-subtitle
                  >{{ $t("Feld") }}: {{ game.pitch }},
                  {{ game.time | date }}</v-list-item-subtitle
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
                <v-list-item-subtitle>{{
                  $t("Ergebnis")
                }}</v-list-item-subtitle>
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
      headers: [
        {
          text: "Team",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Pkt.", value: "points", sortable: false },
        { text: "Diff", value: "scoreDifference", sortable: false },
        { text: "S", value: "wins", sortable: false },
        { text: "N", value: "losses", sortable: false },
        { text: "U", value: "draw", sortable: false },
      ],
      title: "",
      gender: "",
      time: new Date(),
      point: 1,
      modelGroup: "",
      selectedTeam: "",
    };
  },
  mounted() {
    let table = this.$refs.table;
    let keys = Object.keys(table.$vnode.componentInstance.openCache);
    keys.forEach((x) => {
      table.$vnode.componentInstance.openCache[x] = false;
    });
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    games() {
      return this.$store.getters.loadedGames;
    },

    //Alle Teams mit Infos aus der DB abrufen
    dbTeams() {
      return this.$store.getters.loadedTeams;
    },

    //dbTeams nach Punkten aufsteigend sortieren
    //Bei glaichen Punkten entscheidet die Tordifferenz
    teamsByWins: function () {
      return _.orderBy(
        this.dbTeams,
        ["points", "scoreDifference"],
        ["desc", "desc"]
      );
    },

    //Nach Punkten sortierte Teams anhand iherer Gruppe ordnen und ausgeben
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

    //Finalspiele
    finalGames() {
      return this.$store.getters.loadedFinalGames;
    },

    groupedByFinal() {
      return (
        _.chain(this.finalGames)
          .groupBy((character) => character.gameType)
          .map((characters, gameType) => ({ gameType, characters }))
          //Für die Anordnung wird nur noch die Uhrzeit ohne Doppelpunkt genutzt, um die korrekte Reihenfolge zu bekommen
          //.orderBy((group) => Number(group.gameType), ["desc"])
          .value()
      );
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
.group_display {
  display: flex;
  align-items: center;
  margin: 10px;
  justify-content: center;
}
</style>
