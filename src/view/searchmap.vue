<template>
  <!-- 地图搜索 -->
  <div class="searchMap">
      <el-container>
        <el-header>
            <v-header :search-criteria='searchCriteria'></v-header>
        </el-header>
        <el-container>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-container>
    </el-container>
  </div>
</template>

<script>
  import vHeader from '@/components/header/header'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          searchCriteria: "MapSearchSelect"
      };
    },

    components: {
        vHeader
    },

    computed: {},

    created() {
        document.title = this.$route.meta.title;
    },

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang=''>
    html,body{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .searchMap{
        width: 100%;
        height: 100%;
    }
    .el-container{
        height: 100%;
    }
</style>