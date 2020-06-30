<template>
  <div >
    <div
      id="myChart2"
      :style="{ height: '2.2rem'}"
    ></div>
  </div>
</template>

<script>
import myCharts from "echarts";
import { queryTeacherTitledistribution } from "../../api/introduce"
export default {
  data() {
    return {
      bardata:"",
      seriesData:[]
    };
  },
  methods:{
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = myCharts.init(document.getElementById("myChart2"));
      // let myChart3 = myCharts.init(document.getElementById("myChart3"));
      // let myChart4 = myCharts.init(document.getElementById("myChart4"));
      window.onresize = myChart.resize;
      var vm  = this
      // window.onresize = myChart3.resize;
      // window.onresize = myChart4.resize;
      // 绘制图表
      myChart.setOption({
        legend: {
          type: 'scroll',
            orient: 'vertical',
            right: 60,
            top:10,
            selectedMode:false
        },
        series: [
          {
            type: "pie",
            // color: ["#395275", "#5E7AB8", "#C9D5EC", "#7ED5BC"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["20%", "50%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: vm.seriesData
          }
        ]
      });
    }
  },
  mounted(){
   
    queryTeacherTitledistribution().then(res => {
      this.bardata = JSON.parse(res).titlelist
      for (let i = 0; i < this.bardata.length; i++) {
        this.seriesData.push({
            name: this.bardata[i].professionaltitle,
            value: this.bardata[i].rs
        });
      }
      console.log(this.seriesData);
      this.drawLine()
      // console.log(this.bardata );
    })
     this.drawLine()
  }
};
</script>

<style lang="less" scoped>
</style>