<template lang="pug">
  .default-page
    .default-page__left
      template(v-if="results.length > 0")
        ProjectCard(v-for="card in results" :key="card.id" :card="card")
      template(v-else)
        p Результатов нет =(
        v-btn(@click="filterQuery(['area', 'title', 'organisation', 'author'])") Сбросить фильтры
    
    .default-page__right
      FiltersCard(:options="options")

</template>

<script>
import api from '~/assets/js/api'
import ProjectCard from '~/components/Cards/ProjectCard.vue'
import FiltersCard from '~/components/Cards/FiltersCard.vue'
import * as https from 'https'
import queryMixin from '~/mixins/query.mixin.js'

export default {
  mixins: [queryMixin],
  components: {
    ProjectCard,
    FiltersCard,
  },
  async asyncData({ $firebase, query }) {
    const projects = await api.getAllProjects($firebase)

    const pr = projects.map((el) => el.author.name).filter((el) => el)
    const ar = projects
      .map((el) => el.areas)
      .flat()
      .filter((el) => el)
    const or = projects.map((el) => el.organisation).filter((el) => el)

    const options = {
      authors: [
        'Любой',
        ...pr.filter(function (item, pos) {
          return pr.indexOf(item) == pos
        }),
      ],
      areas: [
        'Любой',
        ...ar
          .filter(function (item, pos) {
            return ar.indexOf(item) == pos
          })
          .filter((el) => el),
      ],
      organisations: [
        'Любой',
        ...or.filter(function (item, pos) {
          return or.indexOf(item) == pos
        }),
      ],
    }

    let copy = JSON.parse(JSON.stringify(projects))
    if (query.title) {
      copy = copy.filter((el) => {
        return (el.title + ' ' + el.description)
          .toLowerCase()
          .includes(query.title.toLowerCase())
      })
    }

    if (query.author) {
      copy = copy.filter((el) => {
        return el.author.name === query.author
      })
    }

    if (query.organisation) {
      copy = copy.filter((el) => {
        return el.organisation === query.organisation
      })
    }

    if (query.area) {
      copy = copy.filter((el) => {
        return el.areas.includes(query.area)
      })
    }

    const results = copy
    return { projects, results, options }
  },
  async mounted() {
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
      const instance = this.$axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      })
      instance.get('http://87.117.25.190:5000/api/analyse/')

      // At request level
      const agent = new https.Agent({
        rejectUnauthorized: false,
      })

      const response = await this.$axios.$post(
        'http://87.117.25.190:5000/api/analyse/',
        papers,
        {
          httpsAgent: agent,
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

      if (value.author) {
        copy = copy.filter((el) => {
          return el.author.name === value.author
        })
      }

      if (value.organisation) {
        copy = copy.filter((el) => {
          return el.organisation === value.organisation
        })
      }

      if (value.area) {
        copy = copy.filter((el) => {
          return el.areas.includes(value.area)
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
  .default-page__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }
  .default-page__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;

    .default-page__left {
      margin-right: 0;
    }

    .default-page__right {
      width: 100%;
      order: -1;
    }
  }
}
</style>
