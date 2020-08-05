<template>
  <v-container>
    <div>
      <div>
        <div><h2>Schietwettercup 2021</h2></div>

        <div><h4>Prerelease v.1.0</h4></div>
        {{ $t("Über das Turnier") }}
        <br />
        <!--News Sektion -->
        <v-container v-if="loading">
          <v-alert type="info"
            >Die Seite ist zur Zeit offline. Online-Funktionen sind nicht
            verfügbar.</v-alert
          >
          <router-link style="text-decoration: none;" to="/about">
            <v-card class="mx-auto" max-width="400"
              ><h3 style="padding: 20px;">Allgemeine Informationen</h3>
              <v-img
                class="white--text align-end"
                height="200px"
                src="../assets/ball_klein.jpg"
              >
              </v-img> </v-card></router-link
          ><br />
          <router-link style="text-decoration: none;" to="/pegelstand">
            <v-card class="mx-auto" max-width="400"
              ><h3 style="padding: 20px;">Pegelstand messen</h3>
              <v-img
                class="white--text align-end"
                height="200px"
                src="../assets/bier_klein.jpg"
              >
              </v-img> </v-card
          ></router-link>
        </v-container>

        <v-layout v-if="loading">
          <!--Lade-Kreis ------------------------------------->
          <v-flex xs12 class="text-center" style="padding: 30px;"
            ><v-progress-linear indeterminate color="green"></v-progress-linear
            ><v-card-text
              >Daten laden<br />Bitte Internet-Verbindung
              herstellen</v-card-text
            ></v-flex
          ></v-layout
        >
        <!--Subscribe Push Nachricht Test
        <v-btn @click="subscribe">Subscribe</v-btn>
        -->

        <!--Subscribe Push Nachricht Test -->
        <v-layout row wrap v-if="!loading">
          <v-container>
            <div v-for="singleNews in news" :key="singleNews.id" class="mb-2">
              <router-link style="text-decoration: none;" to="/news">
                <v-card class="mx-auto" max-width="400"
                  ><h3 style="padding: 20px;">News</h3>
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="singleNews.imageUrl"
                  >
                    <v-card-title>{{ singleNews.title }}</v-card-title>
                  </v-img>
                </v-card></router-link
              >
            </div>
            <!--Score -->
            <v-container fluid>
              <v-col cols="12"
                ><v-row justify="space-between">
                  <router-link style="text-decoration: none;" to="/spielplan">
                    <v-card class="mx-auto" max-width="400"
                      ><h4 style="padding: 20px;">
                        <v-icon>mdi-calendar</v-icon> Spielplan
                      </h4> </v-card
                    ><br
                  /></router-link>

                  <router-link style="text-decoration: none;" to="/results">
                    <v-card class="mx-auto" max-width="400"
                      ><h4 style="padding: 20px;">
                        <v-icon>mdi-account-multiple</v-icon> Gruppen
                      </h4>
                    </v-card></router-link
                  >
                </v-row>
              </v-col></v-container
            >

            <router-link style="text-decoration: none;" to="/pegelstand">
              <v-card class="mx-auto" max-width="400"
                ><h3 style="padding: 20px;">Pegelstand messen</h3>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="../assets/bier_klein.jpg"
                >
                </v-img> </v-card
            ></router-link>

            <br />
            <router-link style="text-decoration: none;" to="/musik">
              <v-card class="mx-auto" max-width="400"
                ><h3 style="padding: 20px;">Musikwünsche</h3>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="../assets/nach_links.jpg"
                >
                </v-img> </v-card
            ></router-link>
          </v-container>
        </v-layout>
      </div>
      <app-footer></app-footer></div></v-container
></template>

<script>
//import * as firebase from "firebase";
export default {
  data() {
    return {};
  },

  computed: {
    news() {
      //Methode, bei der die News aus dem vuex store geladen werden
      return this.$store.getters.featuredNews;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    /*
    subscribe() {
      firebase
        .messaging()
        .requestPermission()
        .then(() => firebase.messaging().getToken())
        .then((token) => console.log(token))
        .catch((err) => console.log(err));
    },*/
  },
};
</script>
