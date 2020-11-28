<template lang="pug">
  .default-page
    ProjectCard(v-for="card in results" :key="card.id" :card="card")
</template>

<script>
import api from '~/assets/js/api'
import ProjectCard from '~/components/Cards/ProjectCard.vue'
export default {
  components: {
    ProjectCard,
  },
  async asyncData({ $firebase, query }) {
    const projects = await api.getAllProjects($firebase)

    let copy = JSON.parse(JSON.stringify(projects))
    if (query.title) {
      copy = copy.filter((el) => {
        return (el.title + ' ' + el.description)
          .toLowerCase()
          .includes(query.title.toLowerCase())
      })
    }

    const results = copy
    return { projects, results }
  },
  async created() {
    let papers = {
      id1: {
        title: 'De-anonymizing Social Networks',
        abstract:
          'Operators of online social networks are increasingly sharing potentially sensitive information about users and their relationships with advertisers, application developers, and data-mining researchers. Privacy is typically protected by anonymization, i.e., removing names, addresses, etc. We present a framework for analyzing privacy and anonymity in social networks and develop a new re-identification algorithm targeting anonymized social-network graphs. To demonstrate its effectiveness on real-world networks, we show that a third of the users who can be verified to have accounts on both Twitter, a popular microblogging service, and Flickr, an online photo-sharing site, can be re-identified in the anonymous Twitter graph with only a 12% error rate. Our de-anonymization algorithm is based purely on the network topology, does not require creation of a large number of dummy "sybil" nodes, is robust to noise and all existing defenses, and works even when the overlap between the target network and the adversary\'s auxiliary information is small.',
        keywords:
          'data mining, data privacy, graph theory, social networking (online)',
      },
      id2: {
        title: 'Title of sample paper id2',
        abstract: 'Abstract of sample paper id2',
        keywords: 'keyword1, keyword2, ..., keywordN',
      },
    }
    papers = JSON.stringify(papers)
    try {
      const response = await this.$axios.$post(
        'http://87.117.25.190:5000/api/analyse/',
        papers,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
          },
        }
      )

      console.log(response)
    } catch (error) {}
  },
  watch: {
    '$route.query'(value) {
      let copy = JSON.parse(JSON.stringify(this.projects))

      if (value.title) {
        copy = copy.filter((el) => {
          return (el.title + ' ' + el.description)
            .toLowerCase()
            .includes(value.title.toLowerCase())
        })
      }

      this.results = copy
    },
  },
}
</script>

<style lang="scss" scoped>
.default-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
