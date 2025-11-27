<template>
  <div v-if="word">
    <h1 style="text-align: center;">Word Details</h1>

    <p><strong>English:</strong> {{ word.english }}</p>
    <p><strong>German:</strong> {{ word.german }}</p>
    <p><strong>Vietnamese:</strong> {{ word.vietnamese }}</p>
    <router-link :to="{ name: 'edit'}" class="ui button green" :params="{ id: word._id }">
      Edit
    </router-link>
    <router-link :to="{ name: 'words' }" class="ui button">
      Back to list
    </router-link>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'show',
  data() {
    return {
      word: null
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  }
};
</script>