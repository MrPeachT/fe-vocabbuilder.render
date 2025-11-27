<template>
  <div>
    <h2 class="ui header">Test Yourself</h2>

    <div v-if="!current">
      <button class="ui button primary" @click="next">Start Test</button>
    </div>

    <div v-else class="ui segment">
      <h3>
        What is the
        <span v-if="targetLang === 'german'">German</span>
        <span v-else>Vietnamese</span>
        word for:
      </h3>

      <p><strong>{{ current.english }}</strong></p>

      <div class="ui form">
        <input
          type="text"
          v-model="answer"
          :placeholder="targetLang === 'german' ? 'Type German...' : 'Type Vietnamese...'"
        />
      </div>

      <button class="ui button green" @click="check">Check</button>
      <button class="ui button" @click="next">Next</button>

      <div
        v-if="result"
        class="ui message"
        :class="result.correct ? 'positive' : 'negative'"
      >
        <p>{{ result.message }}</p>
        <p v-if="!result.correct">
          Correct answer:
          <strong>
            {{ targetLang === 'german' ? current.german : current.vietnamese }}
          </strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/helpers";

export default {
  name: "Test",
  data() {
    return {
      words: [],
      current: null,
      targetLang: "german", 
      answer: "",
      result: null
    };
  },
  async mounted() {
    this.words = await api.getWords();
  },
  methods: {
    next() {
      if (!this.words.length) return;

      this.current = this.words[Math.floor(Math.random() * this.words.length)];

      this.targetLang = Math.random() < 0.5 ? "german" : "vietnamese";

      this.answer = "";
      this.result = null;
    },
    check() {
      if (!this.current) return;

      const correctValue =
        this.targetLang === "german"
          ? this.current.german
          : this.current.vietnamese;

      const user = this.answer.trim().toLowerCase();
      const correct = (correctValue || "").trim().toLowerCase();

      if (!user) {
        this.result = {
          correct: false,
          message: "Please type an answer first."
        };
        return;
      }

      if (user === correct) {
        this.result = {
          correct: true,
          message: "Correct!"
        };
      } else {
        this.result = {
          correct: false,
          message: "Wrong!"
        };
      }
    }
  }
};
</script>