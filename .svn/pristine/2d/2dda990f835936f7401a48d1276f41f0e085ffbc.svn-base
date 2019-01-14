<template>
  <div class="rentSearch">
      <div class="searchBox" @click="skipRentSearch">
          <img src="../../../../static/images/useroomSearch.png" alt=""><span class="rentCharacters">租售搜索</span>
      </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {},

    methods: {
        skipRentSearch: function() {
            // this.$router.push({path: '/searchmap'});
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'searchmap',
                query:{
                    selectType: '可售产业用地',
                    inputValue: ''
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {}

  }

</script>
<style lang=''>
    .rentSearch {
        width: 200px;
        height: 68px;
        line-height: 68px;
        text-align: center;
        float: right; 
    }
    .searchBox {
        cursor: pointer;
    }
    .rentCharacters {
        color: #fff;
        font-size: 16px;
        margin-left: 6px;
    }
</style>