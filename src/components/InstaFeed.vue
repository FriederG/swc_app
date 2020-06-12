<template>
  <vue-instagram
    token="accessTokenHere"
    :count="5"
    :tags="['hashtag1', 'hashtag2']"
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
