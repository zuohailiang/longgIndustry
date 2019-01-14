<template>
    <div id="popup-content">
        <div class="popupTitle">
            <div class="title1">
                <span>{{landProperties.names}}</span>
            </div>
            <div class="title2">
                <span class="title2Tip">[{{landProperties.parttype}}]</span><span class="title2Bg">{{landProperties.partstatus}}</span>
            </div>
        </div>
        <div class="popupImg">
            <img v-if="landProperties.introimg" :src="`${baseUrl}${landProperties.introimg}`" alt=" ">
            <img v-else src="../../../static/images/zanwu.jpg" alt="">
        </div>
        <div class="popupContent">
            <table border="0" id="houseTable">
                <tr>
                    <td>占地面积(m²)：</td>
                    <td>{{landProperties.floorarea}}</td>
                    <td>建筑面积(m²)：</td>
                    <td>{{landProperties.buildarea}}</td>
                </tr>
                <tr>
                    <td>配套宿舍(m²)：</td>
                    <td>{{landProperties.dormarea}}</td>
                    <td>租售面积(m²)：</td>
                    <td>{{landProperties.vacantarea}}</td>
                </tr>
                <tr>
                    <td>联系人：</td>
                    <td>{{landProperties.linkman}}</td>
                    <td>联系电话：</td>
                    <td class="phoneNum">{{landProperties.tel}}</td>
                </tr>
            </table>
        </div>
        <div class="detailButton">
            <button @click="skipHouseDetail">详情</button>
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
        skipHouseDetail: function() {
            // this.$router.push({path: '/useroomdetails',query: {bid: this.landProperties.bid}});
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'useroomdetails',
                query:{
                    bid: _this.landProperties.bid
                }   
            })  
            window.open(newpage.href, '_blank');
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
    #houseTable tr td:first-child {
        width: 100px;
    }
    #houseTable tr td:nth-child(3) {
        width: 100px;
    }
</style>