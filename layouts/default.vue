<template lang="pug">
  v-app#app.default-layout
    v-main
      v-container
        Nuxt
</template>

<script>
export default {}
</script>

<style lang="scss">
.default-layout {
  .v-main {
    background: $mainColor;
  }
}
.card-tags {
  position: relative;
  display: inline;
  width: 100%;
  .card-tag {
    padding: 7px 15px 7px 15px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    background-color: $mainColor;
    color: $darkColor;
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translate(0px,-2px);
      box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
