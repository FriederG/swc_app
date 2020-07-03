<template>
  <!--
  <div>

    <img src="../assets/map_openStreet.jpg" width="100%" />
    Für weitere Informationen klicke auf den Punkt in der Karte.
  </div> -->
  <div>
    <h2>Übersichtsplan</h2>
    Klicke auf die Punkte, um mehr zum jeweiligen Ort zu erfahren.

    <v-hotspot
      :init-options="hotspotConfig"
      @save-data="saveData"
      @after-delete="afterDelete"
    />
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
          "https://kielrugby.com/wp-content/uploads/2020/07/map_openStreet-2.jpg",
        editable: false,
        interactivity: "hover",
        data: [
          {
            Message:
              "Hier gibt es das legendäre Schietwettercup-Buffet. Los gehts morgens um 8:00 Uhr.",
            Title: "Frühstück",
            x: 30,
            y: 6,
          },
          {
            Message: "Hier könnt ihr eure Zelte aufschlagen.",
            Title: "Camp",
            x: 72,
            y: 41,
          },
          {
            Message:
              "Mittags gibt's Gegrilltes. Abends steigt hier die legendäre SWC-Party.",
            Title: "Party Zelt und Grillstation",
            x: 45,
            y: 39,
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
