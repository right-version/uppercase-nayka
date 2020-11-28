<template lang="pug">
v-dialog(:value='dialog', max-width='500px', @input='!$event ? close() : null')
  v-card
    v-card-title
      span.headline {{ formTitle }}
    v-card-text
      v-form.mt-2(v-model='valid', ref='form')
        v-text-field(
          v-model='form.title',
          label='Название',
          :rules='nameRules',
          dense,
          required,
          filled
        )
        v-text-field(v-model='form.abstract', label='Аннотация', dense, filled)
        v-text-field(
          v-model='form.url',
          label='Ссылка',
          :rules='nameRules',
          dense,
          required,
          filled
        )
        v-text-field(v-model='form.doi', label='DOI', dense, filled)
        v-row.mt-2
          v-spacer
          v-btn.color-default(rounded, @click='close') Отмена
          v-btn.color-danger.ml-2(rounded, @click='save' :loading="loading") Сохранить
</template>

<script>
const emptyForm = { title: '', url: '', doi: '', abstract: '' }
export default {
  model: {
    prop: 'form',
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    valid: true,
    nameRules: [(v) => !!v || 'Name is required'],
    semantic: null,
    loading: false
  }),
  computed: {
    formTitle() {
      return this.type === 'add' ? 'Добавить источник' : 'Изменить источник'
    },
  },
  methods: {
    async save() {
      this.loading = true
      let papers = {
        id1: {
          title: this.form.title,
          abstract: this.form.abstract,
        },
      }
      this.$refs.form.validate()
      papers = JSON.stringify(papers)
      const response = await this.$axios.$post(
        'http://87.117.25.190:5000/api/analyse/',
        //'http://localhost:5000/api/analyse/',
        papers,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
          },
        }
      )
      if (this.valid) {
        this.$emit('save', {
          ...this.form,
          date: new Date().toString(),
          cso: response.id1.enhanced,
        })
        this.loading = false
        this.close()
      }
    },
    close() {
      this.$emit('input', emptyForm)
      this.$refs.form.resetValidation()
      this.$emit('close')
    },
  },
}
</script>
