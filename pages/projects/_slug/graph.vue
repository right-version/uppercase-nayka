<template lang="pug">
.page.page_graph
  .double-click Use double-click to ref
  .alert
    .alert__wrap
      .alert__boll(style="background-color: #68b3c8;")
      .alert__title Источники
    .alert__wrap
      .alert__boll(style="background-color: #f3bb45;")
      .alert__title Записи
    .alert__wrap
      .alert__boll(style="background-color: #7ac29a;")
      .alert__title Эксперименты
    .alert__wrap
      .alert__boll.active(style="background-color: #7ac29a;")
      .alert__title Активные эксперименты

  //- svg(style="position: absolute;")
  //-   defs
  //-     marker#m-end(markerwidth='10' markerheight='10' refx='9' refy='3' orient='auto' markerunits='strokeWidth')
  //-       path(d='M0,0 L0,6 L9,3 z')
  d3-network(:net-nodes="nodes" :net-links="links" :options="options" :link-cb="lcb" @node-click="onClick")
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
    alert: true,
    timer: null,
  }),
  methods: {
    lcb(link) {
      link._svgAttrs = { 'marker-end': 'url(#m-end)' }
      return link
    },
    onClick(event, obj) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null
        }, 500)
        return
      }

      const path = `/projects/${this.$route.params.slug}/`

      if (obj.type === 'sources') {
        this.$router.push(path + 'sources')
      }
      if (obj.type === 'notes') {
        this.$router.push(path + `notes/${obj.id}`)
      }
      if (obj.type === 'labs') {
        this.$router.push(path + `labs/${obj.id}`)
      }
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
.page_graph {
  position: relative;

  .double-click {
    position: absolute;
    opacity: 0.3;
    bottom: 0px;
  }

  .alert {
    display: flex;
    align-items: center;
    justify-content: center;
    top: 70px;
    right: 10px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: start;
    }

    .alert__wrap {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .alert__boll {
        border-radius: 50px;
        border: 2px solid rgba(18, 120, 98, 0.8);
        height: 20px;
        width: 20px;
        margin-right: 5px;
        &.active {
          border: 2px dashed rgba(18, 120, 98, 0.8);
        }
      }

      .alert__title {
        font-size: 15px;
      }
    }
  }
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
    // stroke-dasharray: 4;
    // animation: dash 50s linear infinite;
  }

  .notesl {
    fill: #8a6b27;
  }
  .sourcesl {
    fill: #375e69;
  }
  .labsl {
    fill: #466e58;
    // stroke-dasharray: 4;
    // animation: dash 50s linear infinite;
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
}
</style>
