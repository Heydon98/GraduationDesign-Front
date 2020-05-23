<template>
    <div>
        <el-tabs type="border-card" style="margin: 20px ">
            <div style="height: 10px">
                <span></span>
            </div>

            <el-button type="primary" @click="newDialog = true">+ 新建</el-button>
            <!--        新建奖项对话-->
            <el-dialog :visible.sync="newDialog">
                <el-form ref="newFrom" :model="newFrom" label-width="80px">
                    <el-form-item label="奖项类别">
                        <el-cascader
                                v-model="value"
                                :options="types"
                                @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="奖项名称">
                        <el-input
                                v-model="newFrom.awardName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="人数限制">
                        <el-input-number v-model="newFrom.limitNum" :min="1" label="人数限制"></el-input-number>
                    </el-form-item>
                    <el-form-item label="奖项介绍">
                        <el-input
                                v-model="newFrom.introduce"
                                type="textarea"
                                rows="7">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="newDialog = false">取 消</el-button>
                    <el-button :plain="true" @click="newAward">确定</el-button>
                </div>
            </el-dialog>

            <el-table
                    :data="awards.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                    :border=true
                    style="width: 100%">
                <el-table-column
                        prop="awardName"
                        label="奖项名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="awardType"
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
                        prop="awardState"
                        label="竞赛状态"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="管理竞赛"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" round @click="selectedAward = scope.row, manage()">管理</el-button>

                        <!--                    管理奖项对话-->
                        <el-dialog :visible.sync="manageDialog">
                            <el-steps :active="active" finish-status="success">
                                <el-step title="准备"></el-step>
                                <el-step title="申请"></el-step>
                                <el-step title="审核"></el-step>
                                <el-step title="结束"></el-step>
                            </el-steps>
                            <el-form v-if="active==0" :model="selectedAward" label-width="80px">
                                <el-form-item label="奖项名称">
                                    <el-input v-model="selectedAward.awardName"></el-input>
                                </el-form-item>
                                <!--                            管理授权教师-->
                                <el-form-item label="授权教师">
                                    <el-tag
                                            :key="teacTag"
                                            v-for="teacTag in teacTags"
                                            closable="true"
                                            :disable-transitions="false"
                                            @close="deleteTeac(teacTag)">
                                        {{teacTag}}
                                    </el-tag>
                                    <el-input
                                            class="input-new-tag"
                                            v-if="inputVisable"
                                            v-model="inputTeacId"
                                            ref="saveTagInput"
                                            size="small"
                                            @keyup.enter.native="handleInputConfirm"
                                            @blur="handleInputConfirm">
                                    </el-input>
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新教师
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <el-button style="margin-top: 12px;" @click="last">上一阶段</el-button>
                            <el-button style="margin-top: 12px;" @click="next">下一阶段</el-button>
                            <el-button style="margin-right: 12px;" @click="changeState">保存</el-button>
                        </el-dialog>
                        <el-button type="danger" round @click="selectedAward = scope.row, deleteDialog = true">删除
                        </el-button>
                        <el-dialog
                                title="注意！"
                                :visible.sync="deleteDialog">
                        <span>
                            确认删除{{selectedAward.awardName}}?
                        </span>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="deleteDialog = false">取 消</el-button>
                            <el-button type="primary" @click="deleteAward">确 定</el-button>
                        </span>
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
    let id = 1;
    export default {
        name: "ManageAward",
        data() {
            return {
                awards: [],
                selectedAward: {
                    awardId: '',
                    awardName: '',
                    awardState: '',
                    awardType: '',
                    introduce: '',
                    limitNum: '',
                    startTime: '',
                    stateId: ''
                },
                manageDialog: false,
                formLabelWidth: '120px',
                applyReason: '',
                active: 0,
                newDialog: false,
                deleteDialog: false,
                newFrom: {
                    bigType: '',
                    smallType: '',
                    awardName: '',
                    limitNum: '',
                    introduce: ''
                },
                currentPage: 1,
                pageSize: 10,
                teacTags: ['吴云枭', '边境'],
                inputVisible: false,
                inputValue: '',
                types: [
                    {
                        value: '1',
                        label: '奖学金',
                        children: [
                            {
                                value: '11',
                                label: '国家奖学金'
                            },
                            {
                                value: '12',
                                label: '省政府奖学金'
                            },
                            {
                                value: '13',
                                label: '校一等奖学金'
                            }
                        ]
                    },
                    {
                        value: '2',
                        label: '荣誉称号',
                        children: [
                            {
                                value: '21',
                                label: '三好学生'
                            },
                            {
                                value: '22',
                                label: '优秀学生干部'
                            }
                        ]
                    }
                ]
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8088/teacher/manageAward')
                .then((res) => {
                    if (res.data['code'] === 200) {
                        this.awards = res.data.data.awards;
                        this.awardsLen = res.data.data.awards.length;
                    }
                });

        },
        methods: {
            next() {
                this.active++;
            },
            last() {
                this.active--;
            },
            manage() {
                this.manageDialog = true;
                // this.active = this.selectedAward.stateId;
                if (this.selectedAward.awardState == '准备')
                    this.active = 0;
                if (this.selectedAward.awardState == '申请')
                    this.active = 1;
                if (this.selectedAward.awardState == '审核')
                    this.active = 2;
            },
            newAward() {
                let params = new URLSearchParams();
                params.append('awardName', this.newFrom.awardName);
                params.append('bigType', this.newFrom.bigType);
                params.append('smallType', this.newFrom.smallType);
                params.append('introduce', this.newFrom.introduce);
                params.append('limitNum', this.newFrom.limitNum);
                this.$axios.post('http://localhost:8088/teacher/newAward', params)
                    .then((res) => {
                        if (res.data['code'] == 200) {
                            this.newDialog = false;
                            this.success();
                        }
                    })
            },
            handleChange(value) {
                this.newFrom.bigType = value[0];
                this.newFrom.smallType = value[1];
            },
            changeState() {
                let params = new URLSearchParams();
                params.append("stateId", this.active + 1);
                params.append("awardId", this.selectedAward.awardId);
                this.$axios.post('http://localhost:8088/teacher/changeAwardState', params)
                    .then((res) => {
                        if (res.data['code'] == 200) {
                            this.manageDialog = false;
                            this.success();
                        }
                    })
            },
            deleteAward() {
                let params = new URLSearchParams();
                params.append("awardId", this.selectedAward.awardId);
                this.$axios.post('http://localhost:8088/teacher/deleteAward', params)
                    .then((res) => {
                        if (res.data['code'] == 200) {
                            this.deleteDialog = false;
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
    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>