<template>
  <div>
    <h1>News</h1>
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

    <v-layout v-if="!loading" wrap>
      <v-flex md4 v-for="singleNews in news" :key="singleNews.id">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="singleNews.imageUrl"
          >
            <v-card-title>{{ singleNews.title }}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ singleNews.date | day }}</div>
            <div>{{ singleNews.description }}</div>
          </v-card-text>
        </v-card>
        <br />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    news() {
      return this.$store.getters.loadedNews;
    },
  },
};
</script>
