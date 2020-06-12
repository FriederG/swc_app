<template>
  <vue-instagram
    token="IGQVJWLXdOVXAtQjkweG5wZAGtLUTRjTkQ5VXlZAWTlYYkdKZA09pVS15OGVfTjF0UjZAVQnFONnBvb2FNbWJKLU1MT1dhNUlRTnRqU2VLUjdoLXBSQkc1d2xJMGFjdDI2cXQ5aWtsQVdSZAUxpSl9Ja2x3TQZDZD"
    :count="5"
    :tags="['segeln', 'hashtag2']"
    mediaType="image"
  >
    <template slot="feeds" slot-scope="props">
      <li class="fancy-list">{{ props.feed.link }}</li>
    </template>
    <template slot="error" slot-scope="props">
      <div class="fancy-alert">{{ props.error.error_message }}</div>
    </template>
  </vue-instagram>
</template>

<script>
import VueInstagram from "vue-instagram";

export default {
  name: "App",

  components: {
    VueInstagram,
  },
};
</script>
