<template>
  <v-container>
    <div>
      <div>
        <div><h2>Schietwettercup 2021</h2></div>
        <div><h4>Open Beta</h4></div>
        <br />
        <!--News Sektion -->
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
        <!--Subscribe Push Nachricht Test
        <v-btn @click="subscribe">Subscribe</v-btn>
        -->

        <!--Subscribe Push Nachricht Test -->
        <v-layout row wrap v-if="!loading">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="singleNews in news"
              :key="singleNews.id"
              class="mb-2"
              ><router-link style="text-decoration: none;" to="/news">
                <v-card class="mx-auto" max-width="400"
                  ><h3 style="padding: 20px;">News</h3>
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="singleNews.imageUrl"
                  >
                    <v-card-title>{{ singleNews.title }}</v-card-title>
                  </v-img>

                  <v-expansion-panel-content class="text--primary">
                    <div>{{ singleNews.description }}</div>
                  </v-expansion-panel-content>
                </v-card></router-link
              >
            </v-expansion-panel>
            <!--Score -->
            <v-container fluid>
              <v-col cols="12"
                ><v-row justify="space-between">
                  <router-link style="text-decoration: none;" to="/spielplan">
                    <v-card class="mx-auto" max-width="400"
                      ><h3 style="padding: 20px;">
                        <v-icon>mdi-calendar</v-icon> Spielplan
                      </h3>
                    </v-card></router-link
                  >
                  <router-link style="text-decoration: none;" to="/results">
                    <v-card class="mx-auto" max-width="400"
                      ><h3 style="padding: 20px;">
                        <v-icon>mdi-account-multiple</v-icon> Gruppen
                      </h3>
                    </v-card></router-link
                  >
                </v-row>
              </v-col></v-container
            >

            <v-expansion-panel class="mb-2" style="margin-top: 10px;"
              ><router-link style="text-decoration: none;" to="/pegelstand">
                <v-card class="mx-auto" max-width="400"
                  ><h3 style="padding: 20px;">Pegelstand messen</h3>
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    src="../assets/bier_klein.jpg"
                  >
                  </v-img>

                  <v-expansion-panel-content class="text--primary">
                  </v-expansion-panel-content> </v-card
              ></router-link>
            </v-expansion-panel>

            <v-expansion-panel class="mb-2" style="margin-top: 10px;"
              ><router-link style="text-decoration: none;" to="/musik">
                <v-card class="mx-auto" max-width="400"
                  ><h3 style="padding: 20px;">Musikwünsche</h3>
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    src="../assets/nach_links.jpg"
                  >
                  </v-img>

                  <v-expansion-panel-content class="text--primary">
                  </v-expansion-panel-content> </v-card
              ></router-link>
            </v-expansion-panel>
          </v-expansion-panels>
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
