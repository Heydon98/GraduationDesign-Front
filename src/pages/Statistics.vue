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
                <div class="queryButton">
                    <el-button type="primary" @click="query">查询</el-button>
                </div>
            </div>
            <br><br><br>
            <el-row>
                <el-col :span="12">
                    <div id="myChart" v-if="isQueried == true" :style="{width: '600px', height: '500px'} "></div>
                </el-col>
                <el-col :span="12">
                    <el-table
                        v-if="isQueried == true"
                        :data="students.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                        :border="true"
                        style="width: 623px">
                        <el-table-column
                                prop="stuId"
                                label="学号"
                                width="130">
                        </el-table-column>
                        <el-table-column
                                prop="stuName"
                                label="姓名"
                                width="142.5">
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
                            :total="stuLen">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-tabs>

    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts')
    // 引入饼状图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: "Statistics",
        data() {
            return {
                students: [],
                currentPage: 1,
                pageSize: 10,
                isQueried: false,
                value: '',
                value1: '',
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
                stuLen: '',
                //图数据
                title : {
                    text: '',//主标题
                    //subtext: '纯属虚构',//副标题
                    x:'center',//x轴方向对齐方式
                },
                data:[]
            }
        },
        mounted() {

        },
        methods:{
            initEchart(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption({
                    // 标题组件，包含主标题和副标题
                    title : this.title,
                    // 提示框组件
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} 人({d}%)"
                    },
                    // 图
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '80%',
                            center: ['50%', '60%'],
                            roseType: 'angle',
                            data:this.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });

            },
            query() {
                this.isQueried = true;
                let params = new URLSearchParams();
                params.append("awardId", this.value1);
                this.$axios.post('http://localhost:8088/teacher/winStudents', params)
                    .then((res) => {
                        this.students = res.data.data.students;
                        this.stuLen = this.students.length;
                    })
                this.$axios.post('http://localhost:8088/teacher/awardName', params)
                    .then((res) => {
                        this.title.text = res.data.data.awardName + '统计图';
                    })
                this.$axios.post('http://localhost:8088/teacher/statistics', params)
                    .then((res) => {
                        this.data = res.data.data.statistics;
                    })
                this.initEchart();
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
            }
        },
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
</style>