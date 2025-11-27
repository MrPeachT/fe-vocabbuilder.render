<template>
  <div>
    <h1 style="text-align: center;">Create New Word</h1>
    <word-form @createOrUpdate="createOrUpdate" />
  </div>
</template>

<script>
import WordForm from "../components/WordForm.vue";
import { api } from "../helpers/helpers";

export default {
  name: "new-word",
  components: { WordForm },
  methods: {
    async createOrUpdate(word) {
      const res = await api.createWord(word);

      this.flash("Word created successfully!", "success");

      this.$router.push(`/words/`);
    }
  }
};
</script>