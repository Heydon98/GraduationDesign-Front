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
                                    <el-input v-model="selectedAward.awardName" :disabled="true"></el-input>
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
<!--                                    <el-input-->
<!--                                            class="input-new-tag"-->
<!--                                            v-if="inputVisible"-->
<!--                                            v-model="inputTeacId"-->
<!--                                            ref="saveTagInput"-->
<!--                                            size="small"-->
<!--                                            @keyup.enter.native="handleInputConfirm"-->
<!--                                            @blur="handleInputConfirm">-->
<!--                                    </el-input>-->
                                    <el-autocomplete
                                            class="input-new-tag"
                                            v-if="inputVisible"
                                            v-model="inputTeacId"
                                            ref="saveTagInput"
                                            size="large"
                                            :fetch-suggestions="querySearchAsync"
                                            placeholder="请输入内容"
                                            @select="handleSelect"
                                    ></el-autocomplete>
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
                            确认删除 {{selectedAward.awardName}} ?
                            如确认删除该选项，请在输入框内输入 立即删除 四个字。<el-input></el-input>
                        </span>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="deleteDialog = false">取 消</el-button>
                            <el-button type="primary" @click="deleteAward">确 定</el-button>
                        </span>
                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>

            <!--            分页-->
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
                // 奖项数据
                awards: [],
                // 当前行奖项
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
                //管理对话
                manageDialog: false,
                //formLabelWidth: '120px',
                applyReason: '',
                active: 0,
                //新建删除奖项对话
                newDialog: false,
                deleteDialog: false,
                newFrom: {
                    bigType: '',
                    smallType: '',
                    awardName: '',
                    limitNum: '',
                    introduce: ''
                },
                //分页
                currentPage: 1,
                pageSize: 10,
                //教师tag
                teacTags: ['吴云枭', '边境'],
                inputVisible: false,
                inputValue: '',
                inputTeacId: '',
                teachers: [],
                timeout:  null,
                //奖项类型
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
                this.teachers = this.loadAll();
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

            },

            deleteTeac(teacTag) {
                this.teacTags.splice(this.teacTags.indexOf(teacTag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            // handleInputConfirm() {
            //     let inputValue = this.inputValue;
            //     if (inputValue) {
            //         this.teacTags.push(inputValue);
            //     }
            //     this.inputVisible = false;
            //     this.inputValue = '';
            // },

            loadAll() {
                let params = new URLSearchParams();
                params.append('awardId', this.selectedAward.awardId);
                this.$axios.post('http://localhost:8088/teacher/checkTeacher', params)
                    .then((res) => {
                        if (res.data['code'] == 200) {
                            let list = [{}];
                            // let data = res.data.data['checkTeacs'];
                            // for (var i=0; i<data.length; i++) {
                            //     data[i].value = res.data.data.checkTeacs[i];
                            // }
                            // console.log(data);
                            // return data;
                            // for (let i = res.data.data['checkTeacs']) {
                            //     // i.value =
                            // }
                            list.push({key: 'value', value: '吴云霄'});
                            //cb(list);
                            console.log(list);
                            return list;
                            // console.log(res.data.data.checkTeacs);
                            // return res.data.data.checkTeacs;
                        }
                    })
                // return [
                //     { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                //     { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" }
                // ]
                // console.log(res.data.data['checkTeacs']);
            },

            querySearchAsync(queryString, cb) {
                var teachers = this.teachers;
                var results = queryString ? teachers.filter(this.createStateFilter(queryString)) : teachers;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (inputTeacId) => {
                    return (inputTeacId.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
                let inputTeacId = this.inputValue;
                if (item) {
                    this.teacTags.push(item['value']);
                }
                this.inputVisible = false;
                this.inputValue = '';
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
        width: 200px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>