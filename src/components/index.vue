<template>
  <div class="indexContainer">
    <el-container>
        <el-header>
            <v-header :search-criteria='searchCriteria'></v-header>
        </el-header>
        <el-container>
            <v-barmap @listenToSelect="getSelectVal"></v-barmap>
        </el-container>
    </el-container>
    <v-msgpopup v-if="showMsgPopup" :dialogVisible.sync="showMsgPopup" :title="msgTitle" :showContent="msgContent"></v-msgpopup>
    <v-investmentgrade></v-investmentgrade>
    <!-- <v-selectarea v-if="isSelectArea" :selectShow='landHouse' :houseGarden="industrailHome"></v-selectarea> -->
    <!-- <v-enterprisemsg v-if="true"></v-enterprisemsg> -->
  </div>
</template>

<script>
    import Vue from 'vue'
    import vHeader from '@/components/header/header'
    import vBarmap from '@/components/barmap/barmap'
    import vMsgpopup from '@/components/msgpopup/msgpopup'
    import vInvestmentgrade from '@/components/investmentgrade/investmentgrade'
    // import vSelectarea from '@/components/selectarea/selectarea'
    // import vEnterprisemsg from '@/components/enterprisemsg/enterprisemsg'
    // import Bus from '@/bus/bus.js'
    import { LoadMap } from '@/ol/zondy/openlayer_map_ol3_sz.js'
    import { OpenlayerMap } from '@/ol/zondy/map_devo.js'
    import { publicRequirest } from '@/api/api.js'
    export default {
        data() {
            return {
                searchCriteria: 'Indexsearch',
                showMsgPopup: false,
                // isSelectArea: false,
                // landHouse: false,
                // industrailHome: false,
                msgTitle: '',
                msgContent: ''
            }
        },

        components: {
            vHeader,
            vBarmap,
            vMsgpopup,
            vInvestmentgrade
            // vSelectarea,
            // vEnterprisemsg
        },

        computed: {
            
        },

        created() {
            
        },

        mounted() {

        },

        methods: {
            getSelectVal: function(val) {
                var _this = this;
                // this.isSelectArea = false;
                // this.landHouse = false;
                // this.industrailHome = false;
                const num = parseInt(val);
                let param = {
                    "[]": {
                        "TsupPlan": {
                            "classify": num,
                            "@column": "bid,content,title",
                            "@order": "modifydate-"
                        }
                    },
                    "format": true
                }
                //判断点击的是规划信息
                if(val === "1" || val === "2" || val === "3" || val === "4"){
                    this.showMsgPopup = true;
                    switch(val)
                    {
                        case "1":
                            this.msgTitle = "战略规划";
                            break;
                        case "2":
                            this.msgTitle = "产业规划";
                            break;
                        case "3":
                            this.msgTitle = "产业向导";
                            break;
                        case "4":
                            this.msgTitle = "街道产业规划";
                            break;
                    };
                    // 规划信息
                    publicRequirest.getMsgContent(param).then(function(res){
                        let dataList = res.data.list;
                        for(let i=0;i<dataList.length;i++) {
                            if(dataList[i].TsupPlan.title === "") {
                                dataList.splice(i,1);
                                i = i-1;
                            }
                        }
                        for(let i=0;i<dataList.length;i++){
                            publicRequirest.getFileTime(dataList[i].TsupPlan.bid).then(function(res){
                                let fileTime = res.data.list;
                                if(res.data.list){
                                    Vue.set(dataList[i].TsupPlan,'filename',fileTime[0].TsupFile.filename);
                                    Vue.set(dataList[i].TsupPlan,'uploadtime',fileTime[0].TsupFile.uploadtime);
                                    Vue.set(dataList[i].TsupPlan,'url',fileTime[0].TsupFile.url);
                                }else{
                                    Vue.set(dataList[i].TsupPlan,'filename',"");
                                    Vue.set(dataList[i].TsupPlan,'uploadtime',"");
                                    Vue.set(dataList[i].TsupPlan,'url',"");
                                }
                            })
                        }
                        _this.msgContent = dataList;
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }

                this.$root.Bus.$emit('setLayout',val);

                // 判断点击的是政策信息
                if(val === "5-1" || val ==="5-2" || val === "5-3"){
                    this.showMsgPopup = true;
                    let num;
                    if(val === "5-1"){
                        this.msgTitle = "招商引资";
                        num = 1;
                    }
                    if(val === "5-2"){
                        this.msgTitle = "招才引智";
                        num = 2;
                    }
                    if(val === "5-3"){
                        this.msgTitle = "产业扶持";
                        num = 3;
                    }
                    publicRequirest.getPolicyMsg(num).then(function(res){
                        let dataPolicyList = res.data.list;
                        let TsupArray = [];
                        for(let j=0; j<dataPolicyList.length; j++){
                            let TsupPlan = {
                                TsupPlan:{}
                            };
                            TsupPlan.TsupPlan.bid = dataPolicyList[j].TsupPolicy.bid;
                            TsupPlan.TsupPlan.content = dataPolicyList[j].TsupPolicy.content;
                            TsupPlan.TsupPlan.title = dataPolicyList[j].TsupPolicy.title;
                            TsupArray.push(TsupPlan);
                        }
                        for(let i=0;i<TsupArray.length;i++) {
                            if(TsupArray[i].TsupPlan.title === "") {
                                TsupArray.splice(i,1);
                                i = i-1;
                            }
                        }
                        for(let i=0; i<TsupArray.length; i++){
                            publicRequirest.getFileTime(TsupArray[i].TsupPlan.bid).then(function(res){
                                let policyFileTime = res.data.list;
                                if(res.data.list){
                                    Vue.set(TsupArray[i].TsupPlan,'filename',policyFileTime[0].TsupFile.filename);
                                    Vue.set(TsupArray[i].TsupPlan,'uploadtime',policyFileTime[0].TsupFile.uploadtime);
                                    Vue.set(TsupArray[i].TsupPlan,'url',policyFileTime[0].TsupFile.url);
                                }else{
                                    Vue.set(TsupArray[i].TsupPlan,'filename',"");
                                    Vue.set(TsupArray[i].TsupPlan,'uploadtime',"");
                                    Vue.set(TsupArray[i].TsupPlan,'url',"");
                                }
                            })
                        }
                        _this.msgContent = TsupArray;
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }

                //载体信息
                // if(val === "industrial_land_1" || val === "industrial_house_1" || val === "industrial_land_2" || val === "industrial_house_2"){
                //     this.$root.Bus.$emit("msgLayers",val);
                // }else{
                //     this.$root.Bus.$emit("msgLayers","notLandHouse");
                // }
            }
        },
        watch: {
            
        }
    };
</script>
<style lang=''> 
    html,body{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .indexContainer{
        width: 100%;
        height: 100%;
    }
    .el-header {
        /* background-color: #B3C0D1; */
        background: #003466;
        /* color: #333; */
        text-align: center;
        height: 68px !important;
        display: flex;
    }
    .el-container{
        height: 100%;
    }
</style>