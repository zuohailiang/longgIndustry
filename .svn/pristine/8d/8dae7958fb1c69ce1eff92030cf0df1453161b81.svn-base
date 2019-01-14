<template>
  <div class="mapSearchSelect">
     <div class="right">
         <div class="operate1">
             <a href="" style="margin-left: 22px;">主页</a>
         </div>
         <div class="operate2" v-if="isSwitch">
             <router-link target="_blank" to="/searchmap/switchlist">切换到列表</router-link>
             <!-- <a href="javascript:void(0);" @click="switchToList" /searchmap/switchlist>切换到列表</a> -->
         </div>
         <div class="operate3" v-else>
             <router-link tag="a" target="_blank" :to="{name:'searchmap',query: {selectType: '可售产业用地',inputValue: ''}}">切换到地图</router-link>
             <!-- <a href="javascript:void(0);" @click="switchToMap">切换到地图</a> -->
         </div>
     </div>
     <div class="left" v-if="isArea">
        <div class="tabConditon">
            <el-radio-group v-model="radio" @change="radioSelect">
                <el-radio-button label="可售产业用地"></el-radio-button>
                <el-radio-button label="可租产业用房"></el-radio-button>
                <el-radio-button label="可售产业用房"></el-radio-button>
            </el-radio-group>
            <el-input placeholder="请输入内容" v-model="input">
                <el-button slot="append" icon="el-icon-search" @click="checkSaleAndSent"></el-button>
            </el-input>
        </div>
        <div class="selectCondition">
            <el-select v-model="valueArea" placeholder="区域" @change="areaChange">
                <el-option
                    v-for="item in selectArea"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="valuePrice" placeholder="单价(元/m²)" @change="priceChange">
                <el-option
                    v-for="item in selectPrice"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="valueSquare" placeholder="面积(m²)" @change="squareChange">
                <el-option
                    v-for="item in selectSquare"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-checkbox-group v-model="checkList" v-if="stateCheck" @change="checkListChange">
                <el-checkbox v-for="item in checkSelectList" :key="item" :label="item"></el-checkbox>
            </el-checkbox-group>
        </div>
     </div>
     <div class="left" v-else>
         <div class="tabConditon">
            <el-radio-group v-model="radioList" @change="radioListSelect">
                <el-radio-button label="可售产业用地"></el-radio-button>
                <el-radio-button label="可租产业用房"></el-radio-button>
                <el-radio-button label="可售产业用房"></el-radio-button>
            </el-radio-group>
        </div>
        <el-input placeholder="请输入内容" v-model="inputList">
            <el-button slot="append" icon="el-icon-search" @click="checkListData"></el-button>
        </el-input>
     </div>
  </div>
</template>

<script>
  import { selectArea, selectPrice1, selectPrice2, selectSquare1, selectSquare2} from '@/data/selectCondition.js'
  import { publicRequirest } from '@/api/api.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        radio: '可售产业用地',
        radioList: '可售产业用地',
        selectArea: '',
        selectPrice: '',
        selectSquare: '',
        rentList: ['待租','在租','租完'],
        saleList: ['待售','在售','售完'],
        checkSelectList: [], 
        valueArea: '',
        valueArea_1: '',
        valuePrice: '',
        valuePrice_1: '',
        valueSquare: '',
        valueSquare_1: '',
        input: '',
        inputList: '',
        checkList: [],     
        isSwitch: true,
        stateCheck: false,
        isArea: true,
        listSelectValue: {  //选择条件传给地图
            names: '',
            jdcode: ['440307001','440307002','440307003','440307004','440307005','440307006','440307007','440307008'],
            referenceprice: '>=0',
            area: '>=0',
            checklist: '',
            ssType: '',
            iptVal: '',
            areaVal: '',
            priceVal: '',
            squareVal: '',
            checklistVal: []
        },
        initListSelectValue: {
            names: '',
            jdcode: ['440307001','440307002','440307003','440307004','440307005','440307006','440307007','440307008'],
            referenceprice: '>=0',
            area: '>=0',
            checklist: '',
            ssType: '',
            iptVal: ''
        },
        listSelect: {   //切换到列表选择条件
            lsType: '可售产业用地',
            inputList: ''
        }
      };
    },

    components: {},

    computed: {
        
    },

    created() {
        this.selectArea = selectArea;
        this.selectPrice = selectPrice1;
        this.selectSquare = selectSquare1;
        let url = this.$route.path;
        if(url === "/searchmap/switchlist") {
            this.isSwitch = false;
            this.isArea = false;
        }
    },

    mounted() {
        let ssType = this.$route.query.selectType;
        let iptVal = this.$route.query.inputValue;
        this.radio = ssType;
        if(this.radio === "") {
            this.radio = "可售产业用地";
        }
        this.input = iptVal;
        this.listSelectValue.ssType = ssType;
        this.listSelectValue.iptVal = iptVal;
        this.$root.Bus.$on("listenSelectCondition", (val)=> {
             if(val.areaVal === '') {
                this.valueArea = '';
             }
             if(val.priceVal === '') {
                this.valuePrice = '';
             }
             if(val.squareVal === '') {
                this.valueSquare = '';
             }
         })
    },

    methods: {
        radioSelect: function(label) {
           this.listSelectValue.areaVal = '';
           this.listSelectValue.priceVal = '';
           this.listSelectValue.squareVal = '';
           this.listSelectValue.checklistVal = [];
           this.listSelectValue.ssType = label;
           let { ...listobj } = this.initListSelectValue;   //得深拷贝
           listobj.ssType = label;
           listobj.areaVal = '';
           listobj.priceVal = '';
           listobj.squareVal = '';
           listobj.checklistVal = [];
           this.radioSelectFun(label);
           this.valueArea = '';
           this.valuePrice = '';
           this.valueSquare = '';
           this.checkList = [];
           this.$root.Bus.$emit("listenSelectCon",listobj);
        },
        radioListSelect: function(label) {
            this.listSelect.lsType = label;
            this.inputList = "";
            this.listSelect.inputList = "";
            this.$root.Bus.$emit("listenListSelectCon",this.listSelect);
        },
        radioSelectFun: function(name){
            this.checkSelectList = [];
            if(name == '可售产业用地'){
                this.stateCheck = false;
                this.selectPrice = selectPrice1;
                this.selectSquare = selectSquare2;
            }else if(name === "可租产业用房"){
                this.stateCheck = true;
                this.selectPrice = selectPrice2;
                this.selectSquare = selectSquare2;
                this.checkSelectList = this.rentList;
            }else{
                this.stateCheck = true;
                this.selectPrice = selectPrice2;
                this.selectSquare = selectSquare2;
                this.checkSelectList = this.saleList;
            }
        },
        checkSaleAndSent: function() {
            this.listSelectValue.iptVal = this.input;
            this.$root.Bus.$emit("listenSelectCon",this.listSelectValue);
        },
        checkListData: function() {
            this.listSelect.inputList = this.inputList;
            this.$root.Bus.$emit("listenListSelectCon",this.listSelect);
        },
        areaChange: function(label) {    //区域
            this.listSelectValue.jdcode = label.split(',');
            selectArea.forEach(element=> {
                if(label === element.value) {
                    this.listSelectValue.areaVal = element.label;
                    if(element.label === "区域") {
                        this.listSelectValue.areaVal = "";
                    }
                }
            })
            // this.listSelectValue.jdcode = newVal;
            this.$root.Bus.$emit("listenSelectCon",this.listSelectValue);
        },
        priceChange: function(label) {   //价格
            this.listSelectValue.referenceprice = label;
            if(this.radio === "可售产业用地") {
                for(let i=0;i<selectPrice1.length;i++) {
                    if(label === selectPrice1[i].value) {
                        this.listSelectValue.priceVal = selectPrice1[i].label;
                        if(selectPrice1[i].label === "单价(元/m²)") {
                            this.listSelectValue.priceVal = "";
                        }
                    }
                }
            }else{
                for(let i=0;i<selectPrice2.length;i++) {
                    if(label === selectPrice2[i].value) {
                        this.listSelectValue.priceVal = selectPrice2[i].label;
                        if(selectPrice2[i].label === "单价(元/m²)") {
                            this.listSelectValue.priceVal = "";
                        }
                    }
                }
            }
            this.$root.Bus.$emit("listenSelectCon",this.listSelectValue);
        },
        squareChange: function(label) {  //面积
            this.listSelectValue.area = label;
            if(this.radio === "可售产业用地") {
                for(let i=0;i<selectSquare1.length;i++) {
                    if(label === selectSquare1[i].value) {
                        this.listSelectValue.squareVal = selectSquare1[i].label;
                        if(selectSquare1[i].label === "面积(m²)") {
                            this.listSelectValue.squareVal = "";
                        }
                    }
                }
            }else{
                for(let i=0;i<selectSquare2.length;i++) {
                    if(label === selectSquare2[i].value) {
                        this.listSelectValue.squareVal = selectSquare2[i].label;
                        if(selectSquare2[i].label === "面积(m²)") {
                            this.listSelectValue.squareVal = "";
                        }
                    }
                }
            }
            this.$root.Bus.$emit("listenSelectCon",this.listSelectValue);
        },
        checkListChange: function(label) {
            let newArr = [];
            if(label.length > 0) {
                for(let i=0;i<label.length;i++) {
                    newArr.push(`%${label[i]}%`);
                }
            }
            this.listSelectValue.checklist = newArr;
            this.listSelectValue.checklistVal = label;
            this.$root.Bus.$emit("listenSelectCon",this.listSelectValue);
        }

    },

    watch: {
        radio(newVal,oldVal) {
            this.radioSelectFun(newVal);
        },
        $route(to,from) {
            if(to.path === "/searchmap/switchlist"){
                this.isSwitch = false;
                this.isArea = false;
            }
            if(to.path === "/searchmap/switchmap"){
                this.isSwitch = true;
                this.isArea = true;
            }
        }
    },
  }

</script>
<style lang=''>
    .mapSearchSelect{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row-reverse;
        text-align: left;
    }

    .right{
        width: 200px;
        height: 68px;
        /* background: red; */
        text-align: left;
    }
    .operate1{
        margin-top: 12px;
        height: 18px;
        line-height: 18px;
        margin-left: 20px;
        background: url(../../../assets/images/home1.png) no-repeat 0 0;
    }
    .operate2 {
        margin-top: 5px;
        height: 18px;
        line-height: 18px;
        margin-left: 22px;
        background: url(../../../assets/images/list1.png) no-repeat 0 0;
    }
    .operate3 {
        margin-top: 5px;
        height: 18px;
        line-height: 18px;
        margin-left: 22px;
        background: url(../../../assets/images/earth.png) no-repeat 0 0;
    }
    .operate1 a,.operate2 a,.operate3 a{
        margin-left: 20px;
        color: #fff;
        font-size: 14px;
    }

    .mapSearchSelect .el-input {
        margin-top: 6px;
    }
    .mapSearchSelect .el-input__inner{
        height: 24px;
        line-height: 24px;
        padding: 0 15px;
    }
    .mapSearchSelect .el-input-group {
        width: 240px;
    }
    .mapSearchSelect .el-radio-group{
        vertical-align: top;
        margin-top: 6px;
    }
    .mapSearchSelect .el-radio-button__inner{
        padding: 4px 18px;
        padding-right: 19px;
    }
    .mapSearchSelect .el-select .el-input__inner {
        width: 120px;
    }
    .mapSearchSelect .el-input__icon {
        line-height: 26px;
    }
    .mapSearchSelect .el-checkbox-group {
        display: inline-block;
    }
    .mapSearchSelect .el-checkbox__label{
        padding-left: 2px;
    }
    .mapSearchSelect .el-checkbox+.el-checkbox {
        margin-left: 14px;
    }
    .mapSearchSelect .el-checkbox:first-child{
        color: rgb(243, 152, 0);
        margin-left: 37px;
    }
    .mapSearchSelect .el-checkbox:nth-child(2){
        color: rgb(143, 195, 31);
    }
    .mapSearchSelect .el-checkbox:last-child{
        color: rgb(255,255,255);
    }
</style>