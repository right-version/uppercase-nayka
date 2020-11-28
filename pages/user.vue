<template lang="pug">
  .user-page
    h1 {{ user.name }}
    v-avatar.mt-5(
      color="primary"
      size="280"
      tile
    )
      img(:src="user.image")
    .cards
      .cards__wrap
        .cards__title Рекомендации
        template
          ProjectCard(:key="projects[0].id" :card="projects[0]")
      .cards__wrap
        .cards__title Мои заявки
        template
          ProjectCard(:key="projects[1].id" :card="projects[1]")
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
</style>
