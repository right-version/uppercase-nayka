<template lang="pug">
  .page
    v-row.mb-4.mt-4(no-gutters)
      h1 Записи
      v-spacer
      nuxt-link(:to="$route.path + '/add'")
        v-btn.color-default.mb-2(rounded) Добавить запись
    .app
      v-container(style="max-width: 600px")
        .simple-card(v-for="(res, i) in dateArr")
          .simple-card-content
            v-timeline(dense clipped)
              v-timeline-item(class="mb-6" hide-dot)
                span.general-date(
                  :style="`color: ${colorCards[i]};`"
                ) {{`${res.split('.')[1] + ' ' + full.find((item,index) => +res.split('.')[0]===index) + ' ' + res.split('.')[2] }`}}
              v-timeline-item(
                class="mb-4"
                :color="`${colorCards[i]}`"
                icon-color="grey lighten-2"
                small
                v-for="(localData) in timeArr[i]"
                )
                v-row( justify="space-between")
                  nuxt-link.notes-link(
                  :to="`/project/${$route.params.slug}/notes/${localData.id}`"
                  )
                    v-col(cols="7")
                      .notes-name {{localData.user.name}}
                      .notes-description {{localData.description}}
                    v-col(class="text-right" cols="5").notes-time {{localData.date|datehour}}
</template>

<script>
import api from '~/assets/js/api'
export default {
  layout: 'project',
  async asyncData({ $firebase, params, query }) {
    const [notes] = await Promise.all([
      api.getCollection($firebase, params.slug, 'notes'),
    ])
    const notesData = [...notes]
    const dateChanges = new Date(notesData[0].date)
    const dateArr = []
    const timeArr = []
    for (let i = 0; i < notesData.length; i++) {
      let globalDate = new Date(notesData[i].date)
      let changeGlobalDate =
        +globalDate.getMonth() +
        '.' +
        globalDate.getDate() +
        '.' +
        globalDate.getFullYear()
      let arrDateByGlobalDate = []
      if (!dateArr.includes(changeGlobalDate)) {
        dateArr.push(changeGlobalDate)
        for (let j = 0; j < notesData.length; j++) {
          let localDate = new Date(notesData[j].date)
          let changeLocalDate =
            +localDate.getMonth() +
            '.' +
            localDate.getDate() +
            '.' +
            localDate.getFullYear()
          if (changeGlobalDate === changeLocalDate) {
            arrDateByGlobalDate.push(notesData[j])
          }
        }
        arrDateByGlobalDate.sort((a, b) => {
          a = new Date(a.date)
          b = new Date(b.date)
          return Date.parse(b) - Date.parse(a)
        })
        timeArr.push(arrDateByGlobalDate)
        arrDateByGlobalDate = []
      }
    }
    const full = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ]
    const colorCards = ['#7ac29a', '#f3bb45', '#68b3c8', '#7a9e9f', '#eb5e28', '#7ac29a', '#f3bb45', '#68b3c8', '#7a9e9f', '#eb5e28']
    dateArr.reverse()
    timeArr.reverse()
    return { notesData, dateArr, timeArr, full, colorCards }
  },
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
  }),
  computed: {
    timeline() {
      return this.events.slice().reverse()
    },
  },
}
</script>

<style lang="scss" scoped>
.simple-card {
  box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  color: #252422;
  border-radius: 6px;
  margin-bottom: 20px;
  max-width: 900px;
  width: 100%;
  .simple-card-content {
    padding: 15px 30px 15px 10px;
  }
}
.general-date {
  font-size: 24px;
  font-weight: 700;
}
.notes-name {
  font-size: 16px;
  font-weight: 500;
}
.notes-link {
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #222;
}
.notes-link:hover {
  color: rgb(35, 45, 139);
}
</style>
