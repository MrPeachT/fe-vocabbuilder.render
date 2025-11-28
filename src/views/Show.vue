<template>
  <div v-if="word">
    <h1 style="text-align: center;">Word Details</h1>

    <p><strong>English:</strong> {{ word.english }}</p>
    <p><strong>German:</strong> {{ word.german }}</p>
    <p><strong>Vietnamese:</strong> {{ word.vietnamese }}</p>
    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 20px;">
      <router-link :to="`/words/${word._id}/edit`" class="ui green button">
        Edit
      </router-link>

      <router-link to="/words" class="ui button red">
        Back to List
      </router-link>
    </div>
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