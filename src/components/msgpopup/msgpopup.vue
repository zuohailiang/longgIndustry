<template>
      <el-dialog
        v-dialogDrag
        :title="popupTitle"
        :visible.sync="dialogVisible"
        :modal="modal"
        :center="center"
        :before-close="handleClose"
        :close-on-click-modal="closeClick"
        width="697px"
        >
        <div class="detailMsg">
            <template>
                <el-tabs tab-position="left" style="height: 412px;">
                    <el-tab-pane v-for="list in msgPopupShowList" :key="list.TsupPlan.bid">
                        <!-- <span slot="label" :title="list.TsupPlan.title">{{list.TsupPlan.title}}</span> -->
                        <el-tooltip slot="label" effect="light" :content="list.TsupPlan.title" placement="top-end">
                            <span>{{list.TsupPlan.title}}</span>
                        </el-tooltip>
                        <div class="tabContent">
                            <el-scrollbar style="height: 100%">
                                <h3>{{list.TsupPlan.title}}</h3>
                                <label>内容摘要：</label>
                                <p>{{list.TsupPlan.content | delHtmlTag}}</p>
                                <div class="file-time">
                                    <label>文件下载：</label>
                                    <a href="javascript:void(0);" :url="list.TsupPlan.url" @click="downLoadFile">{{list.TsupPlan.filename}}</a>
                                    <!-- <span :url="list.TsupPlan.url" @click="downLoadFile">
                                        {{list.TsupPlan.filename}}
                                    </span> -->
                                </div>
                                <div class="file-time">
                                    <label>上传时间：</label>
                                    <span>{{list.TsupPlan.uploadtime}}</span>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="2 龙岗区现代物流业发展十二五规划">配置管理</el-tab-pane>
                    <el-tab-pane label="3 龙岗区科学和技术发展十二五规划">角色管理</el-tab-pane> -->
                </el-tabs>
            </template>
        </div>
      </el-dialog>
</template>

<script>
  import '../../directive/dialogdrag.js'
  import { base_url } from '@/api/api.js'  
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:['title','showContent'],
    data () {
      return {
          baseUrl: '',
          dialogVisible: true,
          modal: false,
          center:true,
          closeClick: false,
          popupTitle: this.title,
          msgPopupShowList: this.showContent
      };
    },

    components: {},

    computed: {},

    created() {
        this.baseUrl = base_url;
    },

    mounted() {
       
    },

    methods: {
        handleClose(done) {
            this.$emit('update:dialogVisible',false);
        },
        downLoadFile(event) {
            // let filename = this.$refs.down[1].innerHTML;
            // let url = this.$refs.down[1].getAttribute("url");
            //let e=arguments.callee.caller.arguments[0] || event;//这里是因为除了IE有event其他浏览器没有所以要做兼容
            event.cancelBubble=true;//阻止冒泡事件
            event.returnValue=false;//阻止默认事件
            let filename = event.target.innerHTML;
            let url = event.target.getAttribute('url');
            let beforeUrl = url.lastIndexOf("\/"); 
            let beforeUrl_1  = url.substring(0, beforeUrl+1);
            let afterUrl = url.lastIndexOf("\/");
            let afterUrl_1 = url.substring(afterUrl + 1, url.length);
            let paramUrl = `${beforeUrl_1}${encodeURI(afterUrl_1)}`;
            let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            // let ajax = new XMLHttpRequest();
            // ajax.open('get',"http://172.17.6.123:8089/exportFiles?url="+paramUrl);
            // ajax.send();
            // ajax.onreadystatechange = function () {
            //     if (ajax.readyState==4 && ajax.status==200) {
            //         console.log(111111111);
            //     　　console.log(ajax.responseText);//输入相应的内容
            //     }
            // }
            // $.ajax({
            //     url: "http://172.17.6.123:8089/exportFiles",
            //     data: {
            //         url: paramUrl
            //     },
            //     success: function(res) {
            //         console.log(res);
            //     }
            // });
            // doGet("http://172.17.6.123:8089/exportFiles",paramUrl,function(res){
            //     console.log(res);
            // })
            // this.$http.get("http://172.17.6.123:8089/exportFiles",{params: {url: paramUrl}}).then(function(res){
            //     console.log(res);
            // })
            
            // window.event.returnValue = false;                        
            // if (window.event.preventDefault) window.event.preventDefault();
            publicRequirest.downloadFile(paramUrl).then(res=> {
                if(res.data === "error") {
                    this.$message({
                        message: '此文件不存在！！！',
                        type: 'warning'
                    });
                    return false;
                }
                if(res.request.response !== "" && res.request.responseText !== "") {
                    if (userAgent.indexOf("Chrome") > -1) {
                        window.location.href = res.request.responseURL;
                    }
                    if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
                        // window.location.href = res.request.responseURL;
                        window.open(`${this.baseUrl}exportFiles?url=${paramUrl}`);
                        return false;
                    }
                    if (userAgent.indexOf("Trident") > -1) {
                        // window.location.href = res.request.responseURL;
                        window.open(`${this.baseUrl}exportFiles?url=${paramUrl}`);
                        return false;
                    }
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    },
    watch: {
        showContent(val) {
            this.msgPopupShowList = val;
        }
    }
    
  }

</script>
<style lang=''>
    .detailMsg{
        width: 100%;
    }
    .tabContent{
        width: 100%;
        height: 412px;
        /* background: red; */
        overflow: hidden;
    }
    .tabContent .file-time{
        /* height: 32px;
        line-height: 32px; */
        padding: 6px 0;
    }
    .tabContent .file-time a{
        line-height: 1.4;
    }
    .detailMsg h3{
        width: 100%;
        text-align: center;
        padding: 6px 0;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .detailMsg label{
        font-weight: bold;
        font-size: 16px;
    }
    .detailMsg p{
        text-indent: 32px;
        line-height: 2;
        text-align: justify;
        margin-top: 10px;
        color: #000 !important;
    }
    .el-dialog__header {
        padding: 10px 10px;
        background: #60B1F0;
    }
    .el-dialog__headerbtn{
        top: 15px;
    }
    .el-dialog__headerbtn .el-dialog__close{
        color: #000;
    }
    .el-dialog--center{
        margin-top: 12% !important;
    }
    .el-dialog--center .el-dialog__body{
        padding: 15px 5px 15px;
    }
    .el-dialog__wrapper{
        overflow: hidden;
    }
    .el-tabs--left {
        height: 442px !important;
    }
    .el-tabs--left .el-tabs__item.is-left{
        text-align: left;
        width: 236px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .el-tabs__item {
        height: 26px;
        line-height: 26px;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }
    .is-horizontal {
        display: none;
    }
</style>