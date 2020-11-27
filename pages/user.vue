<template lang="pug">
  .user-page
    h1 {{ user.name }}
    v-avatar.mt-5(
      color="primary"
      size="280"
      tile
    )
      img(:src="user.image")
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style lang="scss" scoped>
.user-page {
}
</style>
