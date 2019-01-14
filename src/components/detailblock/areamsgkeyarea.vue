<template>
  <!-- 片区详情地块信息 -->
  <div class="areamsg">
    <div class="areaTitle">
        <div class="title1">
            <img src="../../../static/images/point4.png" alt=""><span>{{keyareaLandvalue.names}}</span>
        </div>
    </div>
    <div class="areaImgTable">
        <div class="areaImg">
            <el-carousel trigger="click" height="190" indicator-position="none">
                <el-carousel-item v-for="(s,index) in sceneryPic" :key="index">
                    <viewer v-if="s.TsupPhoto.url !== ''">
                        <img :src="`${baseUrl}${s.TsupPhoto.url}`" alt="">
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
                        <p>{{keyareaLandvalue.jdname}}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>简介：</p>
                    </div>
                    <div class="synopsis">
                        <p>{{keyareaLandvalue.inf | delHtmlTag}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="areaTable2">
        <ul>
            <li>
                <div>
                    <p style="min-width: 60px;">产业定位：</p>
                </div>
                <div>
                    <p>{{keyareaLandvalue.orientation}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p style="min-width: 60px;">发展目标：</p>
                </div>
                <div>
                    <p>{{keyareaLandvalue.developtarget}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p>准入条件：</p>
                </div>
                <div>
                    <p>1、符合深圳市产业导向目录和龙岗区产业导向目录；</p>
                    <p>2、注册地和纳税必须在龙岗；</p>
                    <p v-if="keyareaLandvalue.accessconditions">3、{{keyareaLandvalue.accessconditions}}</p>
                </div>
            </li>
            <li>
                <div>
                    <p class="enterNames">链接地址：</p>
                </div>
                <div class="importantEnter">
                    <a v-if="keyareaLandvalue.linkurl" :href="keyareaLandvalue.linkurl">{{keyareaLandvalue.linkurl}}</a>
                    <a v-else href="#">不详</a>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import { base_url } from '@/api/api.js'
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:['keyareaLandvalue'],
    data () {
      return {
         bid: '',
         baseUrl: '',
         sceneryPic: ''   //风光图片数据
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
        this.getKeyAreaImageInfor(this.bid);
    },

    methods: {
        getKeyAreaImageInfor: function(bid) {   //风光图片数据
            publicRequirest.getKeyAreaDetailImage(1,bid).then(res => {
                if(res.data.list && res.data.list.length > 0){
                    this.sceneryPic = res.data.list;
                }else{
                    this.sceneryPic = [{
                        TsupPhoto: {
                            url: ''
                        }
                    }];
                }
            })
        }
    },

    watch: {
        '$route' (to, from) {
            if(from.path === "/"){
                this.bid = this.$route.query.bid;
                this.getKeyAreaImageInfor(this.bid);
            }
        },
        keyareaLandValue (newVal,oldVal){
            this.keyareaLandValue = newVal;
        }
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
</style>