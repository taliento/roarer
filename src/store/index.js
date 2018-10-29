import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import tweets from './tweets'

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
  value = value.replace(/#([\w]+)/g, '<a href="/search/$1" target="_blank">#$1</a>')
  // @name RegExp
  return value.replace(/@([\w]+)/g, '<a href="/search/$1" target="_blank">@$1</a>')
})

/* cd isVisible
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tweets
    }
  })

  return Store
}
