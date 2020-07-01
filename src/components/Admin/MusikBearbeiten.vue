<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Songs Bearbeiten</h2>
        <br />
      </v-flex>
    </v-layout>

    <v-container> </v-container>
    <!-- Anzeige und Bearbeitung -->
    <v-container v-for="song in songsByRating" :key="song.id">
      <v-card class="mx-auto" max-width="400px"
        ><v-card-text>{{ song.title }}</v-card-text>
        <v-card-text>Rating: {{ song.rating }}</v-card-text>

        <!--  <edit-song-dialog :song="song"></edit-song-dialog> -->
        <delete-song-dialog :song="song"></delete-song-dialog
      ></v-card>
    </v-container>
  </v-container>
</template>

<script>
//import _ from "lodash";

import _ from "lodash";

export default {
  data() {
    return {
      editedTitle: "",
      editedRating: "",
      title: "",
      gender: "",
      time: new Date(),
    };
  },
  computed: {
    formIsValid() {
      return this.title !== "";
    },
    songs() {
      return this.$store.getters.loadedSongs;
    },

    songsByRating: function () {
      return _.orderBy(this.songs, "rating", "asc");
    },
  },
  methods: {
    totalSelfScore: function (games) {
      return games.reduce((acc, val) => {
        return acc + parseInt(val.otherScore);
      }, 0);
    },
  },
};
</script>

<style scoped></style>
