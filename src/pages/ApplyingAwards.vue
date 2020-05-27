<template>
    <div>
        <el-tabs type="border-card" style="margin: 20px ">
            <div style="height: 10px">
                <span></span>
            </div>
            <el-table
                    :v-loading="loading"
                    :data="applyRecord.slice((currentPage-1)*pageSize, currentPage*pageSize)"
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
                        <p v-else>{{scope.row.checkResult}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="checkTime"
                        label="审批时间"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="applyTime"
                        label="申请时间"
                        width="250">
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
                    :total=recordLen>
            </el-pagination>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "ApplyingAwards",
        data() {
            return {
                applyRecord: [],
                recordLen: '',
                currentPage: 1,
                pageSize: 10,
                loading: true
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8088/student/applyingAwards')
                .then(res => {
                    if (res.data['code'] === 200) {
                        this.applyRecord = res.data.data.applyRecord;
                        this.recordLen = this.applyRecord.length;
                    }
                });
        },
        methods: {
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
    . border-card {
        height: 10px;
    }
</style>