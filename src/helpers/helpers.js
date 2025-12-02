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

const baseURL = "https://vocab-backend-6bjj.onrender.com/words/";

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
    const res = await axios.get(baseURL + id, { withCredentials: true });
    return res.data;
  }),

  getWords: handleError(async () => {
    const res = await axios.get(baseURL, { withCredentials: true });
    return res.data;
  }),

  deleteWord: handleError(async id => {
    const res = await axios.delete(baseURL + id, { withCredentials: true });
    return res.data;
  }),

  createWord: handleError(async function (payload) {
    const res = await axios.post(baseURL, payload, { withCredentials: true });
    return res.data;
  }),

  updateWord: handleError(async payload => {
    const res = await axios.put(
      baseURL + payload._id,
      payload,
      { withCredentials: true }
    );
    return res.data;
  })
};