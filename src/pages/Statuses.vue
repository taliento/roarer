<template>
  <q-page padding>
    <q-search v-model="searchText" @input="searchTweets"/>
    <q-infinite-scroll inline style="height: 400px; overflow: auto;" v-if="tweets.length > 0" :handler="refresher">
      <q-item v-for="(tweet, index) of tweets" :key="index">
        <q-item-side>
          <q-item-tile avatar>
            <img :src="tweet.user.profile_image_url" :alt="tweet.user.name" :title="tweet.user.name" v-on:click="goToProfile(tweet.user.screen_name)">
          </q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile label multiline="true"><span v-html="tweet.full_text"></span></q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile label>{{tweet.created_at | formatDate}}</q-item-tile>
        </q-item-side>
      </q-item>
      <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Statuses',
  data () {
    return {
      searchText: '',
      tweets: [],
      response: null
    }
  },
  methods: {
    goToProfile: function (name) {
      window.location = 'https://twitter.com/' + name
    },
    searchTweets: function (event) {
      axios
        .get(process.env.API + 'search/' + this.searchText)
        .then((response) => {
          this.response = response
          this.tweets = response.data.statuses
        })
    },
    refresher (index, done) {
      axios
        .get(process.env.API + 'refresh' + this.response.data.search_metadata.next_results)
        .then((response) => {
          this.response = response
          this.tweets = this.tweets.concat(response.data.statuses)
          done()
        })
    }
  }
}
</script>

<style>
</style>
