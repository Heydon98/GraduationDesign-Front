<template>
    <div>
        <el-tabs type="border-card" style="margin: 20px ">
            <div style="height: 10px">
                <span></span>
            </div>
            <div class="query">
                <div class="typeSelect">
                    奖项类别：
                    <el-select
                            v-model="bigType"
                            placeholder="请选择">
                        <el-option
                                v-for="bigType in bigTypes"
                                :key="bigType.value"
                                :label="bigType.label"
                                :value="bigType.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="nameSelect">
                    奖项名称：
                    <el-select
                            v-model="awardName"
                            placeholder="请选择">
                        <el-option
                                v-for="awardName in awardNames"
                                :key="awardName.value"
                                :label="awardName.label"
                                :value="awardName.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="queryButton">
                    <el-button type="primary" @click="query">查询</el-button>
                </div>
                <div class="commitButton">
                    <el-button type="primary" icon="el-icon-check" round @click="commitButton">提交</el-button>
                </div>
            </div>

            <el-table
                    class="checkTable"
                    :data="applies.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                    :border=true
                    style="width: 100%;">
                <el-table-column
                        prop="stuId"
                        label="学号"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="college"
                        label="学院"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="class"
                        label="班级"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="reason"
                        label="申请理由"
                        width="350">

                </el-table-column>
                <el-table-column
                        prop="check"
                        label="审核"
                        width="267.9">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.checkResult" label="1">通过</el-radio>
                        <el-radio v-model="scope.row.checkResult" label="2">修改</el-radio>
                        <el-radio v-model="scope.row.checkResult" label="3">不通过</el-radio>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-if="isQueried == true"
                    class="page_part"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="text-align: center"
                    :total="4">
            </el-pagination>
        </el-tabs>

    </div>
</template>

<script>

    export default {
        name: "CheackAward",
        data() {
            return{
                currentPage: 1,
                pageSize: 1,
                isQueried: false,
                currentPage: 1,
                pageSize: 10,
                applies: [
                    {
                        stuId: '2016329600163',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（3）班',
                        reason: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                        checkResult: ''
                    },
                    {
                        stuId: '2016329600164',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（3）班',
                        reason: '测试测试测试测试测试测试测试测试',
                        checkResult: ''
                    },
                    {
                        stuId: '2016329600164',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（3）班',
                        reason: '测试测试测试测试测试测试测试测试',
                        checkResult: ''
                    }
                ]
            }
        },
        methods:{
            query() {
                this.isQueried = true;
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
    .queryButton{
        float: left;
        padding-left: 40px;
    }
    .nameSelect{
        float: left;
        padding-left: 10px;
    }
    .typeSelect {
        float: left;
        padding-left: 10px;
    }
    . border-card {
        height: 10px;
    }
    .query{
        margin-bottom: 50px;
    }
    .commitButton {
        float: left;
        padding-left: 400px;
    }

</style>