<template>
  <div>
    <h1 class="ui header" style="text-align:center;">Manage Accounts</h1>

    <table class="ui celled table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u._id">
          <td>{{ u.email }}</td>
          <td>
            <select v-model="u.role" @change="updateRole(u)">
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
          </td>
          <td>{{ formatDate(u.createdAt) }}</td>
          <td class="center aligned">
            <router-link
                :to="{ name: 'show-user', params: { id: u._id } }"
                class="ui green button"
            >
                Show
            </router-link>

            <button class="ui red button" @click="removeUser(u)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem;">
      <router-link
        to="/admin/users/new"
        class="ui blue button"
        >
          Add New User
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "manage-users",

  data() {
    return {
      users: []
    };
  },

  computed: {
    currentUser() {
      return this.$root.user;
    }
  },

  async created() {
    const res = await axios.get("http://localhost:3000/admin/users", {
      withCredentials: true
    });
    this.users = res.data;
  },

  methods: {
    formatDate(value) {
      if (!value) return "";
      return new Date(value).toLocaleString();
    },

    async updateRole(user) {
      if (String(user._id) === String(this.currentUser.id) &&
          user.role !== "admin") {
        this.$flash("You cannot remove your own admin role.", "error");
        user.role = "admin";
        return;
      }

      if (!confirm(`Change role of ${user.email} to ${user.role}?`)) return;

      try {
        await axios.put(
          `http://localhost:3000/admin/users/${user._id}/role`,
          { role: user.role },
          { withCredentials: true }
        );
        this.$flash("Role updated", "success");
      } catch (err) {
        this.$flash("Failed to update role", "error");
      }
    },

    async removeUser(user) {
      if (String(user._id) === String(this.currentUser.id)) {
        return this.$flash("You cannot delete your own account.", "error");
      }

      if (!confirm(`Delete ${user.email}?`)) return;

      try {
        await axios.delete(
          `http://localhost:3000/admin/users/${user._id}`,
          { withCredentials: true }
        );
        this.users = this.users.filter(u => u._id !== user._id);
        this.$flash("User deleted", "success");
      } catch (err) {
        this.$flash("Failed to delete user", "error");
      }
    }
  }
};
</script>