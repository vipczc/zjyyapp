<template>
  <div class="linebar">
    <div :id="elId" :style="{width: '3.08rem', height: '2rem', margin:'0 auto'}"></div>
  </div>
</template>

<script>
import myCharts from "echarts";
import uuidv1 from "uuid/v1";
export default {
  data() {
    return {
      elId: ""
    };
  },
  created() {
    this.elId = uuidv1(); //获取随机id
  },
  props: {
    linebardata:{
      type: Array,
      required: true
    }
  },
  methods: {
    drawLine() {
      // setTimeout(() => {
      //   console.log(this.linebardata);
      // }, 1000);
      var vm = this
      // 基于准备好的dom，初始化echarts实例
      let chartObj = myCharts.init(document.getElementById(this.elId));
      window.onresize = chartObj.resize;
      // 绘制图表
      chartObj.setOption({
        grid: {
          x: 10,
          y: 30,
          x2: 10,
          y2: 20,
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: "#E4E5EB"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#9397AD",
              fontSize: "10"
            },
            interval: 0
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          // splitLine:{
          //   show:true
          // },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#E4E5EB",
              type: "dashed"
            }
          },
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          type: "value",
          show: true,
          axisTick: {
            //y轴刻度线
            show: false
          },
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: "#E4E5EB",
              type: "dashed"
            }
          },
          axisLabel : {
              show:false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#E4E5EB",
              type: "dashed"
            }
          }
        },
        series: [
          {
            data: vm.linebardata,
            type: "line",
            color: "#277FFF",
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true,
                  formatter: "{c}\n分",
                  fontSize: "8px",
                  backgroundColor: "#DEEBFF"
                },
                borderColor: "#277FFF", // 拐点边框颜色
                lineStyle: {
                  width: 1, // 设置线宽
                  type: "solid" //'dotted'虚线 'solid'实线
                }
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    // this.drawLine();
    
  }
};
</script>

<style lang="less" scoped>
</style>