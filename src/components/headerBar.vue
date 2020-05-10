<template>
  <div class="headerBar">
    <div class="header_banner">
      E浙理管理平台
      <div class="user_info">
        <i class="el-icon-user-solid"><span class="username">杨海东</span></i>
        <el-dropdown>
          <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账号设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header_banner{
  padding: 24px;
  background-color: #128784;
  color: #fff;
  font-size: 25px;
  text-align: center;
}
.user_info{
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
  .username{
    font-size: 18px;
  }
</style>
