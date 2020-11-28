<template lang="pug">
  .check-list
    .check-list__item(v-for="(item, i) in list" :key="'item-list' + i")
      .item
        .item__checkbox
          v-checkbox(
            :input-value="item.checked"
            :label="item.title"
            color="#66615b"
            hide-details
            @change="onInput(i, $event)"
          )
        v-spacer
        .item__buttons(v-if="!noDelete")
          v-btn(icon @click.prevent="onDelete(i)")
            v-icon mdi-delete
</template>

<script>
export default {
  model: {
    prop: 'list',
    event: 'checked',
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
    noDelete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onDelete(index) {
      const filtered = this.list.filter((x, i) => i !== index)
      this.$emit('checked', [...filtered])
    },
    onInput(index, value) {
      const list = [...this.list]
      list[index].checked = value
      this.$emit('checked', list)
    },
  },
}
</script>

<style lang="scss">
.check-list {
  color: black;
  background: #e6e5e1;
  max-width: 500px;
  padding: 10px;
  border-radius: 5px;
  .check-list__item {
    // padding: 10px 0;
  }
}
.item {
  display: flex;
  align-items: center;
  min-height: 36px;
  .item__checkbox .v-input {
    margin: 0px;
  }
  .item__text {
    // margin-right: 5px;
  }
  .item__buttons {
    display: flex;
  }
}
</style>
