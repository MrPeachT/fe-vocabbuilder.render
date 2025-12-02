<template>
  <div class="ui segment" style="max-width: 500px; margin: 2rem auto;">
    <h2 class="ui header center aligned">
      <i class="edit icon"></i>
      <div class="content">Edit User</div>
    </h2>

    <div v-if="loading" class="ui active inline loader" style="margin-top: 1rem;"></div>

    <form v-else class="ui form" @submit.prevent="onSubmit">
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
        <label>Role</label>
        <select v-model="role" class="ui dropdown">
          <option value="student">student</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <div class="field">
        <label>New Password (optional)</label>
        <input
          v-model="newPassword"
          type="password"
          placeholder="Leave blank to keep current password"
        />
      </div>
      
        <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem;">
            <button
                class="ui primary button"
                :class="{ loading: saving }"
            >
                Save Changes
            </button>
        </div>
        <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem;">
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
  name: "edit-user",
  data() {
    return {
      email: "",
      role: "student",
      newPassword: "",
      loading: true,
      saving: false,
      error: null,
      userId: null
    };
  },
  computed: {
    currentUser() {
      return this.$root.user;
    }
  },
  async created() {
    try {
      const id = this.$route.params.id;
      this.userId = id;

      const res = await axios.get(
        `http://localhost:3000/admin/users/${id}`,
        { withCredentials: true }
      );

      const u = res.data;
      this.email = u.email;
      this.role = u.role || "student";
    } catch (err) {
      console.error("Failed to load user for edit:", err);
      this.error = "Failed to load user.";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async onSubmit() {
      this.saving = true;
      this.error = null;

      if (!this.email) {
        this.error = "Email is required.";
        this.saving = false;
        return;
      }

      if (this.currentUser &&
          String(this.userId) === String(this.currentUser.id) &&
          this.role !== "admin") {
        this.error = "You cannot remove your own admin role.";
        this.role = "admin";
        this.saving = false;
        return;
      }

      try {
        const payload = {
          email: this.email,
          role: this.role
        };

        if (this.newPassword && this.newPassword.length >= 8) {
          payload.password = this.newPassword;
        } else if (this.newPassword && this.newPassword.length < 8) {
          this.error = "New password must be at least 8 characters.";
          this.saving = false;
          return;
        }

        await axios.put(
          `http://localhost:3000/admin/users/${this.userId}`,
          payload,
          { withCredentials: true }
        );

        this.flash("User updated successfully!", "success");
        this.$router.push("/admin/users");
      } catch (err) {
        console.error("Update user failed:", err);
        this.error =
          err?.response?.data?.error || "Failed to update user. Please try again.";
      } finally {
        this.saving = false;
      }
    }
  }
};
</script>