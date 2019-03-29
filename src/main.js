import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueBus from 'vue-bus'

Vue.use(VueBus)
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

 function containsObjProperty(obj, prop, list){
  for (var i = 0; i < list.length; i++) {
      if (list[i][prop] === obj[prop]) {
          return true;
      }
  }

  return false;
} 
Array.prototype.containsObjProperty = containsObjProperty;
