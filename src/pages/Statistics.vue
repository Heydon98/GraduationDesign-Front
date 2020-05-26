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
                                :value1="bigType.value">
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
                                :value2="awardName.value">
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
                        :data="students"
                        :border="true"
                        style="width: 623px">
                        <el-table-column
                                prop="stuId"
                                label="学号"
                                width="130">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="142.5">
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
                            :total="9">
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
                students: [
                    {
                        stuId: '2016329600163',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（1）班'
                    },
                    {
                        stuId: '2016329600164',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（1）班'
                    },
                    {
                        stuId: '2016329600165',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（2）班'
                    },
                    {
                        stuId: '2016329600166',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（2）班'
                    },
                    {
                        stuId: '2016329600167',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（3）班'
                    },
                    {
                        stuId: '2016329600168',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（4）班'
                    },
                    {
                        stuId: '2016329600169',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（5）班'
                    },
                    {
                        stuId: '2016329600170',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（5）班'
                    },
                    {
                        stuId: '2016329600161',
                        name: '杨海东',
                        college: '信息学院',
                        class: '计算机科学与技术16（5）班'
                    }
                ],
                currentPage: 1,
                pageSize: 10,
                isQueried: false,
                value1:'',
                value2: '',
                bigTypes : [
                    {
                        value: '1',
                        label: '奖学金'
                    }
                ],
                awardNames: [
                    {
                        value: '1',
                        label: '2019-2020国家奖学金'
                    }
                ],
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
                    title : {
                        text: '某站点用户访问来源',//主标题
                        subtext: '纯属虚构',//副标题
                        x:'center',//x轴方向对齐方式
                    },
                    // 提示框组件
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    // 图
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '80%',
                            center: ['50%', '60%'],
                            roseType: 'angle',
                            data:[
                                {value:2, name:'计算机科学与技术16（1）班'},
                                {value:2, name:'计算机科学与技术16（2）班'},
                                {value:1, name:'计算机科学与技术16（3）班'},
                                {value:1, name:'计算机科学与技术16（4）班'},
                                {value:3, name:'计算机科学与技术16（5）班'}
                            ],
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