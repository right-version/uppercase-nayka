<template lang="pug">
  v-app#app.default-layout
    v-app-bar(fixed app)
      v-container.py-0.fill-height
        v-app-bar-nav-icon.hidden-md-and-up(@click="drawer = !drawer")
        
        semipolar-spinner.mr-4.hidden-sm-and-down(
          :animation-duration="2000"
          :size="55"
          color="#7ac29a"
        )
        nuxt-link(to="/" style="color: white;")
          v-toolbar-title.mr-10.hidden-sm-and-down NAYKA

        nuxt-link.hidden-sm-and-down(v-for="link in links" :to="link.href" :key="link.title")
          v-btn(text) 
            v-icon mdi-chevron-right
            | {{ link.title }}
        v-spacer
        v-responsive(max-width="300")
          v-text-field(
            dense
            hide-details
            label="Поиск проектов"
            solo
            append-icon="mdi-magnify"
            clearable
          )
    v-navigation-drawer(
      v-model="drawer"
      fixed
      temporar
    )
      v-col
        div.mt-10
          nuxt-link(to="/")
            v-btn(text)
              semipolar-spinner.mr-4(
                :animation-duration="2000"
                :size="60"
                color="#7ac29a"
              )
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
import { SemipolarSpinner } from 'epic-spinners'
export default {
  components: { SemipolarSpinner },
  data: () => ({
    links: [
      { title: 'Профиль', href: '/user' },
      { title: 'Новый проект', href: '/create' },
    ],
    drawer: false,
  }),
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
