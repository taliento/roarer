import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import example from './module-example'

Vue.use(Vuex)

Vue.filter('formatDate', function (value) {
  if (value) {
    if (moment(value).isSame(new Date(), 'day')) {
      return 'Today' + ' ' + moment(String(value)).format('HH:mm')
    }
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})

Vue.filter('tweetParser', function (value) {
  if (!value) {
    return
  }
  // retweet
  value = value.replace(/^RT?([\w]+)/g, '<i class="material-icons">autorenew</i>')
  //  URLs starting with http://, https://, or ftp://
  value = value.replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim, '<a href="$1" target="_blank">$1</a>')
  // hashtag RegExp
  value = value.replace(/#([\w]+)/g, '<a href="https://twitter.com/hashtag/$1" target="_blank">#$1</a>')
  // @name RegExp
  return value.replace(/@([\w]+)/g, '<a href="https://twitter.com/$1" target="_blank">@$1</a>')
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example
    }
  })

  return Store
}
