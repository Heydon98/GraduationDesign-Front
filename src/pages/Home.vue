<template>
    <div id="index">
        <!-- <div class="header_banner">
          E浙理管理平台
        </div> -->
        <!-- <el-container style="height: 100%;">


          <el-container>
            <el-main>
              <template> -->
        <el-table
                :data="tableData"
                :border=true
                style="width: 100%"
        >
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
        <el-pagination
                class="page_part"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
        <!-- </template>
      </el-main>
    </el-container>
  </el-container> -->

    </div>
</template>

<script>
    export default {
        name: 'Index',
        data() {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        computed: {},
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    #index {

    }

    /* .el-aside {
      color: #333;
    }
    .header_banner{
      padding: 20px;
      height: 30%;
      background-color: #128784;
      color: #fff;
      font-size: 25px;
      text-align: center;
    }
    .el-menu-vertical-demo{
      width: 15%;
      height: 670px;
    } */
    .page_part {
        float: right;
        margin: 10px;
    }
</style>