<template>
  <q-card inline style="width: 95%">
    <q-item>
      <q-item-main>
        <q-item-tile label><p v-html="$options.filters.tweetParser(retweet.full_text)"></p></q-item-tile>
      </q-item-main>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: 'Retweet',
  props: {
    retweet: {
      type: Object
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
