<template>
  <div id="app">
  <!-- 其他页 -->
    <el-container v-if="$route.meta.keepAlive">
      <el-header>
        <keep-alive>
        <!-- 导航栏 -->
          <header-nav></header-nav>
        </keep-alive>
      </el-header>
      <el-container>
        <el-aside>
          <!-- 侧边栏 -->
          <keep-alive>
            <left></left>
          </keep-alive>
        </el-aside>
        <el-main>
        <!-- Body -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import left from './components/leftBar'
import headerNav from './components/headerBar'
export default {
  name: 'App',
  components: {
    headerNav: headerNav,
    left: left
   }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.el-header{
  padding: 0;
  height: 80px!important;
}
#app {
}
</style>
