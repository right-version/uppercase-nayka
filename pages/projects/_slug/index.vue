<template lang="pug">
  .project-page2
    .project-page__labs
      //- .project-card
      //-   .project-card-content(style="heigth:500px")
      //-     .project-card__title Области исследования
      //-     .project-card__line
      canvas#canvas-pie(name="semantic" width="500" height="500" )
      | {{ project }}
</template>

<script>
import api from '~/assets/js/api'
import Chart from 'chart.js'
export default {
  layout: 'project',
  async asyncData({ $firebase, params }) {
    const semantic = await api.getSemanticInfo($firebase, params.slug)
    const sliced = Object.entries(semantic)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    return { sliced }
  },
  mounted() {
    const context = this.$el.querySelector('#canvas-pie').getContext('2d')

    const myChart = new Chart(context, {
      type: 'doughnut',
      data: {
        labels: this.sliced.map((el) => el[0]),
        datasets: [
          {
            backgroundColor: [
              '#7a9e9f',
              '#68b3c8',
              '#7ac29a',
              '#f3bb45',
              '#eb5e28',
            ],
            data: this.sliced.map((el) => el[1]),
          },
        ],
      },
    })
  },
  computed: {
    project() {
      return this.$store.state.project
    },
  },
}
</script>

<style lang="scss" scoped>
.project-page2 {
  .project-page__labs {
    max-width: 300px;
    width: 100%;
    max-height: 300px;
    height: 100%;
  }
}
#canvas-pie {
  position: block !important;
}
</style>
