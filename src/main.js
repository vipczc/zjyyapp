import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './globalRegistration'
import './less'
import echarts from 'echarts'


Vue.prototype.$echarts = echarts

// 实际打包时应该不引入mock,若接口可用 则注释下列
// import env from '../config/env'
// env === 'development' && require('@/mock')

Vue.prototype.noScroll = function () {
    var mo = function (e) { e.preventDefault() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', mo, false)// 禁止页面滑动
  }
   
  
// Vue.use(LyTab)
  //弹出框可以滑动
Vue.prototype.canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
