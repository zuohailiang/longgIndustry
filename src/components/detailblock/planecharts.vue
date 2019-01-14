<template>
  <div id="chart">
      
  </div>
</template>

<script>

  export default {
    name:'',
    props:['planechartData'],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {
        this.drawPie();
    },

    methods: {
        drawPie(){
            this.$nextTick(() => {
                let myChart = this.$echarts.init(document.getElementById("chart"));
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: this.planechartData.tName,
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
                        data: this.planechartData.leData
                    },
                    color: ['#7E4440','#A5BC4E'],
                    series : [
                        {
                            name: '法定图则',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: this.planechartData.sData,
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
        planechartData(newVal,oldVal){
            this.planechartData = newVal;
            this.drawPie();
        }
    }

  }

</script>
<style lang=''>
    #chart {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
</style>