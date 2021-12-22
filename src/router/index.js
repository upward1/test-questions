import Vue from 'vue'
import VueRouter from 'vue-router'
import Topic1 from '../views/Topic1.vue'
import Topic2 from '../views/Topic2.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/topic1' },
  {
    path: '/topic1',
    name: 'Topic1',
    component: Topic1
  },
  {
    path: '/topic2',
    name: 'Topic2',
    component: Topic2
  }
]

const router = new VueRouter({
  routes
})

export default router
