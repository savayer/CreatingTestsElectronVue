import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: require('@/components/Test').default
    },
    {
      path: '/new-test',
      name: 'new-test',
      component: require('@/components/NewTest').default
    },
    {
      path: '/new-test/edit/:id',
      name: 'new-test',
      component: require('@/components/NewTest').default,
      props: true
    }
  ]
})
