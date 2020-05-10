<template>
    <div>
        <el-table
                :data="awards"
                :border=true
                style="width: 100%"
        >
            <el-table-column
                    prop="name"
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
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="limitNum"
                    label="人数限制"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="截止时间"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="teacher"
                    label="指导老师"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="applied"
                    label="申请"
                    width="180">
                <template slot-scope="scope">
                    <h1 v-if="scope.row.applied === '2016329600163'">已申请</h1>
                    <el-button v-else type="text" @click="applyDialog = true">申请</el-button>
                    <!--申请奖项对话框-->
                    <el-dialog :visible.sync="applyDialog">
                        <el-input
                                type="textarea"
                                :rows="10"
                                placeholder="请输入申请理由"
                                v-model="applyReson">
                        </el-input>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="applyDialog = false">取 消</el-button>
                            <el-button type="primary" @click="applyAward(scope.row.awardId)">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-table-column>
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
        name: "AppliedAwardsHistory"
    }
</script>

<style scoped>

</style>