<template>
  <!-- 最近浏览过的项目 -->
  <div class="detailList">
      <h3>最近浏览过的项目</h3>
      <table border="0" cellspacing="0" cellpadding="0">
          <thead>
              <tr>
                  <th>名称</th>
                  <th>所在区域</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(ip,index) in closeSkipprogramdata" :key="index">
                  <td>> &nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" v-if="ip.landBid !== ''" :bid="ip.landBid" @click="skipToLandDetail">{{ip.names}}</a><a href="javascript:void(0);" v-if="ip.parkid !== ''" :bid="ip.parkid" @click="skipToHouseDetail">{{ip.names}}</a></td>
                  <td>{{ip.jdname}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['closeSkipprogramdata'],
    data () {
      return {
          currentPage3: 1
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        
    },

    methods: {
        skipToLandDetail(event) {
            let bid = event.target.getAttribute("bid");
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'landdetails',
                query:{
                    bid: bid
                }   
            })  
            window.open(newpage.href, '_blank');
        },
        skipToHouseDetail(event) {
            let bid = event.target.getAttribute("bid");
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
        
    }

  }

</script>
<style lang=''>
    @import url('../../styles/detaillist.css');
</style>