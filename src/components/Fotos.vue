<template>
  <div>
    <h1>Fotos vom SWC</h1>
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
        <v-expansion-panel
          v-for="singleNews in fotos"
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
          </v-card>
        </v-expansion-panel>
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
