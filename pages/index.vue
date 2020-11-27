<template lang="pug">
  .default-page
    ProjectCard(v-for="card in projects" :key="card.id" :card="card")
</template>

<script>
import ProjectCard from '~/components/Cards/ProjectCard.vue'
export default {
  components: {
    ProjectCard,
  },
  data: () => ({
    projects: [
      {
        id: 'ldsafasfdsfld',
        areas: ['Математика', 'Компьютерные науки', 'Математика'],
        author: { id: 'dadas', username: 'Вим Олегович', image: 'https://placekitten.com/g/200/200' },
        description: 'Сделать клевый сервис, что бы победить в хакатоне! Сделать клевый сервис, что бы ервис, что бы победить в хакатоне! Сделать клевый сервис, что бы победить в хакатоне!',
        organisation: {
          title: 'РИНХ',
          id: '3132',
          logo:
            'https://hsto.org/getpro/moikrug/uploads/company/554/163/612/logo/medium_9e4f0044d4c42bf95c31e61e2049ef4a.png',
        },
        title: 'Разработка сервиса Наука',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.default-page {
}
</style>
