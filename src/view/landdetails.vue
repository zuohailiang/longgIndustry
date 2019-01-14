<template>
  <!-- 片区详情和用地详情结构类似，多一个中间表格区域 -->
  <div class="landDetailsContainer">
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
                                <div id="landpaiinfo">
                                    <!-- :landainfor-detail="landAinforValue" @listenPage="getListenPage" -->
                                    <v-landainfor></v-landainfor>
                                </div>
                                <div id="tuce">
                                    <v-arearegular :picture-display="regularPicture" :pic-title="titlemsg"></v-arearegular>
                                    <!-- <v-thumbnail></v-thumbnail> -->
                                </div>
                            </div>
                            <div class="displayRight">
                                <div id="basicinfo">
                                    <v-areamsg :landarea-detail="landAreaValue"></v-areamsg>
                                </div>
                                <div>
                                    <v-video></v-video>
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
                <a href="#landpaiinfo" class="shortbox-font">土地招拍挂</a>
            </div>
            <div class="WW">
                <a href="#tuce" class="shortbox-font">法定图则</a>
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
  import vLandainfor from '@/components/detailblock/landainfor'
  //import vThumbnail from '@/components/detailblock/thumbnail'
  import vArearegular from '@/components/detailblock/arearegular'
  import vKeyareamsg from '@/components/detailblock/areamsgkeyarea'
  import vAreamsg from '@/components/detailblock/areamsg'
  import vVideo from '@/components/detailblock/videopublicity'
  import vMatingmap from '@/components/detailblock/matingmap'
  import { publicRequirest } from '@/api/api.js'
  import { deepClone } from '@/utils/utils.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          searchCriteria: "Searchdetail",
          bid: '',
          //page: 1,   //土地招拍挂信息分页
          landAreaValue: '',   //获取地块信息的值
          regularPicture: '',
          titlemsg: '法定图则(红线图)'
          //landAinforValue: ''  //获取土地招拍挂信息的值
      };
    },

    components: {
        vHeader,
        vLandainfor,
        vArearegular,
        vAreamsg,
        vVideo,
        vMatingmap
    },

    computed: {
        
    },

    created() {
        document.title = this.$route.meta.title;
    },

    mounted() {
        this.bid = this.$route.query.bid;
        this.getAreaMsgInfor(this.bid);
        this.getKeyAreaRegularPic(this.bid);
    },

    methods: {
        // getListenPage: function(val) {  //获取页数
        //     this.page = val;
        // },
        getAreaMsgInfor: function(bid) {
            //获取地块信息数据
            publicRequirest.getAreaMsg(bid).then(res => {
                if(res.data.list && res.data.list.length > 0){
                    this.landAreaValue = res.data.list[0].ViewLand;
                }
            });
        },
        getKeyAreaRegularPic: function(bid) {   //获取规则图片数据
            publicRequirest.getKeyAreaDetailImage(4,bid).then(res => {
                this.regularPicture = res.data.list;
            })
        }
    },

    watch: {
        '$route' (to, from) {
            if(from.path === "/"){
                this.bid = this.$route.query.bid;
                this.getAreaMsgInfor(this.bid);
                this.getKeyAreaRegularPic(this.bid);
            }
        }
    }

  }

</script>
<style lang=''>
    @import url('../styles/landdetail.css');
    @import url('../styles/rightBar.css');
</style>