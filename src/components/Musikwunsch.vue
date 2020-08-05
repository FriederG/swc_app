<template>
  <v-container>
    <!-- Test Area: Löschen falls nicht mehr benötigt -->
    <v-layout row>
      <v-flex xs12>
        <h1>{{ $t("Musikwünsche") }}</h1>
        <br />
      </v-flex>
    </v-layout>

    <v-alert type="info" icon="mdi-clock-time-ten-outline" v-if="(countdown)">
      {{ $t("Noch") }} {{ countdown }}s {{ $t("BisWiederMusikWunsch") }}
    </v-alert>

    <v-alert
      type="info"
      icon="mdi-clock-time-ten-outline"
      v-if="(vote_cooldown)"
    >
      {{ $t("Noch") }} {{ countdown_2 }}s {{ $t("BisWiederVoten") }}
    </v-alert>

    <!-- Test Area: Löschen falls nicht mehr benötigt -->

    <v-layout v-if="loading"
      ><v-flex xs12 class="text-center" style="padding: 30px;"
        ><v-progress-circular
          indeterminate
          color="green"
          style="padding: 30px;"
        ></v-progress-circular
        ><v-card-text
          >Lädt Daten<br />Bitte Internet-Verbindung herstellen</v-card-text
        ></v-flex
      ></v-layout
    >

    <div v-if="!loading">
      <v-layout row v-if="wunschGemacht <= 2">
        <v-flex xs12>
          <!--Prevent verhindert http-request-->
          <form @submit.prevent="onCreateSong">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <h4>{{ $t("LiedwunschEingeben") }}</h4>
                <h5>
                  {{ $t("DuHastNoch") }} {{ 3 - wunschGemacht }}
                  {{ $t("Musikwünsche") }}
                </h5>
                <v-text-field
                  name="title"
                  v-bind:label="$t('NameDesLieds')"
                  id="title"
                  v-model="title"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn class="primary" :disabled="!formIsValid" type="submit">{{
                  $t("LiedHinzufügen")
                }}</v-btn>
                <!--      {{ submittableDateTime }} -->
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>

      <v-card-text v-if="wunschGemacht > 2">WUnsch gemacht</v-card-text>
      <br />
      <h5 v-if="votes <= 4">
        {{ $t("DuKannstNoch") }} {{ 5 - votes }} {{ $t("MalVoten") }}.
      </h5>

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
                v-if="votes <= 4"
                style="margin: 10px;"
                outlined
                color="green"
                @click="onUpvote(song.id, song.rating)"
              >
                <v-icon>mdi-menu-up</v-icon>
              </v-btn>

              <v-btn
                v-if="votes <= 4"
                style="margin: 10px;"
                outlined
                color="red"
                @click="onDownVote(song.id, song.rating)"
              >
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </v-card>
          </v-container>
        </transition-group>
      </div>
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

      wunschGemacht: localStorage.getItem("Wunsch"),
      votes: localStorage.getItem("votes"),

      counter: null,
      counter_2: null,
      timestamp_a: null,
      timestamp_b: null,
      timestamp_c: null,
      timestamp_d: null,
      time_dif_music: null,
      time_dif_vote: null,
      vote_cooldown: false,
      countdown: null,
      countdown_2: null,
    };
  },

  mounted() {
    if (localStorage.getItem("vote_cooldown") === "true") {
      this.vote_cooldown = true;
      this.timestamp_d = localStorage.getItem("timestamp_c");
      this.timer_2();
    } else {
      this.vote_cooldown = false;
    }

    this.wunschGemacht = localStorage.getItem("Wunsch");
    this.votes = localStorage.getItem("votes");
    this.timestamp_a = new Date();
    this.timestamp_b = new Date(localStorage.getItem("timestamp_a"));
    this.timestamp_c = new Date();
    this.timestamp_d = new Date(localStorage.getItem("timestamp_c"));

    if (parseInt(localStorage.getItem("Wunsch")) === 3) {
      this.timer();
    }
    if (parseInt(localStorage.getItem("votes")) === 10) {
      this.timer_2();
    }
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    },
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

      this.title = "";
      //Wenn schon etwas im Wunsch-Store steht
      if (localStorage.getItem("Wunsch")) {
        localStorage.setItem(
          "Wunsch",
          parseInt(localStorage.getItem("Wunsch")) + 1
        );
        if (parseInt(localStorage.getItem("Wunsch")) === 3) {
          this.timestamp_a = new Date();
          localStorage.setItem("timestamp_a", this.timestamp_a);
          this.timestamp_b = new Date(localStorage.getItem("timestamp_a"));
          this.timer();
        }
      }

      //Wenn noch kein Wunsch gemacht wurde, auf 1 setzen
      else {
        localStorage.setItem("Wunsch", 1);
      }

      this.wunschGemacht = localStorage.getItem("Wunsch");

      //this.$router.push("/admin/news/edit");
    },

    onUpvote(songId, songRating) {
      if (localStorage.getItem("votes")) {
        console.log("Upvote");
        const SongData = {
          id: songId,
          rating: songRating,
        };

        this.$store.dispatch("UpVoteSong", SongData);

        localStorage.setItem(
          "votes",
          parseInt(localStorage.getItem("votes")) + 1
        );

        if (parseInt(localStorage.getItem("votes")) === 4) {
          this.timestamp_c = new Date();
          localStorage.setItem("timestamp_c", this.timestamp_c);
          this.timestamp_d = new Date(localStorage.getItem("timestamp_c"));
          this.timer_2();
        }
      } else {
        console.log("Upvote");
        const SongData = {
          id: songId,
          rating: songRating,
        };

        this.$store.dispatch("UpVoteSong", SongData);
        localStorage.setItem("votes", 1);
      }

      this.votes = localStorage.getItem("votes");
    },
    onDownVote(songId, songRating) {
      if (localStorage.getItem("votes")) {
        console.log("Downvote");
        const SongData = {
          id: songId,
          rating: songRating,
        };

        this.$store.dispatch("DownVoteSong", SongData);
        localStorage.setItem(
          "votes",
          parseInt(localStorage.getItem("votes")) + 1
        );
        if (parseInt(localStorage.getItem("votes")) === 4) {
          this.timestamp_c = new Date();
          localStorage.setItem("timestamp_c", this.timestamp_c);
          this.timestamp_d = new Date(localStorage.getItem("timestamp_c"));
          this.timer_2();
        }
      } else {
        localStorage.setItem("votes", 1);
        console.log("DownVote");
        const SongData = {
          id: songId,
          rating: songRating,
        };

        this.$store.dispatch("DownVoteSong", SongData);
      }

      this.votes = localStorage.getItem("votes");
    },

    timer() {
      this.counter = setInterval(() => {
        this.timestamp_a = new Date();

        this.time_dif_music =
          Math.floor(Math.abs(this.timestamp_b - this.timestamp_a) / 1000) % 60;

        this.countdown = 60 - this.time_dif_music;

        if (this.time_dif_music === 59) {
          localStorage.removeItem("Wunsch");
          this.wunschGemacht = localStorage.getItem("Wunsch");
          this.countdown = null;
          clearInterval(this.counter);
        }
      }, 1000);
    },

    timer_2() {
      this.counter_2 = setInterval(() => {
        this.timestamp_c = new Date();
        this.vote_cooldown = true;
        localStorage.setItem("vote_cooldown", "true");

        this.time_dif_vote =
          Math.floor(Math.abs(this.timestamp_d - this.timestamp_c) / 1000) % 60;

        this.countdown_2 = 30 - this.time_dif_vote;

        if (this.time_dif_vote === 30) {
          localStorage.removeItem("votes");
          this.votes = localStorage.getItem("votes");
          this.vote_cooldown = false;
          localStorage.setItem("vote_cooldown", "false");
          clearInterval(this.counter_2);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
