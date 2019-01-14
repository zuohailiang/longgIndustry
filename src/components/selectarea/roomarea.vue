<template>
  <!-- 产业用地和产业用房 -->
  <div>
    <div class="areaName" v-if="isGardArea">
        <h3>产业用房</h3>
        <el-checkbox-group v-model="industrailUseroom" @change="checkedroom">
            <el-checkbox label="1" border size="mini">创新产业园</el-checkbox>
            <el-checkbox label="2" border size="mini">其他园区</el-checkbox>
        </el-checkbox-group>
    </div>
    <div class="areaName" v-if="areaShow">
        <h3>区位</h3>
        <el-checkbox-group v-model="areaGroup" @change="checkedArea">
            <el-checkbox label="440307001" border size="mini">平湖</el-checkbox>
            <el-checkbox label="440307002" border size="mini">布吉</el-checkbox>
            <el-checkbox label="440307003" border size="mini">坂田</el-checkbox>
            <el-checkbox label="440307004" border size="mini">南湾</el-checkbox>
            <el-checkbox label="440307005" border size="mini">横岗</el-checkbox>
            <el-checkbox label="440307006" border size="mini">龙岗</el-checkbox>
            <el-checkbox label="440307007" border size="mini">龙城</el-checkbox>
            <el-checkbox label="440307008" border size="mini">坪地</el-checkbox>
        </el-checkbox-group>    
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['isGardArea'],
    data () {
      return {
        areaShow: true,
        industrailUseroom: ["1","2"],
        areaGroup: ["440307001","440307002","440307003","440307004","440307005","440307006","440307007","440307008"],
        gardAndArea: {}
      };
    },

    components: {},

    computed: {
    
    },

    created() {},

    mounted() {
        let _this = this;
        let num = this.industrailUseroom.map(Number);
        this.gardAndArea.pkcategory = num;
        this.gardAndArea.jdcode = this.areaGroup;
        _this.$emit("listenAreaValue",_this.gardAndArea);
        this.$root.Bus.$on('setLayout',function(val){
            _this.areaGroup = ["440307001","440307002","440307003","440307004","440307005","440307006","440307007","440307008"];
            // if(val === "industrial_land_1"){
            //     _this.$root.Bus.$emit('gardAreaChecked1',_this.gardAndArea);
            // }
            // if(val === "industrial_house_1") {
            //     _this.$root.Bus.$emit('gardAreaChecked2',_this.gardAndArea);
            // }
            // if(val === "industrial_land_2") {
            //     _this.$root.Bus.$emit('gardAreaChecked3',_this.gardAndArea);
            // }
            // if(val === "industrial_house_2") {
            //     _this.$root.Bus.$emit('gardAreaChecked4',_this.gardAndArea);
            // }
            _this.$emit("listenAreaValue",_this.gardAndArea);
        })
    },

    methods: {
        checkedroom: function() {
            let num = this.industrailUseroom.map(Number);
            this.gardAndArea.pkcategory = num;
            this.$emit("listenAreaValue",this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked1',this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked2',this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked3',this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked4',this.gardAndArea);
        },
        checkedArea: function() {
            this.gardAndArea.jdcode = this.areaGroup;
            this.$emit("listenAreaValue",this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked1',this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked2',this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked3',this.gardAndArea);
            // this.$root.Bus.$emit('gardAreaChecked4',this.gardAndArea);
        }
    },

    watch: {
        // gardAndArea(newVal,oldVal) {
        //     console.log(newVal);
        //     this.$emit("listenAreaValue",this.gardAndArea);
        // }
        // gardAndArea: {
        //     deep: true,
        //     handler: function(val) {
        //         if(!val){
        //             return; 
        //         }
        //         console.log(val);
        //         this.$emit("listenAreaValue",this.gardAndArea);
        //     }
        // }

    }

  }

</script>
<style lang=''>
    /* .el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner {
        display: block !important;
    } */
</style>