<template>
    <div id="app">
<!--        &lt;!&ndash; 其他页 &ndash;&gt;-->
<!--        <el-container v-if="$route.meta.keepAlive">-->
<!--            <el-header>-->
<!--                <keep-alive>-->
<!--                    &lt;!&ndash; 导航栏 &ndash;&gt;-->
<!--                    <header-nav></header-nav>-->
<!--                </keep-alive>-->
<!--            </el-header>-->
<!--            <el-container>-->
<!--                <el-aside>-->
<!--                    &lt;!&ndash; 侧边栏 &ndash;&gt;-->
<!--                    <keep-alive>-->
<!--                        <left></left>-->
<!--                    </keep-alive>-->
<!--                </el-aside>-->
<!--                <el-main>-->
<!--                    &lt;!&ndash; Body &ndash;&gt;-->
<!--                    <router-view></router-view>-->
<!--                </el-main>-->
<!--            </el-container>-->
<!--        </el-container>-->
        <!-- 登录页 -->
        <router-view></router-view>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    // import left from './components/studentLeftBar'
    // import headerNav from './components/headerBar'

    export default {
        name: 'App',
        components: {
            // headerNav: headerNav,
            // left: left
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .el-header {
        padding: 0;
        height: 80px !important;
    }

    #app {
    }
</style>
