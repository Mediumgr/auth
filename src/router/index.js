import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import auth from "../middleware/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "AboutView" */ "../views/AboutView.vue"),
    beforeEnter: auth,
  },
  {
    path: "/login",
    name: "LoginView",
    component: () =>
      import(
        /* webpackChunkName: "LoginView" */ "../views/AuthenticateView.vue"
      ),
  },
  {
    path: "/register",
    name: "RegisterView",
    component: () =>
      import(
        /* webpackChunkName: "RegisterView" */ "../views/AuthenticateView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getTitle = (routeName) => {
  return {
    Home: "Главная страница",
    About: "Мой профиль",
    LoginView: "Авторизация",
    RegisterView: "Регистрация",
  }[routeName];
};

router.afterEach((to) => {
  document.title = getTitle(to.name);
});

export default router;
