<template
  ><v-expansion-panels>
    <v-expansion-panel
      v-for="singleNews in news"
      :key="singleNews.id"
      class="mb-2"
    >
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="singleNews.imageUrl"
        >
          <v-card-title>{{ singleNews.title }}</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div>{{ singleNews.date }}</div>
        </v-card-text>

        <v-expansion-panel-header
          ><b>Beitrag lesen...</b></v-expansion-panel-header
        >

        <v-expansion-panel-content class="text--primary">
          <div>{{ singleNews.description }}</div>
        </v-expansion-panel-content>

        <!--<v-card-actions
          ><v-btn outlined :to="/meetup/ + news.id">
            View News</v-btn
          ></v-card-actions
        >-->
      </v-card>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  computed: {
    news() {
      return this.$store.getters.loadedNews;
    },
  },
};
</script>
