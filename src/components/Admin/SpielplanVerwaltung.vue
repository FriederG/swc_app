<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neues Spiel erstellen</h2>
        <h2 v-if="modelGameType != 'Gruppenspiel'">{{ modelGameType }}</h2>
        <br />
      </v-flex>
    </v-layout>

    <!--Auswahl, ob Finalspiel -->
    <v-layout row>
      <!--item-value wird in v-model weitergegeben-->
      <v-flex xs12 sm6 offset-sm3>
        <v-select
          name="gameType"
          label="Spieltyp"
          id="gameType"
          v-model="modelGameType"
          required
          :items="gameTypes"
        ></v-select>
        <!--item-value="id"-->
      </v-flex>
    </v-layout>

    <!--Gruppenspiel ----------------------------------------------------------------------->
    <v-layout row v-if="modelGameType === 'Gruppenspiel'">
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
          <!--Geschlecht
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
           ----------------------------------------------------------->
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

          <!-- Gruppen Auswahl --------------------------------------------------------------->
          <v-layout row>
            <h4>Gruppe:</h4>

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

          <!--Teamauswahl ---------------------------------------------------------------->

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
                :items="teamsByGroup"
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
                :items="teamsByGroup"
                item-text="title"
              ></v-select>
            </v-flex>
            <!--                  item-value="id" -->
          </v-layout>
          <v-alert
            :value="errorSameTeam"
            type="error"
            transition="scale-transition"
          >
            Gleiches Team ausgewählt!
          </v-alert>
          <!-- Erfolgreiches Eintragen ------------------------------------->
          <v-alert
            :value="succesAlert"
            type="success"
            transition="scale-transition"
          >
            Spiel erfolgreich eingetragen
          </v-alert>

          <!--weiblicher Baum
          <div v-if="modelGender === 'female'">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team1"
                  label="Team 1"
                  id="team1"
                  v-model="team1"
                  item-value="id"
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
                  item-value="id"
                  required
                  :items="femaleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex>
            </v-layout>
          </div>
          -->

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

    <!--Finalspiele ----------------------------------------------------------------------->
    <v-layout row v-if="modelGameType != 'Gruppenspiel'">
      <v-flex xs12>
        <!--Prevent verhindert http-request-->
        <form @submit.prevent="onCreateFinalGame()">
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

              <h4>Uhrzeit: {{ time }}</h4>
              <br />
              <h4>{{ modelGameType }}</h4>
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
                  :items="maleTeamsOrderedByName"
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
                  :items="maleTeamsOrderedByName"
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
                  item-value="id"
                  required
                  :items="femaleTeamsOrderedByName"
                  item-text="title"
                ></v-select>
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
                  item-value="id"
                  required
                  :items="femaleTeamsOrderedByName"
                  item-text="title"
                ></v-select>
              </v-flex>
            </v-layout>
          </div>

          <!--Feedback-Meldungen ----------------------------------------->
          <v-alert
            :value="errorSameTeam"
            type="error"
            transition="scale-transition"
          >
            Gleiches Team ausgewählt!
          </v-alert>
          <!-- Erfolgreiches Eintragen ------------------------------------->
          <v-alert
            :value="succesAlert"
            type="success"
            transition="scale-transition"
          >
            Spiel erfolgreich eingetragen
          </v-alert>

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
import _ from "lodash";

export default {
  data() {
    return {
      succesAlert: false,
      //errorSameTeam: false,
      gameTypes: [
        "Gruppenspiel",
        "Achtelfinale",
        "Viertelfinale",
        "Halbfinale",
        "Finale",
      ],
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
      modelGameType: "Gruppenspiel",
      modelGroup: "Gruppe wählen",
    };
  },
  computed: {
    formIsValid() {
      return (
        this.pitch !== "" &&
        this.team1 !== "" &&
        this.team2 !== "" &&
        this.team1 !== this.team2
      );
    },
    errorSameTeam() {
      return (
        this.team1 !== "" && this.team2 !== "" && this.team1 === this.team2
      );
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

    maleTeamsOrderedByName() {
      return _.orderBy(this.maleTeams, "title");
    },

    femaleTeamsOrderedByName() {
      return _.orderBy(this.femaleTeams, "title");
    },

    //Gruppenauswahl zur besseren Übersicht
    singleGroups() {
      return _.chain(this.teams)
        .groupBy((character) => character.group)
        .map((characters, group) => ({ group, characters }))
        .orderBy((group) => Number(group.group), ["desc"])
        .value();
    },

    teamsByGroup() {
      const selectedGroup = this.modelGroup.group;

      return this.teams.filter((c) => c.group === selectedGroup);
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
      this.$store.dispatch("createGame", gameData);
      this.succesAlert = true;

      window.setTimeout(() => {
        this.succesAlert = false;
        console.log("hide alert after 2 seconds");
      }, 1000);
    },
    onCreateFinalGame() {
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
        gameType: this.modelGameType,
      };
      this.$store.dispatch("createFinalGame", gameData);
      this.succesAlert = true;

      window.setTimeout(() => {
        this.succesAlert = false;
        console.log("hide alert after 2 seconds");
      }, 1000);
    },
  },
};
</script>

<style scoped></style>
