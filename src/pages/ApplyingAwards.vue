<template>
    <div>
        <el-table
                :data="applyRecord"
                :border=true
                style="width: 100%">
            <el-table-column
                    prop="stuId"
                    label="学号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="stuName"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="awardName"
                    label="奖项名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="teacName"
                    label="审批教师"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="checkResult"
                    label="审核结果"
                    width="80">
                <template slot-scope="scope">
                    <p v-if="scope.row.checkResult == null">未审核</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="checkTime"
                    label="审批时间"
                    width="250">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="applied"-->
<!--                    label="申请"-->
<!--                    width="180">-->
<!--                <template slot-scope="scope">-->
<!--                    <h1 v-if="scope.row.applied === '2016329600163'">已申请</h1>-->
<!--                    <el-button v-else type="text" @click="applyDialog = true">申请</el-button>-->
<!--                    &lt;!&ndash;申请奖项对话框&ndash;&gt;-->
<!--                    <el-dialog :visible.sync="applyDialog">-->
<!--                        <el-input-->
<!--                                type="textarea"-->
<!--                                :rows="10"-->
<!--                                placeholder="请输入申请理由"-->
<!--                                v-model="applyReson">-->
<!--                        </el-input>-->
<!--                        <div slot="footer" class="dialog-footer">-->
<!--                            <el-button @click="applyDialog = false">取 消</el-button>-->
<!--                            <el-button type="primary" @click="applyAward(scope.row.awardId)">确 定</el-button>-->
<!--                        </div>-->
<!--                    </el-dialog>-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>
        <el-pagination
                class="page_part"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="3">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "ApplyingAwards",
        data() {
            return {
                applyRecord: []
            }
        },
        mounted() {
            this.user = sessionStorage.getItem('username');
            this.$axios.get('http://localhost:8088/student/applyingAwards')
                .then(res => {
                    if (res.data['code'] === 200) {
                        this.applyRecord = res.data.data.applyRecord;
                    }
                });
        }
    }
</script>

<style scoped>

</style>