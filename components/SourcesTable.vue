<template lang="pug">
v-data-table.elevation-2(
  :headers='headers',
  :items='[...parcedSources]',
  :footer-props='{ "disable-items-per-page": true }',
  :expanded.sync='expanded',
  item-key='title',
  show-expand
)
  template(v-slot:item.date='{ item }')
    | {{ item.date | date }}

  template(v-slot:item.url='{ item }')
    a(
      :href='item.url',
      target='_blank',
      el='nofollow noopener',
      style='max-width: 300px'
    ) 
      | {{ item.url.slice(0, 30) }}{{ item.url.length > 30 ? "..." : "" }}

  template(v-slot:item.actions='{ item }')
    v-icon.mr-2(small, @click='$emit("edit", item)') mdi-pencil
    v-icon(small, @click='$emit("delete", item)') mdi-delete

  template(v-slot:no-data)
    | В этом проекте нет ни одного источника :(

  template(v-slot:expanded-item='{ headers, item }')
    td(:colspan='headers.length')
      h3.mt-4.font-weight-medium {{ item.title }}
        v-chip.ml-2(color="yellow") CV 
      p {{ item.abstract }}
      
</template>

<script>
export default {
  props: {
    sources: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    info: null,
    expanded: [],
    headers: [
      { text: 'Дата добавления', value: 'date' },
      {
        text: 'Название',
        sortable: false,
        value: 'title',
      },
      { text: 'DOI', sortable: false, value: 'doi' },
      { text: 'Ссылка', sortable: false, value: 'url' },
      { text: 'Действия', sortable: false, value: 'actions' },
    ],
  }),
  // mounted() {
  //   this.$axios
  //     .$get('https://api.altmetric.com/v1/arxiv/1904.01355')
  //     .then((response) => (console.log(response)))
  //     // const data = JSON.parse(
  //     //   convert.xml2json(res.data, { compact: true, spaces: 2 })
  //     // );
  // },
  computed: {
    parcedSources() {
      return this.sources
    },
  },
}
</script>

<style lang="scss">
.v-input {
  width: 100% !important;
  box-sizing: border-box;
}
.v-toolbar__content {
  background-repeat: 4px;
}
.v-data-footer {
  height: 56px;
}
.v-data-footer__select {
  display: none;
}
</style>
