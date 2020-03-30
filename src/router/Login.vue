<template>
    <div>
        <form>
            <el-radio-group v-model="role">
                <el-radio :label="3">学生</el-radio>
                <el-radio :label="6">教师</el-radio>
                <el-radio :label="9">管理员</el-radio>
            </el-radio-group>
            账号：<input type="number" placeholder="请输入账号" v-model="username"><br>
            密码：<input type="password" placeholder="请输入密码" v-model="password">
            <el-button size="small" type="primary" @click="logIn()">登陆</el-button>
        </form>
    </div>
</template>

<script>
    import {Toast} from 'element-ui'
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
                        if (res){
                            if(res.data.result=='success'){
                                Toast('登陆成功');
                            }
                            else{
                                Toast('用户名或密码错误');
                            }
                        }
                    }).catch(function (err) {
                        Toast(err)
                    })
                } else if (this.role == 6) {

                } else if (this.role == 9) {

                }


            }
        }
    }
</script>

<style scoped>

</style>