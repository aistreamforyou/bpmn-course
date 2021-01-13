import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../pages/home')
const index = () => import('../pages/bpmn/index')

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
        {path: 'index', name: '首页', components: {default: index}},
      ]
    }
  ]
})
