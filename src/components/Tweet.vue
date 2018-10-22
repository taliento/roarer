<template>
  <q-card inline style="width: 95%">
    <q-item>
      <q-item-side :avatar="tweet.user.profile_image_url" :alt="tweet.user.name" :title="tweet.user.name" v-on:click="goToProfile(tweet.user.screen_name)" />
      <q-item-main>
        <q-item-tile label><p v-html="$options.filters.tweetParser(tweet.full_text)"></p></q-item-tile>
        <q-item-tile sublabel><p class="text-faded">{{tweet.created_at | formatDate}}</p></q-item-tile>
      </q-item-main>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: 'Tweet',
  props: {
    tweet: {
      type: Object
    }
  },
  methods: {
    goToProfile: function (name) {
      window.location = 'https://twitter.com/' + name
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
