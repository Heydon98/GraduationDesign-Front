<template>
    <div id="index">
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
    </div>
</template>

<script>
    import left from '../components/teacherLeftBar'
    import headerNav from '../components/headerBar'
    export default {
        name: 'TeacHome',
        data() {
            return {

            }
        },
        computed: {},
        methods: {

        },
        components: {
            headerNav: headerNav,
            left: left
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    #index {

    }

    /* .el-aside {
      color: #333;
    }
    .header_banner{
      padding: 20px;
      height: 30%;
      background-color: #128784;
      color: #fff;
      font-size: 25px;
      text-align: center;
    }
    .el-menu-vertical-demo{
      width: 15%;
      height: 670px;
    } */
    .page_part {
        float: right;
        margin: 10px;
    }
</style>