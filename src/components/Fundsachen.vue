<template>
  <div>
    <h1>Fundsachen</h1>
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
            <!-- Mail mit vordefiniertem Betreff zur Fundsache -->
            <v-card-text
              ><a
                :href="`mailto:${mailAdress}?subject=Fundsache: ${singleNews.title}&body=${mailText1} ${singleNews.title} ${mailText2}`"
              >
                Kontaktmail zur Fundsache schicken
              </a></v-card-text
            >
            <v-expansion-panel-header><b>Infos...</b></v-expansion-panel-header>

            <v-expansion-panel-content class="text--primary">
              <div>{{ singleNews.description }}</div>
            </v-expansion-panel-content>
          </v-card>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailAdress: "frieder@griem-online.de",
      mailText1: "Moin, ich habe beim Schietwetercup ",
      mailText2:
        "vergessen. Es wäre super, wenn wir besprechen können, wie ich es wieder bekomme. Viele Grüße NAME EINTRAGEN",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    lostItems() {
      return this.$store.getters.loadedLostItems;
    },
  },
};
</script>
