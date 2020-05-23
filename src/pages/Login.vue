<template>
    <div class="login">
        
        <form class="login_form">
            <div class="login_input">
                <span>账号</span><br>
                <input type="text" placeholder=" 请输入账号" v-model="username" /><br>
                <span>密码</span><br>
                <input type="password" placeholder=" 请输入密码" v-model="password" /><br>
            </div>
            <el-radio-group class="login_check" v-model="role">
                <el-radio :label="3">学生</el-radio>
                <el-radio :label="6">教师</el-radio>
                <el-radio :label="9">管理员</el-radio>
            </el-radio-group><br>
            <el-button size="small" @click="logIn()">登陆</el-button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return{
                username: '',
                password: '',
                role: 3
            }
        },
        methods: {
            logIn() {
                var params = new URLSearchParams();
                params.append('username', this.username);       //你要传给后台的参数值 key/value
                params.append('password', this.password);
                if (this.role == 3) {
                    this.$axios.post('http://localhost:8088/student/login',
                        params
                    ).then((res) =>{
                        if(res.data['code'] == 200){
                            sessionStorage.clear();
                            sessionStorage.setItem('username', JSON.stringify(res.data.data.username));
                            sessionStorage.setItem('collegeId', JSON.stringify(res.data.data.collegeId))
                            sessionStorage.setItem('token', res.data.data.token);
                            sessionStorage.setItem('realName', res.data.data.realName);
                            this.$router.push('/student');
                        }
                    }).catch(function (err) {
                        Toast(err);
                    })
                } else if (this.role == 6) {
                    this.$axios.post('http://localhost:8088/teacher/login',
                        params
                    ).then((res) => {
                        if(res.data['code'] == 200) {
                            sessionStorage.clear();
                            sessionStorage.clear();
                            sessionStorage.setItem('username', JSON.stringify(res.data.data.username));
                            sessionStorage.setItem('collegeId', JSON.stringify(res.data.data.collegeId))
                            sessionStorage.setItem('token', res.data.data.token);
                            sessionStorage.setItem('realName', res.data.data.realName);
                            this.$message.success("欢迎您，" + res.data.data.realName);
                            this.$router.push('/teacher');
                        }
                    }).catch(function (err) {
                        Toast(err);
                    })

                } else if (this.role == 9) {

                }


            }
        }
    }
</script>

<style scoped>
.login{
    height: 100%;
    width: 100%;
    background-color: #ECEDF0;
    padding: 17% 0;
    /*background-image: url();*/
}
.login_form{
    width: 25%;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 2px;
    margin-top: -5%;
    padding: 2% 2% 4% 2%;
    border-top: 3px solid #409eff;
}
.login_input{
    margin: 0 15%;
}
.el-button{
    float: right;
    background: #409eff;
    color: #fff;
    margin-right: 14%;
}
span{
    font-size: 18px;
    line-height: 35px;
}
input{
    height: 27px;
    width: 100%;
}
.login_check{
    margin: 6% 18%;
}
.noname{
    width: 20px;
    height: 20px;
    background-color: #409eff;
}
</style>