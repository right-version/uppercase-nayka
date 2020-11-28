<template lang="pug">
  .project-card
    .project-card-content
      h1.project-card__title {{ card.title }}
      .project-card__line

      .project-card__author.mb-2
        v-avatar(color="#68b3c8" size="50")
          img(:src="card.author.image")
        span.ml-4 {{ card.author.name}}&nbsp;
        span(v-if="card.organisation") ({{ card.organisation }})
      .project-card__description.mb-5 {{ card.description }}

      .card-tags
        .card-tag(
          v-for="(area, i) in card.areas" 
          :key="'a-' + card.title + area"
          @click.prevent="filterQuery(['area'], {area: area})"
        )
          v-icon.mr-1(small) mdi-pin
          | {{ area }}

      .project-card__line
      .project-card__footer
        v-spacer
        nuxt-link(to="/#")
          v-btn.mr-2.info Подать заявку
        nuxt-link(:to="`projects/${card.id}`")
          v-btn.success Подробнее


</template>

<script>
import queryMixin from '~/mixins/query.mixin.js'

export default {
  mixins: [queryMixin],
  props: {
    card: {
      type: Object,
      requared: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.project-card {
  max-width: 800px;
  box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  color: #252422;
  border-radius: 6px;
  margin-bottom: 20px;
  width: 100%;

  .project-card-content {
    padding: 15px 15px 10px;

    .project-card__author {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .project-card__title {
      font-size: 26px;
      @media (max-width: 800px) {
        font-size: 18px;
      }
    }

    .project-card__line {
      padding: 5px 10px;
      margin-bottom: 10px;
      height: 1px;
      border-bottom: 1px solid $mainColor;
    }

    .project-card__footer {
      display: flex;

      @media (max-width: 800px) {
        .v-btn {
          font-size: 0.7em;
        }
      }
    }
  }
}
</style>
