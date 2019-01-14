<template>
  <div>
    <div class="enterpriseMsg" :class="isShow ? eopen : ehide">
    <div class="isBtn" @click="showAndHide_1" :class="isShow ? openBtn : hideBtn">
        <img src="../../../static/images/pan_hide.png" v-if="isShow">
        <img src="../../../static/images/pan_show.png" v-else>
    </div>
    <el-tabs type="border-card">
        <el-tab-pane label="搜索条件">
            <div class="searchAndResult">
                <el-scrollbar style="height: 100%;">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item :title="selectConditions[0].title" :key="selectConditions[0].id" :name="selectConditions[0].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_1" @change="selectConditionChange1">
                                    <el-checkbox v-for="(option,index) in selectConditions[0].selectName" :label="option.name" :name="option.name" :key="index" border size="mini">{{option.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[1].title" :key="selectConditions[1].id" :name="selectConditions[1].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_2" @change="selectConditionChange2">
                                    <el-checkbox v-for="(option,index) in selectConditions[1].selectName" :label="option.name" :key="index" border size="mini">{{option.name}}</el-checkbox>
                                </el-checkbox-group>
                                <el-checkbox-group v-model="selectedConditions_10" @change="selectConditionChange10">
                                    <el-checkbox v-for="(option,index) in selectConditions[9].selectName" :label="option.name" :key="index" border size="mini">{{option.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[2].title" :key="selectConditions[2].id" :name="selectConditions[2].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_3" @change="selectConditionChange3">
                                    <el-checkbox v-for="(option,index) in selectConditions[2].selectName" :label="option.name" :key="index" border size="mini">{{option.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[3].title" :key="selectConditions[3].id" :name="selectConditions[3].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_4" @change="selectConditionChange4">
                                    <el-checkbox v-for="(option,index) in selectConditions[3].selectName" :label="option.name" :key="index" border size="mini">{{option.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[4].title" :key="selectConditions[4].id" :name="selectConditions[4].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_5" @change="selectConditionChange5">
                                    <el-checkbox v-for="(option,index) in selectConditions[4].selectName" :label="option" :key="index" border size="mini">{{option}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[5].title" :key="selectConditions[5].id" :name="selectConditions[5].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_6" @change="selectConditionChange6">
                                    <el-checkbox v-for="(option,index) in selectConditions[5].selectName" :label="option" :key="index" border size="mini">{{option}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[6].title" :key="selectConditions[6].id" :name="selectConditions[6].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_7" @change="selectConditionChange7">
                                    <el-checkbox v-for="(option,index) in selectConditions[6].selectName" :label="option" :key="index" border size="mini">{{option}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[7].title" :key="selectConditions[7].id" :name="selectConditions[7].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_8" @change="selectConditionChange8">
                                    <el-checkbox v-for="(option,index) in selectConditions[7].selectName" :label="option" :key="index" border size="mini">{{option}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item :title="selectConditions[8].title" :key="selectConditions[8].id" :name="selectConditions[8].id">
                            <template>
                                <el-checkbox-group v-model="selectedConditions_9" @change="selectConditionChange9">
                                    <el-checkbox v-for="(option,index) in selectConditions[8].selectName" :label="option" :key="index" border size="mini">{{option}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
            </div>
        </el-tab-pane>
        <el-tab-pane label="结果列表">
            <div class="searchAndResult">
                <el-scrollbar style="height: 100%;">
                    <div class="searchCondition">
                        <h3 style="margin-bottom: 5px;">筛选条件：</h3>
                        <div class="searchName">
                            <el-scrollbar style="height: 100%;">
                                <el-tag
                                    v-for="(tag_1,index) in selectedConditions_1"
                                    :key="index+100"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose1(tag_1)">
                                    {{tag_1}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_2,index) in selectedConditions_2"
                                    :key="index+200"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose2(tag_2)">
                                    {{tag_2}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_3,index) in selectedConditions_3"
                                    :key="index+300"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose3(tag_3)">
                                    {{tag_3}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_4,index) in selectedConditions_4"
                                    :key="index+400"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose4(tag_4)">
                                    {{tag_4}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_5,index) in selectedConditions_5"
                                    :key="index+500"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose5(tag_5)">
                                    {{tag_5}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_6,index) in selectedConditions_6"
                                    :key="index+600"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose6(tag_6)">
                                    {{tag_6}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_7,index) in selectedConditions_7"
                                    :key="index+700"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose7(tag_7)">
                                    {{tag_7}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_8,index) in selectedConditions_8"
                                    :key="index+800"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose8(tag_8)">
                                    {{tag_8}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_9,index) in selectedConditions_9"
                                    :key="index+900"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose9(tag_9)">
                                    {{tag_9}}
                                </el-tag>
                                <el-tag
                                    v-for="(tag_10,index) in selectedConditions_10"
                                    :key="index+1000"
                                    closable
                                    :disable-transitions="false"
                                    size="mini"
                                    @close="handleClose10(tag_10)">
                                    {{tag_10}}
                                </el-tag>
                            </el-scrollbar>
                        </div>
                        <span style="margin-top: 5px;">搜索结果：</span><span>共{{listResult.Total}}条</span>
                        <div class="searchResult">
                            <el-scrollbar style="height: 100%">
                                <ul class="enterpriseList">
                                    <li v-for="(lr,index) in listResult.Rows" :key="index" :ebid="lr.bid" @mouseenter="enterpriserList" :ispos="lr.x" :pos="`[${lr.x},${lr.y}]`">
                                        <div class="imgIBox">
                                            <img src="../../../static/images/point_location.png" alt="">
                                            <i>{{(searchConditionsList.page-1)*20+index+1}}</i>
                                        </div>
                                        <div>
                                            <p><a href="javascript:void(0);" :bid="lr.bid" @click="skipToEnterpriseDetail">{{lr.names}}</a></p>
                                            <p>
                                                <label>所属区域：</label><span>{{lr.jdname}}</span>
                                            </p>
                                            <p>
                                                <label>主要产品：</label><span>{{lr.products}}</span>
                                            </p>
                                            <p v-if="!lr.x" class="positionMark">(该企业无定位点)</p>
                                        </div>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                        <div>
                            <el-pagination
                                @current-change="currentChange"
                                :current-page.sync="currentPage"
                                :page-size="20"
                                :pager-count="5"
                                layout="prev, pager, next"
                                :total="listResult.Total">
                            </el-pagination>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
  </div>
  
</template>

<script>
  import { publicRequirest } from '@/api/api.js'
  import { selectConditions } from '@/data/selectCondition.js'
  import { arrayChange } from '@/utils/utils.js'
  export default {
    name:'',
    props:['enterSearchvalue','inputValue'],
    data () {
      return {
        eopen: 'eopen',
        ehide: 'ehide',
        hideBtn: 'hideBtn',
        openBtn: 'openBtn',
        isShow: true,
        activeNames: [selectConditions[0].id, selectConditions[2].id],
        selectedConditions_1: [],
        selectedConditions_2: [],
        selectedConditions_3: [],
        selectedConditions_4: [],
        selectedConditions_5: [],
        selectedConditions_6: [],
        selectedConditions_7: [],
        selectedConditions_8: [],
        selectedConditions_9: [],
        selectedConditions_10: [],
        selectConditions: selectConditions,
        dynamicTags_1: [],
        dynamicTags_2: [],
        dynamicTags_3: [],
        dynamicTags_4: [],
        dynamicTags_5: [],
        dynamicTags_6: [],
        dynamicTags_7: [],
        dynamicTags_8: [],
        dynamicTags_9: [],
        dynamicTags_10: [],
        searchConditions: {    //传给后台数据格式
            names: '',
            jdcode: '',
            large_type: '',
            ptype: '',
            scale: '',
            enterprisetype: '',
            popular_industry: '',
            talent: '',
            trademarkinfo: '',
            hightech: '',
            listed: '',
            page: 1,
            count: 100000
        },
        searchConditionsList: {    //传给后台列表数据格式
            names: '',
            jdcode: '',
            large_type: '',
            ptype: '',
            scale: '',
            enterprisetype: '',
            popular_industry: '',
            talent: '',
            trademarkinfo: '',
            hightech: '',
            listed: '',
            page: 1,
            count: 20
        },
        checkSearch: {
            names: '',
            page: 1,
            count: 20
        },
        listResult: '',
        currentPage: 1,
      };
    },

    components: {},

    computed: { 

    },
    beforeCreate() {
       
    },
    created() {
        
    },

    mounted() {
        this.getResultListInfor(this.searchConditionsList);
        this.$root.Bus.$on('searchCoditionFirst',(val)=> {
            this.selectedConditions_1 = [];
            this.selectedConditions_2 = [];
            this.selectedConditions_3 = [];
            this.selectedConditions_4 = [];
            this.selectedConditions_5 = [];
            this.selectedConditions_6 = [];
            this.selectedConditions_7 = [];
            this.selectedConditions_8 = [];
            this.selectedConditions_9 = [];
            this.selectedConditions_10 = [];
            this.dynamicTags_1 = [];
            this.dynamicTags_2 = [];
            this.dynamicTags_3 = [];
            this.dynamicTags_4 = [];
            this.dynamicTags_5 = [];
            this.dynamicTags_6 = [];
            this.dynamicTags_7 = [];
            this.dynamicTags_8 = [];
            this.dynamicTags_9 = [];
            this.dynamicTags_10 = [];
            this.searchConditionsList.jdcode = '';
            this.searchConditionsList.large_type = '';
            this.searchConditionsList.ptype = '';
            this.searchConditionsList.scale = '';
            this.searchConditionsList.enterprisetype = '';
            this.searchConditionsList.popular_industry = '';
            this.searchConditionsList.talent = '';
            this.searchConditionsList.trademarkinfo = '';
            this.searchConditionsList.hightech = '';
            this.searchConditionsList.listed = '';
        })
    },

    methods: {
        showAndHide_1() {
            this.isShow = !this.isShow;
        },
        selectConditionChange1(value) {   //企业位置 
            this.dynamicTags_1 = [];
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            value.forEach(element => {
                let elements = element;
                this.selectConditions[0].selectName.forEach(ele => {
                    let eles = ele;
                    if(elements === eles.name) {
                        this.dynamicTags_1.push(eles.code); 
                    }
                })
            })
            this.searchConditions.jdcode = this.dynamicTags_1;
            this.searchConditionsList.jdcode = this.dynamicTags_1;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange2(value) {   //行业分类
            this.dynamicTags_2 = [];
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            value.forEach(element => {
                let elements = element;
                this.selectConditions[1].selectName.forEach(ele => {
                    let eles = ele;
                    if(elements === eles.name) {
                        this.dynamicTags_2.push(eles.code); 
                    }
                })
            })
            // this.searchConditions.large_type = arrayChange(this.dynamicTags_2);
            this.searchConditions.large_type = this.dynamicTags_2;
            this.searchConditionsList.large_type = this.dynamicTags_2;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange3(value) {
            this.dynamicTags_3 = [];
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            value.forEach(element => {
                let elements = element;
                this.selectConditions[2].selectName.forEach(ele => {
                    let eles = ele;
                    if(elements === eles.name) {
                        this.dynamicTags_3.push(eles.code); 
                    }
                })
            })
            // this.searchConditions.scale = this.dynamicTags_3.join(",");
            this.searchConditions.scale = this.dynamicTags_3;
            this.searchConditionsList.scale = this.dynamicTags_3;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange4(value) {
            this.dynamicTags_4 = [];
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            value.forEach(element => {
                let elements = element;
                this.selectConditions[3].selectName.forEach(ele => {
                    let eles = ele;
                    if(elements === eles.name) {
                        this.dynamicTags_4.push(eles.code); 
                    }
                })
            })
            this.searchConditions.enterprisetype = this.dynamicTags_4;
            this.searchConditionsList.enterprisetype = this.dynamicTags_4;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange5(value) {
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            this.searchConditions.popular_industry = value;
            this.searchConditionsList.popular_industry = value;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange6(value) {
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            this.searchConditions.talent = value;
            this.searchConditionsList.talent = value;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange7(value) {
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            this.searchConditions.trademarkinfo = value;
            this.searchConditionsList.trademarkinfo = value;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange8(value) {
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            this.searchConditions.hightech = value;
            this.searchConditionsList.hightech = value;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange9(value) {
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            this.searchConditions.listed = value;
            this.searchConditionsList.listed = value;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        selectConditionChange10(value) {
            this.dynamicTags_10 = [];
            this.searchConditionsList.page = 1;
            this.currentPage = 1;
            value.forEach(element => {
                let elements = element;
                this.selectConditions[9].selectName.forEach(ele => {
                    let eles = ele;
                    if(elements === eles.name) {
                        this.dynamicTags_10.push(eles.code); 
                    }
                })
            })
            this.searchConditions.ptype = this.dynamicTags_10;
            this.searchConditionsList.ptype = this.dynamicTags_10;
            this.$emit("listenToConditions",this.searchConditions);
            this.getResultListInfor(this.searchConditionsList);
        },
        handleClose1(tag_1) {
            this.selectedConditions_1.splice(this.selectedConditions_1.indexOf(tag_1), 1);
            this.selectConditionChange1(this.selectedConditions_1);
        },
        handleClose2(tag_2) {
            this.selectedConditions_2.splice(this.selectedConditions_2.indexOf(tag_2), 1);
            this.selectConditionChange2(this.selectedConditions_2);
        },
        handleClose3(tag_3) {
            this.selectedConditions_3.splice(this.selectedConditions_3.indexOf(tag_3), 1);
            this.selectConditionChange3(this.selectedConditions_3);
        },
        handleClose4(tag_4) {
            this.selectedConditions_4.splice(this.selectedConditions_4.indexOf(tag_4), 1);
            this.selectConditionChange4(this.selectedConditions_4);
        },
        handleClose5(tag_5) {
            this.selectedConditions_5.splice(this.selectedConditions_5.indexOf(tag_5), 1);
            this.selectConditionChange5(this.selectedConditions_5);
        },
        handleClose6(tag_6) {
            this.selectedConditions_6.splice(this.selectedConditions_6.indexOf(tag_6), 1);
            this.selectConditionChange6(this.selectedConditions_6);
        },
        handleClose7(tag_7) {
            this.selectedConditions_7.splice(this.selectedConditions_7.indexOf(tag_7), 1);
            this.selectConditionChange7(this.selectedConditions_7);
        },
        handleClose8(tag_8) {
            this.selectedConditions_8.splice(this.selectedConditions_8.indexOf(tag_8), 1);
            this.selectConditionChange8(this.selectedConditions_8);
        },
        handleClose9(tag_9) {
            this.selectedConditions_9.splice(this.selectedConditions_9.indexOf(tag_9), 1);
            this.selectConditionChange9(this.selectedConditions_9);
        },
        handleClose10(tag_10) {
            this.selectedConditions_10.splice(this.selectedConditions_10.indexOf(tag_10), 1);
            this.selectConditionChange10(this.selectedConditions_10);
        },
        getResultListInfor: function(param) {
            publicRequirest.getEnterpriseMsgMarks(param).then(res=> {
                this.listResult = res.data;
                if(this.listResult.Rows.length === 0) {
                    this.$message({
                        message: '无该条件下数据！！！',
                        type: 'warning',
                        duration: 2000
                    });
                }
            })
        },
        currentChange(val) {
            this.searchConditionsList.page = val;
            this.searchConditionsList.count = 20;
            this.getResultListInfor(this.searchConditionsList);
        },
        enterpriserList(event) {
            let isPos =  event.target.getAttribute("ispos");
            let ebid = event.target.getAttribute("ebid");
            this.$emit("hoverEnterprise",ebid);
            if(isPos) {
                let posId = JSON.parse(event.target.getAttribute("pos"));
                window.map.getView().setCenter(posId);
                window.map.getView().setZoom(2);
            }
        },
        skipToEnterpriseDetail(event) {
            let bid = event.target.getAttribute("bid");
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'enterprisedetail',
                query:{
                    bid: bid
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {
        enterSearchvalue(newVal,oldVal) {
            this.listResult = newVal;
        },
        inputValue(newVal,oldVal) {
            this.searchConditions.names = newVal;
            this.searchConditionsList.names = newVal;
            this.getResultListInfor(this.searchConditionsList);
        }
    }

  }

</script>
<style lang=''>
    .eopen{
        right: 1px;
        transition: .5s;
    }
    .ehide{
        right: -260px;
        transition: .5s;
    }
    .openBtn {
        left: 0px;
        transition: .5s;
    }
    .hideBtn {
        left: -20px;
        transition: .5s;
    }
    .hideBtn:hover {
        left: -30px;
        transition: .5s;
    }
    .enterpriseMsg {
        width: 260px;
        height: 738px;
        background-color: white;
        position: absolute;
        top: 68px;
        /* right: 1px; */
        z-index: 9999;
        border: 1px solid #4491df;
    }
    .isBtn {
        /* width: 64px;
        height: 64px; */
        position: absolute;
        /* left: 0; */
        bottom: 0px;
        z-index: 10001;
    }
    .searchAndResult{
        width: 100%;
        height: 675px;
        overflow: hidden;
    }
    .enterpriseMsg .el-tabs__nav{
        width: 100%;
    }
    .enterpriseMsg .el-tabs--border-card>.el-tabs__header .el-tabs__item {
        width: 50%;
        text-align: center;
        margin: 0;
        color: #000;
        font-weight: bold;
    }
    .enterpriseMsg .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        background-color: #99CC33;
        color: #fff;
    }
    .enterpriseMsg .el-tabs--border-card>.el-tabs__content{
        padding: 10px;
    }
    /* .el-scrollbar__bar{
        right: -10px;
    } */
    .enterpriseMsg .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .enterpriseMsg .is-horizontal {
        display: none;
    }
    .enterpriseMsg .el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner{
        display: none;
    }
    .enterpriseMsg .el-checkbox.is-bordered.el-checkbox--mini {
        margin-left: 10px;
        padding: 3px 10px 3px 0px;
    }
    .enterpriseMsg .el-checkbox.is-bordered+.el-checkbox.is-bordered{
        margin-bottom: 4px;
    }
    .enterpriseMsg .el-collapse-item__header{
        text-align: left;
    }
    .enterpriseMsg .el-collapse-item__content{
        padding-bottom: 10px;
        text-align: left;
    }

    /* 结果列表样式 */
    .searchCondition {
        text-align: left;
    }
    .enterpriseMsg .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .searchName {
        width: 100%;
        height: 100px;
        overflow: hidden;
    }
    .searchResult{
        width: 100%;
        height: 500px;
        /* background: #000; */
        overflow: hidden;
    }
    .enterpriseMsg .el-tag--mini{
        margin-left: 10px;
    }
    .enterpriseMsg .el-tag .el-icon-close{
        width: 10px;
        right: 0;
    }
    .enterpriseMsg .el-tag{
        margin-top: 4px;
    }
    .enterpriseList {
        width: 100%;
    }
    .enterpriseList li {
        display: flex;
        width: 100%;
        border-bottom: 1px dashed #53C99E;
        padding: 6px 0;
    }
    .enterpriseList li a{
        font-size: 14px;
        font-weight: bold;
    }
    .enterpriseList li p{
        line-height: 1.5;
        font-size: 12px;
    }
    .imgIBox i {
        display: block;
        width: 100%;
        font-size: 14px;
        color: #003466;
        text-align: center;
    }
    .searchAndResult .el-pagination {
        text-align: center;
        padding: 2px 0px;
    }
    .searchAndResult .el-pager li {
        min-width: 22.5px;
    }
    .searchAndResult .el-pagination .btn-prev,.searchAndResult .el-pagination .btn-next {
        padding-right: 0px;
    }
    .searchAndResult .el-pagination button {
        padding: 0;
    }
    .positionMark{
        color: red;
        /* text-align: center; */
    }
</style> 
