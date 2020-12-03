import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/assets/scss/reset.scss";
import "@/assets/scss/common.scss";
import "@/assets/font/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(mavonEditor);
router.beforeEach((to, form, next) => {
  let token = "123";
  if (token) {
    store.commit("changeIsSignIn", 1);
  }
  next();
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
