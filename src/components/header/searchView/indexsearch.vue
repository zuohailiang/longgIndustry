<template>
  <div class="indexSearch">
    <el-input placeholder="站内搜索(关键字搜索)" v-model="inputSearch_1" class="input-with-select">
        <el-select v-model="selectSearch_1" slot="prepend" placeholder="请选择">
            <el-option label="产业用地" value="1"></el-option>
            <el-option label="产业园区" value="2"></el-option>
            <el-option label="企业" value="3"></el-option>
            <el-option label="工业区" value="4"></el-option>
        </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchByField"></el-button>
    </el-input>
    <el-input placeholder="租售搜索(关键字搜索)" v-model="inputSearch_2" class="input-with-select">
        <el-select v-model="selectSearch_2" slot="prepend" placeholder="请选择">
            <el-option label="可售产业用地" value="可售产业用地"></el-option>
            <el-option label="可租产业用房" value="可租产业用房"></el-option>
            <el-option label="可售产业用房" value="可售产业用房"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="skipSearchSentSale"></el-button>
    </el-input>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          inputSearch_1: '',
          inputSearch_2: '',
          selectSearch_1: '',
          selectSearch_2: '可售产业用地',
          sVal: {
              sName: '',
              iptName: ''
          },
          ssVal: {
              sName: '可售产业用地',
              iptName: ''
          }
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {},

    methods: {
        searchByField: function() {
            this.$root.Bus.$emit('searchCoditionFirst',this.sVal);
        },
        skipSearchSentSale: function() {
            // this.$root.Bus.$emit('searchCoditionSeconed',this.ssVal);
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'searchmap',
                query:{
                    selectType: this.ssVal.sName,
                    inputValue: this.ssVal.iptName
                }   
            })  
            window.open(newpage.href, '_blank');
            // this.$router.push({name: 'searchmap',params: {selectType: this.ssVal.sName}})
        }
    },

    watch: {
        selectSearch_1(newVal,oldVal) {
            this.sVal.sName = newVal;
        },
        inputSearch_1(newVal,oldVal) {
            this.sVal.iptName = newVal
        },
        selectSearch_2(newVal,oldVal) {
            this.ssVal.sName = newVal;
        },
        inputSearch_2(newVal,oldVal) {
            this.ssVal.iptName = newVal
        },
    }

  }

</script>
<style lang=''>
    .indexSearch{
        height: 68px;
        line-height: 68px;
    }
    .indexSearch  .el-select .el-input {
        width: 130px;
    }
    .indexSearch .el-input-group {
        width: 360px;
    }
    .indexSearch .el-input-group__prepend{
        padding: 0 12px;
    }
    .indexSearch .el-input__inner {
        height: 32px;
        line-height: 32px;
    }
    .indexSearch .el-input__icon {
        line-height: 32px;
    }
    .el-select-dropdown__list {
        padding-bottom: 14px;
    }
    .indexSearch .el-input-group__append {
        background: #2EAEE3;
        color: #000;
    }
</style>