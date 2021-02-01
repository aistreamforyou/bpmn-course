import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../pages/home')
const index = () => import('../pages/bpmn/index')
const fullScreen = () => import('../pages/fullScreen/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/bpmn/index'
    },
    {
      path: '/bpmn',
      name: 'Home',
      component: Home,
      children: [
        {path: 'index', name: 'bpmn功能演示', components: {default: index}},
        {path: 'fullScreen', name: '组件全屏', components: {default: fullScreen}},
      ]
    }
  ]
})
