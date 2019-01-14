<template>
    <!-- 工业区详情 -->
   <div class="industrailDetailsContainer">
    <el-container>
        <el-header>
            <v-parkheader></v-parkheader>
        </el-header>
        <el-container>
            <div class="inDetailContainer">
                <el-scrollbar style="height: 100%">
                    <div class="inDetail">
                        <div class="inMsgDisplay">
                            <h3>基本信息</h3>
                            <div class="infoBox">
                                <div class="baseinfo1">
                                    <div class="inforTitle">
                                        <label class="bh">{{developerBaseData.xh}}</label>&nbsp;&nbsp;<label class="name">{{developerBaseData.names}}</label>&nbsp;&nbsp;<label class="name">【{{developerBaseData.transformway}}】</label>
                                    </div>
                                    <ul class="inforContent">
                                        <li>
                                            <label>总用地规模（ha）：</label>
                                            <span class="inforNum">{{developerBaseData.totallands}}</span>
                                        </li>
                                        <li>
                                            <label>产业类型：</label>
                                            <span>{{developerBaseData.industrytype}}</span>
                                        </li>
                                        <li>
                                            <label>产业配套：</label>
                                            <span>{{developerBaseData.industry_perimeter}}</span>
                                        </li>
                                        <li>
                                            <label>开发强度：</label>
                                            <span class="inforNum">{{developerBaseData.developerBaseData}}</span>
                                        </li>
                                        <li>
                                            <label>合法权属用地面积（ha）：</label>
                                            <span class="inforNum">{{developerBaseData.legal_lands_area}}</span>
                                        </li>
                                        <li>
                                            <label>合法权属用地比例（%）：</label>
                                            <span class="inforNum">{{developerBaseData.legal_lands_scale}}</span>
                                        </li>
                                        <li>
                                            <label>建筑年限：</label>
                                            <span class="inforNum">{{developerBaseData.buliding_years}}</span>
                                        </li>
                                        <li>
                                            <label>法定图则规划情况：</label>
                                            <span>{{developerBaseData.planning_info}}</span>
                                        </li>
                                        <li>
                                            <label>改造意愿：</label>
                                            <span>{{developerBaseData.transformwish}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="pictureinfo">
                                    <el-carousel trigger="click" height="190" indicator-position="none">
                                        <el-carousel-item v-for="(p,index) in areaMsgPic" :key="index">
                                            <viewer v-if="p.TsupPhoto.url !== ''">
                                                <img :src="`${url}${p.TsupPhoto.url}`" alt="">
                                            </viewer>
                                            <img v-else src="../../static/images/zanwu.jpg" alt=""> 
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>
                            </div>
                            <div class="enterpriseTable">
                                <label>入驻企业：</label>
                                <div class="enterpriseTableContainer">
                                    <table border="0" callspacing="0" cellspacing="0">
                                        <tr>
                                            <th>序号</th>
                                            <th>企业名</th>
                                            <th>企业性质</th>
                                            <th>行业类型</th>
                                        </tr>
                                        <tr v-for="(s,index) in setlledData.list" :key="index">
                                            <td>{{index+1}}</td>
                                            <td>{{s.ViewSettledEnt.names}}</td>
                                            <td>{{s.ViewSettledEnt.nature}}</td>
                                            <td>{{s.ViewSettledEnt.industrytype}}</td>
                                        </tr>
                                    </table>
                                    <el-pagination
                                        layout="prev, pager, next"
                                        :page-size="6"
                                        :total="setlledData.total"
                                         @current-change="setlledPageChange">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="picAndTable">
                                <h3>卫星影像图</h3>
                                <div class="mapMarkContainer satelliteImage">
                                    <div id="parkMap">

                                    </div>
                                    <v-parkmapbutton @listenToParkMapLayer="getMapButtonValue"></v-parkmapbutton> 
                                </div>
                            </div>
                            <div class="picAndTable">
                                <h3>规划研究情况</h3>
                                <table border="0" class="planningTable">
                                    <tr>
                                        <td>
                                            <label>重点片区情况：</label>
                                            <span>{{developerBaseData.impiece_info}}</span>
                                        </td>
                                        <td>
                                            <label>产业用地控制线情况：</label>
                                            <span>{{developerBaseData.industrial_land_info}}</span>
                                        </td>
                                        <td>
                                            <label>产城融合要求：</label>
                                            <span>{{developerBaseData.indcity_fuse_require}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>龙岗综合发展规划要求：</label>
                                            <span>{{developerBaseData.synthesize_del_require}}</span>
                                        </td>
                                        <td>
                                            <label>用地规划要求：</label>
                                            <span>{{developerBaseData.landplan_require}}</span>
                                        </td>
                                        <td>
                                            <label>创新驱动发展计划情况：</label>
                                            <span>{{developerBaseData.innovate_info}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>周边公共配套设施情况：</label>
                                            <span>{{developerBaseData.round_support}}</span>
                                        </td>
                                        <td>
                                            <label>龙岗产业规划要求：</label>
                                            <span>{{developerBaseData.industrial_plan_require}}</span>
                                        </td>
                                        <td>
                                            <label>其他规划或研究情况：</label>
                                            <span>{{developerBaseData.other_info}}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="picAndTable">
                                <h3>权属</h3>
                                <div class="mapMarkContainer echartsCon">
                                    <v-ownerchart :echart-data="ownershipData"></v-ownerchart>
                                </div>
                            </div>
                            <div class="picAndTable">
                                <h3>法定图则</h3>
                                <div class="mapMarkContainer echartsCon">
                                    <!-- <v-chart :echart-data="statutoryPlanData"></v-chart> -->
                                    <v-planchart :planechart-data="statutoryPlanData"></v-planchart> 
                                </div>
                            </div>
                            <div class="picAndTable">
                                <h3>综合评判</h3>
                                <div class="mapMarkContainer comEvaluation">
                                    <p>项目在权属、规划情况、现状情况等方面均满足增加生产经营性建筑面积类综合整治申报条件。</p>
                                </div>
                            </div>
                            <div class="picAndTable">
                                <h3>问题咨询</h3>
                                <div class="mapMarkContainer">
                                    <h3 class="problem_menu">1、咨询问题</h3>
                                    <div class="commitinfos">
                                        <textarea id="questions" rows="3" cols="5" ref="textarea" placeholder="请在这里输入您要咨询的问题" class="committext"></textarea>
                                        <div class="commitdiv">
                                            <div id="commitBtn" @click="commitQuestion" class="right_float"></div>
                                        </div>
                                    </div>
                                    <h3 class="problem_menu">2、问题解答</h3>
                                    <div id="searchproblem" class="searchproblem">
                                        <input id="searchInfo" type="text" value="" ref="ipt" placeholder="请在这里输入你要搜索的问题">
                                        <div id="searchBtn" @click="searchAnswer"></div>
                                    </div>
                                    <ul id="problemlist">
                                        <li v-for="(p,index) in questionAnswer.list" :key="index">
                                            <p>{{index+1}}、{{p.Problem.question}}</p>
                                            <p v-if="p.Problem.answer">{{p.Problem.answer}}</p>
                                            <p v-else>该问题暂未答复</p>
                                        </li>
                                    </ul>
                                    <el-pagination
                                        @current-change="answerPageChange"
                                        :page-size="5"
                                        layout="prev, pager, next, jumper"
                                        :total="this.questionAnswer.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </el-container>
    </el-container>
    <div class="developer">
        <h3>开发商</h3>
        <ul class="developerUl">
            <li v-for="(d,index) in developerData.list" :key="index">
                <el-popover
                    placement="right"
                    width="230"
                    trigger="hover">
                    <div class="popupContent">
                        <p>
                            <label>企业名称：</label><span class="wordColor">{{d.TsupOperator.bname}}</span>
                        </p>
                        <p>
                            <label>简介及成功案例：</label><span class="wordColor">{{d.TsupOperator.bintro}}</span>
                        </p>
                        <p>
                            <label>联系人：</label><span class="wordColor">{{d.TsupOperator.bper}}</span>
                        </p>
                        <p>
                            <label>联系电话：</label><span class="wordColor">{{d.TsupOperator.bnum}}</span>
                        </p>
                    </div>
                    <div class="developerLi" slot="reference">{{d.TsupOperator.bname}}</div>
                </el-popover>
            </li>
        </ul>
        <el-pagination
            layout="prev, pager, next"
            :total="developerData.total"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
  </div>
</template>

<script>
  import vParkheader from '@/components/header/industrailheader'
  import vOwnerchart from '@/components/detailblock/ownerecharts'
  import vPlanchart from '@/components/detailblock/planecharts'
  import vParkmapbutton from '@/components/selectarea/mapparklayertype'  //地图卫星切换按钮
  import { initParkMap } from '@/utils/publicMap.js'
  import { base_url,publicRequirest } from '@/api/api.js'
  import { styleFunction, InpointsetlledStyles } from '@/ol/zondy/openLayer_theme_ol3.js'
  import { LoadMap } from '@/ol/zondy/openlayer_map_ol3_sz.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          url: '',
          bid: '', //点数据的bid
          page: 1,  //开发商页码
          setlledPage: 1,  //入驻企业表格页码
          ansPage: 1,  //问题咨询页码
          isAnswer: true,
          developerData: '',  //开发商数据
          developerBaseData: '',  //基本数据
          areaMsgPic: '',
          setlledData: '',  //入驻企业数据
          satelliteImageLayer: '',  //卫星影像图矢量图层
          satelliteData: '',  //微信影像图数据
          ownershipData: '',  //权属echart数据
          statutoryPlanData: '',  //法定图则echart数据
          questionAnswer: ''  //问题解答
      };
    },

    components: {
        vParkheader,
        vOwnerchart,
        vPlanchart,
        vParkmapbutton
    },

    computed: {},

    created() {
        document.title = this.$route.meta.title;
        this.url = base_url;
    },

    mounted() {
        initParkMap("parkMap");  //初始化地图

        this.satelliteImageLayer = window.openlayerParkMap.addVectorLayer('卫星影像',styleFunction,12,true);   //卫星影像图矢量图层
        window.openlayerParkMap.initSelect("pointermove",[this.satelliteImageLayer],InpointsetlledStyles,"");

        this.bid = this.$route.query.bid;
        this.getDeveloperMsg(this.page);
        this.getDeveloperBaseMsg(this.bid);
        this.getAreaMsgPic(this.bid);

        // window.openlayerParkMap.drawGraphics('point',this.satelliteImageLayer,this.satelliteData);
    },

    methods: {
        handleCurrentChange(val) {
            this.page = val;
        },
        setlledPageChange(val) {
            this.setlledPage = val;
        },
        getDeveloperMsg: function(page) {  //开发商数据
            publicRequirest.getDeveloperInfor(page).then(res => {
                this.developerData = res.data;
            })
        },
        getDeveloperBaseMsg: function(bid) {  //基本信息数据
            let seData = {
                pointGeoJson: {
                    features: [],
                    type: "FeatureCollection"
                },
                polyGeoJson: {
                    features: [],
                    type: "FeatureCollection"
                }
            };
            let sItem_1 = {};
            let sItem_2 = {};
            let ecData_1 = {
                tName: '现状权属情况百分比(单位：%)',
                leData: ["确权用地","未确权用地"],
                sData: []
            };
            let ecData_2 = {
                tName: '法定图则规划情况百分比(单位：%)',
                leData: ["工业用地","非工业用地"],
                sData: []
            };
            let item_1 = {};
            let item_2 = {};
            let item_3 = {};
            let item_4 = {};
            publicRequirest.getIndustrailBaseInfor(bid).then(res => {
                this.developerBaseData = res.data.list[0].ViewInd;
                sItem_1.names = this.developerBaseData.names;
                sItem_1.geometry = this.developerBaseData.geometrypoint;
                sItem_2.geometry = this.developerBaseData.geometrypoly;
                seData.pointGeoJson.features.push(sItem_1);
                seData.polyGeoJson.features.push(sItem_2);
                let stringData = JSON.stringify(seData);
                this.satelliteData = JSON.parse(stringData);
                window.openlayerParkMap.drawGraphics(null,this.satelliteImageLayer,this.satelliteData);

                item_1.value = this.developerBaseData.legal_lands_scale;
                item_1.name = "确权用地";
                item_2.value = this.developerBaseData.no_legal_lands_scale;
                item_2.name = "未确权用地";
                ecData_1.sData.push(item_1);
                ecData_1.sData.push(item_2);
                this.ownershipData = ecData_1;
                item_3.value = this.developerBaseData.industrial_landrate;
                item_3.name = "工业用地";
                item_4.value = this.developerBaseData.no_industrial_landrate;
                item_4.name = "非工业用地";
                ecData_2.sData.push(item_3);
                ecData_2.sData.push(item_4);
                this.statutoryPlanData = ecData_2;
                this.getSettledEnterpriseMsg(this.setlledPage,this.developerBaseData.names);
            })
        },
        getAreaMsgPic: function(bid) {   //获取详情图片
            publicRequirest.getKeyAreaDetailImage(7,bid).then(res => {
                this.areaMsgPic = res.data.list;
                if(res.data.list && res.data.list.length > 0){
                    this.areaMsgPic = res.data.list;
                }else{
                    this.areaMsgPic = [{
                        TsupPhoto: {
                            url: ''
                        }
                    }];
                }
            })
        },
        getSettledEnterpriseMsg: function(page,names) {   //入驻企业数据
            publicRequirest.getSettledEnterprise(page,names).then(res => {
                this.setlledData = res.data;
            })
        },
        getMapButtonValue: function(val) {
            if(val === "卫星") {
                LoadMap.changeDefaultBaseLayer_evt("avi");
            }
            if(val === "地图") {
                LoadMap.changeDefaultBaseLayer_evt("image");
            }
        },
        commitQuestion: function() {
            let question = this.$refs.textarea.value;
            if(question === '') {
                this.$message({
                    message: '输入信息不能为空！！！',
                    type: 'warning'
                });
                return false;
            }
            publicRequirest.insertQuestions(this.bid,question).then(res => {
                publicRequirest.getAllQuestionsAnswer(this.bid,this.ansPage).then(res => {
                    this.questionAnswer = res.data;
                })
            })
            this.isAnswer = false;
        },
        searchAnswer: function() {
            this.ansPage = 1;
            let question = `%${this.$refs.ipt.value}%`;
            publicRequirest.getQuestionsAnswer(this.bid,question,this.ansPage).then(res => {
                this.questionAnswer = res.data;
            })
            this.isAnswer = true;
        },
        answerPageChange(val) {    //问题解答分页
            this.ansPage = val;
            let question = `%${this.$refs.ipt.value}%`;
            if(this.isAnswer === false) {
                publicRequirest.getAllQuestionsAnswer(this.bid,this.ansPage).then(res => {
                    this.questionAnswer = res.data;
                })
            }else{
                publicRequirest.getQuestionsAnswer(this.bid,question,this.ansPage).then(res => {
                    console.log(res);
                    this.questionAnswer = res.data;
                })
            }
        }
    },

    watch: {
        '$route' (to, from) {
            if(from.path === "/"){
                this.bid = this.$route.query.bid;
                this.getDeveloperBaseMsg(this.bid);
            }
        },
        page(newVal,oldVal) {
            this.getDeveloperMsg(this.page);
        },
        setlledPage(newVal,oldVal) {
            this.getSettledEnterpriseMsg(this.setlledPage,this.developerBaseData.names);
        }
    }

  }

</script>
<style lang=''>
    html,body {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .industrailDetailsContainer {
        width: 100%;
        height: 100%;
    }
    .el-container {
        height: 100%;
    }
    .inDetailContainer {
        width: 100%;
        height: 100%;
        background: #eee;
        overflow: hidden;
    }
    .inDetail {
        width: 825px;
        /* height: 1800px; */
        margin: 10px auto;
        /* background: red; */
    }
    .inMsgDisplay {
        width: 100%;
        /* height: 1285px; */
        padding: 20px;
        border: 1px solid #A3A5A7;
        /* background-color: red; */
        /* display: flex; */
    }
    .inMsgDisplay h3 {
        font-size: 18px;
        color: rgb(0, 146, 69);
        padding: 0 0 6px;
        border-bottom: 2px solid #5AB667;
    }
    .infoBox {
        width: 100%;
        margin-top: 10px;
        display: flex;
    }
    .baseinfo1 {
        width: 512px;
        /* height: 250px; */
        /* background: red; */
    }
    .pictureinfo {
        width: 300px;
        height: 260px;
        margin-left: 10px;
        border: 1px solid #e4e4e4;
    }
    .pictureinfo img {
        width: 100%;
        height: 100%;
    }
    .bh {
        font-size: 18px;
        color: #f7931e;
        font-family: "微软雅黑";
    }
    .name {
        font-size: 16px;
        color: #009245;
        font-family: "微软雅黑";
    }
    .inforContent {
        width: 100%;
        margin-top: 5px;
    }
    .inforContent li {
        padding: 8px 0;
        font-size: 16px;
    }
    .inforContent li label {
        font-weight: bold;
    }
    .inforNum {
        color: #29afec;
    }
    .enterpriseTable{
        width: 100%;
        margin-top: 4px;
    }
    .enterpriseTable label{
        font-weight: bold;
        font-size: 16px;
    }
    .enterpriseTableContainer{
        width: 100%;
        height: 232px;
        border: 1px solid #C7C7C7;
        margin-top: 4px;
        position: relative;
    }
    .enterpriseTableContainer table{
        width: 100%;
        margin-top: 10px;
        /* border: 1px solid #000; */
    }
    .enterpriseTableContainer table tr th {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
    }
    .enterpriseTableContainer table tr td {
        height: 24px;
        line-height: 24px;
        text-align: center;
    }
    .picAndTable{
        width: 100%;
        margin-top: 10px;
    }
    .mapMarkContainer {
        width: 100%;
    }
    .satelliteImage{
        height: 260px;
        position: relative;
    }
    #parkMap {
        width: 100%;
        height: 100%;
    }
    .echartsCon {
        width: 100%;
        height: 240px;
    }

    .planningTable{
        width: 100%;
    }
    .planningTable tr td {
        padding: 6px 0;
        font-size: 16px;
    }
    .pictureinfo .el-carousel__container {
        height: 260px;
    }
    .comEvaluation {
        width: 100%;
        height: 56px;
        padding: 6px 0;
    }
    .comEvaluation p{
        font-size: 16px;
        text-indent: 2em;
    }

    .el-carousel__item h4 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        /* line-height: 300px; */
        margin: 0;
    }
    
    /* .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    } */
    .developer {
        position: fixed;
        top: 139px;
        left: 10px;
        width: 200px;
        height: 320px;
        border: 1px solid #009245;
    }
    .developer h3{
        background-color: #19C369;
        padding: 6px 0;
        font-size: 16px;
        color: white;
        text-indent: 8px;
    }
    .developerUl{
        width: 100%;
        /* height: 200px; */
    }
    .developerUl li {
        width: 100%;
        height: 24px;
        line-height: 24px;
        text-indent: 10px;
        border-bottom: 1px dashed #BBBBBB;
        font-size: 14px;
        cursor: pointer;
    }
    .developerLi {
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .developerUl li:hover{
        color: #E88500;
    }
    .wordColor {
        color:#E88500; 
    }
    .developer .el-pagination,.enterpriseTableContainer .el-pagination {
        position: absolute;
        bottom: 4px;
        left: 0;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev {
        background: none;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev {
        background: none;
    }
    .el-pagination button:disabled,.el-pagination button:disabled {
        background: none;
    }
    .el-pager li,.el-pager li { 
        background: none;
        min-width: 30px;
    }

    .problem_menu {
        margin-left: 10px;
        margin-top: 5px;
        font-size: 15px;
        font-family: 华文仿宋, "Microsoft YaHei", "Arial Narrow";
        font-weight: 600;
    }
    .commitinfos {
        width: 99%;
        margin-top: 5px;
        margin-left: 10px;
    }
    .committext {
        width: 99%;
        height: 80px;
        font-size: 14px;
        font-family: 黑体, "Microsoft YaHei", "Arial Narrow";
        box-shadow: rgb(91, 170, 254) 0px 0px 1px 0px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(91, 170, 254);
        border-image: initial;
    }
    .commitdiv {
        width: 100%;
        height: 30px;
    }
    #commitBtn {
        background: url(../../static/images/commit_problem.png) no-repeat;
        height: 25px;
        width: 70px;
        border: 1px solid #5baafe;
    }
    .right_float {
        float: right;
    }
    #searchInfo {
        font-size: 14px;
        width: 741px;
        height: 23px;
        margin-left: 12px;
        margin-top: 4px;
        /* float: left; */
        font-family: 黑体, "Microsoft YaHei", "Arial Narrow";
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        border: 1px solid #5baafe;
        box-shadow: rgb(91, 170, 254) 0px 0px 1px 0px;
    }
    #searchBtn {
        background: url(../../static/images/search_problem.png) no-repeat;
        float: right;
        height: 23px;
        width: 68px;
        border: 1px solid #5baafe;
        margin-top: 4px;
    }
    #problemlist {
        margin-left: 10px;
        margin-top: 10px;
        font-family: 黑体, "Microsoft YaHei", "Arial Narrow";
        min-height: 280px;
        list-style: none;
    }
    #problemlist li {
        padding: 4px 0;
    }
    #problemlist li p{
        line-height: 1.5;
        font-size: 16px;
    }
</style>