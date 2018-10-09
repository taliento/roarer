<template>
  <q-page padding>

    <q-search v-model="searchText" @input="searchTweets"/>

    <q-spinner v-if="loading"/>

    <q-list v-else-if="response != null" highlight>
      <q-list-header>Recent tweets</q-list-header>

      <q-item v-for="(tweet, index) of response.data.statuses" :key="index">
        <q-item-side>
          <q-item-tile avatar>
            <img :src="tweet.user.profile_image_url" :alt="tweet.user.name" :title="tweet.user.name" v-on:click="goToProfile(tweet.user.screen_name)">
          </q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile label multiline="true">{{tweet.full_text}}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile label>{{tweet.user.created_at | formatDate}}</q-item-tile>
        </q-item-side>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Statuses',
  data () {
    return {
      searchText: '',
      response: null,
      loading: false
    }
  },
  methods: {
    goToProfile: function (name) {
      window.location = 'https://twitter.com/' + name
    },
    searchTweets: function (event) {
      this.loading = true
      axios
        .get('http://localhost:3000/search/' + this.searchText)
        .then(response => {
          this.response = response
          this.loading = false
        })
    }
  }
}
</script>

<style>
</style>
