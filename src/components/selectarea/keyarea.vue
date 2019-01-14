<template>
  <div>
    <div class="areaName" id="keyarea">
        <h3>片区类型</h3>
        <el-checkbox-group v-model="keyAreaGroup" @change="checkedKeyArea">
            <el-checkbox label="%0,%" border size="mini">市战略性新兴产业基地</el-checkbox>
            <el-checkbox label="%1,%" border size="mini">市重点建设区域</el-checkbox>
            <el-checkbox label="%2,%" border size="mini">国家高新园区</el-checkbox>
            <el-checkbox label="%3,%" border size="mini">国家自主创新示范区</el-checkbox>
        </el-checkbox-group>    
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          keyAreaGroup: []
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        let _this = this;
        this.$emit("listenToKeyAreaValue",this.keyAreaGroup);
        this.$root.Bus.$on('setLayout',function(val) {
            _this.$emit("listenToKeyAreaValue",_this.keyAreaGroup);
        })
    },

    methods: {
        checkedKeyArea: function() {
            this.$emit("listenToKeyAreaValue",this.keyAreaGroup);
        }
    },

    watch: {}

  }

</script>
<style lang=''>
    #keyarea {
        text-align: left;
    }
</style>