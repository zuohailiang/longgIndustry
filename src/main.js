// import './static/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-contextmenu/style/css/font-awesome.min.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import 'viewerjs/dist/viewer.css'
// import 'ol/css/ol.css'

import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import ol from 'ol'
import echarts from 'echarts'
import router from './router'
import 'jquery'
import VueContextMenu from 'vue-contextmenu'
import VideoPlayer from 'vue-video-player'
import filters from './filter/index.js';

import Viewer from 'v-viewer'

// import $ from 'jquery'

import "babel-polyfill"
import promise from 'es6-promise';

import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ol)
Vue.use(VueContextMenu)
Vue.prototype.$echarts = echarts 
Vue.use(VideoPlayer)
Vue.use(Viewer)
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
promise.polyfill()
Vue.use(VueResource)
// Vue.use($)

const Bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    Bus: Bus
  },
  router,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     console.log(to.meta.title);
//     if (to.meta.title) {
//       document.title = to.meta.title
//     }
//     next()
// })
