<template>
    <div id="popup-content">
        <div class="popupTitle">
            <div class="title1">
                <span>{{landProperties.names}}</span>
            </div>
            <div class="title2">
                <span class="title2Tip">[{{landProperties.landproperty}}]</span><span class="title2Bg">{{landProperties.landstatus}}</span>
            </div>
        </div>
        <div class="popupImg">
            <img v-if="landProperties.introimg" :src="`${baseUrl}${landProperties.introimg}`" alt=" ">
            <img v-else src="../../../static/images/zanwu.jpg" alt="">
        </div>
        <div class="popupContent">
            <table border="0">
                <tr>
                    <td>所属街道：</td>
                    <td>{{landProperties.jdname}}</td>
                    <td>地块面积(m²)：</td>
                    <td>{{landProperties.area}}</td>
                </tr>
                <tr>
                    <td>产业定位：</td>
                    <td colspan="3">{{landProperties.orientation}}</td>
                </tr>
                <tr>
                    <td rowspan="2">联系方式：</td>
                    <td>{{landProperties.unit}}</td>
                    <td>{{landProperties.contact}}</td>
                    <td class="phoneNum">{{landProperties.tel}}</td>
                </tr>
                <tr>
                    <td>{{landProperties.unit2}}</td>
                    <td>{{landProperties.contact2}}</td>
                    <td class="phoneNum">{{landProperties.tel2}}</td>
                </tr>
            </table>
        </div>
        <div class="detailButton">
            <button @click="skipLandDetail">详情</button>
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
          landProperties: this.popupProperties
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
        skipLandDetail: function() {
            // this.$router.push({path: '/landdetails',query: {bid: this.landProperties.bid}});
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'landdetails',
                query:{
                    bid: _this.landProperties.bid
                }   
            })  
            window.open(newpage.href,'_blank');
        }
    },

    watch: {
        popupProperties(newVal,oldVal){
            this.landProperties = newVal;
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/mappopup.css');
</style>