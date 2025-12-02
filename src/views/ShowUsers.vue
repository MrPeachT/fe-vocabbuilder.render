<template>
  <div class="ui segment" style="max-width: 600px; margin: 2rem auto;">
    <h2 class="ui header center aligned">
      <i class="user icon"></i>
      <div class="content">User Details</div>
    </h2>

    <div v-if="loading" class="ui active inline loader" style="margin-top: 1rem;"></div>

    <div v-else-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
      <p><strong>Created:</strong> {{ formatDate(user.createdAt) }}</p>

      <div style="display:flex; justify-content:center; gap:1rem; margin-top:20px;">
        <router-link
          :to="{ name: 'edit-user', params: { id: user._id } }"
          class="ui green button"
        >
          Edit
        </router-link>

        <router-link to="/admin/users" class="ui button">
          Back to Accounts
        </router-link>
      </div>
    </div>

    <div v-else>
      <div class="ui negative message">
        Failed to load user.
      </div>
      <router-link to="/admin/users" class="ui button">
        Back to Accounts
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "show-user",
  data() {
    return {
      user: null,
      loading: true
    };
  },
  computed: {
    currentUser() {
      return this.$root.user;
    }
  },
  methods: {
    formatDate(value) {
      if (!value) return "";
      return new Date(value).toLocaleString();
    }
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const res = await axios.get(
        `https://vocab-backend.onrender.com/admin/users/${id}`,
        { withCredentials: true }
      );
      this.user = res.data;
    } catch (err) {
      console.error("Failed to load user:", err);
      this.user = null;
    } finally {
      this.loading = false;
    }
  }
};
</script>