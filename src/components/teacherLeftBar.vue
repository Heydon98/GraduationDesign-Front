<template>
    <div class="leftBar">
        <el-menu
                default-active="this.$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                router
                active-text-color="#ffd04b">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>业务办理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">健康申报</el-menu-item>
                    <el-menu-item index="2-2">困难生审核</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>信息查询</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">学生信息查询</el-menu-item>
                    <el-menu-item index="3-2">成绩查询</el-menu-item>
                    <el-menu-item index="3-3">图书借阅查询</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>学风建设</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/teacher/manageAward">管理奖项</el-menu-item>
                    <el-menu-item index="/teacher/checkApply">审批申请</el-menu-item>
                    <el-menu-item index="/teacher/statistics">获奖统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="5">
                <i class="el-icon-menu"></i>
                <span slot="title">寝室建设</span>
            </el-menu-item>
            <el-menu-item index="">
                <i class="el-icon-menu"></i>
                <span slot="title">账号信息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'leftBar',
        data () {
            return {

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
                switch (key) {
                    case "4-1": this.$router.push("/openAwards");
                    case "4-2": this.$router.push("/applingAwards")
                }
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .el-menu-vertical-demo{
        height: 675px;
        width: 200px;
    }
    .el-aside {
        color: #333;
    }
</style>