<template lang="pug">
  v-navigation-drawer( app :value="drawer" @input="$emit('input', $event)" dark)
    v-list-item.logo(to="/")
      Spinner.mr-2
      h1 NAYKA
    v-divider
    v-list      
      v-list-item(link to="/user")
        v-avatar.mr-5(size="30" color="#68b3c8")
          v-img(:src="user.image")
        v-list-item-content
          v-list-item-title {{ user.name }}
          v-list-item-subtitle {{ user.email }}

    v-divider
    v-list(nav dense)
      v-list-item(
        v-for="(page, i) in pages" 
        :key="'link-' + i"
        :to="path + page.href"
        nuxt exact link
      )
          v-list-item-icon
            v-icon {{ page.icon }}
          v-list-item-title {{ page.title }}

</template>

<script>
import Spinner from '~/components/Spinner.vue'

export default {
  components: { Spinner },
  model: {
    prop: 'drawer',
    event: 'input',
  },
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    pages: [
      { title: 'Дашборд', href: '/', icon: 'mdi-chart-pie' },
      { title: 'Записи', href: '/notes', icon: 'mdi-note' },
      { title: 'Эксперименты', href: '/labs', icon: 'mdi-flask' },
      { title: 'Источники', href: '/sources', icon: 'mdi-link-variant' },
      { title: 'Поиск по тегам', href: '/search', icon: 'mdi-tag' },
      { title: 'Граф знаний', href: '/graph', icon: 'mdi-graphql' },
    ],
  }),
  computed: {
    path() {
      return this.$route.path.split('/').slice(0, 3).join('/')
    },
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  max-height: none !important;
  .logo {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 8px;
  }
  .v-list-item__subtitle {
    font-size: 12px;
  }
  .logo-img {
    margin-top: 5px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
