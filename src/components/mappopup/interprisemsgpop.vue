<template>
  <div id="popup-content">
      <h3 class="parkPopTitle">{{enterpriseProperties.names}}</h3>
      <div class="parkPopImg">
          <img v-if="enterpriseProperties.infimg" :src="`${baseUrl}${enterpriseProperties.infimg}`" alt=" ">
          <img v-else src="../../../static/images/zanwu.jpg" alt="">
      </div>
      <div class="parkPopContent">
          <ul class="enterpriseUl">
              <li>
                  <label>地址：</label><span>{{enterpriseProperties.address}}</span>
              </li>
              <li>
                  <label>网址：</label><a :href="`https://${enterpriseProperties.website}`" target="_blank">{{enterpriseProperties.website}}</a>
              </li>
              <li>
                  <label>联系人：</label><span>{{enterpriseProperties.sellcontact}}</span>
              </li>
              <li>
                  <label>联系电话：</label><span>{{enterpriseProperties.selltel}}</span>
              </li>
          </ul>
      </div>
      <div class="detailButton">
            <button @click="skipEnterpriseDetial">详情</button>
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
          enterpriseProperties: this.popupProperties
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
        skipEnterpriseDetial: function() {
            // this.$router.push({path: '/industrailparkdetail',query: {bid: this.parkProperties.bid}});
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'enterprisedetail',
                query:{
                    bid: _this.enterpriseProperties.bid
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {
        popupProperties(newVal,oldVal){
            this.enterpriseProperties = newVal;
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
    .parkPopImg{
        width: 90%;
        height: 160px;
        margin: 0 auto;
    }
    .parkPopImg img{
        width: 100%;
        height: 100%;
    }
    .enterpriseUl {
        width: 100%;
    }
    .enterpriseUl li {
        width: 100%;
        padding: 4px 0;
        text-align: left;
    }
    .enterpriseUl li label{
        font-weight: bold;
    }
</style>