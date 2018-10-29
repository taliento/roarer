<template>
  <q-page padding>
    <q-search v-model="searchText" @input="searchTweets"/>
    <q-infinite-scroll inline style="height: 400px; overflow: auto;" v-if="tweets.length > 0" :handler="refresher">
      <tweet v-for="(tweet, index) of tweets" :key="index" :tweet="tweet"></tweet>
      <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import axios from 'axios'
import Tweet from '../components/Tweet'

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
    searchTweets: function (event) {
      axios
        .get(process.env.API + 'search/' + encodeURIComponent(this.searchText))
        .then((response) => {
          this.response = response
          this.tweets = response.data.statuses
        })
    },
    refresher (index, done) {
      if (!this.response) {
        return
      }
      axios
        .get(process.env.API + 'refresh/' + encodeURIComponent(this.response.data.search_metadata.next_results))
        .then((response) => {
          this.response = response
          this.tweets = this.tweets.concat(response.data.statuses)
          done()
        })
    }
  },
  mounted: function () {
    if (this.query || this.query !== '') {
      this.searchText = this.query
      this.searchTweets(null)
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  components: {
    Tweet
  }
}
</script>

<style>
</style>
