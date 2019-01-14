<template>
  <div class="leaseSerachList" :class="isArrow ? listShow : listHide">
      <div class="showSpan" @click="isShowList">
          <i class="el-icon-caret-left" v-if="isArrow"></i>
          <i class="el-icon-caret-right" v-else></i>
      </div>
      <div class="selectHeader">
        <el-radio-group v-model="sort" @change="sortChange">
            <el-radio-button label="默认排序">
                                
            </el-radio-button>
            <el-radio-button label="价格">
                <i class="el-icon-arrow-down">价格</i>
            </el-radio-button>
            <el-radio-button label="面积">
                <i class="el-icon-arrow-down">面积</i>
            </el-radio-button>
        </el-radio-group>
      </div>
      <div class="searchCon">
          <h3 class="wordTip wordTipH">搜索条件：</h3>
          <div class="searchConName">
            <el-tag
                v-if="selectConditionValue !== '' && selectConditionValue.areaVal !== ''"
                closable
                :disable-transitions="false"
                size="mini"
                @close="handleClose1(selectConditionValue.areaVal)">
                {{selectConditionValue.areaVal}}
            </el-tag>
            <el-tag
                v-if="selectConditionValue !== '' && selectConditionValue.priceVal !== ''"
                closable
                :disable-transitions="false"
                size="mini"
                @close="handleClose1(selectConditionValue.priceVal)">
                {{selectConditionValue.priceVal}}
            </el-tag>
            <el-tag
                v-if="selectConditionValue !== '' && selectConditionValue.squareVal !== ''"
                closable
                :disable-transitions="false"
                size="mini"
                @close="handleClose1(selectConditionValue.squareVal)">
                {{selectConditionValue.squareVal}}
            </el-tag>
            <el-tag
                v-for="(cl,index) in selectConditionValue.checklistVal"
                :key="index"
                closable
                :disable-transitions="false"
                size="mini"
                @close="handleClose1(cl)">
                {{cl}}
            </el-tag>
          </div>
          <label class="wordTip">搜索结果：</label><span class="wordTip">共{{leasesearchList.total}}条</span>
          <div class="listSearchResult">
              <el-scrollbar style="height: 100%;">
                  <ul class="listUl">
                      <li v-for="(l,index) in leasesearchList.list" :key="index" :names="l.ViewLand.names" :pos="`[${l.ViewLand.x},${l.ViewLand.y}]`" :geometry="l.ViewLand.geometry" @mouseenter="landMapList">
                          <div v-if="l.ViewLand.bid">
                             <a href="javascript:void(0);" :landBid="l.ViewLand.bid" @click="skipLindDetail">{{l.ViewLand.names}}</a>
                          </div>
                          <div v-if="l.ViewLand.parkid">
                              <a href="javascript:void(0);" :parkid="l.ViewLand.parkid" @click="skipParkDetail">{{l.ViewLand.names}}</a><a href="javascript:void(0);" :buildid="l.ViewLand.buildid" @click="skipBuildDetail" class="secondA">{{l.ViewLand.bname}}</a><span class="sentState">【{{l.ViewLand.landstatus}}】</span>
                          </div>
                          <div class="listContentMap">
                              <div class="listMsg">
                                  <p><label>地址：</label><span>{{l.ViewLand.address}}</span></p>
                                  <p><label>面积：</label><span>{{l.ViewLand.area}}m²</span></p>
                                  <p class="referPrice"><label>参考价：</label><span>{{l.ViewLand.referenceprice}}元/㎡·月</span></p>
                              </div>
                              <div class="listImg">
                                  <!-- <img :src="`${baseUrl}${l.ViewLand.introimg}`" alt=""> -->
                                    <!-- <viewer>
                                        <img src="../../../static/images/zanwu.jpg">
                                    </viewer> -->
                                  <viewer v-if="l.ViewLand.introimg">
                                      <img :src="`${baseUrl}${l.ViewLand.introimg}`" alt="">
                                  </viewer>
                                  <img v-else src="../../../static/images/zanwu.jpg" alt=""> 
                              </div>
                          </div>
                      </li>
                  </ul>
              </el-scrollbar>
          </div>
      </div>
      <div class="listPagination">
          <el-pagination
            @current-change="currentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="leasesearchList.total">
          </el-pagination>
      </div>
  </div>
</template>

<script>
  import { base_url } from '@/api/api.js'
  export default {
    name:'',
    props:['leasesearchList'],
    data () {
      return {
          isArrow: true,
          listHide: 'listHide',
          listShow: 'listShow',
          sort: '默认排序',
          baseUrl: '',
          currentPage: 1,
          selectConditionValue: ''
      };
    },

    components: {},

    computed: {},

    created() {
        this.baseUrl = base_url;
    },

    mounted() {
        this.$root.Bus.$on("listenSelectCon",(val)=> {
            this.selectConditionValue = val;
            this.currentPage = 1;
            this.sort = '默认排序';
        })
    },

    methods: {
        isShowList: function() {
            this.isArrow = !this.isArrow;
        },
        currentChange: function(val) {
            this.$emit("listenListPage",val);
        },
        sortChange: function(val) {
            this.$emit("listenSortChange",val);
        },
        skipLindDetail: function(event) {    //产业用地列表详情链接
            let landBid = event.target.getAttribute("landBid");
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'landdetails',
                query:{
                    bid: landBid
                }   
            })  
            window.open(newpage.href, '_blank');
        },
        skipParkDetail: function(event) {    //产业用房园区详情链接
            let parkid = event.target.getAttribute("parkid");
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'useroomdetails',
                query:{
                    bid: parkid
                }   
            })  
            window.open(newpage.href, '_blank');
        },
        skipBuildDetail: function(event) {    //跳转到楼栋详情链接
            let buildid = event.target.getAttribute("buildid");
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'buildingdetail',
                query:{
                    buildid: buildid
                }   
            })  
            window.open(newpage.href, '_blank');
        },
        landMapList: function(event) {
            let posId = JSON.parse(event.target.getAttribute("pos"));
            let names = event.target.getAttribute("names");
            let point = event.target.getAttribute("geometry");
            let geometry = {
                names: names,
                point: point
            };
            this.$emit("listToMapMark",geometry);
            window.switchmap.getView().setCenter(posId);
            window.switchmap.getView().setZoom(5);
        },
        handleClose1: function(s) {
            this.currentPage = 1;
            this.sort = '默认排序';
            if( s === "布吉" || s === "横岗" || s === "南湾" || s === "坂田" || s === "平湖" || s === "龙城" || s === "龙岗" || s === "坪地"){
                this.selectConditionValue.areaVal = "";
            }else if( s==="1000以下" || s==="1000-2000" || s==="2000-3000" || s==="3000以上" || s === "0-15" || s === "15-30" || s === "30-50" || s === "50-100" || s === "100以上" ){
                this.selectConditionValue.priceVal = "";
            }else if( s==="4000以下" || s==="4000-6000" || s==="6000-8000" || s==="8000以上" || s === "0-1000" || s === "1000-2000" || s === "2000-3000" || s === "3000-5000" || s === "5000以上"){
                this.selectConditionValue.squareVal = "";
            }else {
                this.selectConditionValue.checklistVal.splice(this.selectConditionValue.checklistVal.indexOf(s), 1);
            }
            this.$root.Bus.$emit("listenSelectCondition", this.selectConditionValue);
        }
    },

    watch: {
        leasesearchList(newVal,oldVal) {
            this.leasesearchList = newVal;
        }
    }

  }

</script>
<style lang=''>
    .listHide {
        left: -300px;
        transition: 0.5s;
    }
    .listShow {
        left: 1px;
        transition: 0.5s;
    }
    .leaseSerachList {
        width: 300px;
        height: 734px;
        position: absolute;
        top: 70px;
        /* left: 1px; */
        z-index: 9999;
        border: 1px solid #4c4341;
        background-color: white;
        -webkit-box-shadow: #666 1px 1px 3px;
        -moz-box-shadow: #666 1px 1px 3px;
        box-shadow: #666 1px 1px 3px;
    }
    .showSpan {
        position: absolute;
        top: 50%;
        left: 300px;
        margin-top: -20px;
        z-index: 9991;
        width: 10px;
        height: 40px;
        background: white;
        border-top: 0.5px solid #666;
        box-shadow: #666 1px 1px 1px;
        padding-top: 40px;
        /* padding-bottom: 5px;
        padding-right: 5px; */
        text-align: left;
        padding-bottom: 5px;
        padding-right: 5px;
    }
    .selectHeader .el-icon-arrow-down:before {
        content: "";
    }
    .selectHeader .el-icon-arrow-down:after {
        content: "\E603";
    }
    .selectHeader .el-radio-button__inner {
        padding: 6px 26px;
    }
    .wordTip {
        font-size: 14px;
        padding: 10px 0;
    }
    .wordTipH {
        padding: 5px 0;
    }
    .searchConName {
        min-height: 22px;
        margin-bottom: 5px;
    }
    .listSearchResult {
        width: 100%;
        height: 580px;
        margin-top: 5px;
        /* background: red; */
        overflow: hidden;
        border-top: 1px dashed #000;
    }
    .leaseSerachList .listUl {
        width: 100%;
    }
    .leaseSerachList .listUl li {
        width: 280px;
        padding: 6px 10px;
        border-bottom: 1px dashed #000;
    }
    .leaseSerachList .listUl li a{
        font-size: 14px;
        font-weight: bold;
        text-decoration: underline;
    }
    .leaseSerachList .secondA{
        margin-left: 6px;
    }
    .leaseSerachList .sentState {
        font-size: 14px;
        color: #8fc31f;
    }
    .leaseSerachList .listUl li p{
        line-height: 1.5;
        font-size: 12px;
    }
    .leaseSerachList .listContentMap {
        margin-top: 4px;
    }
    .leaseSerachList .referPrice{
        color: #ea5514;
    }
    .leaseSerachList .listContentMap{
        display: flex;
    }
    .leaseSerachList .listMsg {
        width: 72%;
    }
    .leaseSerachList .listImg{
        width: 80px;
        height: 60px;
        /* background: blue; */
    }
    .leaseSerachList .listImg img{
        width: 100%;
        height: 100%;
    }

    .listSearchResult .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .listSearchResult .is-horizontal {
        display: none;
    }
    .listPagination {
        width: 100%;
        text-align: left;
        margin-top: 12px;
    }
    .listPagination .el-pager li {
        min-width: 24.5px;
    }
</style>