<template>
  <div>
    <h1>{{ $t("Pegelstand") }}</h1>
    <br />
    <v-simple-table v-if="(entered === 'true')">
      <table>
        <tr>
          <td>
            <b>{{ $t("Bier") }} (0,3l)</b>
          </td>
          <td>{{ beer_count }}</td>
          <td>
            <v-btn outlined color="green" v-on:click="more_beer"
              ><v-icon>mdi-beer</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn outlined color="red" v-on:click="less_beer"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td>
            <b>{{ $t("Bier") }} (0,5l)</b>
          </td>
          <td>{{ l_beer_count }}</td>
          <td>
            <v-btn outlined color="green" v-on:click="more_l_beer"
              ><v-icon>mdi-beer</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn outlined color="red" v-on:click="less_l_beer"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td>
            <b>{{ $t("Radler") }} (0,3l)</b>
          </td>
          <td>{{ radler_count }}</td>
          <td>
            <v-btn outlined color="green" v-on:click="more_radler"
              ><v-icon>mdi-beer</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn outlined color="red" v-on:click="less_radler"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td>
            <b>{{ $t("Wein") }}</b>
          </td>
          <td>{{ wine_count }}</td>
          <td>
            <v-btn outlined color="green" v-on:click="more_wine"
              ><v-icon>mdi-beer</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn outlined color="red" v-on:click="less_wine"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td><b>Shot</b></td>
          <td>{{ shot_count }}</td>
          <td>
            <v-btn outlined color="green" v-on:click="more_shots"
              ><v-icon>mdi-beer</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn outlined color="red" v-on:click="less_shots"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td><b>Drink</b></td>
          <td>{{ drink_count }}</td>
          <td>
            <v-btn outlined color="green" v-on:click="more_drinks"
              ><v-icon>mdi-beer</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn outlined color="red" v-on:click="less_drinks"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td>
            <b>Drink {{ $t("strong") }}</b>
          </td>
          <td>{{ s_drink_count }}</td>
          <td>
            <v-btn outlined color="green" v-on:click="more_s_drinks"
              ><v-icon>mdi-beer</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn outlined color="red" v-on:click="less_s_drinks"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
      </table>
      <br />
      <h3 v-if="gender === 'male'">
        {{ $t("DeinPegel") }}: {{ alc_calc_male.toFixed(2) }} Promille
      </h3>
      <h3 v-if="gender === 'female'">
        {{ $t("DeinPegel") }}: {{ alc_calc_female.toFixed(2) }} Promille
      </h3>
      <br />
      <v-card outlined>
        <!-- Alk-Feedback -->
        <v-card-title v-if="!check">{{ $t("AufGehts") }}</v-card-title>

        <v-card-title v-if="check < 0.5 && check > 0.1">{{
          $t("Ranhalten")
        }}</v-card-title>
        <v-card-title v-if="check < 1 && check > 0.5">{{
          $t("Fahrt")
        }}</v-card-title>
        <v-card-title v-if="check < 1.5 && check > 1">{{
          $t("Gut dabei")
        }}</v-card-title>
        <v-card-title v-if="check < 2 && check > 1.5">{{
          $t("SagBescheid")
        }}</v-card-title>
        <v-card-title v-if="check < 3 && check > 2"
          >{{ $t("Glückwunsch") }}
          <iframe
            src="https://giphy.com/embed/lXiRuVywOOkJpN1Dy"
            width="300"
            height="360"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe
        ></v-card-title>
        <v-card-title v-if="check < 10 && check > 3">{{
          $t("Oha")
        }}</v-card-title>
      </v-card>
      <b v-if="check > 10">
        <iframe
          src="https://giphy.com/embed/14cDsqOkks6O8U"
          width="300"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </b>

      <br /><br />
      <v-btn outlined color="red" v-on:click="clear">Reset</v-btn>
    </v-simple-table>

    <div v-if="(entered === 'false')">
      <label class="mr-2" for="rMale">{{ $t("Mann") }}: </label>
      <input type="radio" id="rMale" value="male" v-model="gender" />

      <label class="ml-2 mr-2" for="rFemale">{{ $t("Frau") }}: </label>
      <input type="radio" id="rFemale" value="female" v-model="gender" />

      <br />
      <br />
      <br />
      <br />
      <v-slider
        :max="150"
        :min="40"
        v-model="weight"
        thumb-label="always"
      ></v-slider>
      <p>{{ $t("Gewicht") }}: {{ weight }} kg</p>
      <br />
      <v-btn v-on:click="enter" color="primary">{{ $t("Bestätigen") }}</v-btn>
      <br />
      <br />
      <v-alert style="font-size: small;" type="info">
        {{ $t("OhneGewähr") }}
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pegelstand",

  data() {
    return {
      beer_count: 0,
      l_beer_count: 0,
      radler_count: 0,
      wine_count: 0,
      shot_count: 0,
      drink_count: 0,
      s_drink_count: 0,

      gender: "female",
      weight: 75,
      entered: "false",

      bac: false,
      counter: null,
      pegel_m: null,
      pegel_f: null,

      timestamp_1: null,
      timestamp_2: null,
      time_difference_h: null,
      time_difference_m: null,

      check: null,
    };
  },
  mounted() {
    if (localStorage.getItem("entered") === "true") {
      this.entered = "true";
      this.gender = localStorage.getItem("gender");
      this.weight = parseInt(localStorage.getItem("weight"));
      this.beer_count = parseInt(localStorage.getItem("beer_count"));
      this.l_beer_count = parseInt(localStorage.getItem("l_beer_count"));
      this.radler_count = parseInt(localStorage.getItem("radler_count"));
      this.wine_count = parseInt(localStorage.getItem("wine_count"));
      this.shot_count = parseInt(localStorage.getItem("shot_count"));
      this.drink_count = parseInt(localStorage.getItem("drink_count"));
      this.s_drink_count = parseInt(localStorage.getItem("s_drink_count"));
    } else {
      this.entered = "false";
      this.gender = "female";
      this.weight = 70;
      this.beer_count = 0;
      localStorage.setItem("beer_count", this.beer_count);
      this.wine_count = 0;
      localStorage.setItem("wine_count", this.wine_count);
      this.shot_count = 0;
      localStorage.setItem("shot_count", this.shot_count);
      this.drink_count = 0;
      localStorage.setItem("drink_count", this.drink_count);
      this.l_beer_count = 0;
      localStorage.setItem("l_beer_count", this.l_beer_count);
      this.radler_count = 0;
      localStorage.setItem("radler_count", this.radler_count);
      this.s_drink_count = 0;
      localStorage.setItem("s_drink_count", this.s_drink_count);
    }
    if (localStorage.getItem("bac") === "true") {
      this.bac = true;
    } else if (localStorage.getItem("bac") === "false") {
      this.bac = false;
    }
    this.timestamp_1 = new Date();
    this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
    this.timedifference();
  },

  methods: {
    more_beer() {
      if (this.bac === false) {
        this.timestamp_1 = new Date();
        localStorage.setItem("timestamp_1", this.timestamp_1);
        this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
        this.bac = true;
        localStorage.setItem("bac", "true");
        this.timedifference();
      }

      this.beer_count = this.beer_count + 1;
      localStorage.setItem("beer_count", this.beer_count);
    },
    more_l_beer() {
      if (this.bac === false) {
        this.timestamp_1 = new Date();
        localStorage.setItem("timestamp_1", this.timestamp_1);
        this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
        this.bac = true;
        localStorage.setItem("bac", "true");
        this.timedifference();
      }

      this.l_beer_count = this.l_beer_count + 1;
      localStorage.setItem("beer_count", this.l_beer_count);
    },
    more_radler() {
      if (this.bac === false) {
        this.timestamp_1 = new Date();
        localStorage.setItem("timestamp_1", this.timestamp_1);
        this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
        this.bac = true;
        localStorage.setItem("bac", "true");
        this.timedifference();
      }

      this.radler_count = this.radler_count + 1;
      localStorage.setItem("radler_count", this.radler_count);
    },

    more_wine() {
      if (this.bac === false) {
        this.timestamp_1 = new Date();
        localStorage.setItem("timestamp_1", this.timestamp_1);
        this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
        this.bac = true;
        localStorage.setItem("bac", "true");
        this.timedifference();
      }

      this.wine_count = this.wine_count + 1;
      localStorage.setItem("wine_count", this.wine_count);
    },
    more_shots() {
      if (this.bac === false) {
        this.timestamp_1 = new Date();
        localStorage.setItem("timestamp_1", this.timestamp_1);
        this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
        this.bac = true;
        localStorage.setItem("bac", "true");
        this.timedifference();
      }

      this.shot_count = this.shot_count + 1;
      localStorage.setItem("shot_count", this.shot_count);
    },
    more_drinks() {
      if (this.bac === false) {
        this.timestamp_1 = new Date();
        localStorage.setItem("timestamp_1", this.timestamp_1);
        this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
        this.bac = true;
        localStorage.setItem("bac", "true");
        this.timedifference();
      }

      this.drink_count = this.drink_count + 1;
      localStorage.setItem("drink_count", this.drink_count);
    },
    more_s_drinks() {
      if (this.bac === false) {
        this.timestamp_1 = new Date();
        localStorage.setItem("timestamp_1", this.timestamp_1);
        this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
        this.bac = true;
        localStorage.setItem("bac", "true");
        this.timedifference();
      }

      this.s_drink_count = this.s_drink_count + 1;
      localStorage.setItem("s_drink_count", this.s_drink_count);
    },
    less_beer() {
      if (
        this.beer_count === 1 &&
        this.l_beer_count === 0 &&
        this.radler_count === 0 &&
        this.shot_count === 0 &&
        this.drink_count === 0 &&
        this.s_drink_count === 0 &&
        this.wine_count === 0
      ) {
        this.beer_count = this.beer_count - 1;
        localStorage.setItem("beer_count", this.beer_count);
        this.bac = false;
        localStorage.setItem("bac", "false");
        clearInterval(this.counter);
      } else if (this.beer_count > 0) {
        this.beer_count = this.beer_count - 1;
        localStorage.setItem("beer_count", this.beer_count);
      }
    },
    less_l_beer() {
      if (
        this.l_beer_count === 1 &&
        this.radler_count === 0 &&
        this.beer_count === 0 &&
        this.shot_count === 0 &&
        this.drink_count === 0 &&
        this.s_drink_count === 0 &&
        this.wine_count === 0
      ) {
        this.l_beer_count = this.l_beer_count - 1;
        localStorage.setItem("l_beer_count", this.l_beer_count);
        this.bac = false;
        localStorage.setItem("bac", "false");
        clearInterval(this.counter);
      } else if (this.l_beer_count > 0) {
        this.l_beer_count = this.l_beer_count - 1;
        localStorage.setItem("l_beer_count", this.l_beer_count);
      }
    },
    less_radler() {
      if (
        this.radler_count === 1 &&
        this.l_beer_count === 0 &&
        this.beer_count === 0 &&
        this.shot_count === 0 &&
        this.drink_count === 0 &&
        this.s_drink_count === 0 &&
        this.wine_count === 0
      ) {
        this.radler_count = this.radler_count - 1;
        localStorage.setItem("radler_count", this.radler_count);
        this.bac = false;
        localStorage.setItem("bac", "false");
        clearInterval(this.counter);
      } else if (this.radler_count > 0) {
        this.radler_count = this.radler_count - 1;
        localStorage.setItem("radler_count", this.radler_count);
      }
    },
    less_wine() {
      if (
        this.beer_count === 0 &&
        this.shot_count === 0 &&
        this.radler_count === 0 &&
        this.drink_count === 0 &&
        this.l_beer_count === 0 &&
        this.s_drink_count === 0 &&
        this.wine_count === 1
      ) {
        this.wine_count = this.wine_count - 1;
        localStorage.setItem("wine_count", this.wine_count);
        this.bac = false;
        localStorage.setItem("bac", "false");
        clearInterval(this.counter);
      } else if (this.wine_count > 0) {
        this.wine_count = this.wine_count - 1;
        localStorage.setItem("wine_count", this.wine_count);
      }
    },
    less_shots() {
      if (
        this.beer_count === 0 &&
        this.shot_count === 1 &&
        this.radler_count === 0 &&
        this.drink_count === 0 &&
        this.s_drink_count === 0 &&
        this.l_beer_count === 0 &&
        this.wine_count === 0
      ) {
        this.shot_count = this.shot_count - 1;
        localStorage.setItem("shot_count", this.shot_count);
        this.bac = false;
        localStorage.setItem("bac", "false");
        clearInterval(this.counter);
      } else if (this.shot_count > 0) {
        this.shot_count = this.shot_count - 1;
        localStorage.setItem("shot_count", this.shot_count);
      }
    },
    less_drinks() {
      if (
        this.beer_count === 0 &&
        this.shot_count === 0 &&
        this.radler_count === 0 &&
        this.s_drink_count === 0 &&
        this.drink_count === 1 &&
        this.l_beer_count === 0 &&
        this.wine_count === 0
      ) {
        this.drink_count = this.drink_count - 1;
        localStorage.setItem("drink_count", this.drink_count);
        this.bac = false;
        localStorage.setItem("bac", "false");
        clearInterval(this.counter);
      } else if (this.drink_count > 0) {
        this.drink_count = this.drink_count - 1;
        localStorage.setItem("drink_count", this.drink_count);
      }
    },
    less_s_drinks() {
      if (
        this.beer_count === 0 &&
        this.shot_count === 0 &&
        this.radler_count === 0 &&
        this.s_drink_count === 1 &&
        this.drink_count === 0 &&
        this.l_beer_count === 0 &&
        this.wine_count === 0
      ) {
        this.s_drink_count = this.s_drink_count - 1;
        localStorage.setItem("s_drink_count", this.s_drink_count);
        this.bac = false;
        localStorage.setItem("bac", "false");
        clearInterval(this.counter);
      } else if (this.s_drink_count > 0) {
        this.s_drink_count = this.s_drink_count - 1;
        localStorage.setItem("s_drink_count", this.s_drink_count);
      }
    },
    enter() {
      this.entered = "true";
      this.timestamp_1 = new Date();
      localStorage.setItem("timestamp_1", this.timestamp_1);
      this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
      localStorage.setItem("weight", this.weight);
      localStorage.setItem("gender", this.gender);
      localStorage.setItem("entered", this.entered);
    },

    clear() {
      this.gender = "female";
      this.weight = 70;
      this.entered = "false";

      this.bac = false;
      clearInterval(this.counter);
      this.check = "";

      this.beer_count = 0;
      this.wine_count = 0;
      this.shot_count = 0;
      this.drink_count = 0;
      this.l_beer_count = 0;
      this.radler_count = 0;
      this.s_drink_count = 0;

      localStorage.setItem("beer_count", this.beer_count);
      localStorage.setItem("wine_count", this.wine_count);
      localStorage.setItem("shot_count", this.shot_count);
      localStorage.setItem("drink_count", this.drink_count);
      localStorage.setItem("l_beer_count", this.l_beer_count);
      localStorage.setItem("radler_count", this.radler_count);
      localStorage.setItem("s_drink_count", this.s_drink_count);
      localStorage.setItem("entered", "false");
      localStorage.setItem("weight", 70);
      localStorage.setItem("gender", "female");
      localStorage.setItem("bac", "false");
    },

    timedifference() {
      if (this.bac === true) {
        this.counter = setInterval(() => {
          this.bac_check();
          this.timestamp_1 = new Date();
          //Berechnung der Stundenanzahl seit Beginn des Alkoholkonsums
          this.time_difference_h =
            Math.floor(
              Math.abs(this.timestamp_2 - this.timestamp_1) / 1000 / 3600
            ) % 24;
          //Berechnung der Minutenanzahl seit der letzten Stunde
          this.time_difference_m =
            Math.floor(
              Math.abs(this.timestamp_2 - this.timestamp_1) / 1000 / 60
            ) % 60;
        }, 1000);
      } else if (this.bac === false) {
        clearInterval(this.counter);
      }
    },

    bac_check() {
      if (this.gender === "female") {
        this.check =
          (this.beer_count * 12 +
            this.l_beer_count * 20 +
            this.wine_count * 15 +
            this.radler_count * 5 +
            this.s_drink_count * 30 +
            this.shot_count * 7 +
            this.drink_count * 12) /
            (this.weight * 0.55) -
          this.time_difference_h * 0.15 -
          this.time_difference_m * 0.0025;

        if (this.check <= 0) {
          this.bac = false;
          localStorage.setItem("bac", "false");
          clearInterval(this.counter);
          this.timestamp_1 = new Date();
          localStorage.setItem("timestamp_1", this.timestamp_1);
          this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
          this.beer_count = 0;
          localStorage.setItem("beer_count", this.beer_count);
          this.wine_count = 0;
          localStorage.setItem("wine_count", this.wine_count);
          this.shot_count = 0;
          localStorage.setItem("shot_count", this.shot_count);
          this.drink_count = 0;
          localStorage.setItem("drink_count", this.drink_count);
          this.l_beer_count = 0;
          localStorage.setItem("l_beer_count", this.l_beer_count);
          this.radler_count = 0;
          localStorage.setItem("radler_count", this.radler_count);
          this.s_drink_count = 0;
          localStorage.setItem("s_drink_count", this.radler_count);
        }
      } else if (this.gender === "male") {
        this.check =
          (this.beer_count * 12 +
            this.l_beer_count * 20 +
            this.wine_count * 15 +
            this.radler_count * 5 +
            this.s_drink_count * 30 +
            this.shot_count * 7 +
            this.drink_count * 12) /
            (this.weight * 0.68) -
          this.time_difference_h * 0.15 -
          this.time_difference_m * 0.0025;

        if (this.check <= 0) {
          this.bac = false;
          localStorage.setItem("bac", "false");
          clearInterval(this.counter);
          this.timestamp_1 = new Date();
          localStorage.setItem("timestamp_1", this.timestamp_1);
          this.timestamp_2 = new Date(localStorage.getItem("timestamp_1"));
          this.beer_count = 0;
          localStorage.setItem("beer_count", this.beer_count);
          this.wine_count = 0;
          localStorage.setItem("wine_count", this.wine_count);
          this.shot_count = 0;
          localStorage.setItem("shot_count", this.shot_count);
          this.drink_count = 0;
          localStorage.setItem("drink_count", this.drink_count);
          this.l_beer_count = 0;
          localStorage.setItem("l_beer_count", this.l_beer_count);
          this.radler_count = 0;
          localStorage.setItem("radler_count", this.radler_count);
          this.s_drink_count = 0;
          localStorage.setItem("s_drink_count", this.s_drink_count);
        }
      }
    },
  },
  computed: {
    alc_calc_male() {
      if (
        this.beer_count === 0 &&
        this.wine_count === 0 &&
        this.drink_count === 0 &&
        this.l_beer_count === 0 &&
        this.radler_count === 0 &&
        this.s_drink_count === 0 &&
        this.shot_count === 0
      ) {
        return 0;
      } else {
        return Math.max(
          0,
          (this.beer_count * 12 +
            this.l_beer_count * 20 +
            this.wine_count * 15 +
            this.radler_count * 5 +
            this.s_drink_count * 30 +
            this.shot_count * 7 +
            this.drink_count * 12) /
            (this.weight * 0.68) -
            this.time_difference_h * 0.15 -
            this.time_difference_m * 0.0025
        );
      }
    },
    alc_calc_female() {
      if (
        this.beer_count === 0 &&
        this.l_beer_count === 0 &&
        this.radler_count === 0 &&
        this.s_drink_count === 0 &&
        this.wine_count === 0 &&
        this.drink_count === 0 &&
        this.shot_count === 0
      ) {
        return 0;
      } else {
        return Math.max(
          0,
          (this.beer_count * 12 +
            this.l_beer_count * 20 +
            this.wine_count * 15 +
            this.radler_count * 5 +
            this.s_drink_count * 30 +
            this.shot_count * 7 +
            this.drink_count * 12) /
            (this.weight * 0.55) -
            this.time_difference_h * 0.15 -
            this.time_difference_m * 0.0025
        );
      }
    },
  },
};
</script>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
input[type="radio"] {
  -ms-transform: scale(3); /* IE 9 */
  -webkit-transform: scale(3); /* Chrome, Safari, Opera */
  transform: scale(3);
  margin-left: 10px;
  margin-right: 10px;
}
</style>
