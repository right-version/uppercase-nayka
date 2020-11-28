export default {
  methods: {
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
