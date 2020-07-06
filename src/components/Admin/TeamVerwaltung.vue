<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neues Team</h2>
        <br />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <!--Prevent verhindert http-request-->
        <form @submit.prevent="onCreateTeam">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Teamname</h4>
              <v-text-field
                name="title"
                label="Teamname"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Gruppe</h4>
              <v-text-field
                name="group"
                label="Gruppe"
                id="group"
                v-model="group"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <h4>Turnierzweig</h4>
            <v-flex xs12 sm6 offset-sm3>
              <v-radio-group v-model="gender" row>
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

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Team hinzufügen</v-btn
              >
              <!--      {{ submittableDateTime }} -->
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>

    <v-container> </v-container>
    <!-- Anzeige und Bearbeitung -->
    <v-container v-for="team in teams" :key="team.id">
      <v-card class="mx-auto" max-width="400px"
        ><v-card-text>{{ team.title }} - Gruppe: {{ team.group }}</v-card-text>
        <v-card-text>Gender: {{ team.gender }}</v-card-text>

        <edit-team-dialog :team="team"></edit-team-dialog>
        <delete-team-dialog :team="team"></delete-team-dialog
      ></v-card>
    </v-container>
  </v-container>
</template>

<script>
//import _ from "lodash";

export default {
  data() {
    return {
      title: "",
      gender: "",
      group: "",
      time: new Date(),
      wins: 0,
      losses: 0,
      draw: 0,
      totalScore: 0,
      opponentScore: 0,
    };
  },
  computed: {
    formIsValid() {
      return this.title !== "" && this.gender !== "" && this.group !== "";
    },
    submittableDateTime() {
      const date = new Date();
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
  },
  methods: {
    onCreateTeam() {
      console.log(this.title);
      //Wenn die Form ungültig ist
      if (!this.formIsValid) {
        return;
      }
      const TeamData = {
        title: this.title,
        gender: this.gender,
        date: this.submittableDateTime,
        wins: this.wins,
        losses: this.losses,
        draw: this.draw,
        totalScore: this.totalScore,
        opponentScore: this.opponentScore,
        group: this.group,
      };
      this.$store.dispatch("createTeam", TeamData);
      //this.$router.push("/admin/news/edit");
    },

    totalSelfScore: function (games) {
      return games.reduce((acc, val) => {
        return acc + parseInt(val.otherScore);
      }, 0);
    },
  },
};
</script>

<style scoped></style>
