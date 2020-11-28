<template lang="pug">
  .page
    .tags(v-if="tags.length > 0")
      .tag(
        v-for="(tag, i) in tags"
        :key="'tag' + i"
        @click="filterQuery(['str'], {str: tag})"
        :class="{active: $route.query.str === tag}"
      ) {{'#' + tag }}
    .tags-pool-empty(v-else) Увы, тегов нет :(

    SimpleCard(
      v-for="(res, i) in results"
      :key="res.id + i"
      :card="res"
    )
</template>

<script>
import api from '~/assets/js/api'
import SimpleCard from '~/components/Cards/SimpleCard.vue'
export default {
  layout: 'project',
  components: {
    SimpleCard,
  },
  async asyncData({ $firebase, params, query }) {
    const [notes, labs] = await Promise.all([
      api.getCollection($firebase, params.slug, 'notes'),
      api.getCollection($firebase, params.slug, 'labs'),
    ])
    const all = [...notes, ...labs]
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
  mounted() {
    if (!this.$route.query.str) {
      console.log(this.tags)
      if (this.tags.length > 0) {
        this.filterQuery(['str'], { str: this.tags[0] })
      }
    }
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

<style lang="scss">
.tags {
  max-width: 500px;
  display: inline;
  .tag {
    padding: 5px 12px 5px 12px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    background-color: #6a6a68;
    display: inline-block;
    cursor: pointer;

    &.active {
      background-color: #7a9e9f;
    }
  }
}
.tags-pool-empty {
  font-size: 26px;
  font-weight: normal;
  text-align: center;
}
.v-text-field {
  width: 500px;
}
</style>
