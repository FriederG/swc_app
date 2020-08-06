<template
  ><v-expansion-panels>
    <h2>Fundsachen bearbeiten</h2>
    <br /><br />
    <v-expansion-panel
      v-for="singleNews in lostItems"
      :key="singleNews.id"
      class="mb-2"
    >
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="singleNews.imageUrl"
        >
        </v-img>
        <v-card-title>{{ singleNews.title }}</v-card-title>
        <edit-news-dialog
          :news="singleNews"
          :editType="editDeleteType"
        ></edit-news-dialog>
        <delete-news-dialog
          :news="singleNews"
          :deleteType="editDeleteType"
        ></delete-news-dialog>
        <v-card-text class="text--primary"> </v-card-text>
        <v-expansion-panel-header><b>Mehr...</b></v-expansion-panel-header>
        <v-expansion-panel-content class="text--primary">
          <div>{{ singleNews.description }}</div>
        </v-expansion-panel-content>
      </v-card>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data() {
    return {
      editDeleteType: "Fundsachen",
    };
  },
  computed: {
    lostItems() {
      return this.$store.getters.loadedLostItems;
    },
  },
};
</script>
