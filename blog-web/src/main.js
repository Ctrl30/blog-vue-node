import Vue from "vue";
import axios from 'axios';
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
import setAxios from '../setAxios';
import Cookie from 'js-cookie';

setAxios();
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(mavonEditor);
router.beforeEach((to, form, next) => {
  let token = Cookie.get('token');
  store.commit('setToken', Cookie.get('token'))
  if (to.meta.requireAuth) {
    // let token = Cookie.get('token');
    // store.commit('setToken', Cookie.get('token'))
    if (store.state.token) {
      store.commit("changeIsSignIn", token);
      next();
    }else{
      next({path: '/login'})
    }
  }else{
    next()
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
