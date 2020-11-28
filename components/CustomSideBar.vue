<template lang="pug">
  v-navigation-drawer( app :value="drawer" @input="$emit('input', $event)" dark)
    v-list-item.logo(to="/")
    v-divider
    v-list
      v-list-item(class="px-2")
        v-list-item-avatar
          v-img(:src="user.image")
      
      v-list-item(link)
        v-list-item-content
          v-list-item-title(class="title") {{ user.name }}
          v-list-item-subtitle {{ user.email }}

    v-divider
    v-list(nav dense)
      v-list-item(link v-for="(page, i) in pages" :key="'link-' + i" nuxt :to="path + page.href")
          v-list-item-icon
            v-icon {{ page.icon }}
          v-list-item-title {{ page.title }}

</template>

<script>
export default {
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
      { title: 'Записи', href: '/#', icon: 'mdi-note' },
      { title: 'Эксперименты', href: '/labs', icon: 'mdi-flask' },
      { title: 'Источники', href: '/sources', icon: 'mdi-link-variant' },
      { title: 'Поиск по тегам', href: '/#', icon: 'mdi-tag' },
      { title: 'Граф знаний', href: '/#', icon: 'mdi-graphql' },
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
  .logo-img {
    margin-top: 5px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
