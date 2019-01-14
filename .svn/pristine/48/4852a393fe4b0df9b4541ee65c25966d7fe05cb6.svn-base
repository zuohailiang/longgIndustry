<template>
  <div>
    <div class="areaName">
        <h3>行政区划</h3>
        <template>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" border size="mini">全选</el-checkbox>
            <el-checkbox-group v-model="checkedArea" @change="handleCheckedAreaChange">
                <el-checkbox v-for="a in area" :label="a.jdcode" :key="a.id" border size="mini">{{a.name}}</el-checkbox>
            </el-checkbox-group>
        </template>
    </div>
    <div class="areaName">
        <h3>改造方式</h3>
        <template>
            <el-checkbox :indeterminate="isReform" v-model="reformCheckAll" @change="handleReformCheckAllChange" border size="mini">全选</el-checkbox>
                <el-checkbox-group v-model="checkedReform" @change="handleCheckedReformChange">
                <el-checkbox v-for="(reform,index) in reforms" :label="reform" :key="index" border size="mini">{{reform}}</el-checkbox>
            </el-checkbox-group>
        </template>
    </div>
  </div>
</template>

<script>

  const areaOptions = [{
                        id: 1,
                        name: '平湖',
                        jdcode: '440307001'
                    },{
                        id: 2,
                        name: '布吉',
                        jdcode: '440307002'
                    },{
                        id: 3,
                        name: '坂田',
                        jdcode: '440307003'
                    },{
                        id: 4,
                        name: '南湾',
                        jdcode: '440307004'
                    },{
                        id: 5,
                        name: '横岗',
                        jdcode: '440307005'
                    },{
                        id: 6,
                        name: '龙岗',
                        jdcode: '440307006'
                    },{
                        id: 7,
                        name: '龙城',
                        jdcode: '440307007'
                    },{
                        id: 8,
                        name: '坪地',
                        jdcode: '440307008'
                    }]
  const reformOptions = ["维持现状", "空地新建", "产业置换", "拆除重建", "综合整治", "逐步清退"];
  export default {
    name:'',
    props:[''],
    data () {
      return {
          checkAll: false,
          reformCheckAll: false,
          checkedArea: ["440307001","440307002","440307003","440307004","440307005","440307006","440307007","440307008"],
          checkedReform: ["维持现状", "空地新建", "产业置换", "拆除重建", "综合整治", "逐步清退"],
          area: areaOptions,
          reforms: reformOptions,
          isIndeterminate: true,
          isReform: true,
          selectCheckedForm: {}
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        let _this = this;
        this.selectCheckedForm.jdcode = this.checkedArea;
        this.selectCheckedForm.transformway = this.checkedReform;
        this.$emit("listenToIndusrtailPark",this.selectCheckedForm);
        this.$root.Bus.$on('setLayout',function(val){
            if(val === "industrial_park"){
                _this.$emit("listenToIndusrtailPark",_this.selectCheckedForm);
            }
        })
    },

    methods: {
        handleCheckAllChange(val) {
            this.checkedArea = [];
            // this.checkedArea = val ? areaOptions : [];
            this.isIndeterminate = false;
            if(val === true) {
                areaOptions.forEach(element => {
                    this.checkedArea.push(element.jdcode);
                })
            }
            this.selectCheckedForm.jdcode = this.checkedArea;
            this.$emit("listenToIndusrtailPark",this.selectCheckedForm);
        },
        handleCheckedAreaChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.area.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.area.length;
            this.checkedArea = value;
            this.selectCheckedForm.jdcode = this.checkedArea;
            this.$emit("listenToIndusrtailPark",this.selectCheckedForm);
        },
        handleReformCheckAllChange(val) {
            this.checkedReform = [];
            // this.checkedReform = val ? reformOptions : [];
            this.isReform = false;
            if(val === true) {
                reformOptions.forEach(element => {
                    this.checkedReform.push(element);
                })
            }
            this.selectCheckedForm.transformway = this.checkedReform;
            this.$emit("listenToIndusrtailPark",this.selectCheckedForm);
        },
        handleCheckedReformChange(value) {
            let checkedReformCount = value.length;
            this.reformCheckAll = checkedReformCount === this.reforms.length;
            this.isReform = checkedReformCount > 0 && checkedReformCount < this.reforms.length;
            this.checkedReform = value;
            this.selectCheckedForm.transformway = this.checkedReform;
            this.$emit("listenToIndusrtailPark",this.selectCheckedForm);
        }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
    
</style>