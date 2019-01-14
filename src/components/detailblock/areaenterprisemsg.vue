<template>
  <!-- 企业详情主体信息 -->
  <div class="areamsg">
    <div class="areaTitle">
        <div class="title1">
            <img src="../../../static/images/point4.png" alt=""><span>{{enterpriseData.names}}</span>
        </div>
    </div>
    <div class="areaImgTable">
        <div class="areaImg">
            <el-carousel trigger="click" height="190" indicator-position="none">
                <el-carousel-item v-for="(p,index) in detailPic" :key="index">
                    <!-- <img v-if="p.TsupPhoto.url !== ''" src="http://172.17.6.123:8080/upload/plan/201606/15416622953372.png" alt=""> -->
                    <viewer v-if="p.TsupPhoto.url !== ''">
                        <img :src="`${baseUrl}${p.TsupPhoto.url}`" alt=" ">
                    </viewer>
                    <!-- <img v-if="p.TsupPhoto.url !== ''" :src="`${baseUrl}${p.TsupPhoto.url}`" alt=" "> -->
                    <!-- <img v-else src="http://172.17.6.123:8080/upload/plan/201606/15416622953372.png" alt="">  -->
                    <img v-else src="../../../static/images/zanwu.jpg" alt=""> 
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="areaTable1">
            <ul>
                <li>
                    <div>
                        <p>组织机构代码：</p>
                    </div>
                    <div>
                        <p>{{enterpriseData.ent_code}}</p>
                    </div>
                </li>
                <li>
                    <div class="propertiesDiv"> 
                        <label>所属街道：</label><span>{{enterpriseData.jdname}}</span>
                    </div>
                    <div class="propertiesDiv">
                        <label>成立时间：</label><span>{{enterpriseData.found_date}}</span>
                    </div>
                </li>
                <li>
                    <div>
                        <p>详细地址：</p>
                    </div>
                    <div>
                        <p>{{enterpriseData.address}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>房屋编码：</p>
                    </div>
                    <div>
                        <p>{{enterpriseData.build_no}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>主要产品：</p>
                    </div>
                    <div>
                        <p>{{enterpriseData.products}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>行业类型：</p>
                    </div>
                    <div>
                        <p>{{enterpriseData.typename}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>企业性质：</p>
                    </div>
                    <div>
                        <p>{{enterpriseData.ent_name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="areaTable2">
        <ul>
            <li>
                <div>
                    <p style="min-width: 60px;">制造业通俗行业类型：</p>
                </div>
                <div>
                    <p>{{enterpriseData.popular_industry}}</p>
                </div>
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>员工人数：</label><span>{{enterpriseData.employees_count}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>大专以上人数：</label><span>{{enterpriseData.above_junior_count}}</span>
                </div>
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>自由产权土地面积：</label><span>{{enterpriseData.owner_landarea}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>自由产权建筑面积：</label><span>{{enterpriseData.owner_buildarea}}</span>
                </div>
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>租用土地面积：</label><span>{{enterpriseData.rental_landarea}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>租用厂房面积：</label><span>{{enterpriseData.rental_factoryarea}}</span>
                </div>
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>租约到期日：</label><span>{{enterpriseData.leasedate}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>高层次人才：</label><span>{{enterpriseData.talent}}</span>
                </div>
                <!-- <div>
                    <p style="min-width: 60px;">租约到期日：</p>
                </div>
                <div>
                    <p>{{enterpriseData.leasedate}}</p>
                </div> -->
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>高新技术企业：</label><span>{{enterpriseData.hightech}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>上市情况：</label><span>{{enterpriseData.listed}}</span>
                </div>
            </li>
            <li>
                <div>
                    <p style="min-width: 60px;">商标情况：</p>
                </div>
                <div>
                    <p>{{enterpriseData.trademarkinfo}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p style="min-width: 60px;">所获专利情况：</p>
                </div>
                <div>
                    <p>{{enterpriseData.patent}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p style="min-width: 60px;">其他资质及荣誉：</p>
                </div>
                <div>
                    <p>{{enterpriseData.other_resouce}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p style="min-width: 60px;">企业网址：</p>
                </div>
                <div>
                    <p v-if="enterpriseData.website">
                        <a :href="enterpriseData.website">{{enterpriseData.website}}</a>
                    </p>
                    <p v-else>
                        无
                    </p>
                </div>
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>销售人员：</label><span>{{enterpriseData.sellcontact}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>联系电话：</label><span>{{enterpriseData.selltel}}</span>
                </div>
            </li>
            <li>
                <div class="propertiesDiv"> 
                    <label>政府联系人：</label><span>{{enterpriseData.govcontact}}</span>
                </div>
                <div class="propertiesDiv">
                    <label>联系电话：</label><span>{{enterpriseData.govtel}}</span>
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
    props:[''],
    data () {
      return {
         bid: '',
         baseUrl: '',
         enterpriseData: '',
         detailPic: ''
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
        this.getEnterpriseDetailInfor(this.bid);
        this.getEnterprisePic(this.bid);
    },

    methods: {
        getEnterpriseDetailInfor: function(bid) {
            publicRequirest.getEnterpriseDetailMsg(bid).then(res=> {
                console.log(res);
                this.enterpriseData = res.data.list[0].ViewEnterprise;
            })
        },
        getEnterprisePic: function(bid) {
            publicRequirest.getEnterpriseDetailPic(5,bid).then(res=> {
                if(res.data.list && res.data.list.length>0) {
                    this.detailPic = res.data.list;
                }else{
                    this.detailPic = [{
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
    .title1 img {
        width: 36px;
        height: 36px;
    }
    .synopsis{
        height: 180px;
    }
    .propertiesDiv {
        width: 50%;
    }
</style>