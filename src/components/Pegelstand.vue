<template>
  <div>
    <h1>Pegelstand</h1>
    <br />
    <v-simple-table v-if="(entered === 'true')">
      <table>
        <tr>
          <td><b>Bier</b></td>
          <td>{{ beer_count }}</td>
          <td>
            <v-btn v-on:click="more_beer"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn color="red" v-on:click="less_beer"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td><b>Wein</b></td>
          <td>{{ wine_count }}</td>
          <td>
            <v-btn v-on:click="more_wine"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn color="red" v-on:click="less_wine"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td><b>Shot</b></td>
          <td>{{ shot_count }}</td>
          <td>
            <v-btn v-on:click="more_shots"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn color="red" v-on:click="less_shots"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
        <tr>
          <td><b>Drink</b></td>
          <td>{{ drink_count }}</td>
          <td>
            <v-btn v-on:click="more_drinks"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn color="red" v-on:click="less_drinks"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </td>
        </tr>
      </table>
      <br />
      <p v-if="gender === 'male'">
        Dein Pegel: {{ alc_calc_male.toFixed(2) }} Promille
      </p>
      <p v-if="gender === 'female'">
        Dein Pegel: {{ alc_calc_female.toFixed(2) }} Promille
      </p>
      <v-btn v-on:click="clear">Reset</v-btn>
    </v-simple-table>

    <div v-if="(entered === 'false')">
      <label for="rMale">Mann: </label>
      <input type="radio" id="rMale" value="male" v-model="gender" />

      <label for="rFemale">Frau: </label>
      <input type="radio" id="rFemale" value="female" v-model="gender" />

      <br />
      <v-slider
        :max="120"
        :min="30"
        v-model="weight"
        thumb-label="always"
      ></v-slider>
      <p>Weight: {{ weight }} kg</p>
      <br />
      <v-btn v-on:click="enter">Bestätigen</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pegelstand",

  data() {
    return {
      beer_count: 0,
      wine_count: 0,
      shot_count: 0,
      drink_count: 0,

      gender: "female",
      weight: 75,
      entered: "false",
    };
  },
  mounted() {
    //Fragt ab ob die Seite bereits auf diesem Gerät aufgerufen wurde
    if (localStorage.getItem("entered") === "true") {
      this.entered = "true";
      this.gender = localStorage.getItem("gender");
      this.weight = parseInt(localStorage.getItem("weight"));
      this.beer_count = parseInt(localStorage.getItem("beer_count"));
      this.wine_count = parseInt(localStorage.getItem("wine_count"));
      this.shot_count = parseInt(localStorage.getItem("shot_count"));
      this.drink_count = parseInt(localStorage.getItem("drink_count"));
    } else {
      this.entered = "false";
      this.gender = "female";
      this.weight = 70;
      this.beer_count = 0;
      this.wine_count = 0;
      this.shot_count = 0;
      this.drink_count = 0;
    }
  },

  methods: {
    more_beer() {
      this.beer_count = this.beer_count + 1;
      localStorage.setItem("beer_count", this.beer_count);
    },
    more_wine() {
      this.wine_count = this.wine_count + 1;
      localStorage.setItem("wine_count", this.wine_count);
    },
    more_shots() {
      this.shot_count = this.shot_count + 1;
      localStorage.setItem("shot_count", this.shot_count);
    },
    more_drinks() {
      this.drink_count = this.drink_count + 1;
      localStorage.setItem("drink_count", this.drink_count);
    },
    less_beer() {
      if (this.beer_count > 0) {
        this.beer_count = this.beer_count - 1;
        localStorage.setItem("beer_count", this.beer_count);
      }
    },
    less_wine() {
      if (this.wine_count > 0) {
        this.wine_count = this.wine_count - 1;
        localStorage.setItem("wine_count", this.wine_count);
      }
    },
    less_shots() {
      if (this.shot_count > 0) {
        this.shot_count = this.shot_count - 1;
        localStorage.setItem("shot_count", this.shot_count);
      }
    },
    less_drinks() {
      if (this.drink_count > 0) {
        this.drink_count = this.drink_count - 1;
        localStorage.setItem("drink_count", this.drink_count);
      }
    },
    enter() {
      this.entered = "true";
      localStorage.setItem("weight", this.weight);
      localStorage.setItem("gender", this.gender);
      localStorage.setItem("entered", this.entered);
    },

    clear() {
      this.gender = "female";
      this.weight = 70;
      this.entered = "false";

      this.beer_count = 0;
      this.wine_count = 0;
      this.shot_count = 0;
      this.drink_count = 0;

      localStorage.setItem("beer_count", this.beer_count);
      localStorage.setItem("wine_count", this.wine_count);
      localStorage.setItem("shot_count", this.shot_count);
      localStorage.setItem("drink_count", this.drink_count);
      localStorage.setItem("entered", "false");
      localStorage.setItem("weight", 70);
      localStorage.setItem("gender", "female");
    },
  },
  computed: {
    alc_calc_male() {
      return (
        (this.beer_count * 12 +
          this.wine_count * 15 +
          this.shot_count * 7 +
          this.drink_count * 12) /
        (this.weight * 0.68)
      );
    },
    alc_calc_female() {
      return (
        (this.beer_count * 12 +
          this.wine_count * 15 +
          this.shot_count * 7 +
          this.drink_count * 12) /
        (this.weight * 0.55)
      );
    },
  },
};
</script>

<style scoped></style>
