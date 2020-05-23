<template>
    <div id="headerBar" class="headerBar">
        <div class="header_banner">
            E浙理管理平台
            <div class="user_info">
                <i class="el-icon-user-solid"><span class="username">{{arealName}}</span></i>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">修改个人信息</el-dropdown-item>
                        <el-dropdown-item command="2">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderBar',
        data() {
            return {
                arealName: ''
            }
        },
        methods: {
            handleCommand(command) {
                if (command === 1){

                }
                if (command === '2') {
                    sessionStorage.clear();
                    this.$router.push('/login');
                }
            }
        },
        mounted() {
            this.arealName = sessionStorage.getItem('realName');
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header_banner {
        padding: 24px;
        background-color: #409eff;
        color: #fff;
        font-size: 25px;
        text-align: center;
    }

    .user_info {
        float: right;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 18px;
        color: #fff;
    }

    .username {
        font-size: 18px;
    }
</style>
