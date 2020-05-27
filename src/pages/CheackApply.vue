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
                            v-model="value"
                            @change="selectType"
                            placeholder="请选择">
                        <el-option
                                v-for="item in bigTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="nameSelect">
                    奖项名称：
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option
                                v-for="item in awardNames"
                                :key="item.awardId"
                                :label="item.awardName"
                                :value="item.awardId">
                        </el-option>
                    </el-select>

                </div>
                <div class="checkSelect">
                    是否审核：
                    <el-select
                            style="width: 100px"
                            v-model="value2"
                            placeholder="请选择">
                        <el-option
                                v-for="item in isChecked"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>
                <div class="queryButton">
                    <el-button type="primary" @click="query">查询</el-button>
                </div>
                <div class="commitButton">
                    <el-button type="primary" icon="el-icon-check" round @click="commitCheck">提交</el-button>
                </div>
            </div>

            <el-table
                    v-if="isQueried"
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
                        prop="stuName"
                        label="姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="college"
                        label="学院"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="clazz"
                        label="班级"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="reason"
                        label="申请理由"
                        width="350">

                </el-table-column>
                <el-table-column
                        label="审核"
                        width="267.9">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.checkResult" label="1" @change="scope.row.isAltered = 1">通过</el-radio>
                        <el-radio v-model="scope.row.checkResult" label="2" @change="scope.row.isAltered = 1">不通过</el-radio>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-if="isQueried == true"
                    class="page_part"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="text-align: center"
                    :total="appliesLen">
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
                appliesLen: '',
                selectApply: '',
                value: '',
                value1: '',
                value2: '',
                bigTypes : [
                    {
                        value: '1',
                        label: '奖学金'
                    },
                    {
                        value: '2',
                        label: '荣誉称号'
                    }
                ],
                awardNames: [],
                isChecked: [
                    {
                        value: '0',
                        label: '未审核'
                    },
                    {
                        value: '1',
                        label: '已审核'
                    }
                ],
                applies: []
            }
        },
        methods:{
            query() {
                this.isQueried = true;
                let params = new URLSearchParams();
                params.append("awardId", this.value1);
                params.append("isChecked", this.value2);
                this.$axios.post('http://localhost:8088/teacher/queryApplies', params)
                    .then((res) => {
                        this.applies = res.data.data.applies;
                        this.appliesLen = this.applies.length;
                    })

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

            },
            selectType(){
                let params = new URLSearchParams();
                params.append('bigTypeId', this.value);
                this.$axios.post('http://localhost:8088/teacher/myCheckAward', params)
                    .then((res) => {
                        this.awardNames =  res.data.data.awards;
                    });
                this.value1 = '';
            },
            commitCheck(){
                let params = new URLSearchParams();
                for (let i=0; i<this.applies.length; i++){
                    if (this.applies[i].isAltered == 1){
                        params.append(this.applies[i].stuAwardId, this.applies[i].checkResult);
                    }
                }
                this.$axios.post('http://localhost:8088/teacher/checkApply', params)
                    .then((res) => {
                        if (res.data['code'] == 200) {
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
    .checkSelect {
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
        padding-left: 200px;
    }

</style>