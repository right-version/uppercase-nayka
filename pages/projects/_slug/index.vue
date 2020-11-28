<template lang="pug">
  .project-page
    .project-page__labs
      p Лабораторные
      canvas#canvas-pie(:name="name" width="300" height="300")
</template>

<script>
import api from '~/assets/js/api'
import Chart from 'chart.js'
export default {
  layout: 'project',
  async asyncData({ $firebase, params }) {
    const project = await api.getProjectInfo($firebase, params.slug)
    return { project }
  },
  mounted() {
    const context = this.$el.querySelector('#canvas-pie').getContext('2d')
    const myChart = new Chart(context, {
      type: 'doughnut',
      data: {
        labels: ['Не активены', 'Активны', 'Завершены'],
        datasets: [
          {
            backgroundColor: ['#7ac29a', '#f3bb45', '#eb5e28'],
            data: [3, 2, 15],
          },
        ],
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.project-page {
  .project-page__labs {
    max-width: 300px;
    width: 100%;
    max-height: 300px;
    height: 100%;
  }
}
</style>
