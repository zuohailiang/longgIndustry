<template>
  <div class="barmapContainer">
    <el-aside>
        <el-scrollbar style="height: 100%">
            <el-menu default-active="" :default-openeds="opens" class="el-menu-vertical-demo" @select="handleSelect">
                <el-submenu index="11">
                    <template slot="title">
                        <!-- <i class="iconFont icon-planning"></i> -->
                        <span slot="title">规划信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1">战略规划</el-menu-item>
                        <el-menu-item index="2">产业规划</el-menu-item>
                        <el-menu-item index="layout">产业布局</el-menu-item>
                        <el-menu-item index="3">产业导向</el-menu-item>
                        <el-menu-item index="4">街道产业规划</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <!-- <i class="iconFont icon-load-bearing"></i> -->
                        <span slot="title">载体信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-submenu index="2-1" class="twostageTitle">
                            <template slot="title">
                                <span slot="title">重点片区</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="key_area">重点片区</el-menu-item>
                                <el-menu-item index="industrial_land_1">产业用地</el-menu-item>
                                <el-menu-item index="industrial_house_1">产业用房</el-menu-item>
                            </el-menu-item-group>       
                        </el-submenu>
                        <el-submenu index="2-2" class="twostageTitle" style="background: #fff !important">
                            <template slot="title">
                                <span slot="title">其他片区</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="industrial_land_2">产业用地</el-menu-item>
                                <el-menu-item index="industrial_house_2">产业用房</el-menu-item>
                            </el-menu-item-group>       
                        </el-submenu>
                        <el-menu-item index="innovative_industrial_park">创新产业园</el-menu-item>
                        <el-menu-item index="guest_park">创客园区</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="industrial_park" class="titleMessage">
                    <!-- <i class="iconFont icon-industry"></i> -->
                    <span slot="title">工业区信息</span>
                </el-menu-item>
                <el-menu-item index="enterprise_msg" class="titleMessage">
                    <!-- <i class="iconFont icon-enterprise"></i> -->
                    <span slot="title">企业信息</span>
                </el-menu-item>
                <el-submenu index="555">
                    <template slot="title">
                        <!-- <i class="iconFont icon-policy"></i> -->
                        <span slot="title">政策信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1">招商引资</el-menu-item>
                        <el-menu-item index="5-2">招才引智</el-menu-item>
                        <el-menu-item index="5-3">产业扶持</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- <el-menu-item index="6" class="titleMessage">
                    <span slot="title">统计分析</span>
                </el-menu-item> -->
		    </el-menu>
        </el-scrollbar>
    </el-aside>

    <el-main>
        <v-map :barmap-path="keyPathValue"></v-map>
    </el-main>
  </div>
</template>

<script>
  import vMap from '@/components/map/map'
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          opens: ['11','2','555'],
          keyPathValue: ''
      };
    },

    components: {
        vMap
    },

    computed: {},

    created() {},

    mounted() {
        this.$root.Bus.$on('searchCoditionFirst',(val)=> {
            this.keyPathValue = '';
        })
    },

    methods: {
        handleSelect(key,keyPath) {
            if(this.keyPathValue === key) {
                return false;
            }
            this.$emit("listenToSelect",key);
            this.keyPathValue = key;

            window.openlayerMap.changeLayerVisible("规划",false);
            if(key !== "key_area") {
                window.openlayerMap.changeLayerVector('');
            }

            //规划信息产业布局
            if(key === "layout"){
                window.openlayerMap.changeLayerVisible("规划",true);
            }
        }
    },

    watch: {}

  }

</script>
<style lang=''>
    /* @import url('../../../static/fonts/style.css');  */
    .barmapContainer{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .el-aside {
        width: 15% !important;
        /* background-color: burlywood; */
        color: #333;
        text-align: center;
        height: 100%;
        overflow: hidden;
    }
    .el-main {
        width: 85%;
        /* background-color: #e9eef3; */
        color: #333;
        text-align: center;
        padding: 0 !important;
        /* line-height: 160px; */
    }

    /* body > .el-container {
        margin-bottom: 40px;
    } */

    .navmenu {
        width: 100%;
        border: 1px solid #000;
        margin: 10px auto;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 100%;
        height: 100%;
        /* min-height: 400px; */
    }

    .el-menu li {
        text-align: left;
        /* text-indent: 20px; */
    }
    .barmapContainer .el-menu-item-group__title {
        padding: 0 !important;
    }
    .el-submenu.is-active .el-submenu__title{
        border-bottom: 1px solid #000;
    }
    .el-submenu__title {
        font-size: 16px;
        /* text-indent: 20px; */
        background: #99CC33;
        color: #000;
        font-weight: bold;
        border-bottom: 1px solid #000;
    }
    .el-submenu__title span{
        margin-left: 20px;
    }
    .titleMessage{
        background: #99CC33;
        color: #000;
        font-weight: bold;
        border-bottom: 1px solid #000;
        text-indent: 20px;
    }
    .twostageTitle .el-submenu__title {
        background: #003366;
        border-bottom: 1px solid #fff !important;
    }
    .twostageTitle span{
        color: #fff;
        font-weight: normal !important;
    }
    .titleMessage:last-child{
        border-bottom: none;
    }
    .el-menu-item {
        font-size: 16px;
    }
    .el-submenu .el-menu-item{
        background: #003366;
        color: #fff;
        border-bottom: 1px solid #fff;
        text-indent: 20px;
    }
    .el-menu-item.is-active {
        color: #409EFF !important;
    }
    /* .el-submenu__title i {
        color: #909399;
        vertical-align: middle;
        margin-left: 5px;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
    } */
    /* .el-menu-item-group ul li {
        text-indent: 15px;
    } */
    .el-menu-item-group ul li span{
        margin-left: 20px;
    }
    
    .barmapContainer .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }
    .barmapContainer .is-horizontal {
        display: none;
    }
</style>