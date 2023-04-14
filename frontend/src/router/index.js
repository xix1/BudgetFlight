import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import AccountView from '../views/AccountView.vue'
import SearchView from '../views/SearchView.vue'
import ProfileSection from '../views/account/ProfileSection.vue'
import { useAuthStore } from '../stores/useAuthStore'

//route protection
//use beforeEnter: requireAuth to protect any route
const requireAuth=(to,from,next)=>{
  let authStore = useAuthStore()
  if(!authStore.user){
    next({name:'home'})
    return
  }
  else{
    next()
    return
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      //  beforeEnter: (to, from, next) => {
      //    useAuthStore().user ? next({name:'search'}) : next()
      //  },
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/account',
      // beforeEnter: (to, from, next) => {
      //   useAuthStore().user ? next('/account/profile/' + useAuthStore().user.uid) : next('/login')
      // },
      name: 'account',
      component : AccountView,
    },
    {
      path: '/search',
      // beforeEnter: (to, from, next) => {
      //   useAuthStore().user ? next('/account/profile/' + useAuthStore().user.uid) : next('/login')
      // },
      name: 'search',
      component : SearchView,
    }
  ]
})

export default router
