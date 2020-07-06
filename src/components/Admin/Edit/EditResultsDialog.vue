<template>
  <v-dialog width="350px" persistent v-model="editDialog"
    ><template v-slot:activator="{ on }">
      <v-btn style="margin: 10px;" accent v-on="on">
        <v-icon>mdi-border-color</v-icon>
      </v-btn></template
    >
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Ergebnis bearbeiten</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              {{ team1Title }}
              <br />
              Alter Score zum TEST: {{ team1OldGameScore }}
              <v-text-field
                name="scoreTeam1"
                label="Punkte eingeben"
                id="scoreTeam1"
                multi-line
                v-model="modelScoreTeam1"
                required
                type="number"
              ></v-text-field>
            </v-card-text>

            <v-card-text>
              {{ team2Title }}
              <br />
              Alter Score zum TEST: {{ team2OldGameScore }}
              <v-text-field
                name="scoreTeam1"
                label="Punkte eingeben"
                id="scoreTeam2"
                multi-line
                v-model="modelScoreTeam2"
                required
                type="number"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                text
                class="blue--text darken-1"
                @click="editDialog = false"
                >Close</v-btn
              >
              <v-btn
                text
                class="blue--text darken-1"
                @click="
                  onSaveChanges(
                    team1.id,
                    team1.totalScore,
                    team2.id,
                    team2.totalScore
                  )
                "
                >Save</v-btn
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
  //prop aus der ErgebnisseBearbeiten.vue
  props: [
    "game",
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
  computed: {
    teams() {
      return this.$store.getters.loadedTeams;
    },

    selfScore() {
      return this.teams;
    },
  },
  methods: {
    onSaveChanges() {
      if (this.modelScoreTeam1 === "" || this.modelScoreTeam2 === "") {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateGamesData", {
        id: this.game.id,
        team1: this.team1,
        team2: this.team2,
        team1OldGameScore: this.team1OldGameScore,
        scoreTeam1: this.modelScoreTeam1,
        scoreTeam2: this.modelScoreTeam2,
        team2OldGameScore: this.team2OldGameScore,
      });
      /*
      this.$store.dispatch("updateTeamsData1", {
        id: this.team1,
        selfScore: this.modelScoreTeam1,
        oldSelfScore: this.teams[0].selfScore,
        otherScore: this.modelScoreTeam2,
      });

      this.$store.dispatch("updateTeamsData2", {
        id: this.team2,
        selfScore: this.modelScoreTeam2,
        oldSelfScore: this.game.scoreTeam2,
        otherScore: this.modelScoreTeam1,
      });
      this.$store.dispatch("registerTeam1ForGame", {
        id: this.team1,
        selfScore: this.modelScoreTeam1,
        otherScore: this.modelScoreTeam2,
      });
      this.$store.dispatch("registerTeam2ForGame", {
        id: this.team2,
        selfScore: this.modelScoreTeam2,
        otherScore: this.modelScoreTeam1,
      });*/
    },
  },
};
</script>
