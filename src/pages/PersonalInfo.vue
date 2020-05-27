<template>
    <div>
        <el-tabs type="border-card" style="margin: 20px">
            <div style="height: 10px">
                <span></span>
            </div>
            <el-form :model="info">
                <el-form-item>
                    <el-row>
                        <el-col :span="12">
                            学号：
                            <el-input
                                    :disabled="true"
                                    v-model="this.info.stuId">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            姓名：
                            <el-input
                                    :disabled="true"
                                    v-model="this.info.stuName">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="12">
                            学院：
                            <el-input
                                    :disabled="true"
                                    v-model="this.info.college">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            系别：
                            <el-input
                                    :disabled="true"
                                    v-model="this.info.major">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="12">
                            年级：
                            <el-input
                                    :disabled="true"
                                    v-model="this.info.classYear">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            班级：
                            <el-input
                                    :disabled="true"
                                    v-model="this.info.clazz">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="12">
                            微信：
                            <el-input
                                    v-model="this.info.wechat">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            QQ：
                            <el-input
                                    v-model="this.info.qq">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                    label="电话号码：">
                    <el-input
                            v-model="this.info.tel">
                    </el-input>
                </el-form-item>
                <el-form-item
                        label="电子邮件：">
                    <el-input
                            v-model="this.info.email">
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click="handleCommit">确认修改</el-button>

            </el-form>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "PersonalInfo",
        data() {
            return{
                info: ''
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8088/student/personalInfo')
                .then((res) => {
                    this.info = res.data.data.personalInfo;
                })
        },
        methods: {
            handleCommit(){
                let params = new URLSearchParams();
                params.append('wechat', this.info.wechat);
                params.append('qq', this.info.qq);
                params.append('tel', this.info.tel);
                params.append('email', this.info.email);
                this.$axios.post('http://localhost:8088/student/changeInfo', params)
                    .then((res) => {
                        if (res.data['code'] == 200) {
                            this.success();
                        }
                    });
            },
            success() {
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
                location.reload();
            }
        }
    }
</script>

<style scoped>

    .el-input {
        width: 230px;
    }
    .el-tabs {
        width: 600px;
    }
    .el-button{
        text-align: center;
    }

</style>