<template lang="pug">
  .project-page.project-page--main
    .project-card
    v-row(no-gutters)
      .project-card__container
        .project-card
          .project-card-content
            .project-card__title Описание проекта и автор
            .project-card__line
            v-avatar(v-if="project && project.author" color="#68b3c8" size="40")
              img(:src="project.author.image")
            span.ml-4(v-if="project && project.author") {{ project.author.name}}&nbsp;
            .project-card__title.mt-2 {{ project.description }}

        .project-card
          .project-card-content
            .project-card__title Овервью
            .project-card__line
            .project-card__left-right
              .project-card__left
                canvas#canvas-pie2(name="overview" width="500" height="500" )
              .project-card__right
                .project-card__title.mt-1(v-if="tags.length")
                  .l-box(style="background-color: #68b3c8;")
                  | Кол-во тегов: {{ tags.length }}
                .project-card__title.mt-1(v-if="sources.length")
                  .l-box(style="background-color: #7ac29a;")
                  | Кол-во источников: {{ sources.length }}
                .project-card__title.mt-1(v-if="notes.length")
                  .l-box(style="background-color: #f3bb45;")
                  | Кол-во записей: {{ notes.length }}
                .project-card__title.mt-1(v-if="labs.length")
                  .l-box(style="background-color: #eb5e28;")
                  | Кол-во лабораторных: {{ labs.length }}

        .project-card(v-if="sliced.length > 0")
          .project-card-content
            .project-card__title Семантический анализ проекта
            .project-card__line
            .project-card__left-right
              .project-card__left
                canvas#canvas-pie(name="semantic" width="500" height="500" )
              .project-card__right
                .project-card__title.mt-1(v-for="(s, i) in sliced")
                  .l-box(:style="`background-color: ${['#7a9e9f','#68b3c8','#7ac29a','#f3bb45','#eb5e28'][i]}`")
                  | {{ s[0]  | toTitleCase }}: {{ s[1] / slicedMax * 100}}%
</template>

<script>
import api from '~/assets/js/api'
import Chart from 'chart.js'
export default {
  layout: 'project',
  filters: {
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
  },
  async asyncData({ $firebase, params }) {
    const [tags, sources, notes, labs] = await Promise.all([
      api.getCollection($firebase, params.slug, 'tags'),
      api.getCollection($firebase, params.slug, 'sources'),
      api.getCollection($firebase, params.slug, 'notes'),
      api.getCollection($firebase, params.slug, 'labs'),
    ])
    const count = [tags.length, sources.length, notes.length, labs.length]
    const semantic = await api.getSemanticInfo($firebase, params.slug)
    const sliced = Object.entries(semantic)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    const slicedMax = sliced.map((el) => el[1]).reduce((a, b) => a + b, 0)
    return { sliced, slicedMax, tags, sources, notes, labs, count }
  },
  mounted() {
    const context = this.$el.querySelector('#canvas-pie').getContext('2d')
    const context2 = this.$el.querySelector('#canvas-pie2').getContext('2d')

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
      options: {
        legend: {
          display: false,
        },
      },
    })
    const myChart2 = new Chart(context2, {
      type: 'doughnut',
      data: {
        labels: [
          'Кол-во тегов',
          'Кол-во источников',
          'Кол-во записей',
          'Кол-во лабораторных',
        ],
        datasets: [
          {
            backgroundColor: ['#68b3c8', '#7ac29a', '#f3bb45', '#eb5e28'],
            data: this.count,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
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

<style lang="scss">
.project-page--main {
  margin-bottom: 60px;
  .project-card {
    .project-card__title {
      display: flex;
      align-items: center;
      .l-box {
        width: 15px;
        height: 10px;
        margin-right: 5px;
      }
    }

    .project-card-content {
      width: 100%;
      canvas {
        position: unset;
      }

      .project-card__left-right {
        display: flex;

        @media (max-width: 500px) {
          flex-direction: column;
        }
        .project-card__left {
          max-width: 200px;
          height: 100%;
          margin-right: 20px;
        }
        .project-card__right {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }


  }
}

.project-card__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

</style>
