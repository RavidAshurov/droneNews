<template>
  <div class="header">
    <h1 class="page-title">Drone News</h1>
    <div class="search-bar">
      <label for="search" class="search-label">Search</label>
      <input
        type="text"
        name="search"
        class="search-input"
        v-model="keyword"
        @keydown.enter.prevent.stop="filterNews"
      />
    </div>
  </div>
  <div class="news-items">
    <NewsItem v-for="item in headlines" :key="item.id" :item="item" />
  </div>
  <Snackbar ref="snackbar" />
</template>

<script>
import { fetchHeadlines } from '../services/headlinesService.js'
import NewsItem from '../components/NewsItem.vue'
import Snackbar, { SNACKBAR_TYPES } from '../components/Snackbar.vue'
export default {
  name: 'HomeView',
  components: { NewsItem, Snackbar },
  async created() {
    try {
      this.headlines = (await fetchHeadlines()) || []
    } catch (err) {
      this.$refs.snackbar.showSnackbar(
        'Failed to load headlines.',
        SNACKBAR_TYPES.ERROR,
      )
    }
  },
  data() {
    return {
      headlines: [],
      keyword: '',
    }
  },
  methods: {
    async filterNews() {
      try {
        this.headlines = (await fetchHeadlines(this.keyword)) || []
      } catch (err) {
        this.$refs.snackbar.showSnackbar(
          'Failed to load headlines.',
          SNACKBAR_TYPES.ERROR,
        )
      }
    },
  },
}
</script>

<style scoped>
.page-title {
  color: #a4c4ff;
  font-weight: bolder;
  font-size: 3rem;
  padding: 0px 1rem;
  border-bottom: 4px dotted;
  margin: 1rem 0;
}
.news-items {
  padding-top: 2rem;
  display: grid;
  row-gap: 1.5rem;
}

.search-bar {
  display: flex;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;

  .search-input {
    border-radius: 5px;
    padding: 5px;
    background: transparent;
    border: 1px dotted #deb887;
    flex-grow: 1;
    max-width: 25rem;
    color: whitesmoke;
    font-size: 1.05rem;
  }

  .search-label {
    color: #deb887;
    font-weight: bold;
    font-size: 1.2rem;
  }
}
</style>
