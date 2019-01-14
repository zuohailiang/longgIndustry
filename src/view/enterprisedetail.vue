<template>
  <!-- 企业详情 -->
  <div class="enterpriseDetail">
     <el-container>
        <el-header>
            <v-header></v-header>
        </el-header>
        <el-container>
            <div class="enterpriseContainer">
                <el-scrollbar style="height: 100%">
                    <div id="top" style="clear: both"></div>
                    <div class="enterDetail">
                        <div class="enterpriseDisplay">
                            <div class="enterpriseDisplayLeft">
                                <div id="enterProduct"> 
                                    <!-- <v-thumbnail></v-thumbnail> -->
                                    <v-arearegular :picture-display="regularPicture" :pic-title="titlemsg"></v-arearegular>
                                </div>
                            </div>
                            <div class="enterpriseDisplayRight">
                                <div id="basicinfo">
                                    <!-- <v-areamsg></v-areamsg> -->
                                    <v-areaenterprise></v-areaenterprise>
                                </div>
                            </div>
                        </div>
                        <div class="matingMap" id="supportsdiv">
                            <v-matingmap></v-matingmap>
                        </div>
                    </div>
                    <div id="bottom" style="clear: both"></div>
                </el-scrollbar>
            </div>
        </el-container>
    </el-container>
    <div class="tshop-psm-shop-ww-hover">
        <div class="skin-box-content">
            <div class="toTop img-tobom bt-color ">
                <a href="#bottom" style="color: white;">到底部</a>
            </div>
            <div class="hy">
                <a href="#basicinfo" class="shortbox-font">基本信息</a>
            </div>
            <div class="WW">
                <a href="#supportsdiv" class="shortbox-font">周边配套</a>
            </div>
            <div class="WW">
                <a href="#enterProduct" class="shortbox-font">企业产品</a>
            </div>
            <div class="toTop img-totop bt-color ">
                <a style="color: white;" href="#top">到顶部</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import vHeader from '@/components/header/header'
//   import vThumbnail from '@/components/detailblock/thumbnail'
  import vArearegular from '@/components/detailblock/arearegular'
  import vAreaenterprise from '@/components/detailblock/areaenterprisemsg'
  import vMatingmap from '@/components/detailblock/matingmap'
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          bid: '',
          regularPicture: '',
          titlemsg: '企业产品'
      };
    },

    components: {
        vHeader,
        // vThumbnail,
        vArearegular,
        vAreaenterprise,
        vMatingmap
    },

    computed: {},

    created() {
        document.title = this.$route.meta.title;
    },

    mounted() {
        this.bid = this.$route.query.bid;
        this.getEnterpriseProduct(this.bid);
    },

    methods: {
        getEnterpriseProduct: function(bid) {
            publicRequirest.getEnterpriseDetailPic(6,bid).then(res=> {
                if(res.data.list && res.data.list.length>0) {
                    this.regularPicture = res.data.list;
                }else{
                    this.regularPicture = [{
                        TsupPhoto: {
                            url: ''
                        }
                    }];
                }
            })
        }
    },

    watch: {}

  }

</script>
<style lang=''>
    @import url('../styles/rightBar.css');
    html,body{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .enterpriseDetail{
        width: 100%;
        height: 100%;
    }
    .el-container{
        height: 100%;
    }
    .enterpriseContainer{
        width: 100%;
        height: 100%;
        background: #eee;
        overflow: hidden;
    }
    .enterDetail{
        width: 960px;
        /* height: 1000px; */
        margin: 10px auto;
        /* background: red; */
    }
    .enterpriseDisplay{
        width: 100%;
        /* height: 685px; */
        padding: 5px;
        border: 1px solid #A3A5A7;
        /* background-color: red; */
        display: flex;
    }
    .enterpriseDisplay .thumbnail {
        margin-top: 0;
    }
    .enterpriseDisplayRight{
        width: 326px;
        margin-left: 8px;
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