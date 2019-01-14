<template>
  <!-- 产业用房详情 -->
  <div class="useRoomContainer">
    <el-container>
        <el-header>
            <v-header :search-criteria='searchCriteria'></v-header>
        </el-header>
        <el-container>
            <div class="detailContainer">
                <el-scrollbar style="height: 100%">
                    <div id="top" style="clear: both"></div>
                    <div class="detail">
                        <div class="msgDisplay">
                            <div class="displayLeft">
                                <div style="margin-top: -10px;" id="similarPark">
                                    <!-- 同类园区推介 -->
                                    <v-similarpark :similarpark-detail="silimarParkValue"></v-similarpark>
                                </div>
                                <div style="margin-top: 10px;" id="importPark">
                                    <!-- 重点园区推介 -->
                                    <v-detaillist :importantpark-detail="importantParkValue" @listenToParkPage="getParkPage"></v-detaillist>         
                                </div>
                                <div style="margin-top: 10px;">
                                    <!-- 宣传视频 -->
                                    <v-video></v-video>
                                </div>
                            </div>
                            <div class="displayRight">
                                <div id="basicinfo">
                                    <!-- 产业用地详情地块信息 -->
                                    <v-areamsghouse :houseland-detail="landAreaValue" :importantenter-detail="importantEnterprise"></v-areamsghouse>
                                </div>
                                <!-- <div>
                                    <v-video></v-video>
                                </div> -->
                            </div>
                        </div>
                        <div class="msgTableDisplay" id="saleSentMsg">
                            <!-- 租售信息 -->
                            <v-detailtable :rstable-list="rentsaleValue" @listenToRsPage="getRsPage"></v-detailtable>
                        </div>
                        <div class="matingMap" id="supportsdiv">
                            <!-- 周边配套地图 -->
                            <v-matingmap></v-matingmap>
                        </div>
                    </div>
                    <div id="bottom" style="clear: both"></div>
                </el-scrollbar>
                <div class="tshop-psm-shop-ww-hover">
                    <div class="skin-box-content">
                        <div class="toTop img-tobom bt-color ">
                            <a href="#bottom" style="color: white;">到底部</a>
                        </div>
                        <div class="hy">
                            <a href="#basicinfo" class="shortbox-font">基本信息</a>
                        </div>
                        <div class="WW">
                            <a href="#saleSentMsg" class="shortbox-font">租售信息</a>
                        </div>
                        <div class="WW">
                            <a href="#supportsdiv" class="shortbox-font">周边配套</a>
                        </div>
                        <div class="WW">
                            <a href="#similarPark" class="shortbox-font">同类园区</a>
                        </div>
                        <div class="WW">
                            <a href="#importPark" class="shortbox-font">重点园区</a>
                        </div>
                        <div class="toTop img-totop bt-color ">
                            <a style="color: white;" href="#top">到顶部</a>
                        </div>
                    </div>
                </div>
            </div>
        </el-container>
    </el-container>
  </div>
</template>

<script>
  import vHeader from '@/components/header/header'
  //import vThumbnail from '@/components/detailblock/thumbnail'
  import vSimilarpark from '@/components/detailblock/similarpark'
  import vDetaillist from '@/components/detailblock/detaillist'
  import vAreamsghouse from '@/components/detailblock/areamsghouse'
  import vVideo from '@/components/detailblock/videopublicity'
  import vDetailtable from '@/components/detailblock/detailtable'
  import vMatingmap from '@/components/detailblock/matingmap'
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          searchCriteria: "Searchdetail",
          bid: '',
          parkPage: 1,  //接收重点园区分页
          rentsalePage: 1, //接收租售信息分页
          landAreaValue: '',   //获取地块信息的值
          importantEnterprise: [],  //主要企业信息的值
          silimarParkValue: [],  //同类园区推介
          importantParkValue: '',  //重点园区推介
          rentsaleValue: ''  //租售信息
      };
    },

    components: {
        vHeader,
        vSimilarpark,
        vDetaillist,
        vAreamsghouse,
        vVideo,
        vDetailtable,
        vMatingmap
    },

    computed: {},

    created() {
        document.title = this.$route.meta.title;
    },

    mounted() {
        this.bid = this.$route.query.bid;
        this.getAreaMsgHouseInfor(this.bid);
        this.getImportantParkInfor(this.bid);
        this.getRentSaleInfor(this.bid,this.rentsalePage);
    },

    methods: {
        getParkPage: function(val) {
            this.parkPage = val;
        },
        getRsPage: function(val) {
            this.rentsalePage = val;
        },
        getAreaMsgHouseInfor: function(bid) {
            publicRequirest.getAreaNsgHouse(bid).then(res => {
                this.landAreaValue = res.data.list[0].ViewParkBuild;
                if(!res.data.list[0].ViewParkBuild.parturl) {
                    this.landAreaValue.parturl = "";
                }
                let orientation = res.data.list[0].ViewParkBuild.orientation;
                let orientationArr = [];
                for(var i=0;i<orientation.split("、").length;i++){
                    var item = `%${orientation.split('、')[i]}%`
				    orientationArr.push(item);
                }
                // 同类园区推介
                publicRequirest.getSimilarPark(bid,orientationArr).then(res => {
                    if(res.data.list && res.data.list.length > 0){
                        res.data.list.forEach(element => {
                            this.silimarParkValue.push(element);
                        })
                    }
                });
            });
            // 主要企业请求
            publicRequirest.getImportantEnterprise(bid).then(res => {
                this.importantEnterprise = [];
                if(res.data.list && res.data.list.length > 0){
                        res.data.list.forEach(element => {
                        this.importantEnterprise.push(element);
                    });
                }
            });
        },
        //重点园区推介请求
        getImportantParkInfor: function(bid) {
            publicRequirest.getImportantPark(bid,this.parkPage).then(res => {
                console.log(res);
                this.importantParkValue = res.data;
            })
        },
        //租售信息
        getRentSaleInfor: function(bid,page) {
            publicRequirest.getRentSaleMsg(bid,page).then(res => {
                console.log(res);
                this.rentsaleValue = res.data;
            })
        }
    },

    watch: {
        '$route' (to, from) {
            if(from.path === "/"){
                this.bid = this.$route.query.bid;
                this.getAreaMsgHouseInfor(this.bid);
                this.getImportantParkInfor(this.bid);
                this.getRentSaleInfor(this.bid,this.rentsalePage);
            }
        },
        parkPage(newVal,oldVal) {
            this.getImportantParkInfor(this.bid);
        },
        rentsalePage(newVal,oldVal) {
            this.getRentSaleInfor(this.bid,this.rentsalePage);
        }
    }

  }

</script>
<style lang=''>
    @import url('../styles/rightBar.css');
    html,body{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .useRoomContainer{
        width: 100%;
        height: 100%;
    }
    .el-container{
        height: 100%;
    }
    .detailContainer{
        width: 100%;
        height: 100%;
        background: #eee;
        overflow: hidden;
    }
    .detail{
        width: 960px;
        /* height: 1000px; */
        margin: 10px auto;
        /* background: red; */
    }
    .msgDisplay{
        width: 100%;
        /* height: 685px; */
        padding: 5px;
        border: 1px solid #A3A5A7;
        /* background-color: red; */
        display: flex;
    }
    .displayRight{
        margin-left: 8px;
    }
    .msgTableDisplay{
        width: 100%;
        /* height: 300px; */
        padding: 5px;
        border: 1px solid #A3A5A7;
        margin-top: 10px;
    }
    .matingMap{
        width: 100%;
        height: 450px;
        padding: 5px;
        border: 1px solid #A3A5A7;
        margin-top: 10px;
    }


    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .is-horizontal {
        display: none;
    }
</style>