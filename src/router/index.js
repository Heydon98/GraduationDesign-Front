import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from './Home'
import Login from './Login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                keepAlive: false
            }
        }
    ]
})
