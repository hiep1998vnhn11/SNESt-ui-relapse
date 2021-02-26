<template>
  <div id="app">
    <layout />
    <router-view />
  </div>
</template>

<script>
import Layout from '@/layout/MainContainer'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>
