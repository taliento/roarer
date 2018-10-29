<template>
  <q-item link :to='"/search/"+trend.query'>
    <q-item-main>
      <q-item-tile label>{{trend.name}}</q-item-tile>
    </q-item-main>
    <q-item-side>
      <q-item-tile>
        {{trend.tweet_volume}}
      </q-item-tile>
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  name: 'Trend',
  data () {
    return {}
  },
  props: {
    trend: {
      type: Object
    }
  }
}
</script>

<style>
</style>
