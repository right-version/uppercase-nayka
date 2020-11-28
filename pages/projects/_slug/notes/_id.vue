<template lang="pug">
  .page
    v-row.mb-4.mt-4(no-gutters)
      h1 {{ mode === 'DEFAULT' ? form.title : formTitle }}
      v-spacer
      v-btn.color-default(v-if="mode === 'DEFAULT'" @click="mode = 'EDIT'" rounded)
        | Редактировать
        v-icon mdi-file-edit-outline
    .field-text Автор - {{ username }}
    .field-text.mt-4 Дата и время - {{ form.date | date }}
    v-form.mt-4(v-model="valid" ref="form" v-if="mode !== 'DEFAULT'")
      v-text-field(
        v-model="form.title"
        label="Заголовок"
        filled
        :rules="nameRules"
      )
      v-textarea(
        v-model="form.description"
        label="Описание"
        filled
        height="100px"
        :rules="nameRules"
      )
      .field-text Теги
      multiselect(
        v-model="form.tags"
        :options="tags"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Выберите теги"
        label="title"
        track-by="id"
        :taggable="true"
        @tag="addTag"
      )
      .field-text.mt-4 Обратные ссылки
      multiselect(
        v-model="form.links"
        :options="documents"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Выберите ссылки"
        label="title"
        track-by="id"
      )
        template(v-slot:option="{option}")
          span.multiselect-span
            v-icon {{ icons[option.type] || '' }}
            | {{ option.title}}
      v-row.mt-4
        v-spacer
        v-btn.color-default(rounded @click="back") Отмена
        v-btn.color-danger.ml-2.mr-3(rounded @click="save") Сохранить
    template(v-else)
      .field-text.mt-4(v-if="form.description") Описание
        .field-text__description {{ form.description }}
        .field-text.mt-4(v-if="form.tags.length > 0") Теги
          br
          .tags
            nuxt-link.tag(
              v-for="(tag, i) in form.tags"
              :key="'notes-tag-' + i"
              :to="`/projects/${$route.params.slug}/search?str=${tag.title}`"
            ) {{'#' + tag.title }}
        .field-text.mt-4(v-if="form.links.length > 0") Обратные ссылки
          br
          .tags
            nuxt-link.tag(
              v-for="(link, i) in form.links"
              :key="'notes-link-' + i"
              :to="`/projects/${$route.params.slug}/${link.type}`+ (link.type !== 'sources' ? `/${link.id}` : '')"
            ) 
              v-icon.mr-1(color="#fff") {{ icons[link.type] || 'mdi-alert-octagon'}}
              | {{ link.title }}
</template>

<script>
import Multiselect from 'vue-multiselect'
import api from '~/assets/js/api.js'
export default {
  components: { Multiselect },
  layout: 'project',
  async asyncData({ $firebase, params }) {
    const [tags, sources, notes, labs] = await Promise.all([
      api.getCollection($firebase, params.slug, 'tags'),
      api.getCollection($firebase, params.slug, 'sources'),
      api.getCollection($firebase, params.slug, 'notes'),
      api.getCollection($firebase, params.slug, 'labs'),
    ])
    let mode = 'DEFAULT'
    let form = {
      date: new Date().toString(),
      title: '',
      description: '',
      tags: [],
      links: [],
      files: [],
    }
    if (params.id === 'add') {
      mode = 'ADD'
    } else {
      form = await api.getDocument($firebase, params.slug, 'notes', params.id)
    }
    const documents = [...notes, ...sources, ...labs]
    return { tags, documents, form, mode }
  },
  data: () => ({
    valid: true,
    nameRules: [(v) => !!v || 'Name is required'],
  }),
  computed: {
    username() {
      return this.$store.state.user.name
    },
    formTitle() {
      return this.mode === 'ADD' ? 'Добавление записи' : 'Редактирование записи'
    },
    icons() {
      return this.$store.state.icons
    },
  },
  methods: {
    back() {
      if (this.mode === 'ADD') {
        this.$router.go(-1)
      } else {
        this.mode = 'DEFAULT'
      }
    },
    async addTag(title) {
      if (!title.trim()) return
      const response = await api.addDocument(
        this.$firebase,
        this.$route.params.slug,
        'tags',
        { title }
      )
      if (!response.empty) {
        this.tags.push({ title, id: response.id })
        this.form.tags.push({ title, id: response.id })
      }
    },
    async save() {
      this.$refs.form.validate()
      if (!this.valid) return
      const formData = {
        ...this.form,
        user: this.$store.state.user,
      }
      if (this.mode === 'ADD') {
        const response = await api.addDocument(
          this.$firebase,
          this.$route.params.slug,
          'notes',
          formData
        )
        if (!response.empty) {
          this.$router.push({ params: { id: response.id } })
        }
      } else {
        await api.patchDocument(
          this.$firebase,
          this.$route.params.slug,
          'notes',
          this.$route.params.id,
          formData
        )
        this.mode = 'DEFAULT'
      }
    },
  },
}
</script>
