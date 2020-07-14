<template>
  <v-dialog width="350px" class="v-alert" persistent v-model="editDialog"
    ><template v-slot:activator="{ on }">
      <v-btn style="margin: 10px;" class="red--text darken-1" accent v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn></template
    >
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>{{ team1Title }} vs. {{ team2Title }}</v-card-text>
            <v-card-title>Spiel wirklich löschen?</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                text
                class="blue--text darken-1"
                @click="editDialog = false"
                >Abbrechen</v-btn
              >
              <v-btn text class="red--text darken-1" @click="onSaveDeleteGame"
                >Löschen</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  //prop aus der News.vue
  props: [
    "game",
    "gameType",
    "team1",
    "team1Title",
    "team1OldGameScore",
    "team2",
    "team2Title",
    "team2OldGameScore",
  ],
  data() {
    return {
      editDialog: false,
      modelScoreTeam1: this.game.scoreTeam1,
      modelScoreTeam2: this.game.scoreTeam2,
    };
  },
  methods: {
    onSaveDeleteGame() {
      this.editDialog = false;
      if (this.gameType === "Gruppenspiele") {
        this.$store.dispatch("deleteGameData", {
          id: this.game.id,
          team1: this.team1,
          team2: this.team2,
          team1OldGameScore: this.team1OldGameScore,
          team2OldGameScore: this.team2OldGameScore,
        });
      } else {
        this.$store.dispatch("deleteFinalGame", {
          id: this.game.id,
          team1: this.team1,
          team2: this.team2,
          team1OldGameScore: this.team1OldGameScore,
          team2OldGameScore: this.team2OldGameScore,
        });
      }
    },
  },
};
</script>
