<template lang="pug">
.page
    svg(style="position: absolute;")
      defs
        marker#m-end(markerwidth='10' markerheight='10' refx='9' refy='3' orient='auto' markerunits='strokeWidth')
          path(d='M0,0 L0,6 L9,3 z')

    d3-network(:net-nodes="nodes" :net-links="links" :options="options" :link-cb="lcb")
</template>

<script>
import api from '~/assets/js/api'
import D3Network from 'vue-d3-network'
export default {
  layout: 'project',
  components: {
    D3Network,
  },
  async asyncData({ $firebase, params }) {
    let { nodes, links } = await api.getNodesData($firebase, params.slug)
    const nodes_id = nodes.map((el) => el.id)
    links = links.filter(
      (el) => nodes_id.includes(el.sid) && nodes_id.includes(el.tid)
    )
    return { nodes, links }
  },
  data: () => ({
    nodeSize: 20,
    canvas: false,
  }),
  methods: {
    lcb(link) {
      link._svgAttrs = { 'marker-end': 'url(#m-end)' }
      return link
    },
  },
  computed: {
    options() {
      return {
        force: 1500,
        nodeSize: this.nodeSize,
        nodeLabels: true,
        linkLabels: true,
        canvas: this.canvas,
        linkWidth: 2,
      }
    },
  },
}
</script>
<style src="vue-d3-network/dist/vue-d3-network.css"></style>
<style lang="scss">
#m-end path,
#m-start {
  fill: rgba(18, 120, 98, 0.8);
}
.node {
  stroke-width: 2;
}
.notes {
  fill: #f3bb45;
}
.sources {
  fill: #68b3c8;
}
.labs {
  fill: #7ac29a;
  stroke-dasharray: 4;
  animation: dash 50s linear infinite;
}
.labs--active {
  fill: #7ac29a;
  stroke-dasharray: 4;
  animation: dash 50s linear infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}
</style>
