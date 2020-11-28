<template lang="pug">
.page
  v-row.mb-4.mt-4(no-gutters)
    h1 Управление источниками
    v-spacer
    v-btn.mr-2(text) Экспортировать в BibTeX
    v-btn.color-default.mb-2(rounded, @click='openModal = true; type = "add"') Добавить источник
  SourcesTable(
    :sources='sources',
    @delete='deleteHandler',
    @edit='editHandler'
  )
  SourceForm(
    v-model='form',
    :dialog='openModal',
    :type='type',
    @close='openModal = false',
    @save='saveHandeler'
  )
</template>

<script>
import api from '~/assets/js/api.js'
import SourcesTable from '~/components/SourcesTable.vue'
import SourceForm from '~/components/Forms/SourceForm.vue'
export default {
  layout: 'project',
  components: {
    SourcesTable,
    SourceForm,
  },
  async asyncData({ $firebase, params }) {
    const sources = await api.getCollection($firebase, params.slug, 'sources')
    return { sources }
  },
  data: () => ({
    openModal: false,
    type: 'add',
    sourceId: null,
    form: {
      title: '',
      url: '',
      doi: '',
    },
  }),
  methods: {
    async saveHandeler(formData) {
      if (this.type === 'add') {
        const response = await api.addDocument(
          this.$firebase,
          this.$route.params.slug,
          'sources',
          formData
        )
        if (!response.empty) {
          this.sources.unshift({ ...formData, id: response.id })
        }
      } else {
        await api.patchDocument(
          this.$firebase,
          this.$route.params.slug,
          'sources',
          this.sourceId,
          formData
        )
        const index = this.sources.findIndex((el) => el.id === this.sourceId)
        if (index !== -1) {
          this.sources[index] = formData
          this.sources = [...this.sources]
        }
      }
    },
    deleteHandler(source) {
      api.deleteDocument(
        this.$firebase,
        this.$route.params.slug,
        'sources',
        source.id
      )
      this.sources = this.sources.filter((el) => el.id !== source.id)
    },
    editHandler(source) {
      this.sourceId = source.id
      this.form = Object.assign({}, source)
      this.type = 'patch'
      this.openModal = true
    },
  },
}
</script>
