<template lang="pug">
  .project-card
    .project-card-content
      h1.project-card__title Автор
      v-select(
        :value="$route.query.author || 'Любой'"
        :items="options.authors"
        filled
        label="Выберите автора"
        @input="$event !== 'Любой' ? filterQuery(['author'], {author: $event}) : filterQuery(['author'])"
      )
      .project-card__line 
      h1.project-card__title Организация
      v-select(
        :value="$route.query.organisation || 'Любой'"
        :items="options.organisations"
        filled
        label="Выберите организацию"
        @input="$event !== 'Любой' ? filterQuery(['organisation'], {organisation: $event}) : filterQuery(['organisation'])"
      )
      .project-card__line 
      h1.project-card__title Область
      v-select(
        :value="$route.query.area || 'Любой'"
        :items="options.areas"
        filled
        label="Выберите область"
        @input="$event !== 'Любой' ? filterQuery(['area'], {area: $event}) : filterQuery(['area'])"
      )

</template>

<script>
import api from '~/assets/js/api'
import queryMixin from '~/mixins/query.mixin.js'

export default {
  mixins: [queryMixin],
  props: {
    options: {
      type: Object,
      requared: true,
    },
  },
}
</script>
