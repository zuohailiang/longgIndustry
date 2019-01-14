<template>
  <!-- 产业用房地块信息 -->
  <div class="areamsg">
    <div class="areaTitle">
        <div class="title1">
            <span>{{houselandDetail.names}}</span>
        </div>
        <div class="title2">
            <span class="title2Tip">[{{houselandDetail.parttype}}]</span><span class="title2Bg">{{houselandDetail.partstatus}}</span>
        </div>
    </div>
    <div class="areaImgTable">
        <div class="areaImg">
            <el-carousel trigger="click" height="190" indicator-position="none">
                <el-carousel-item v-for="(p,index) in areaMsgHousePic" :key="index">
                    <viewer v-if="p.TsupPhoto.url !== ''">
                        <img :src="`${baseUrl}${p.TsupPhoto.url}`" alt="">
                    </viewer>
                    <img v-else src="../../../static/images/zanwu.jpg" alt=""> 
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="areaTable1">
            <ul>
                <li>
                    <div>
                        <p>所属街道：</p>
                    </div>
                    <div>
                        <p>{{houselandDetail.jdname}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>园区地址：</p>
                    </div>
                    <div>
                        <p>{{houselandDetail.address}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>产业定位：</p>
                    </div>
                    <div>
                        <p>{{houselandDetail.orientation}}</p>
                    </div>
                </li>
                <li class="buildingsPrice">
                    <div>
                        <p>出租价格(元/平方米.月)：</p>
                    </div>
                    <div>
                        <p>{{houselandDetail.rentalprice}}</p>
                    </div>
                </li>
                <li>
                    <div class="propertiesDiv"> 
                        <label>园区属性：</label><span>{{houselandDetail.partproperty}}</span>
                    </div>
                    <div class="propertiesDiv">
                        <label>总栋数：</label><span>{{houselandDetail.buildtotal}}</span>
                    </div>
                </li>
                <li>
                    <div class="propertiesDiv"> 
                        <label>占地面积(m²)：</label><span>{{houselandDetail.floorarea}}</span>
                    </div>
                    <div class="propertiesDiv">
                        <label>建筑面积(m²)：</label><span>{{houselandDetail.buildarea}}</span>
                    </div>
                </li>
                <li>
                    <div class="propertiesDiv"> 
                        <label>空置面积(m²)：</label><span>{{houselandDetail.vacantarea}}</span>
                    </div>
                    <div class="propertiesDiv">
                        <label>宿舍面积(m²)：</label><span>{{houselandDetail.dormarea}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="areaTable2">
        <ul>
            <li>
                <div>
                    <p>配套设施：</p>
                </div>
                <div>
                    <p>停车场({{houselandDetail.parkinglot}}) 电梯({{houselandDetail.elevator}}) 食堂({{houselandDetail.diningroom}}) 宿舍({{houselandDetail.dormitory}}) 其他({{houselandDetail.othersupports}})</p>
                </div>
            </li>
            <li>
                <div>
                    <p>管理机构：</p>
                </div>
                <div>
                    <p>{{houselandDetail.partadminstation}}</p>
                </div>
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>联系人：</label><span>{{houselandDetail.linkman}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>联系电话：</label><span>{{houselandDetail.tel}}</span>
                </div>
            </li>
            <li>
                <div>
                    <p>园区网址：</p>
                </div>
                <div>
                    <p>{{houselandDetail.parturl}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p>园区简介：</p>
                </div>
                <div>
                    <p>{{houselandDetail.intro}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p>准入条件：</p>
                </div>
                <div>
                    <p>1、符合深圳市产业导向目录和龙岗区产业导向目录；</p>
                    <p>2、注册地和纳税必须在龙岗；</p>
                    <p v-if="houselandDetail.accessconditions">3、{{houselandDetail.accessconditions}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p class="enterNames">主要企业：</p>
                </div>
                <div class="importantEnter">
                    <span v-for="im in importantenterDetail" :key="im.TsupEnterprise.names">{{im.TsupEnterprise.names}}，</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import { base_url, publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:['houselandDetail','importantenterDetail'],
    data () {
      return {
        bid: '',
        baseUrl: '',
        areaMsgHousePic: ''
      };
    },

    components: {},

    computed: {
        
    },

    created() {
        this.baseUrl = base_url;
    },

    mounted() {
        this.bid = this.$route.query.bid;
        this.getAreaMsgHousePic(this.bid);
    },

    methods: {
        getAreaMsgHousePic: function(bid) {
            publicRequirest.getKeyAreaDetailImage(1,bid).then(res => {
                this.areaMsgHousePic = res.data.list;
                if(res.data.list && res.data.list.length > 0){
                    this.areaMsgHousePic = res.data.list;
                }else{
                    this.areaMsgHousePic = [{
                        TsupPhoto: {
                            url: ''
                        }
                    }];
                }
            })
        }
    },

    watch: {

    }

  }

</script>
<style lang=''>
    @import url('../../styles/areamsg.css');
    .propertiesDiv{
        width: 50%;
    }
    .enterNames{
        width: 60px !important;
    }
    .importantEnter span{
        line-height: 1.4;
    }
</style>