import Vue from 'vue'
import App from './App'
import router from './router'

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
