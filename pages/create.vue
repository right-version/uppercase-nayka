<template lang="pug">
  .create-page
    h1
      v-icon(large color="#212120") mdi-bookmark-plus-outline
      | Создание проекта
    
    v-form(v-model="valid" ref="form")
      v-col(no-gutters)
        .field-text.mt-5 Автор - {{ user.name }}
        .field-text.mt-5 Дата и время - {{ form.date | date }}
        v-text-field.mt-5(
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
        .field-text Организация
        multiselect(
          v-model="form.organisation"
          :options="organisations"
          :preserve-search="true"
          placeholder="Выберите организацию"
        )
        .field-text.mt-5 Области исследования
        multiselect(
          v-model="form.areas"
          :options="areas"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Выберите области исследования"
        )
        v-row.mt-5(no-gutters)
          v-spacer
          v-btn.default.mr-2(rounded @click.prevent="$router.go(-1)") Отмена
          v-btn.danger(rounded @click.prevent="saveProject") Сохранить

</template>

<script>
import api from '~/assets/js/api'
import Multiselect from 'vue-multiselect'

export default {
  async asyncData() {
    const areas = [
      'anomaly detection',
      'architecture types',
      'artificial intelligence',
      'bandwidth',
      'classification methods',
      'computer crime',
      'computer networks',
      'computer science',
      'computer system firewalls',
      'congestion control (communication)',
      'cryptography',
      'intelligent buildings',
      'internet',
      'intrusion detection',
      'linguistics',
      'local area networks',
      'machine learning',
      'mathematics',
      'network protocols',
      'network security',
      'neural networks',
      'operating systems',
      'pattern recognition',
      'personal communication systems',
      'range finding',
      'security of data',
      'semantics',
      'smart environment',
      'telecommunication traffic',
      'transmission control protocol',
      'ultra-wideband (uwb)',
      'wireless telecommunication systems',
    ]
    const organisations = ['РИНХ', 'Мехмат (ЮФУ)', 'ДГТУ', 'МГУ', 'МФТИ', 'КФУ', 'СПбПУ', 'ВШЭ']
    return { areas, organisations }
  },
  components: { Multiselect },
  data: () => ({
    form: {
      title: '',
      description: '',
      date: new Date().toString(),
      user: {},
      organisation: null,
      areas: [],
    },
    nameRules: [(v) => !!v || 'Name is required'],
    valid: true,
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    async saveProject() {
      this.$refs.form.validate()
      if (!this.valid) return

      const formData = { ...this.form, author: this.user }
      const response = await api.addProject(this.$firebase, formData)
      if (response.id) {
        this.$router.push(`/projects/${response.id}`)
      }
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
