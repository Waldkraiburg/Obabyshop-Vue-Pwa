import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  created() {
    const html = document.documentElement; // returns the html tag
    html.setAttribute("lang", "fr");
  },
}).$mount("#app");
