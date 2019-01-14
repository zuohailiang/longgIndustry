<template>
  <div id="popup-content">
      <h3 class="parkPopTitle">{{parkProperties.names}}</h3>
      <div class="parkPopImages">
          <img v-if="parkProperties.img" :src="`${baseUrl}${parkProperties.img}`" alt=" ">
          <img v-else src="../../../static/images/zanwu.jpg" alt="">
      </div>
      <div class="parkPopContent">
          <p>{{parkProperties.indbrief}}</p>
      </div>
      <div class="detailButton">
            <button @click="skipIndustrailDetail">详情</button>
      </div>
  </div>
</template>

<script>
  import { base_url } from '@/api/api.js'
  export default {
    name:'',
    props:['popupProperties'],
    data () {
      return {
          baseUrl: '',
          parkProperties: this.popupProperties
      };
    },

    components: {},

    computed: {},

    created() {
        this.baseUrl = base_url;
    },

    mounted() {
        
    },

    methods: {
        skipIndustrailDetail: function() {
            // this.$router.push({path: '/industrailparkdetail',query: {bid: this.parkProperties.bid}});
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'industrailparkdetail',
                query:{
                    bid: _this.parkProperties.bid
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {
        popupProperties(newVal,oldVal){
            console.log(this.parkProperties);
            this.parkProperties = newVal;
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/mappopup.css');
    #industrailParkPop{
        width: 100%;
        height: 100%;
    }
    .parkPopTitle {
        padding: 6px 0;
        text-align: center;
        font-size: 16px;
    }
    /* .parkPopImg{
        width: 100%;
        height: 180px;
    } */
    .parkPopImages img{
        width: 94%;
        height: 200px;
        margin: 0 auto;
    }
    .parkPopContent p {
        text-indent: 2em;
        text-align: justify;
        font-size: 16px;
        line-height: 1.2;
    }
</style>