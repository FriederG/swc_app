<template>
  <!--
  <div>

    <img src="../assets/map_openStreet.jpg" width="100%" />
    Für weitere Informationen klicke auf den Punkt in der Karte.
  </div> -->
  <div>
    <h2>{{ $t("Map") }}</h2>

    {{ $t("Click on the Dots") }}

    <v-hotspot
      v-if="this.$i18n.locale === 'de'"
      :init-options="hotspotConfig"
      @save-data="saveData"
      @after-delete="afterDelete"
    />

    <v-hotspot
      v-if="this.$i18n.locale === 'en'"
      :init-options="hotspotConfigEN"
      @save-data="saveData"
      @after-delete="afterDelete"
    />

    <br />
  </div>
</template>

<script>
import VueHotspot from "vue-hotspot";
export default {
  components: {
    "v-hotspot": VueHotspot,
  },
  data() {
    return {
      hotspotConfig: {
        image:
          "https://kielrugby.com/wp-content/uploads/2020/08/map_openStreet2.jpg",
        editable: false,
        interactivity: "hover",
        data: [
          {
            Message:
              "Hier im Vereinsheim gibt es das legendäre Schietwettercup-Buffet. Los gehts morgens um 8:00 Uhr.",
            Title: "Frühstück",
            x: 21,
            y: 24,
          },
          {
            Message: "Hier könnt ihr eure Zelte aufschlagen.",
            Title: "Camp",
            x: 76,
            y: 45,
          },
          {
            Message:
              "Mittags gibt's Gegrilltes. Abends steigt hier die legendäre SWC-Party.",
            Title: "Party Zelt und Grillstation",
            x: 42,
            y: 36,
          },
        ],
        hotspotColor: "green",
        messageBoxColor: "black",
        textColor: "white",
        opacity: 0.9,
      },
      hotspotConfigEN: {
        image:
          "https://kielrugby.com/wp-content/uploads/2020/08/map_openStreet2.jpg",
        editable: false,
        interactivity: "hover",
        data: [
          {
            Message:
              "Here in the clubhouse there is the legendary Schietwettercup buffet. We start at 8:00 in the morning.",
            Title: "Breakfast",
            x: 21,
            y: 24,
          },
          {
            Message: "Here you can pitch your Tents.",
            Title: "Camp",
            x: 76,
            y: 45,
          },
          {
            Message:
              "Lunch is barbecue time. In the evening, you can find the legendary Schwietwettercup Party is here.",
            Title: "Party Tent and Barbecue Station",
            x: 42,
            y: 36,
          },
        ],
        hotspotColor: "green",
        messageBoxColor: "black",
        textColor: "white",
        opacity: 0.9,
      },
    };
  },
  methods: {
    saveData(data) {
      // Do something with the list of hotspots
      console.log(data);
    },
    afterDelete() {
      // Do something after delete
      console.log("Do something after delete ...");
    },
  },
};
</script>
