<template lang="pug">
  .default-page
    .default-page__left
      v-alert.default-alert(
        v-model="alert"
        dismissible
        color="#f3bb45"
      ) Привет! Ты попал на нашу демо версию системы nayka. Ты можешь создать свой собственный проект или посмотреть существующие. Кстати теперь ты {{user.name}}. С уважением uppercase.
      template(v-if="results.length > 0")
        ProjectCard(v-for="card in results" :key="card.id" :card="card")
      .no-results(v-else)
        p Результатов нет =(
        v-btn(@click="filterQuery(['area', 'title', 'organisation', 'author'])") Сбросить фильтры
    
    .default-page__right
      FiltersCard(:options="options")

</template>

<script>
import api from '~/assets/js/api'
import ProjectCard from '~/components/Cards/ProjectCard.vue'
import FiltersCard from '~/components/Cards/FiltersCard.vue'
import * as https from 'https'
import queryMixin from '~/mixins/query.mixin.js'

export default {
  mixins: [queryMixin],
  components: {
    ProjectCard,
    FiltersCard,
  },
  async asyncData({ $firebase, query }) {
    const projects = await api.getAllProjects($firebase)

    const pr = projects.map((el) => el.author.name).filter((el) => el)
    const ar = projects
      .map((el) => el.areas)
      .flat()
      .filter((el) => el)
    const or = projects.map((el) => el.organisation).filter((el) => el)

    const options = {
      authors: [
        'Любой',
        ...pr.filter(function (item, pos) {
          return pr.indexOf(item) == pos
        }),
      ],
      areas: [
        'Любой',
        ...ar
          .filter(function (item, pos) {
            return ar.indexOf(item) == pos
          })
          .filter((el) => el),
      ],
      organisations: [
        'Любой',
        ...or.filter(function (item, pos) {
          return or.indexOf(item) == pos
        }),
      ],
    }

    let copy = JSON.parse(JSON.stringify(projects))
    if (query.title) {
      copy = copy.filter((el) => {
        return (el.title + ' ' + el.description)
          .toLowerCase()
          .includes(query.title.toLowerCase())
      })
    }

    if (query.author) {
      copy = copy.filter((el) => {
        return el.author.name === query.author
      })
    }

    if (query.organisation) {
      copy = copy.filter((el) => {
        return el.organisation === query.organisation
      })
    }

    if (query.area) {
      copy = copy.filter((el) => {
        return el.areas.includes(query.area)
      })
    }

    const results = copy
    return { projects, results, options }
  },
  data: () => ({
    alert: false,
  }),
  mounted() {
    if (!localStorage.alert) {
      this.alert = true
      localStorage.alert = true
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  watch: {
    '$route.query'(value) {
      let copy = JSON.parse(JSON.stringify(this.projects))

      if (value.title) {
        copy = copy.filter((el) => {
          return (el.title + ' ' + el.description)
            .toLowerCase()
            .includes(value.title.toLowerCase())
        })
      }

      if (value.author) {
        copy = copy.filter((el) => {
          return el.author.name === value.author
        })
      }

      if (value.organisation) {
        copy = copy.filter((el) => {
          return el.organisation === value.organisation
        })
      }

      if (value.area) {
        copy = copy.filter((el) => {
          return el.areas.includes(value.area)
        })
      }

      this.results = copy
    },
  },
}
</script>

<style lang="scss" scoped>
.default-page {
  display: flex;
  .default-page__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;

    .default-alert {
      max-width: 800px;
      width: 100%;
    }

    .no-results {
      display: flex;
      align-items: center;
      flex-direction: column;
      min-width: 800px;
      margin-top: 15px;

      @media (max-width: 800px) {
        width: 100%;
      }
    }
  }

  .default-page__right {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 350px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;

    .default-page__left {
      margin-right: 0;
    }

    .default-page__right {
      width: 100%;
      order: -1;
    }
  }
}
</style>
