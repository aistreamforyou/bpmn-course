// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//引入element-ui
import ElementUI from 'element-ui'
Vue.use(ElementUI)
//引入bpmn的样式表（流程图基本样式）
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
//属性面板样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

//引入本地样式
import '../static/reset.css'
//引入iconfont图标
import '../static/iconfont/iconfont.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
