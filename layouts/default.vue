<template lang="pug">
  v-app#app.default-layout
    v-app-bar(fixed app)
      v-container.py-0.fill-height
        v-app-bar-nav-icon.hidden-md-and-up(@click="drawer = !drawer")
        Spinner.mr-3.hidden-sm-and-down
        nuxt-link(to="/" style="color: white;")
          v-toolbar-title.mr-10.hidden-sm-and-down NAYKA

        nuxt-link.hidden-sm-and-down(
          v-for="link in links"
          :to="link.href"
          :key="link.title"
        )
          v-btn(text) 
            v-icon mdi-chevron-right
            | {{ link.title }}
        v-spacer
        v-responsive(max-width="300" min-width="100" width="70%")
          v-text-field(
            :value="$route.query.title || ''"
            dense
            hide-details
            label="Поиск проектов"
            solo
            append-icon="mdi-magnify"
            clearable
            @input="$event ? filterQuery(['title'], {title: $event}) : filterQuery(['title'])"
          )
    v-navigation-drawer(
      v-model="drawer"
      fixed
      temporar
    )
      v-col
        div.mt-10.ml-3
          Spinner
          nuxt-link(to="/")
            v-btn(text)
              h1 NAYKA
        
        div.mt-10
          nuxt-link(v-for="link in links" :to="link.href" :key="'draver-' + link.title")
            v-btn(text) 
              v-icon mdi-chevron-right
              | {{ link.title }}
      
    v-main
      v-container
        Nuxt
</template>

<script>
import Spinner from '~/components/Spinner.vue'
import queryMixin from '~/mixins/query.mixin.js'

export default {
  components: { Spinner },
  mixins: [queryMixin],
  data: () => ({
    links: [
      { title: 'Профиль', href: '/user' },
      { title: 'Новый проект', href: '/create' },
    ],
    drawer: false,
  }),
  created() {
    this.$axios
      .$get('http://api.randomdatatools.ru/?unescaped=true')
      .then((res) => this.$store.commit('SET_USER', res))
  },
}
</script>

<style lang="scss">
.default-layout {
  .v-toolbar {
    background-color: $darkColor !important;
    color: $mainColor !important;

    .v-container {
      display: flex;
      align-self: center;
    }

    .v-toolbar__title {
      font-size: 32px;
    }

    .v-btn {
      color: #fff;
    }
  }
}
</style>
