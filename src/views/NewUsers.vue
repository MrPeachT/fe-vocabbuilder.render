<template>
  <div class="ui segment" style="max-width: 500px; margin: 2rem auto;">
    <h2 class="ui header center aligned">
      <i class="user plus icon"></i>
      <div class="content">Add New User</div>
    </h2>

    <form class="ui form" @submit.prevent="onSubmit">
      <div class="field">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        />
      </div>

      <div class="field">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter password (min 8 characters)"
          required
        />
      </div>

      <div class="field">
        <label>Role</label>
        <select v-model="role" class="ui dropdown">
          <option value="student">student</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <div
        style="margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem;"
      >
        <button class="ui primary button" :class="{ loading }" type="submit">
          Create User
        </button>
      </div>
      <div
        style="margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem;"
      >
        <router-link to="/admin/users" class="ui button">
          Cancel
        </router-link>
      </div>

      <div
        v-if="error"
        class="ui negative message"
        style="margin-top: 1rem;"
      >
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "add-user",
  data() {
    return {
      email: "",
      password: "",
      role: "student",
      loading: false,
      error: null
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      this.error = null;

      if (!this.email || !this.password) {
        this.error = "Email and password are required.";
        this.loading = false;
        return;
      }

      if (this.password.length < 8) {
        this.error = "Password must be at least 8 characters.";
        this.loading = false;
        return;
      }

      try {
        await axios.post(
          "http://localhost:3000/admin/users",
          {
            email: this.email,
            password: this.password,
            role: this.role
          },
          { withCredentials: true }
        );

        this.flash("User created successfully!", "success");
        this.$router.push("/admin/users");
      } catch (err) {
        console.error("Add user failed:", err);
        this.error =
          err?.response?.data?.error || "Failed to create user. Please try again.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>