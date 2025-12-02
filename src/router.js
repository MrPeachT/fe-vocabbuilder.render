import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';

import Words from './views/Words.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';
import Show from './views/Show.vue';
import Test from './views/Test.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

import ManageUsers from './views/ManageUsers.vue';
import NewUsers from './views/NewUsers.vue';
import ShowUsers from './views/ShowUsers.vue';
import EditUsers from './views/EditUsers.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/words'
    },
    {
      path: '/words',
      name: 'words',
      component: Words
    },
    {
      path: '/words/new',
      name: 'new',
      component: New,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/words/:id/edit',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },

    {
      path: '/admin/users',
      name: 'manage-users',
      component: ManageUsers,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users/new',
      name: 'new-user',
      component: NewUsers,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users/:id',
      name: 'show-user',
      component: ShowUsers,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users/:id/edit',
      name: 'edit-user',
      component: EditUsers,
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const needsAuth = to.matched.some(r => r.meta.requiresAuth || r.meta.requiresAdmin);
  if (!needsAuth) {
    return next();
  }

  try {
    const res = await axios.get('https://vocab-backend-6bjj.onrender.com/auth/me', {
      withCredentials: true
    });

    const user = res.data;

    if (!user) {
      return next('/login');
    }

    const needsAdmin = to.matched.some(r => r.meta.requiresAdmin);

    if (needsAdmin && user.role !== 'admin') {
      return next('/words');  
    }

    return next();
  } catch (err) {
    console.error('Guard: not logged in or /auth/me failed', err);
    return next('/login');
  }
});

export default router;