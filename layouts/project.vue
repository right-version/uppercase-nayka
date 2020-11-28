<template lang="pug">
v-app
  c-side-bar.custom-dark(v-model='sidebar')

  v-main.custom-light
    v-app-bar(app)
      client-only
        v-app-bar-nav-icon.hidden-lg-and-up(@click.stop='sidebar = !sidebar')
        nuxt-link.project-title.h2(:to="`/projects/${$route.params.slug}`" style="color: black;") {{ project.title || ''}}
    v-container
      nuxt

    v-footer(app absolute)
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
  async created() {
    if (this.$route.params.slug) {
      const project = await api.getProjectInfo(
        this.$firebase,
        this.$route.params.slug
      )
      this.$store.commit('SET_PROJECT', project)
    }

    this.$axios
      .$get('http://api.randomdatatools.ru/?unescaped=true')
      .then((res) => {
        if (res.LastName) {
          this.$store.commit('SET_USER', res)
        } else {
          this.$axios
            .$get('http://api.randomdatatools.ru/?unescaped=true')
            .then((res) => this.$store.commit('SET_USER', res))
        }
      })
  },
  beforeMount() {
    if (window.innerWidth < 1264) this.sidebar = false
  },
  computed: {
    project() {
      return this.$store.state.project
    },
  },
}
</script>

<style lang="scss" scoped>
.v-main {
  background: $mainColor !important;
  padding-bottom: 0 !important;

  .project-title {
    width: 100%;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
