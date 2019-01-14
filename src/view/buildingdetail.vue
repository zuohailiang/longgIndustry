<template>
  <!-- 楼栋详情 -->
  <div class="createGuestInfor">
      <el-container>
        <el-header>
            <v-header :search-criteria='searchCriteria'></v-header>
        </el-header>
        <el-container>
            <div class="guestContainer">
                <el-scrollbar style="height: 100%">
                    <div class="guestDetail">
                        <div class="buildingDetailDisplay">
                            <div class="buildHeader">
                                <a href="javascript:void(0);" :parkid="buildingValue.pid" @click="skipToParkDetail">{{buildingValue.names}}</a><label>{{buildingValue.bname}}</label><span class="title2Bg">{{buildingValue.rental}}</span>
                            </div>
                            <div class="buildContent">
                                <div class="buildImg">
                                    <!-- <viewer v-if="p.TsupPhoto.url !== ''">
                                        <img :src="`${baseUrl}${p.TsupPhoto.url}`" alt="">
                                    </viewer>
                                    <img v-else src="../../../static/images/zanwu.jpg" alt="">  -->
                                    <viewer v-if="buildingValue.introimg !== ''">
                                        <img :src="`${baseUrl}${buildingValue.introimg}`" alt="">
                                    </viewer>
                                    <img v-else src="../../static/images/zanwu.jpg" alt="">
                                </div>
                                <div class="buildTable">
                                    <ul>
                                        <li>
                                            <div>
                                                <p>参考价格：</p>
                                            </div>
                                            <div>
                                                <p>{{buildingValue.price}}元/平方米•月</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <p>园区：</p>
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" :parkid="buildingValue.pid" @click="skipToParkDetail">{{buildingValue.names}}</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <p>适合产业：</p>
                                            </div>
                                            <div>
                                                <p>{{buildingValue.forindustry}}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <p>用途：</p>
                                            </div>
                                            <div>
                                                <p>{{buildingValue.use}}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="liBuild"> 
                                                <label>面积：</label><span>{{buildingValue.area}}</span>
                                            </div>
                                            <div class="liBuild">
                                                <label>电梯类型：</label><span>{{buildingValue.belevator}}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="liBuild"> 
                                                <label>楼层净高：</label><span>{{buildingValue.buildhigh}}</span>
                                            </div>
                                            <div class="liBuild">
                                                <label>配电量：</label><span>{{buildingValue.electricity}}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="liBuild"> 
                                                <label>联系人：</label><span>{{buildingValue.contact}}</span>
                                            </div>
                                            <div class="liBuild">
                                                <label>联系电话：</label><span>{{buildingValue.tel}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="matingMap">
                            <v-matingmap></v-matingmap>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </el-container>
    </el-container>
  </div>
</template>

<script>
  import vHeader from '@/components/header/header'
  import vAreamsgguest from '@/components/detailblock/areamsgguest'
  import vMatingmap from '@/components/detailblock/matingmap'
  import { base_url, publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          baseUrl: '',
          searchCriteria: "Searchdetail",
          buildid: '',   //楼栋id
          buildingValue: ''  //创客园区详情区域数据
      };
    },

    components: {
        vHeader,
        vAreamsgguest,
        vMatingmap,
    },

    computed: {},

    created() {
        this.baseUrl = base_url;
    },

    mounted() {
        document.title = this.$route.meta.title;
        this.buildid = this.$route.query.buildid;
        this.getBuildingInfor(this.buildid);
    },

    methods: {
        getBuildingInfor: function(bid) {
            publicRequirest.getBuildingDetail(bid).then(res=> {
                this.buildingValue = res.data.list[0].ViewBuilding;
            })
        },
        skipToParkDetail: function(event) {
            let parkid = event.target.getAttribute("parkid");
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'useroomdetails',
                query:{
                    bid: parkid
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {
        
    }

  }

</script>
<style lang=''>
    @import url('../styles/areamsg.css');
    html,body{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .createGuestInfor{
        width: 100%;
        height: 100%;
    }
    .el-container{
        height: 100%;
    }
    .guestContainer{
        width: 100%;
        height: 100%;
        background: #eee;
        overflow: hidden;
    }
    .guestDetail{
        width: 960px;
        /* height: 1000px; */
        margin: 10px auto;
        /* background: red; */
    }
    .buildingDetailDisplay{
        width: 100%;
        /* height: 685px; */
        padding: 5px;
        border: 1px solid #A3A5A7;
        /* background-color: red; */
    }
    .buildHeader {
        width: 100%;
        padding: 8px 0;
        font-size: 18px;
        border-bottom: 1px dashed #000;
    }
    .buildHeader a {
        text-decoration: underline;
        margin: 0 10px;
    }
    .buildHeader span {
        margin-left: 10px; 
        font-size: 14px;
    }
    .createGuestInfor .buildContent {
        width: 100%;
        margin-top: 6px;
        display: flex;
    }
    .buildImg {
        padding: 6px;
        width: 392px;
        height: 300px;
        /* background: red; */
    }
    .buildImg img{
        width: 100%;
        height: 100%;
    }
    .buildTable{
        width: 538px;
        margin-left: 15px;
    }
    .buildTable ul{
        width: 100%;
    }
    .buildTable ul li{
        padding: 10px 2px;
        border-bottom: 1px dashed #A3A5A7;
        display: flex;
    }
    .buildTable ul li div p{
        color: #000;
        min-width: 40px;
        line-height: 18px;
    }
    .liBuild{
        width: 50%;
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