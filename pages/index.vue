<template lang="pug">
  .default-page
    nuxt-link(to="/create")
      v-btn.mb-10.big.default(rounded) Создать проект
    ProjectCard(v-for="card in projects" :key="card.id" :card="card")
</template>

<script>
import api from '~/assets/js/api'
import ProjectCard from '~/components/Cards/ProjectCard.vue'
export default {
  components: {
    ProjectCard,
  },
  async asyncData({ $firebase }) {
    const projects = await api.getAllProjects($firebase)
    return { projects }
  },
}
</script>

<style lang="scss" scoped>
.default-page {
}
</style>
