<template lang="pug">
  .user-page
    h1 {{ user.name }}

    v-row(no-gutters)
      v-avatar.mt-4.mr-7(
        color="primary"
        size="280"
        tile
      )
        img(:src="user.image")
      .user-page__info
        p {{ user.email }}
        p {{ user.edu }}
        p {{ user.program }}
        
    .cards
      .cards__wrap(v-if="projects.length > 1")
        .cards__title Мои проекты
        ProjectCard(v-if="projects[1]" :key="'x' + projects[1].id" :card="projects[1]" short my)
        ProjectCard(v-if="projects[2]" :key="'x' + projects[2].id" :card="projects[2]" short my)
        ProjectCard(v-if="projects[3]" :key="'x' + projects[3].id" :card="projects[3]" short my)

      .cards__wrap(v-if="projects.length > 0")
        .cards__title Рекомендации
        ProjectCard(:key="projects[0].id" :card="projects[0]" short)
</template>

<script>
import api from '~/assets/js/api'
import ProjectCard from '~/components/Cards/ProjectCard.vue'
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  components: {
    ProjectCard,
  },
  async asyncData({ $firebase, query }) {
    const projects = await api.getAllProjects($firebase)
    return { projects }
  },
}
</script>

<style lang="scss" scoped>
.cards {
  .cards__wrap {
    margin-top: 30px;
  }

  .cards__title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 15px;
  }
}
.user-page {
  .user-page__info {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 500px;
  }
}
</style>
