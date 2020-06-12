<template
  ><v-container
    ><div>
      <div><h2>Schietwettercup 2021</h2></div>
      <br />
      <!--News Sektion -->
      <v-layout row wrap v-if="!loading">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="singleNews in news"
            :key="singleNews.id"
            class="mb-2"
          >
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
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
    </div>
    <app-footer></app-footer></v-container
></template>

<script>
export default {
  //Methode, bei der die News aus dem vuex store geladen werden
  computed: {
    news() {
      return this.$store.getters.featuredNews;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
