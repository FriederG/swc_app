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
        <form @submit.prevent="onCreateMeetup">
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
              ><v-time-picker v-model="time" format="24hr"></v-time-picker>
              <p>{{ time }}</p></v-flex
            >
          </v-layout>
          <!--Teamauswahl ---------------------------------------------------------------->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                name="team1"
                label="Team 1"
                id="team1"
                v-model="team1"
                required
                :items="teams"
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
                :items="teams"
                item-text="title"
                ><option>Fe</option></v-select
              >
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Spiel eintragen</v-btn
              >
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150" />
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
      pitch: "A",
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      picker: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
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
  },
  methods: {
    onCreateMeetup() {
      //Wenn die Form ungültig ist
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
};
</script>

<style scoped></style>
