<template>
    <div class="header">
        <div class="logo">
                
        </div>
        <div class="logoTitle">
            <img src="../../assets/images/title4.png">
        </div>
        <div class="search">
             <component :is="currentView"></component>   
        </div>
    </div>
</template>

<script>
  import Indexsearch from '@/components/header/searchView/indexsearch'
  import Searchdetail from '@/components/header/searchView/detailsearch'
  import MapSearchSelect from '@/components/header/searchView/mapsearchselect'
  export default {
    name:'',
    props:['searchCriteria'],
    data () {
      return {
          currentView: this.searchCriteria
      };
    },

    components: {
        Indexsearch,
        Searchdetail,
        MapSearchSelect
    },

    computed: {},

    created() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang=''>
    @import url('../../styles/header.css');
    .search{
        width: calc(100% - 476px);
        /* width: 400px; */
        height: 68px;
        /* background: #000; */
        text-align: right;
    }
</style>