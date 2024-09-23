import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DataVVue3 from '@kjgl77/datav-vue3'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import  "./components/index.css"
import  "./components/index.css"
createApp(App).use(store).use(router).use(DataVVue3).use(ElementPlus).mount('#app')
