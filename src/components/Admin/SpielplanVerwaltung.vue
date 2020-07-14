<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neues Spiel erstellen</h2>
        <br />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <!--Prevent verhindert http-request-->
        <form @submit.prevent="onCreateGame()">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3><h4>Datum und Uhrzeit</h4></v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3
              ><v-date-picker v-model="picker"></v-date-picker>
              <p>{{ picker }}</p></v-flex
            >
          </v-layout>
          <v-layout row class="mb-4">
            <v-flex xs12 sm6 offset-sm3
              ><v-time-picker v-model="time" format="24hr"></v-time-picker
              ><br /><br />
              <h4>Turnierbaum: {{ modelGender }}</h4>
              <h4>Uhrzeit: {{ time }}</h4>
            </v-flex>
          </v-layout>
          <v-layout><!-- Uhrzeit Kontrolle --> </v-layout>
          <!--Geschlecht ----------------------------------------------------------->
          <v-layout row>
            <h4>Turnierbaum</h4>
            <v-flex xs12 sm6 offset-sm3>
              <v-radio-group v-model="modelGender" row>
                <v-radio
                  style="margin-left: 20px;"
                  label="Damen"
                  value="female"
                ></v-radio>
                <v-radio
                  style="margin-left: 20px;"
                  label="Herren"
                  value="male"
                ></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>

          <!-- Platz --------------------------------------------------------------->
          <v-layout row>
            <h4>Platz:</h4>
            <v-flex xs12 sm6 offset-sm3>
              <v-radio-group v-model="pitch" row>
                <v-radio
                  style="margin-left: 20px;"
                  label="A"
                  value="A"
                ></v-radio>
                <v-radio
                  style="margin-left: 20px;"
                  label="B"
                  value="B"
                ></v-radio>
                <v-radio
                  style="margin-left: 20px;"
                  label="C"
                  value="C"
                ></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <!--Teamauswahl ---------------------------------------------------------------->
          <!--männlicher Baum-->
          <div v-if="modelGender === 'male'">
            <v-layout row>
              <!--item-value wird in v-model weitergegeben-->
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team1"
                  label="Team 1"
                  id="team1"
                  v-model="team1"
                  required
                  item-value="id"
                  :items="maleTeams"
                  item-text="title"
                ></v-select>
                <!--item-value="id"-->
              </v-flex>
            </v-layout>
            <v-card-text>vs.</v-card-text>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team2"
                  label="Team 2"
                  id="team2"
                  item-value="id"
                  v-model="team2"
                  required
                  :items="maleTeams"
                  item-text="title"
                ></v-select>
              </v-flex>
              <!--                  item-value="id" -->
            </v-layout>
          </div>
          <!--weiblicher Baum-->
          <div v-if="modelGender === 'female'">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team1"
                  label="Team 1"
                  id="team1"
                  v-model="team1"
                  required
                  :items="femaleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex>
            </v-layout>
            <v-card-text>vs.</v-card-text>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team2"
                  label="Team 2"
                  id="team2"
                  v-model="team2"
                  required
                  :items="femaleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex>
            </v-layout>
          </div>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Spiel eintragen</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      pitches: ["A", "B", "C"],
      team1: "",
      team2: "",
      scoreTeam1: "",
      scoreTeam2: "",
      pitch: "",
      modelGender: "",
      picker: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null,
    };
  },
  computed: {
    formIsValid() {
      return this.pitch !== "" && this.team1 !== "" && this.team2 !== "";
    },
    submittableDateTime() {
      const date = new Date(this.picker);
      if (typeof this.time == "string") {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
    teams() {
      return this.$store.getters.loadedTeams;
    },
    femaleTeams() {
      const damen = "female";
      //filtern nach Inhalten, die als gender female eingetragen haben
      return this.teams.filter((c) => c.gender.indexOf(damen) > -1);
    },
    maleTeams() {
      const herren = "male";
      //filtern nach Inhalten, die als gender male eingetragen haben
      return this.teams.filter((c) => c.gender.indexOf(herren) < 1);
    },
  },
  methods: {
    onCreateGame() {
      //Wenn die Form ungültig ist
      if (!this.formIsValid) {
        return;
      }
      const gameData = {
        pitch: this.pitch,
        gameGender: this.modelGender,
        team1: this.team1,
        team2: this.team2,
        scoreTeam1: this.scoreTeam1,
        scoreTeam2: this.scoreTeam2,
        date: this.submittableDateTime,
      };
      /*
      const teamGameData = {
        team1: this.team1,
        team2: this.team2,
        scoreTeam1: this.scoreTeam1,
        scoreTeam2: this.scoreTeam2,
      };*/
      this.$store.dispatch("createGame", gameData);
      //this.$store.dispatch("registerTeamForGame", teamGameData);

      //this.$router.push("/meetups");
    },
  },
};
</script>

<style scoped></style>
