<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neuer Musikwunsch</h2>
        <br />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <!--Prevent verhindert http-request-->
        <form @submit.prevent="onCreateSong">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Lied eingeben</h4>
              <v-text-field
                name="title"
                label="Name des Lieds"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Lied hinzufügen</v-btn
              >
              <!--      {{ submittableDateTime }} -->
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>

    <v-container> </v-container>
    <!-- Anzeige und Bearbeitung -->
    <div id="flip-list-demo" class="demo">
      <transition-group name="flip-list" tag="ul">
        <v-container v-for="song in songsByRating" :key="song.id">
          <v-card class="mx-auto" max-width="400px"
            ><v-card-text v-bind:songTitle="song.title">{{
              song.title
            }}</v-card-text>
            <v-card-text> Rating: {{ song.rating }}</v-card-text>
            <!-- Rating Button -->
            <v-btn
              style="margin: 10px;"
              outlined
              @click="onUpvote(song.id, song.rating)"
            >
              <v-icon>mdi-menu-up</v-icon>
            </v-btn>

            <v-btn
              style="margin: 10px;"
              outlined
              @click="onDownVote(song.id, song.rating)"
            >
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </v-card>
        </v-container>
      </transition-group>
    </div>
  </v-container>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      title: "",
      time: new Date(),
    };
  },
  computed: {
    formIsValid() {
      return this.title.length > 2;
    },

    songs() {
      return this.$store.getters.loadedSongs;
    },

    songsByRating: function () {
      return _.orderBy(this.songs, "rating", "desc");
    },
  },
  methods: {
    onCreateSong() {
      //Wenn die Form ungültig ist
      if (!this.formIsValid) {
        return;
      }
      const SongData = {
        title: this.title,
        rating: 0,
      };
      this.$store.dispatch("createSong", SongData);
      //this.$router.push("/admin/news/edit");
    },

    onUpvote(songId, songRating) {
      console.log("Upvote");
      const SongData = {
        id: songId,
        rating: songRating,
      };

      this.$store.dispatch("UpVoteSong", SongData);
    },
    onDownVote(songId, songRating) {
      console.log("Downvote");
      const SongData = {
        id: songId,
        rating: songRating,
      };
      this.$store.dispatch("DownVoteSong", SongData);
    },
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
