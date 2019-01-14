<template>
    <div id="popup-content">
        <h3 class="keyTitle">{{popupProperties.names}}</h3>
        <div class="keyType">
            <label>片区类型：</label><span>重点片区</span>
        </div>
        <div class="popupImg">
            <img v-if="popupProperties.introimg" :src="`${baseUrl}${popupProperties.introimg}`" alt=" ">
            <img v-else src="../../../static/images/zanwu.jpg" alt="">
        </div>
        <p class="keyContent" v-if="popupProperties.inf && popupProperties.inf !==''">{{popupProperties.inf | delHtmlTag}}</p>
        <div class="detailButton">
            <button @click="skipKeyAreaDetail">详情</button>
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
      }
    },

    components: {},

    computed: {},

    created() {
        this.baseUrl = base_url;
    },

    mounted() {
        
    },

    methods: {
        skipKeyAreaDetail: function() {
            // this.$router.push({path: '/keyareadetails',query: {bid: this.popupProperties.bid}});
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'keyareadetails',
                query:{
                    bid: _this.popupProperties.bid
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {
        popupProperties(newVal,oldVal){
            this.popupProperties = newVal;
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/mappopup.css');
    .keyTitle,.keyType{
        padding: 8px 0;
        text-align: left;
    }
    .keyTitle {
        font-size: 16px;
        font-weight: bold;
    }
    .keyType label{
        font-weight: bold;
    }
    .keyContent {
        text-indent: 2em;
        font-size: 14px;
        line-height: 1.4;
        text-align: justify;
    }
</style>