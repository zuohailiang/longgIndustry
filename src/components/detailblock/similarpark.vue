<template>
  <!-- 同类园区推介 -->
  <div class="thumbnail">
      <h3>同类园区推介</h3>
      <div class="thumbnailImage">
          <el-carousel trigger="click" height="215" indicator-position="none">
            <el-carousel-item v-for="(sp,index) in similarparkDetail" :key="index">
                <div class="similarParkBox" @click.capture.stop="skipHouseDetail">
                    <h4 :bid="sp.TsupPark.bid">{{sp.TsupPark.names}}</h4>
                    <div class="imgBox" :bid="sp.TsupPark.bid">
                        <img v-if="sp.TsupPark.introimg" :src="`${url}${sp.TsupPark.introimg}`" alt="">
                        <img v-else src="../../../static/images/zanwu.jpg" alt="">
                    </div>
                    <div class="similarParkIntro">
                        <p>
                            <label :bid="sp.TsupPark.bid">所属街道：</label>
                            <span :bid="sp.TsupPark.bid">{{sp.TsupPark.jdname}}</span>
                        </p>
                        <p>
                            <label :bid="sp.TsupPark.bid">空置面积：</label>
                            <span :bid="sp.TsupPark.bid">{{sp.TsupPark.vacantarea}}</span>
                        </p>
                    </div>
                </div>
            </el-carousel-item>
          </el-carousel>
      </div>
  </div>
</template>

<script>
  import { base_url } from '@/api/api.js'
  export default {
    name:'',
    props:['similarparkDetail'],
    data () {
      return {
          url: ''
      };
    },

    components: {},

    computed: {},

    created() {
        this.url = base_url;
    },

    mounted() {},

    methods: {
        skipHouseDetail: function(event) {
            let bid = event.target.getAttribute("bid");
            console.log(bid);
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'useroomdetails',
                query:{
                    bid: bid
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {
        similarparkDetail(newVal,oldVal){
            this.similarparkDetail = newVal;
            console.log(newVal);
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/thumbnail.css');
    .thumbnail h3{
        font-size: 16px;
    }
    .similarParkBox{
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .similarParkBox h4{
        padding: 10px 0;
        font-size: 16px;
        text-align: center;
    }
    .similarParkBox .imgBox {
        width: 100%;
        height: 155px;
    }
    .similarParkBox .imgBox img{
        width: 100%;
        height: 100%;
    }
    .similarParkIntro{
        width: 100%;
        display: flex;
        margin-top: 6px;
    }
    .similarParkIntro p{
        width: 50%;
        text-align: center;
    }
</style>