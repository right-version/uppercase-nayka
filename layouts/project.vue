<template lang="pug">
v-app
  c-side-bar.custom-dark(v-model='sidebar')

  v-main.custom-light
    v-app-bar(app)
      v-app-bar-nav-icon(v-if='!sidebar', @click.stop='sidebar = !sidebar')
    v-container
      nuxt

    v-footer(app, absolute)
      v-col.text-center(cols='12')
        span &copy; {{ new Date().getFullYear() }} - UPPERCASE
</template>

<script>
import CSideBar from '~/components/CustomSideBar.vue'
import api from '~/assets/js/api.js'

export default {
  components: { CSideBar },
  data: () => ({
    sidebar: true,
  }),
  beforeMount() {
    if (window.innerWidth < 1264) this.sidebar = false
  },
}
</script>

<style lang="scss" scoped>
.v-main {
  padding-bottom: 0 !important;
}
</style>
