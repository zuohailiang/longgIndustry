<template>
  <!-- 土地详情里的租售信息表格 -->
  <div class="detailTable">
      <h3>租售信息</h3>
      <table border="0" cellspacing="0" cellpadding="0">
          <thead>
              <tr>
                  <th>楼栋名</th>
                  <th>租售类型</th>
                  <th>面积</th>
                  <th>最低价格(元/m²)</th>
                  <th>最高价格(元/m²)</th>
                  <th>联系人</th>
                  <th>联系电话</th>
                  <th>用途</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(rs,index) in rstableList.list" :key="index">
                  <td>{{rs.ViewBuilding.bname}}</td>
                  <td>{{rs.ViewBuilding.rental}}</td>
                  <td>{{rs.ViewBuilding.area}}</td>
                  <td>{{rs.ViewBuilding.pricel}}</td>
                  <td>{{rs.ViewBuilding.priceh}}</td>
                  <td>{{rs.ViewBuilding.contact}}</td>
                  <td>{{rs.ViewBuilding.tel}}</td>
                  <td>{{rs.ViewBuilding.use}}</td>
              </tr>
          </tbody>
      </table>
      <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="6"
            layout="prev, pager, next, jumper"
            :total="rstableList.total">
      </el-pagination>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['rstableList'],
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
            this.$emit("listenToRsPage",val);
        }
    },

    watch: {
        rstableList(newVal,oldVal) {
            this.rstableList = newVal;
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/detailtable.css');
</style>