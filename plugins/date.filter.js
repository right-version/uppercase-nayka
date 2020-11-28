import Vue from 'vue'

Vue.filter('date', (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

Vue.filter('datehour', (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
  })
})