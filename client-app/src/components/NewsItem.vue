<template>
  <div class="news-item">
    <h2 class="title">
      {{ item.title }}
    </h2>
    <div class="author">
      {{ item.author }}
    </div>
    <div class="description">
      {{ item.description }}
    </div>
    <img v-if="item.urlToImage" class="image" :src="item.urlToImage" />
    <details v-if="item.content" class="details">
      <summary>Read More</summary>
      {{ item.content }}
    </details>
    <a v-if="item.url" :href="item.url" class="link-to-article"
      >Read Full article <IconLink class="link-icon"
    /></a>
  </div>
</template>

<script>
import IconLink from './icons/IconLink.vue'
export default {
  name: 'NewsItem',
  components: { IconLink },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style scoped>
.news-item {
  display: grid;
  grid-template-areas:
    'image image title title title title'
    'image image author . . .'
    'image image description description description description'
    'link link details details details details';
  row-gap: 0.5rem;
  padding: 1rem;
  column-gap: 2rem;
  border-radius: 8px;
  border: 1px solid;
  background: #f5f3f0;

  .title {
    color: hsl(0deg 0% 28.36%);
    grid-area: title;
    font-weight: bold;
    margin: 1rem 0;
  }

  .author {
    font-size: 0.9rem;
    font-weight: bold;
    grid-area: author;
    color: #77a2bf;
  }

  .description {
    font-style: italic;
    grid-area: description;
  }

  .image {
    grid-area: image;
    max-width: 17rem;
    clip-path: inset(0% 0% 0% 0% round 8px);
  }

  .details {
    grid-area: details;
    line-height: 1.5rem;
    color: #8f5c0f;
  }

  .link-to-article {
    grid-area: link;
    text-decoration: underline;
    text-decoration-color: #77a2bf;
    color: #8f5c0f;
    display: flex;
    column-gap: 0.5rem;
    align-items: center;

    .link-icon {
      width: 1rem;
      height: 1rem;
    }
  }
}

@media (max-width: 700px) {
  .news-item {
    grid-template-areas:
      'title title title title'
      'image image image image '
      'author author . .'
      'description description description description'
      'link link link .'
      'details details details details';

    .image {
      max-width: 100%;
    }
  }
}
</style>
