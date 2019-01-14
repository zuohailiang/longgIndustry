<template>
  <!-- 片区详情里的产业用地表格 -->
  <div class="detailTable keyAreaTable">
      <h3>产业用地</h3>
      <table border="0" cellspacing="0" cellpadding="0">
          <thead>
              <tr>
                  <th>序号</th>
                  <th>地名</th>
                  <th>所有权属</th>
                  <th>所属单位</th>
                  <th>联系人</th>
                  <th>电话</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(ka,index) in keyAreaInLandVal.list" :key="index">
                  <td>{{index+1}}</td>
                  <td :bid="ka.TsupLand.bid" @dblclick="skipToLandDetail">{{ka.TsupLand.names}}</td>
                  <td :bid="ka.TsupLand.bid" @dblclick="skipToLandDetail">{{ka.TsupLand.ownership}}</td>
                  <td :bid="ka.TsupLand.bid" @dblclick="skipToLandDetail">{{ka.TsupLand.unit}}</td>
                  <td :bid="ka.TsupLand.bid" @dblclick="skipToLandDetail">{{ka.TsupLand.contact}}</td>
                  <td :bid="ka.TsupLand.bid" @dblclick="skipToLandDetail">{{ka.TsupLand.tel}}</td>
              </tr>
          </tbody>
      </table>
      <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="6"
            layout="prev, pager, next, jumper"
            :total="keyAreaInLandVal.total">
      </el-pagination>
  </div>
</template>

<script>
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          currentPage3: 1,
          pid: '',
          page: 1,
          keyAreaInLandVal: '' //产业用地数据
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        this.pid = this.$route.query.bid;
        this.keyAreaIndustrailLandTable(this.pid,this.page);
    },

    methods: {
        handleCurrentChange(val) {
            this.keyAreaIndustrailLandTable(this.pid,val);
        },
        keyAreaIndustrailLandTable(bid,page) {   //产业用地表格数据
            publicRequirest.getKeyAreaIndustrailLand(bid,page).then(res => {
                this.keyAreaInLandVal = res.data;
            })
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
            window.open(newpage.href,'_blank');
        }
    },

    watch: {
        '$route' (to, from) {
            if(from.path === "/"){
                this.pid = this.$route.query.bid;
                this.keyAreaIndustrailLandTable(this.pid,this.page);
            }
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/detailtable.css');
    .keyAreaTable table td{
        padding: 10px 2px !important;
    }
</style>