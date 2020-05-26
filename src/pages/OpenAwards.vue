<template>
    <div>
        <el-tabs type="border-card" style="margin: 20px ">
            <div style="height: 10px">
                <span></span>
            </div>
            <el-table
                    :v-loading="loading"
                    :data="awards.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                    :border=true
                    style="width: 100%">
                <el-table-column
                        prop="awardName"
                        label="奖项名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="奖项类别"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="introduce"
                        label="奖项介绍"
                        width="350">
                </el-table-column>
                <el-table-column
                        prop="limitNum"
                        label="人数限制"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="teacName"
                        label="指导老师"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="isApplied"
                        label="申请"
                        width="180">
                    <template slot-scope="scope">
                        <h1 v-if="scope.row.isApplied == 1">已申请</h1>
                        <!--                    <el-button v-else type="text" @click="applyDialog = true">申请</el-button>-->
                        <el-button v-else type="text"
                                   @click="applyDialog = true, selectedAwardId = scope.row.awardId, selectedAwardName = scope.row.awardName">
                            申请
                        </el-button>
                        <!--申请奖项对话框-->
                        <el-dialog
                                style="text-align: center"
                                :title="scope.row.awardName"
                                :visible.sync="applyDialog">
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
                            <el-row>
                                <el-col :span="12">
                                    学院：
                                    <el-input
                                            :disabled="true"
                                            value="信息学院">
                                    </el-input>
                                </el-col>
                                <el-col :span="12">
                                    班级：
                                    <el-input
                                            :disabled="true"
                                            value="计算机科学与技术16（3）班"
                                            >
                                    </el-input>
                                </el-col>
                            </el-row>
                            <br><br>
                            <el-input
                                    type="textarea"
                                    :rows="10"
                                    placeholder="请输入申请理由"
                                    v-model="applyReason">
                            </el-input>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="applyDialog = false">取 消</el-button>
                                <el-button :plain="true" @click="applyAward()">确定</el-button>
                            </div>
                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="page_part"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size=pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    style="text-align: center"
                    :total=awardsLen>
            </el-pagination>
        </el-tabs>
    </div>

</template>

<script>
    export default {
        name: "OpenAwards",
        data() {
            return {
                user: '',
                applyReason: '',
                applyDialog: false,
                awards: [],
                selectedAwardId: '',
                selectedAwardName: '',
                awardsLen: 0,
                currentPage: 1,
                pageSize: 10,
                loading: true
            }
        },
        mounted() {
            this.loading = true;
            this.user = sessionStorage.getItem('username');
            this.$axios.get('http://localhost:8088/student/showOpenAwards')
                .then(res => {
                    if (res.data['code'] === 200) {
                        this.awards = res.data.data.awards;
                        console.log(res.data.data.awards.length, 'length')
                        this.awardsLen = res.data.data.awards.length;
                        //this.loading = false;
                    }
                });

        },
        methods: {
            applyAward() {
                let params = new URLSearchParams();
                let realName = sessionStorage.getItem('realName');
                params.append('awardId', this.selectedAwardId);
                params.append('applyReason', this.applyReason);
                params.append('awardName', this.selectedAwardName);
                params.append('realName', realName);
                this.$axios.post('http://localhost:8088/student/applyAward', params)
                    .then((res) => {
                        if (res.data['code'] == 200) {
                            this.applyDialog = false;
                            this.success();
                        }
                    })
            },
            success() {
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
                location.reload();
            },
            handleSizeChange(val) {
                // 每页多少条 和 当前页 切割出数组中响应的部分
                this.pageSize = val;
                console.log(`每页 ${val} 条`);

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(this.pageSize, 'page');
                console.log(`当前页: ${val}`);

            }
        }
    }
</script>

<style scoped>

</style>