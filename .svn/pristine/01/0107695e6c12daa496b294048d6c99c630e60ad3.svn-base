<template>
  <div calss="selectArea">
    <div class="conditionbar" :class="isArrow ? hide : open" style="top:240px;">
      <div class="bar_btn" @click="showAndHide">
          <i class="el-icon-caret-left" v-if="isArrow"></i>
          <i class="el-icon-caret-right" v-else></i>
      </div>
      <div id="conditon_content" class="content">
          <v-keyarea v-if="keyAreaShow" @listenToKeyAreaValue="getKeyAreaValue"></v-keyarea>
          <v-roomarea v-if="selectShow" :isGardArea='houseGarden' @listenAreaValue="getAreaValue"></v-roomarea>
          <v-adsreform v-if="industrailSelect" @listenToIndusrtailPark="getIndusrtailParkValue"></v-adsreform>
      </div>
    </div>
  </div>
</template>

<script>
  import vRoomarea from './roomarea'
  import vAdsreform from './adsreform'
  import vKeyarea from './keyarea'
  export default {
    name:'',
    props:['keyAreaShow','selectShow','houseGarden','industrailSelect'],
    data () {
      return {
          isArrow: true,
          //isRoomArea: this.selectShow,
          //gardArea: this.houseGarden,
          hide: 'hide',
          open: 'open',
          value: ''
      };
    },

    components: {
        vRoomarea,
        vAdsreform,
        vKeyarea
    },

    computed: {
        
    },

    created() {},

    mounted() {},

    methods: {
        showAndHide() {
            this.isArrow = !this.isArrow;
        },
        getKeyAreaValue(data) {
            this.$emit("listenKeySelectValue",data);
        },
        getAreaValue(data) {
            //console.log(data);
            this.value = data;
            this.$emit("listenSelectValue",data);
        },
        getIndusrtailParkValue(data){
            this.$emit('listenSelectParkValue',data);
        }
    },

    watch: {
        
    }

  }

</script>
<style lang=''>
    /* .show{
        display: block;
    } */
    .open{
        right: 0;
        transition: .5s;
    }
    .hide{
        right: -183px;
        transition: .5s;
    }
    .conditionbar{
        width: 160px;
        padding: 10px;
        /* height: 300px; */
        /* border: 1px solid black; */
        border: 1px solid #4491df;
        /* background-color: #edeceb; */
        background: #fff;
        position: absolute;
        /* top: 200px; */
        /* right: 0px; */
        z-index: 10;
        /* -webkit-box-shadow: #666 -2px 1px 3px;
        -moz-box-shadow: #666 -2px 1px 3px; */
        box-shadow: #4491df -2px 1px 3px;
    }
    .bar_btn{
        position: absolute;
        left: -17px;
        top: 50%;
        border: 1px solid #4491df;
        border-right: 0px;
        width: 16px;
        height: 80px;
        line-height: 80px;
        margin-top: -40px;
        /* background-color: #edeceb; */
        background: #fff;
        /* -webkit-box-shadow: #666 -2px 1px 3px;
        -moz-box-shadow: #666 -2px 1px 3px; */
        box-shadow: #4491df -2px 1px 3px;
        background-repeat: no-repeat;
        background-position: 2px 34px;
        cursor: pointer;
    }
    .content{
        /* position: absolute;
        left: 0px;
        top: 0px; */
        width: 160px;
        /* height: 280px; */
        /* background-color: #edeceb; */
        background: #fff;
        padding: 10px 0;
    }
    .areaName{
        /* padding: 0; */
        text-align: center;
        margin-bottom: 10px;
    }
    .areaName h3{
        width: 100%;
        padding: 5px 0;
        font-size: 18px;
        color: #ff9900;
    }
    .el-checkbox.is-bordered+.el-checkbox.is-bordered{
        margin-left: 4px;
    }
    .el-checkbox.is-bordered.el-checkbox--mini{
        margin-top: 4px;
        margin-left: 4px;
    }
</style>
