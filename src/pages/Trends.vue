<template>
  <q-page padding>
    <q-list highlight>
      <q-list-header>Top #50</q-list-header>
      <trend v-for="(trend, index) of trends" :key="index" :trend="trend"></trend>
    </q-list>
  </q-page>
</template>

<script>
import axios from 'axios'
import Trend from '../components/Trend'

export default {
  // name: 'PageName',
  data () {
    return {
      trends: []
    }
  },
  mounted: function () {
    axios
      .get(process.env.API + 'trends')
      .then((response) => {
        this.trends = response.data[0].trends
      })
  },
  components: {
    Trend
  }
}
</script>

<style>
</style>
