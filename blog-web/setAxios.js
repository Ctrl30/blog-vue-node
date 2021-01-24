import axios from "axios";
import store from "./src/store/index";
import Cookie from 'js-cookie';
axios.defaults.baseURL = "http://106.52.102.92:3000/";
export default function setAxios() {
  //请求拦截
  axios.interceptors.request.use((config) => {
    // console.log('aaaaaaaaaaa', Cookie.get('token'))
    // console.log('store', store)
    if (store.state.token) {
      config.headers["Authorization"] = `Bearer ${Cookie.get('token')}`;
    }
    return config;
  });
}
