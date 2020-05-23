import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import StuHome from '../pages/StuHome'
import TeacHome from '../pages/TeacHome'
import Login from '../pages/Login'
import OpenAwards from '../pages/OpenAwards'
import ApplingAwards from '../pages/ApplyingAwards'
import AppliedAwardsHistory from '../pages/ApplyingAwards'
import ManageAward from "../pages/ManageAward";
import CheckApply from "../pages/CheackApply";
import Statistics from "../pages/Statistics";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/student',
            name: 'StuHome',
            component: StuHome,
            meta: {
                keepAlive: true
            },
            children: [
                {
                    path: 'openAwards',
                    name: 'OpenAwards',
                    component: OpenAwards,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'applyingAwards',
                    name: 'ApplyingAwards',
                    component: ApplingAwards,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'appliedAwardsHistory',
                    name: 'AppliedAwardsHistory',
                    component: ApplingAwards,
                    meta: {
                        keepAlive: true
                    }
                }
            ]
        },
        {
            path: '/teacher',
            name: 'TeacHome',
            component: TeacHome,
            meta: {
                keepAlive: true
            },
            children: [
                {
                    path: 'manageAward',
                    name: 'ManageAward',
                    component: ManageAward,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'checkApply',
                    name: 'CheckApply',
                    component: CheckApply,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'statistics',
                    name: 'Statistics',
                    component: Statistics,
                    meta: {
                        keepAlive: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                keepAlive: false
            }
        },
    ]
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = sessionStorage.getItem('token');
        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
