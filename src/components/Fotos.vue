<template>
  <div>
    <h1>{{ $t("Photos") }}</h1>
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
    <v-layout v-if="!loading">
      <v-expansion-panels>
        <div
          v-for="singleNews in fotos"
          :key="singleNews.id"
          class="mb-2"
          style="max-width: 600px;"
        >
          <expandable-image
            :src="singleNews.imageUrl"
            class="v-image"
            max-height="100px"
          >
          </expandable-image>
        </div>
      </v-expansion-panels>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    fotos() {
      return this.$store.getters.loadedPhotos;
    },
  },
};
</script>
