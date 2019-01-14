<template>
  <!-- 创客园区详情地块信息 -->
  <div class="areamsg">
    <div class="areaTitle">
        <div class="title1">
            <span>{{areaguestDetail.names}}</span>
        </div>
        <div class="title2">
            <span class="title2Bg">{{areaguestDetail.isoperate}}</span>
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
                    <div class="propertiesDiv"> 
                        <label>所属街道：</label><span>{{areaguestDetail.jdname}}</span>
                    </div>
                    <div class="propertiesDiv">
                        <label>面积：</label><span>{{areaguestDetail.area}}</span>
                    </div>
                </li>
                <li>
                    <div>
                        <p style="width:50px;">运营商：</p>
                    </div>
                    <div>
                        <p>{{areaguestDetail.investors}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>园区地址：</p>
                    </div>
                    <div>
                        <p>{{areaguestDetail.address}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>简介：</p>
                    </div>
                    <div>
                        <p>{{areaguestDetail.introduction | delHtmlTag}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
  import { base_url, publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:['areaguestDetail'],
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
</style>