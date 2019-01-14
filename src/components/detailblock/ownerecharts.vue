<template>
  <div id="echart">
      
  </div>
</template>

<script>

  export default {
    name:'',
    props:['echartData'],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        this.drawLine();
    },

    methods: {
        drawLine(){
            this.$nextTick(() => {
                let myChart = this.$echarts.init(document.getElementById("echart"));
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: this.echartData.tName,
                        x:'center',
                        top: '10'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: '70%',
                        y: 'middle',
                        data: this.echartData.leData
                    },
                    color: ['#97DBF2','#F37A44'],
                    series : [
                        {
                            name: '权属',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: this.echartData.sData,
                            label: {
                                formatter: "{b}\n({d}%)"
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            })
        }
    },

    watch: {
        echartData(newVal,oldVal){
            this.echartData = newVal;
            this.drawLine();
        }
    }

  }

</script>
<style lang=''>
    #echart {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
</style>