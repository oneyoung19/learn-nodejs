<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import titleMixin from './mixins/title'

export default {
  name: 'Home',
  mixins: [titleMixin],
  components: {
    HelloWorld
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    console.log('route.query.id', route.query.id)
    return store.dispatch('fetchItem', route.query.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items[this.$route.query.id]
    }
  }
}
</script>
