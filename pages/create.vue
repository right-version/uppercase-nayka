<template lang="pug">
  .create-page
    h1
      v-icon(large color="#212120") mdi-bookmark-plus-outline
      | Создание проекта
    
    v-col(no-gutters)
      .field-text Автор - {{ user.name }}
      .field-text Дата и время - {{ form.date | date }}
      v-text-field(
        label="Название проекта"
        v-model="form.title"
        :rules="nameRules"
        filled
      )
      v-textarea(
        v-model="form.description"
        label="Описание"
        filled
        :rules="nameRules"
      )

</template>

<script>
export default {
  data: () => ({
    form: {
      title: '',
      description: '',
      date: new Date().toString(),
      user: {},
      organisation: {},
      areas: [],
    },
    nameRules: [(v) => !!v || 'Name is required'],
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style lang="scss" scoped>
.create-page {
  width: 100%;
  max-width: 500px;
}
</style>
