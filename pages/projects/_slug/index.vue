<template lang="pug">
  .project-page
    p {{ project }}
</template>

<script>
import api from '~/assets/js/api'

export default {
  async asyncData({ $firebase, params }) {
    const project = await api.getProjectInfo($firebase, params.slug)
    return { project }
  },
}
</script>

<style lang="scss" scoped>
.project-page {
}
</style>
