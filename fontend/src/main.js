import { createApp } from 'vue';
import App from './App.vue';
// import "./assets/css/ayoflex.css"
import "./assets/css/example.css"
import "ayoflex/dist/ayoflex.min.css";
import './style.css';


import mitt from 'mitt';


const eventBus = mitt()



const app = createApp(App)
app.config.globalProperties.$eventBus = eventBus;
app.mount('#app')
  
