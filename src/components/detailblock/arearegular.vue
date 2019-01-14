<template>
  <!-- 土地招拍挂信息下的图片缩略框 -->
  <div class="thumbnail">
      <h3>{{picTitle}}</h3>
      <div class="thumbnailImage">
          <el-carousel trigger="click" height="215">
            <el-carousel-item v-for="(p,index) in pictureDisplay" :key="index">
                <!-- <img src="http://172.17.6.123:8080/upload/plan/201606/15416622953372.png" alt=""> -->
                <!-- <img :src="`${baseUrl}${p.TsupPhoto.url}`" alt=""> -->
                <viewer v-if="p.TsupPhoto.url !== ''">
                    <img :src="`${baseUrl}${p.TsupPhoto.url}`" alt="">
                </viewer>
                <!-- <img v-if="p.TsupPhoto.url !== ''" :src="`${baseUrl}${p.TsupPhoto.url}`" alt=""> -->
                <!-- <img v-else src="http://172.17.6.123:8080/upload/plan/201606/15416622953372.png" alt="">  -->
                <viewer v-else>
                    <img src="../../../static/images/zanwu.jpg" alt="">
                </viewer> 
            </el-carousel-item>
          </el-carousel>
      </div>
  </div>
</template>

<script>
  import { base_url } from '@/api/api.js'
  export default {
    name:'',
    props:['picTitle','pictureDisplay'],
    data () {
      return {
          baseUrl: ''
      };
    },

    components: {},

    computed: {},

    created() {
        this.baseUrl = base_url;
    },

    mounted() {},

    methods: {},

    watch: {
        picTitle(newVal,oldVal) {
            this.picTitle = newVal;
        },
        pictureDisplay(newVal,oldVal) {
            this.pictureDisplay = newVal;
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/thumbnail.css');
    .thumbnailImage img{
        width: 100%;
        height: 100%;
    }
</style>