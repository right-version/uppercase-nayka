<template lang="pug">
  .simple-card
    .simple-card-content
      .simple-card__head
        .simple-card__icon
          v-icon(:color="colors[card.type]") {{ icons[card.type] }} 
        nuxt-link.simple-card__title(
          :to="`/projects/${$route.params.slug}/${card.type}/${card.id}`"
        ) {{ card.title || '' }}
      .simple-card__line
      .field-text
        .tags
          nuxt-link.tag(
            v-for="(tag, i) in card.tags"
            :key="'cardtag' + tag.id + i"
            :to="`/projects/${$route.params.slug}/search?str=${tag.title}`"
          ) {{'#' + tag.title }}
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    icons() {
      return this.$store.state.icons
    },
    colors() {
      return this.$store.state.colors
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
  .simple-card-content {
    padding: 15px 15px 10px;
    .simple-card__head {
      display: flex;
      align-items: center;
      .simple-card__icon {
        margin-right: 5px;
      }
      .simple-card__title {
        color: #252422;
        font-size: 20px;
        line-height: 1.4em;
      }
    }
    .simple-card__line {
      padding: 5px 10px;
      margin-bottom: 10px;
      height: 1px;
      border-bottom: 1px solid $mainColor;
    }
  }
}
</style>
