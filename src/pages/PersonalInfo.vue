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
                                    value="2016329600163">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            姓名：
                            <el-input
                                    :disabled="true"
                                    value="杨海东">
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
                                    value="2016329600163">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            系别：
                            <el-input
                                    :disabled="true"
                                    value="杨海东">
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
                                    value="2016329600163">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            班级：
                            <el-input
                                    :disabled="true"
                                    value="杨海东">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="12">
                            微信：
                            <el-input
                                    :disabled="true"
                                    value="2016329600163">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            QQ：
                            <el-input
                                    :disabled="true"
                                    value="杨海东">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                    label="电话号码：">
                    <el-input
                            :disabled="true"
                            value="杨海东">
                    </el-input>
                </el-form-item>
                <el-form-item
                        label="电子邮件：">
                    <el-input
                            :disabled="true"
                            value="杨海东">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="更新密码：">
                    <el-input placeholder="请输入新密码" v-model="input" show-password></el-input>
                </el-form-item>
                <el-form-item
                        label="确认密码：">
                    <el-input placeholder="请再次输入新密码" v-model="input" show-password></el-input>
                </el-form-item>
                <div slot="footer" class="dialog-footer">
                    <el-button >取 消</el-button>
                    <el-button :plain="true" >确定</el-button>
                </div>

            </el-form>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "PersonalInfo",
        data() {
            return{
                info: {
                    stuId: '',
                    stuName: '',
                    input: ''
                }
            }
        }
    }
</script>

<style scoped>

    .el-input {
        width: 200px;
    }
    .el-tabs {
        width: 600px;
    }

</style>