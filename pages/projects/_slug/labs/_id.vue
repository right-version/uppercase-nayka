<template lang="pug">
  .page.page--labs
    v-row.page__head.mb-4.mt-4(no-gutters)
      v-icon.mr-2(color="#7ac29a") mdi-flask
      h1 {{ mode === 'DEFAULT' ? form.title : formTitle }}
      v-chip.ma-2(color="green", text-color="white", label)
        v-icon(left) mdi-lock-open-outline
        |  public

      v-spacer
      v-btn.color-default(v-if="mode === 'DEFAULT'" @click="mode = 'EDIT'" rounded)
        | Редактировать
        v-icon mdi-file-edit-outline
    v-row(v-if="mode !== 'DEFAULT'" no-gutters)
      v-col.mr-3
        .field-text Автор - {{ username }}
        .field-text.mt-4 Дата и время - {{ form.date | date }}
        .field-text.mt-4 Описание эксперимента
          Editor#mytextarea(
            v-model="form.description"
            :init="options"
          )
      v-col(width="500")
        v-form(v-model="valid" ref="form" )
          v-text-field(
            v-model="form.title"
            label="Заголовок"
            filled
            :rules="nameRules"
          )
          v-text-field(
            v-model="task"
            label="Добавить задачу"
            filled
            @keypress.enter="createTask"
            append-icon="mdi-format-list-checks"
            ref="task"
          )

          CheckList(v-if="form.progress && form.progress.length > 0" v-model="form.progress")

          .field-text.mt-4 Теги
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
      v-col(style="width: 500px")
        .field-text Автор - {{ username }}
        .field-text.mt-4 Дата и время - {{ form.date | date }}
        
        template(v-if="form.progress && form.progress.length > 0")
          .field-text.mt-4 Задачи
          v-progress-linear(
            v-model="progressBar"
            :color="progressBar <= 80 ? (progressBar <= 30) ? '#eb5e28' : '#f3bb45' : '#7ac29a'"
            height="20"
            rounded
            striped
          )
            template(v-slot:default="{ value }")
              span {{ Math.ceil(value) }}%
          CheckList(v-model="form.progress" noDelete @checked="save")
        
        .field-text.mt-4(v-if="form.description") Описание
          .field-text__description(v-html="form.description")
        
        .field-text.mt-4(v-if="form.tags.length > 0") Теги
          br
          .tags
            nuxt-link.tag(
              v-for="(tag, i) in form.tags"
              :key="'notes-tag-' + i"
              :to="`/project/${$route.params.slug}/search?str=${tag.title}`"
            ) {{'#' + tag.title }}
        .field-text.mt-4(v-if="form.links.length > 0") Обратные ссылки
          br
          .tags
            nuxt-link.tag(
              v-for="(link, i) in form.links"
              :key="'notes-link-' + i"
              :to="`/project/${$route.params.slug}/${link.type}/${link.id}`"
            ) 
              v-icon.mr-1(color="#fff") {{ icons[link.type] || 'mdi-alert-octagon'}}
              | {{ link.title }}
        //- .field-text.mt-4(v-if="form.files.length > 0") Файлы
        //-   span(v-if="link in form.") {{ link + ' ' }}
</template>

<script>
import Multiselect from 'vue-multiselect'
import api from '~/assets/js/api.js'
import Editor from '@tinymce/tinymce-vue'
import CheckList from '~/components/CheckList.vue'
export default {
  components: { Multiselect, Editor, CheckList },
  layout: 'project',
  async asyncData({ $firebase, params }) {
    console.log(123)
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
      progress: [],
    }
    if (params.id === 'add') {
      mode = 'ADD'
    } else {
      form = await api.getDocument($firebase, params.slug, 'labs', params.id)
    }
    const documents = [...notes, ...sources, ...labs]
    return { tags, documents, form, mode }
  },
  data: () => ({
    valid: true,
    active: true,
    nameRules: [(v) => !!v || 'Name is required'],
    task: '',
    options: {
      selector: '#mytextarea',
      height: '450',
      plugins:
        'paste searchreplace autolink directionality code visualblocks visualchars image link media codesample table charmap hr pagebreak nonbreaking toc advlist lists wordcount imagetools textpattern noneditable charmap emoticons',
    },
  }),
  computed: {
    username() {
      return this.$store.state.user.name
    },
    progressBar() {
      if (!this.form.progress) return 0
      const countChecked = this.form.progress.reduce((a, b) => a + b.checked, 0)
      return (countChecked / this.form.progress.length) * 100
    },
    formTitle() {
      return this.mode === 'ADD'
        ? 'Добавление эксперимента'
        : 'Редактирование эксперимента'
    },
    icons() {
      return this.$store.state.icons
    },
  },
  methods: {
    createTask() {
      if (!this.task.trim()) return
      const model = { title: this.task, checked: false }
      this.form.progress.unshift(model)
      this.task = ''
    },
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
      if (this.$refs.form) this.$refs.form.validate()
      if (!this.valid) return
      const formData = {
        ...this.form,
        user: this.$store.state.user,
      }
      if (this.mode === 'ADD') {
        const response = await api.addDocument(
          this.$firebase,
          this.$route.params.slug,
          'labs',
          formData
        )
        if (!response.empty) {
          this.$router.push({ params: { id: response.id } })
        }
      } else {
        await api.patchDocument(
          this.$firebase,
          this.$route.params.slug,
          'labs',
          this.$route.params.id,
          formData
        )
        this.mode = 'DEFAULT'
      }
    },
  },
}
</script>

<style lang="scss">
.row {
  align-items: center;
}
.tox .tox-toolbar--scrolling {
  @media (max-width: 320px) {
    flex-wrap: wrap !important;
  }
}
.tox-tinymce {
  max-width: 500px;
  @media (max-width: 1300px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    max-width: 100%;
    width: 100%;
  }
  @media (max-width: 320px) {
    width: 320px;
  }
}
.page--labs {
  .page__head {
    align-items: center;
  }
  .v-form {
    margin-top: 104px;
    @media (max-width: 1300px) {
      margin-top: 25px;
    }
  }
}
</style>
