import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Dashboard.vue"),
        },
        // {
        //   path: "/icons",
        //   name: "icons",
        //   component: () =>
        //     import(/* webpackChunkName: "demo" */ "./views/Icons.vue"),
        // },
        // {
        //   path: "/profile",
        //   name: "profile",
        //   component: () =>
        //     import(/* webpackChunkName: "demo" */ "./views/UserProfile.vue"),
        // },
        // {
        //   path: "/maps",
        //   name: "maps",
        //   component: () =>
        //     import(/* webpackChunkName: "demo" */ "./views/Maps.vue"),
        // },
        // {
        //   path: "/tables",
        //   name: "tables",
        //   component: () =>
        //     import(/* webpackChunkName: "demo" */ "./views/Tables.vue"),
        // },
      ],
    },
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Login.vue"),
        },
        {
          path: "/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Register.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("@token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    }
  }
  if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("@token") == null) {
      next();
    } else {
      next({ name: "dashboard" });
    }
  } else {
    next();
  }
});

export default router;
