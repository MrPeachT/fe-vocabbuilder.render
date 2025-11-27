<template>
  <form @submit.prevent="onSubmit">

    <p v-if="errorsPresent" class="ui negative message">
      Please fill out all fields!
    </p>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="united kingdom flag"></i> English</div>
      <input v-model="word.english" placeholder="Enter English..." />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="germany flag"></i> German</div>
      <input v-model="word.german" placeholder="Enter German..." />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="vietnam flag"></i> Vietnamese</div>
      <input v-model="word.vietnamese" placeholder="Enter Vietnamese..." />
    </div>

    <div style="display: flex; justify-content: center; margin-top: 1rem;">
        <button class="ui primary button" type="submit">Save Word</button>
    </div>

  </form>
</template>

<script>
export default {
  name: "word-form",
  props: {
    word: {
      type: Object,
      default: () => ({
        english: "",
        german: "",
        vietnamese: ""
      })
    }
  },
  data() {
    return {
      errorsPresent: false
    };
  },
  methods: {
    onSubmit() {
        const english = (this.word.english || '').trim();
        const german = (this.word.german || '').trim();
        const vietnamese = (this.word.vietnamese || '').trim();

        if (!english || !german || !vietnamese) {
            this.errorsPresent = true;
            return;
        }

        this.word.english = english;
        this.word.german = german;
        this.word.vietnamese = vietnamese;

        this.errorsPresent = false;
        this.$emit('createOrUpdate', this.word);
    }
  }   
};
</script>