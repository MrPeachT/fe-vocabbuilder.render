import axios from "axios";
import Vue from "vue";
import vueFlashMessage from "vue-flash-message";
import "vue-flash-message/dist/vue-flash-message.min.css";

Vue.use(vueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();

const client = axios.create({
  baseURL: "https://vocab-backend-6bjj.onrender.com",
  withCredentials: true,         
  headers: {
    "Content-Type": "application/json"
  }
});

const handleError = fn => async (...params) => {
  try {
    return await fn(...params);
  } catch (error) {
    const status = error?.response?.status;
    const statusText = error?.response?.statusText;
    const backendMsg = error?.response?.data?.error;

    const msg =
      backendMsg ||
      (status ? `${status}: ${statusText}` : error.message || "Request failed");

    vm.flash(msg, "error");
    throw error;
  }
};

export const api = {
  getWord: handleError(async id => {
    const res = await client.get(`/words/${id}`);
    return res.data;
  }),

  getWords: handleError(async () => {
    const res = await client.get("/words");
    return res.data;
  }),

  deleteWord: handleError(async id => {
    const res = await client.delete(`/words/${id}`);
    return res.data;
  }),

  createWord: handleError(async payload => {
    const res = await client.post("/words", payload);
    return res.data;
  }),

  updateWord: handleError(async payload => {
    const res = await client.put(`/words/${payload._id}`, payload);
    return res.data;
  })
};