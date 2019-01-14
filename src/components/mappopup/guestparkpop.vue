<template>
    <div id="popup-content">
        <div class="popupTitle">
            <div class="title1">
                <span>{{landProperties.names}}</span>
            </div>
        </div>
        <div class="popupImg">
            <img src="" alt="">
        </div>
        <div class="popupContent">
            <table border="0" id="guestParkTable">
                <tr>
                    <td>占地面积(m²)：</td>
                    <td>{{landProperties.area}}</td>
                    <td>运营状态：</td>
                    <td>{{landProperties.isoperate}}</td>
                </tr>
            </table>
        </div>
        <div class="detailButton">
            <button @click="skipGuestDetail">详情</button>
        </div>
    </div>
</template>

<script>

  export default {
    name:'',
    props:['popupProperties'],
    data () {
      return {
          landProperties: this.popupProperties
      }
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        
    },

    methods: {
        skipGuestDetail: function() {
            // this.$router.push({path: '/createguestinfor',query: {bid: this.landProperties.bid}});
            let _this = this;
            let newpage = this.$router.resolve({   //新开一个窗口弹出页面
                name: 'createguestinfor',
                query:{
                    bid: _this.landProperties.bid
                }   
            })  
            window.open(newpage.href, '_blank');
        }
    },

    watch: {
        popupProperties(newVal,oldVal){
            this.landProperties = newVal;
        }
    }

  }

</script>
<style lang=''>
    @import url('../../styles/mappopup.css');
    #guestParkTable tr td:first-child{
        width: 100px;
    }
    #guestParkTable tr td:nth-child(3){
        width: 100px;
    }
</style>