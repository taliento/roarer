<template>
  <q-item link :to='"/search/"+trend.query'>
    <q-item-main>
      <q-item-tile label>{{trend.name}}</q-item-tile>
    </q-item-main>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  props: {
    trend: {
      type: Object
    }
  },
  methods: {
    handler () {
      // TODO GO TO SEARCH WITH QUERY this.trend.query
    }
  }
}
</script>

<style>
</style>
