<template
  ><v-expansion-panels>
    <h2>News bearbeiten</h2>
    <br /><br />
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
        <edit-news-dialog :news="singleNews"></edit-news-dialog>
        <delete-news-dialog :news="singleNews"></delete-news-dialog>
        <v-card-text class="text--primary">
          <div>{{ singleNews.date | day }}</div>
        </v-card-text>
        <v-expansion-panel-header
          ><b>Beitrag anzeigen...</b></v-expansion-panel-header
        >

        <v-expansion-panel-content class="text--primary">
          <div>{{ singleNews.description }}</div>
        </v-expansion-panel-content>
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
