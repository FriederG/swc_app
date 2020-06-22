<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neue Gruppe erstellen</h2>
        <br />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <!--Prevent verhindert http-request-->
        <form @submit.prevent="onCreateGroup">
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

          <v-layout>
            <v-card-text>
              <v-text-field
                name="groupSize"
                label="Größe
                 (max. 8 Teams)"
                id="groupSize"
                multi-line
                v-model="groupSize"
                required
                type="number"
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field
                name="groupTitle"
                label="Gruppenname"
                id="groupName"
                multi-line
                v-model="groupName"
                required
              ></v-text-field>
            </v-card-text>
          </v-layout>

          <!--Teamauswahl ---------------------------------------------------------------->
          <!--männlicher Baum-->
          <div v-if="modelGender === 'male'">
            <v-layout row v-if="groupSize > 0">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team1"
                  label="Team 1"
                  id="team1"
                  v-model="groupTeam1"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex>
            </v-layout>
            <v-layout row v-if="groupSize > 1">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team2"
                  label="Team 2"
                  id="team2"
                  v-model="groupTeam2"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex>
            </v-layout>
            <v-layout row v-if="groupSize > 2">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team3"
                  label="Team 3"
                  id="team3"
                  v-model="groupTeam3"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex> </v-layout
            ><v-layout row v-if="groupSize > 3">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team4"
                  label="Team 4"
                  id="team4"
                  v-model="groupTeam4"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex> </v-layout
            ><v-layout row v-if="groupSize > 4">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team5"
                  label="Team 5"
                  id="team5"
                  v-model="groupTeam5"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex> </v-layout
            ><v-layout row v-if="groupSize > 5">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team6"
                  label="Team 6"
                  id="team6"
                  v-model="groupTeam6"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex>
            </v-layout>
            <v-layout row v-if="groupSize > 6">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team7"
                  label="Team 7"
                  id="team7"
                  v-model="groupTeam7"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex> </v-layout
            ><v-layout row v-if="groupSize > 7">
              <v-flex xs12 sm6 offset-sm3>
                <v-select
                  name="team8"
                  label="Team 8"
                  id="team8"
                  v-model="groupTeam8"
                  required
                  :items="maleTeams"
                  item-text="title"
                  ><option>Fe</option></v-select
                >
              </v-flex>
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
                >Gruppe eintragen</v-btn
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
      groupName: "",
      groupSize: "2",
      groupTeam1: "",
      groupTeam2: "",
      groupTeam3: "",
      groupTeam4: "",
      groupTeam5: "",
      groupTeam6: "",
      groupTeam7: "",
      groupTeam8: "",
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
      return (
        this.groupName !== "" &&
        this.modelGender !== "" &&
        this.groupTeam1 !== "" &&
        this.groupTeam2 !== ""
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
  },
  methods: {
    onCreateGroup() {
      //Wenn die Form ungültig ist
      if (!this.formIsValid) {
        return;
      }
      const gameData = {
        groupName: this.groupName,
        groupGender: this.modelGender,
        groupTeam1: this.groupTeam1,
        groupTeam2: this.groupTeam2,
        groupTeam3: this.groupTeam3,
        groupTeam4: this.groupTeam4,
        groupTeam5: this.groupTeam5,
        groupTeam6: this.groupTeam6,
        groupTeam7: this.groupTeam7,
        groupTeam8: this.groupTeam8,

        date: this.submittableDateTime,
      };
      this.$store.dispatch("createGroup", gameData);
      //this.$router.push("/meetups");
    },
  },
};
</script>

<style scoped></style>
