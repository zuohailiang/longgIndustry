<template>
  <div class="mapParkTypeButton">
      <el-radio-group v-model="layerSelect" size="mini" @change="checkedLayer">
        <el-radio-button label="地图"></el-radio-button>
        <el-radio-button label="卫星"></el-radio-button>
      </el-radio-group>
  </div>
</template>

<script>
  export default {
    name:'',
    props:[''],
    data () {
      return {
          layerSelect: '地图'
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {},

    methods: {
        checkedLayer: function(val) {
            this.$emit("listenToParkMapLayer",val);
        }
    },

    watch: {}

  }

</script>
<style lang=''>
    .mapParkTypeButton{
        position: absolute;
        top: 32px;
        right: 30px;
        z-index: 9999;
    }
</style>