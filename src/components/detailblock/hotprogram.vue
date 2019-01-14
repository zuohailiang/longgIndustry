<template>
  <!-- 热门项目 -->
  <div class="detailList">
      <h3>热门项目</h3>
      <table border="0" cellspacing="0" cellpadding="0">
          <thead>
              <tr>
                  <th>名称</th>
                  <th>所在区域</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(ip,index) in hotProgramdata.list" :key="index">
                  <td>> &nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" v-if="hotProgramdata.landid === true" :bid="ip.hotData.bid" @click="skipToLandDetail">{{ip.hotData.names}}</a><a href="javascript:void(0);" v-else :bid="ip.hotData.bid" @click="skipToHouseDetail">{{ip.hotData.names}}</a></td>
                  <td>{{ip.hotData.jdname}}</td>
              </tr>
          </tbody>
      </table>
      <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="6"
            layout="prev, pager, next"
            :total="hotProgramdata.total">
      </el-pagination>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['hotProgramdata'],
    data () {
      return {
          currentPage3: 1
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        this.$root.Bus.$on("listenListSelectCon",(val)=> {
            this.currentPage3 = 1;
        })
    },

    methods: {
        handleCurrentChange(val) {
            this.$emit("listenHotPage",val);
        },
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
        importantparkDetail(newVal,oldVal) {
            
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/detaillist.css');
</style>