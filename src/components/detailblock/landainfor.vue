<template>
  <!-- 土地招拍挂信息 -->
  <div class="landainfor">
      <h3>土地招拍挂信息</h3>
      <table border="0" >
          <thead>
              <tr>
                <th>宗地号</th>
                <th>用途</th>
                <th>交易时间</th>
                <th>地址</th>
                <th>状态</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for='tdata in landAinforValue.list' :key="tdata.zdcode">
                  <td><a :href="tdata.TsupZpg.linkurl">{{tdata.TsupZpg.zdcode}}</a></td>
                  <td>{{tdata.TsupZpg.use}}</td>
                  <td>{{tdata.TsupZpg.transdate}}</td>
                  <td>{{tdata.TsupZpg.address}}</td>
                  <td>{{tdata.TsupZpg.curstatus}}</td>
              </tr>
          </tbody>
      </table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="8"
        :total="landAinforValue.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
  </div>
</template>

<script>
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:['landainforDetail'],
    data () {
      return {
          page: 1,   //土地招拍挂信息分页
          landAinforValue: ''  //获取土地招拍挂信息的值
      }
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        this.getLandaInformation(this.page);
    },

    methods: {
        handleCurrentChange(val) {
            // this.$emit("listenPage",val);
            this.page = val;
            this.getLandaInformation(this.page);
        },
        getLandaInformation: function(page) {
            //获取土地招拍挂信息
            publicRequirest.getLandaInfor(page).then(res =>{
                this.landAinforValue = res.data;
                console.log(this.landAinforValue);
            })
        }
    },

    watch: {

    }

  }

</script>
<style lang=''>
    .landainfor {
        width: 328px;
        height: 100%;
        border: 1px solid #A3A5A7;
    }
    .landainfor h3 {
        width: 100%;
        height: 25px;
        text-indent: 5px;
        color: #000;
        background-color: #99cc33;
        line-height: 25px;
    }
    .landainfor table {
        width: 100%;
    }
    .landainfor table th,td {
        font-size: 12px;
        text-align: center;
        padding: 4px 0;
        line-height: 18px;
    }
    .landainfor table th {
        background: #5C5B5B;
        color: #fff;
    }
    .landainfor table td {
        border-bottom: 1px dashed #000;
    }
    .landainfor table td:nth-child(2) {
        width: 69px;
    }
    .landainfor table td:last-child{
        color: blue;
    }
    .el-pagination{
        text-align: center;
    }
</style>