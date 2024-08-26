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
  }
}
</script>
