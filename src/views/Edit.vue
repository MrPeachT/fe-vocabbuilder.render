<template>
  <div>
    <h1>Edit Word</h1>
    <word-form :word="word" @createOrUpdate="createOrUpdate" />

    <div style="margin-top: 20px; text-align: center;">
      <router-link :to="{ name: 'words' }" class="ui button">
        Back to list
      </router-link>
    </div>
  </div>
</template>

<script>
import WordForm from "../components/WordForm.vue";
import { api } from "../helpers/helpers";

export default {
  name: "edit",
  components: { WordForm },
  data() {
    return { word: {} };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  },
  methods: {
    async createOrUpdate(word) {
      const res = await api.updateWord(word);

      this.flash("Word updated successfully!", "success");

      this.$router.push(`/words/${res._id}`);
    }
  }
};
</script>