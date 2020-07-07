<template>
  <v-container>
    <!--Dialog zur Bestätigung
    <v-dialog width="350px" persistent v-model="submitTeamDialog">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Team {{ this.title }} angelegt</v-card-title>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn
                  text
                  class="blue--text darken-1"
                  @click="submitTeamDialog = false"
                  >Okay</v-btn
                >
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>-->

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
          {{ title }}
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
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>

    <v-container> </v-container>

    <div id="list-demo">
      <transition-group name="list" tag="p">
        <!-- Anzeige und Bearbeitung -->
        <v-container v-for="team in teams" :key="team.id">
          <v-card class="mx-auto" max-width="400px"
            ><v-card-text
              >{{ team.title }} - Gruppe: {{ team.group }}</v-card-text
            >
            <v-card-text>Gender: {{ team.gender }}</v-card-text>

            <edit-team-dialog :team="team"></edit-team-dialog>
            <delete-team-dialog :team="team"></delete-team-dialog
          ></v-card>
        </v-container>
      </transition-group>
    </div>
  </v-container>
</template>

<script>
//import _ from "lodash";

export default {
  data() {
    return {
      submitTeamDialog: false,
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
      this.submitTeamDialog = true;
      //window.alert("Team" + this.title + " angelegt");
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

      this.title = "";
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

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
