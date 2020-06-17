<template>
  <div>
    <h1>Pegelstand</h1>
    <br />
    <v-simple-table v-if="entered">
      <table>
        <tr>
          <td><b>Bier</b></td>
          <td>{{ beer_count }}</td>
          <td>
            <v-btn v-on:click="more_beer"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn v-on:click="less_beer"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
        <tr>
          <td><b>Wein</b></td>
          <td>{{ wine_count }}</td>
          <td>
            <v-btn v-on:click="more_wine"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn v-on:click="less_wine"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
        <tr>
          <td><b>Shot</b></td>
          <td>{{ shot_count }}</td>
          <td>
            <v-btn v-on:click="more_shots"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn v-on:click="less_shots"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
        <tr>
          <td><b>Drink</b></td>
          <td>{{ drink_count }}</td>
          <td>
            <v-btn v-on:click="more_drinks"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
          <td>
            <v-btn v-on:click="less_drinks"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
      </table>
      <p v-if="gender === 'male'">Dein Pegel: {{ alc_calc_male }}</p>
      <p v-if="gender === 'female'">Dein Pegel: {{ alc_calc_female }}</p>
    </v-simple-table>

    <div v-if="entered !== true">
      <input type="radio" id="rMale" value="male" v-model="gender" />
      <label for="rMale">Male</label>
      <input type="radio" id="rFemale" value="female" v-model="gender" />
      <label for="rFemale">Female</label>
      <div>You are a {{ gender }}.</div>
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
      entered: false,
    };
  },
  methods: {
    more_beer() {
      this.beer_count = this.beer_count + 1;
    },
    more_wine() {
      this.wine_count = this.wine_count + 1;
    },
    more_shots() {
      this.shot_count = this.shot_count + 1;
    },
    more_drinks() {
      this.drink_count = this.drink_count + 1;
    },
    less_beer() {
      if (this.beer_count > 0) {
        this.beer_count = this.beer_count - 1;
      }
    },
    less_wine() {
      if (this.wine_count > 0) {
        this.wine_count = this.wine_count - 1;
      }
    },
    less_shots() {
      if (this.shot_count > 0) {
        this.shot_count = this.shot_count - 1;
      }
    },
    less_drinks() {
      if (this.drink_count > 0) {
        this.drink_count = this.drink_count - 1;
      }
    },
    enter() {
      this.entered = true;
    },
  },
  computed: {
    alc_calc_male() {
      return (
        (this.beer_count * 12 +
          this.wine_count * 15 +
          this.shot_count * 7 +
          this.drink_count * 12) /
        (70 * 0.55)
      );
    },
    alc_calc_female() {
      return (
        (this.beer_count * 12 +
          this.wine_count * 15 +
          this.shot_count * 7 +
          this.drink_count * 12) /
        (70 * 0.68)
      );
    },
  },
};
</script>

<style scoped></style>
