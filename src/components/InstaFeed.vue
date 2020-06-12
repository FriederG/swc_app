<template>
  <vue-instagram
    token="IGQVJXRlB0YThtNEk5SXR0c3hoM051eU5HZAHpGQ1Ftd1NIa1RVRnFMd0RLN2pWYzB5ajBxUUl0TlR5SjUyRF9aalA3cWFkaG5VSHNRdDJhZAVdNbDQ4NjJsLWdxczdnczMwSkRFWmFtLWo5T2k2LVc4SgZDZD"
    :count="10"
    :tags="['boat', 'sailing']"
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
