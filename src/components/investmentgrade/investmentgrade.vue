<template>
  <div id="thediv" @mouseover="pause_resume(true)" @mouseout="pause_resume(false)">
      <img src="../../../static/images/move_close.png" alt="" class="thedivClose" @click="closeTheDiv">
      <img src="../../../static/images/movingbox.png" alt="" style="margin-top: 14px;cursor: pointer;" @click="investmentGrade">
      <el-dialog title="投资意向登记表" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false" center>
        <h4 class="warning">谢谢填报，我局工作人员将在24小时内与您联系</h4>
        <el-form :model="form">
            <div class="registerContainer">
                <table>
                    <tr class="tableTitle">
                        <td colspan="4">项目基本信息</td>
                    </tr>
                    <tr>
                        <td>企业名称<i>★</i></td>
                        <td colspan="3">
                            <input type="text" v-model="form.investor">
                        </td>
                    </tr>
                    <tr>
                        <td>企业简介<i>★</i></td>
                        <td colspan="3">
                            <input type="text" v-model="form.investorbrief">
                        </td>
                    </tr>
                    <tr>
                        <td>企业转载类型<i>★</i></td>
                        <td class="typeTd">
                            <el-radio-group v-model="carrierDemandType">
                                <el-radio :label="0">购地</el-radio>
                                <el-radio :label="1">购房</el-radio>
                                <el-radio :label="2">租房</el-radio>
                            </el-radio-group>
                        </td>
                        <td>需求建筑面积<i>★</i></td>
                        <td>
                            <input type="text" v-model="form.applybuildarea">
                        </td>
                    </tr>
                    <tr>
                        <td>联系人<i>★</i></td>
                        <td>
                            <input type="text" v-model="form.projlinkman">
                        </td>
                        <td>联系电话<i>★</i></td>
                        <td>
                            <input type="text" v-model="form.projlinktel">
                        </td>
                    </tr>
                    <tr class="tableTitle">
                        <td colspan="4">项目其他信息</td>
                    </tr>
                    <tr>
                        <td>所属行业</td>
                        <td>
                            <input type="text" @focus="belongTrade" v-model="tradeValue" readonly>
                            <el-dialog
                                title="选择行业类型"
                                :visible.sync="centerDialogVisible"
                                width="650px"
                                top="10%"
                                :modal="false"
                                center>
                                <div class="tradeList">
                                    <div style="width: 45%">
                                        <ul>
                                            <li v-for="(l,index) in tradeList_1" :key="index">
                                                <el-popover
                                                    placement="right"
                                                    width="230"
                                                    trigger="hover">
                                                    <div class="selectType" @click="clickLabel">
                                                        <p v-for="lv in l.listArr" :key="lv.v"><a href="javascript:void(0);" :vid="lv.v">{{lv.k}}</a></p>
                                                    </div>
                                                    <div slot="reference"><label class="labelType">{{l.pv}}</label><span class="typeTitle">{{l.pvname}}</span><span class="typeTip" @click="clickLabel" :vid="l.listArr[0].v">{{l.listArr[0].k}}</span></div>
                                                </el-popover>
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="width: 45%;margin-left: 10%">
                                        <ul>
                                            <li v-for="(l,index) in tradeList_2" :key="index">
                                                <el-popover
                                                    placement="right"
                                                    width="230"
                                                    trigger="hover">
                                                    <div class="selectType" @click="clickLabel">
                                                        <p v-for="lv in l.listArr" :key="lv.v"><a href="javascript:void(0);" :vid="lv.v">{{lv.k}}</a></p>
                                                    </div>
                                                    <div slot="reference"><label class="labelType">{{l.pv}}</label><span class="typeTitle">{{l.pvname}}</span><span class="typeTip" @click="clickLabel" :vid="l.listArr[0].v">{{l.listArr[0].k}}</span></div>
                                                </el-popover>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- <span slot="footer" class="dialog-footer">
                                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                                </span> -->
                            </el-dialog>
                        </td>
                        <td>意向选址</td>
                        <td>
                            <input type="text" v-model="form.sitearea">
                        </td>
                    </tr>
                    <tr>
                        <td>上年度营业收入(亿元)</td>
                        <td>
                            <input type="text" v-model="form.lincome">
                        </td>
                        <td>上年度纳税(万元)</td>
                        <td>
                            <input type="text" v-model="form.ltax">
                        </td>
                    </tr>
                    <tr>
                        <td>投资额</td>
                        <td>
                            <input type="text" v-model="form.investmoney">
                        </td>
                    </tr>
                </table>
                <div class="divContainer">
                    <h3 class="divTitle">行业地位</h3>
                    <div class="checkCon">
                        <el-radio-group v-model="form.tradelevel">
                            <el-radio :label="tradelevelArr[0]">世界五百强</el-radio>
                            <el-radio :label="tradelevelArr[1]">中国五百强</el-radio>
                            <el-radio :label="tradelevelArr[2]">行业领军</el-radio>
                            <el-radio :label="tradelevelArr[3]">其他</el-radio>
                        </el-radio-group>
                        (<input class="otherInput" type="text" v-model="otherValue">)
                    </div>
                </div>
                <div class="divContainer">
                    <h3 class="divTitle">企业性质</h3>
                    <div class="checkCon">
                        <el-radio-group v-model="form.enttype">
                            <el-radio :label="enttypeArr[0]">国有</el-radio>
                            <el-radio :label="enttypeArr[1]">三资(独资、合资、合作)</el-radio>
                            <el-radio :label="enttypeArr[2]">集体</el-radio>
                            <el-radio :label="enttypeArr[3]">民营</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <el-form-item style="text-align: center;">
                <p class="warning" style="text-align:left">温馨提示：请如实提供相关数据信息！</p>
                <el-button @click="resetForm">重置</el-button>
                <el-button type="primary" @click="submitForm" style="margin-bottom: 10px">提交</el-button>
            </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
        </div> -->
    </el-dialog>
  </div>
</template>

<script>
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          xPos: 300,
          yPos: 200,
          step: 1,
          delay: 10,
          width: 0,
          height: 0,
          Hoffset: 0,
          Woffset: 0,
          yon: 0,
          xon: 0,
          pause: true,
          interval: '',
          thediv: '',
          investBool: true,
          dialogFormVisible: false,
          centerDialogVisible: false,
          tradeValue: '',
          tradeList_1: [],
          tradeList_2: [],
          tradelevelArr: ['世界五百强','中国五百强','行业领军','其他'],
          enttypeArr: ['国有','三资(独资、合资、合作)','集体','民营'],
          form: {
             investor: '', //企业名称
             investorbrief: '',  //企业简介
             applybuildarea: '',  //需求建筑面积
             projlinkman: '',   //联系人
             projlinktel: '',   //联系电话
             tradetype: '',  //所属行业
             sitearea: '',  //意向选址
             lincome: '',  //上年度营业收入
             ltax: '',  //上年度纳税
             investmoney: '',  //投资额
             tradelevel: '',  //行业地位
             enttype: ''  //企业性质
          },
          carrierDemandType: '',
          otherValue: '',
          industryStatus: '',
          enNature: ''
      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        this.thediv = document.getElementById('thediv');
        this.thediv.style.top = this.yPos;
		this.start();
    },

    methods: {
        changePos: function() {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
            
            this.Hoffset = this.thediv.offsetHeight;
			this.Woffset = this.thediv.offsetWidth;
			this.thediv.style.left = (this.xPos + document.body.scrollLeft + document.documentElement.scrollLeft) + "px";
            this.thediv.style.top = (this.yPos + document.body.scrollTop + document.documentElement.scrollTop) + "px";
            if(this.yon) {
				this.yPos = this.yPos + this.step;
			} else {
				this.yPos = this.yPos - this.step;
			}
			if(this.yPos < 0) {
				this.yon = 1;
				this.yPos = 0;
			}
			if(this.yPos >= (this.height - this.Hoffset)) {
				this.yon = 0;
				this.yPos = (this.height - this.Hoffset);
			}
			if(this.xon) {
				this.xPos = this.xPos + this.step;
			} else {
				this.xPos = this.xPos - this.step;
			}
			if(this.xPos < 0) {
				this.xon = 1;
				this.xPos = 0;
			}
			if(this.xPos >= (this.width - this.Woffset)) {
				this.xon = 0;
				this.xPos = (this.width - this.Woffset);
			}
        },
        start: function() {
            this.thediv.style.visibility = "visible";
            this.interval = setInterval(this.changePos, this.delay);
        },
        pause_resume: function(bool) {
            this.pause = bool;
			if(this.pause) {
				clearInterval(this.interval);
				this.pause = false;
			} else {
				this.interval = setInterval(this.changePos, this.delay);
				this.pause = true;
			}
        },
        closeTheDiv: function() {
            this.thediv.style.visibility = "hidden";
        },
        investmentGrade: function() {
            this.dialogFormVisible = true;
            this.resetForm();
        },
        belongTrade: function() {
            this.centerDialogVisible = true;
            this.tradeList_1 = [];
            this.tradeList_2 = [];
            publicRequirest.getBelongTrade().then(res=> {
                let data = res.data.list;
                let item = {};
                let dest = [];
                for(var i=0;i<data.length;i++){
                   let ai = data[i];
                   if(!item[ai.ViewIndustryType.pv]) {
                       dest.push({
                           pv: ai.ViewIndustryType.pv,
                           pvname: ai.ViewIndustryType.pvname,
                           listArr: [ai.ViewIndustryType]
                       });
                       item[ai.ViewIndustryType.pv] = ai.ViewIndustryType;
                   }else{
                        for(var j = 0; j < dest.length; j++) {
                            var dj = dest[j];
                            if(dj.pv == ai.ViewIndustryType.pv) {
                                dj.listArr.push(ai.ViewIndustryType);
                                break;
                            }
                        }
                   }
                }
                for(let k=0;k<(dest.length/2);k++) {
                    this.tradeList_1.push(dest[k]);
                }
                for(let m=(dest.length/2);m<dest.length;m++){
                    this.tradeList_2.push(dest[m]);
                }
            })
        },
        clickLabel: function(event) {
            this.tradeValue = event.target.innerHTML;
            this.centerDialogVisible = false;
            this.form.tradetype =  event.target.getAttribute("vid");
            if(this.form.tradetype === null) {
                this.form.tradetype = "";
            }
        },
        submitForm: function() {
            // let reg = /^[0-9]*$/;
            let reg = /^\d+(\.\d{1,2})?$/;
            let rgPhone = /^1(3|4|5|7|8)\d{9}$/;
            let str = `
                    "investor": "${this.form.investor}",
                    "investorbrief": "${this.form.investorbrief}",
                    "applibuildarea": ${this.form.applybuildarea},
                    "projlinkman": "${this.form.projlinkman}",
                    "projlinktel": "${this.form.projlinktel}",
                    "type": ${this.carrierDemandType},
            `;
            if(this.form.investor === "") {
                this.$message({
                    message: '企业名称不能为空',
                    type: 'warning'
                });
                return false;
            }
            if(this.form.investorbrief === "") {
                this.$message({
                    message: '企业简介不能为空',
                    type: 'warning'
                });
                return false;
            }
            if(this.carrierDemandType === "") {
                this.$message({
                    message: '企业转载类型不能为空',
                    type: 'warning'
                });
                return false;
            }
            if(this.form.applybuildarea === "") {
                this.$message({
                    message: '需求建筑面积不能为空',
                    type: 'warning'
                });
                return false;
            }else {
                if(!reg.test(this.form.applybuildarea)) {
                    this.$message({
                        message: '需求建筑面积请输入整数或者1到2位格式',
                        type: 'warning'
                    });
                    return false;
                }
            }
            if(this.form.projlinkman === "") {
                this.$message({
                    message: '联系人不能为空',
                    type: 'warning'
                });
                return false;
            }
            if(this.form.projlinktel === "") {
                this.$message({
                    message: '联系电话不能为空',
                    type: 'warning'
                });
                return false;
            }else{
                if(!rgPhone.test(this.form.projlinktel)) {
                    this.$message({
                        message: '请输入正确的联系电话',
                        type: 'warning'
                    });
                    return false;
                }
            }
            if(this.form.tradetype !== "") {
                str += `"tradetype": "${this.form.tradetype}",`
            }
            if(this.form.sitearea !== "") {
                str += `"sitearea": "${this.form.sitearea}",`
            }
            if(this.form.lincome !== "") {
                str += `"lincome": ${this.form.lincome},`;
                if(!reg.test(this.form.lincome)) {
                    this.$message({
                        message: '上年度营业收入请输入整数或者1到2位小数格式',
                        type: 'warning'
                    });
                    return false;
                }
            }
            if(this.form.ltax !== "") {
                str += `"ltax": ${this.form.ltax},`;
                if(!reg.test(this.form.ltax)) {
                    this.$message({
                        message: '上年度纳税请输入整数或者1到2位小数格式',
                        type: 'warning'
                    });
                    return false;
                }
            }
            if(this.form.investmoney !== "") {
                str += `"investmoney": ${this.form.investmoney},`;
                if(!reg.test(this.form.investmoney)) {
                    this.$message({
                        message: '投资额请输入整数或者1到2位小数格式',
                        type: 'warning'
                    });
                    return false;
                }
            }
            if(this.form.tradelevel !== "" && this.form.tradelevel !== "其他") {
                str += `"tradelevel": "${this.form.tradelevel}",`
            }
            if(this.form.tradelevel === "其他") {
                str += `"other": "${this.otherValue}",`
            }
            if(this.form.enttype !== "") {
                str += `"enttype": "${this.form.enttype}",`
            }
            str = str.substring(0, str.lastIndexOf(','));
            let dataJsonStr = `{${str}}`;
            let json = JSON.parse(dataJsonStr);
            publicRequirest.submitInvestTable(json).then(res=> {
                if(res.data.code === 200) {
                    this.$message({
                        message: '提交信息成功！！！',
                        type: 'success'
                    });
                    this.resetForm();
                }else{
                    this.$message({
                        message: '提交信息失败！！！',
                        type: 'warning'
                    });
                }
            })
        },
        resetForm() {
            for(let key in this.form) {
                this.form[key] = "";
            }
            this.tradeValue = "";
            this.otherValue = "";
            this.carrierDemandType = "";
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {  
                done();
            }).catch(_ => {});
        }
    },

    watch: {
       
    }

  }

</script>
<style lang='' >
    #thediv {
		/* z-index: 2999; */
		position: absolute;
		top: 43px;
		left: 2px;
	}
    #thediv .el-dialog__body {
        padding: 0;
    }
    .thedivClose {
        position: absolute;
        top: 0px;
        right: 4px;
        cursor: pointer;
    }
    .registerContainer {
        padding: 4px;
    }
    .warning {
        font-size: 14px;
        color: #b41529;
        text-align: right;
    }
    .registerContainer table{
        width: 100%;
    }
    .registerContainer table tr td {
        border: 1px solid;
        border-color: #d9d9d9;
        text-indent: 1px;
        padding: 4px;
        font-size: 16px;
    }
    .registerContainer table tr td i{
        color: red;
        margin-left: 4px;
        font-size: 16px;
    }
    .registerContainer table tr td input[type="text"] {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        text-align: left;
    }
    .tableTitle {
        background: rgb(14, 110, 184);
        color: #fff;
    }
    .divContainer {
        width: 100%
    }
    .divTitle {
        background: rgb(175, 187, 187);
        color: #000;
        font-size: 16px;
        padding: 4px;
    }
    .checkCon {
        padding: 8px 4px;
        border: 1px solid rgb(175, 187, 187);
        border-top: none;
        box-sizing: border-box;
    }
    .otherInput {
        width: 120px;
        border: 1px solid rgb(175, 187, 187);
        padding: 2px;
        outline: none;
    }
    .typeTd .el-radio__label {
        padding-left: 2px;
    }
    /* .el-popover {
        z-index: 3001 !important;
    } */
    .tradeList {
        display: flex;
        padding: 10px;
    }
    .tradeList ul {
        width: 100%;
    }
    .tradeList ul li {
        width: 100%;
        padding: 5px 0;
    }
    .labelType {
        color: #e60012;
        margin-right: 8px;
    }
    .typeTitle {
        display: inline-block;
        width: 130px;
        color: #000;
    }
    .typeTitle:hover{
        color: gold;
        text-decoration: underline;
        cursor: pointer;
    }
    .typeTip {
        display: inline-block;
        width: 127px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #0075e8;
    }
    .typeTip:hover{
        color: gold;
        text-decoration: underline;
        cursor: pointer;
    }
    /* .el-message-box {
        z-index: 4000;
    } */
</style>