<template lang="pug">
  .page
    v-row.mb-4.mt-4(no-gutters)
      h1 Эксперименты
      v-spacer
      nuxt-link(:to="$route.path + '/add'")
        v-btn.color-default.mb-2(rounded) Добавить эксперимент
    v-row.mb-1.mt-1.cards-conteiner(no-gutters)
      SimpleCardExperiments(
        v-for="(res, i) in all"
        :key="res.id + i"
        :card="res"
      )
</template>

<script>
import api from '~/assets/js/api'
import SimpleCardExperiments from '~/components/Cards/SimpleCardExperiments.vue'
export default {
  layout: 'project',
  components: {
    SimpleCardExperiments,
  },
  async asyncData({ $firebase, params, query }) {
    const [labs] = await Promise.all([
      api.getCollection($firebase, params.slug, 'labs'),
    ])
    const all = [...labs]
    const tags = new Set()
    for (const index in all) {
      const list = all[index].tags.map((el) => el.title)
      list.forEach((el) => tags.add(el))
    }
    let results = []
    results = all.filter((el) => {
      return el.tags.map((el) => el.title).includes(query.str)
    })
    return { tags: Array.from(tags), all, results }
  },
   watch: {
    '$route.query'(value) {
      this.results = this.all.filter((el) => {
        return el.tags.map((el) => el.title).includes(value.str)
      })
    },
  },
  methods: {
    // Remove and Add query
    filterQuery(queryToRemove, queryToAdd = {}) {
      const query = { ...this.$route.query }
      for (const key in queryToAdd) {
        queryToAdd[key] = `${queryToAdd[key]}`.trim()
        if (queryToAdd[key] === query[key]) return
        if (!queryToAdd[key]) {
          delete queryToAdd[key]
          queryToRemove.push(key)
        }
      }
      for (const value of queryToRemove) delete query[value]
      this.$router.push({ path: this.$route.path })
      this.$router.push({
        query: { ...query, ...queryToAdd },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.cards-conteiner {
  display: flex;
  flex-direction: column;
}
</style>