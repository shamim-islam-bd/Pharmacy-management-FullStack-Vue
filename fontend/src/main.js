import axios from 'axios';
import mitt from 'mitt';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


// import "./assets/css/ayoflex.css"
import "ayoflex/dist/ayoflex.min.css";
import "./assets/css/example.css";
import './style.css';


// default axios token send for headers for all requests
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');





const eventBus = mitt()



const app = createApp(App);
app.use(router);
app.config.globalProperties.$eventBus = eventBus;
app.mount('#app')
  
