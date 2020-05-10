<template>
    <div>
        <el-table
                :data="awards"
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
<!--            <el-table-column-->
<!--                    prop="endApplyTime"-->
<!--                    label="截止时间"-->
<!--                    width="250">-->
<!--            </el-table-column>-->
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
                    <el-button v-else type="text" @click="applyDialog = true, selectedAwardId = scope.row.awardId, selectedAwardName = scope.row.awardName">申请
                    </el-button>
                    <!--申请奖项对话框-->
                    <el-dialog :visible.sync="applyDialog">
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
        <button @click="show()">xianshi</button>
        <!--        <el-pagination-->
        <!--                class="page_part"-->
        <!--                @size-change="handleSizeChange"-->
        <!--                @current-change="handleCurrentChange"-->
        <!--                :current-page="currentPage1"-->
        <!--                :page-sizes="[10, 20, 30, 40]"-->
        <!--                :page-size="10"-->
        <!--                layout="total, sizes, prev, pager, next, jumper"-->
        <!--                :total="3">-->
        <!--        </el-pagination>-->
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
                selectedAwardName: ''
            }
        },
        mounted() {
            this.user = sessionStorage.getItem('username');
            this.$axios.get('http://localhost:8088/student/showOpenAwards')
                .then(res => {
                    if (res.data['code'] === 200) {
                        this.awards = res.data.data.awards;
                    }
                });
        },
        methods: {
            show() {
                console.log(this.user);
            },
            show1(apply) {
                console.log(apply);
                return true;
            },
            applyAward() {
                var params = new URLSearchParams();
                var realName = sessionStorage.getItem('realName');
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
            success(){
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

</style>