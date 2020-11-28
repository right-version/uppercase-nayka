<template lang="pug">
  .project-card
    .project-card-content
      h1.project-card__title Выберите автора
      multiselect(
        :options="options.authors"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
      )
      .project-card__line 

      h1.project-card__title Выберите организацию
      multiselect(
        :options="options.organisations"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
      )

      .project-card__line 
      h1.project-card__title Выберите область
      multiselect(
        :options="options.areas"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
      )


</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  props: {
    options: {
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

    .project-card__title {
      font-size: 14px;
    }

    .project-card__line {
      padding: 5px 10px;
      margin-bottom: 10px;
      height: 1px;
      border-bottom: 1px solid $mainColor;
    }
  }
}
</style>
