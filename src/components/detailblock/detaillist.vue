<template>
  <!-- 重点园区推介 -->
  <div class="detailList">
      <h3>重点园区推介</h3>
      <table border="0" cellspacing="0" cellpadding="0">
          <thead>
              <tr>
                  <th>园区名称</th>
                  <th>所在区域</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(ip,index) in importantparkDetail.list" :key="index">
                  <td>> &nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" :bid="ip.TsupPark.bid" @click="skipToHouseDetail">{{ip.TsupPark.names}}</a></td>
                  <td>{{ip.TsupPark.jdname}}</td>
              </tr>
          </tbody>
      </table>
      <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="6"
            layout="prev, pager, next"
            :total="importantparkDetail.total">
      </el-pagination>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['importantparkDetail'],
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
        handleCurrentChange(val) {
            this.$emit("listenToParkPage",val);
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