import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: () =>
      import(/* webpackChunkName: "HomeView" */ "@/views/HomeView"),
  },
  {
    name: "categories",
    path: "/categorie/:id",
    component: () =>
      import(/* webpackChunkName: "CategoryView" */ "@/views/CategoryView"),
  },
  {
    name: "places",
    path: "/ville/:id",
    component: () =>
      import(/* webpackChunkName: "PlaceView" */ "@/views/PlaceView"),
  },
  {
    name: "product",
    path: "/articles/:id",
    component: () =>
      import(/* webpackChunkName: "ProductView" */ "@/views/ProductView"),
  },
  {
    name: "blog",
    path: "/blog",
    component: () =>
      import(/* webpackChunkName: "BlogView" */ "@/views/BlogView"),
  },
  {
    name: "blog-post",
    path: "/blog/:id",
    component: () =>
      import(/* webpackChunkName: "BlogSingleView" */ "@/views/BlogSingleView"),
  },
  {
    name: "pages",
    path: "/page/:id",
    component: () =>
      import(/* webpackChunkName: "PagesView" */ "@/views/PagesView"),
  },
  {
    name: "dashboard",
    path: "/mon-compte",
    component: () =>
      import(/* webpackChunkName: "DashboardView" */ "@/views/DashboardView"),
  },
  {
    name: "add-product",
    path: "/ajouter-un-produit",
    component: () =>
      import(/* webpackChunkName: "AddProductView" */ "@/views/AddProductView"),
  },
  {
    name: "messages",
    path: "/mes-messages",
    component: () =>
      import(
        /* webpackChunkName: "MessagesPanelView" */ "@/views/MessagesPanelView"
      ),
  },
  {
    name: "404",
    path: "*",
    component: () => import(/* webpackChunkName: "NotFound" */ "@/views/404"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
