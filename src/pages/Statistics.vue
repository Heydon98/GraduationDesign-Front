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
            </div>
        </el-tabs>
    </div>
</template>

<script>
    import echarts from "https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js";
    export default {
        name: "Statistics"
    }
</script>

<style scoped>

</style>