<template>
  <div class="cycle_main" :style="{width:cyclewidth,height:cyclewidth}">
    <div :id="elId" :style="{width:'1.1rem',height:'1.1rem',margin:'0 auto'}"></div>
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
    cyclewidth: {
      type: String,
      required: true
    },
    cycleValue: {
      type: [String, Number],
      required: true
    },
    cycleName:{
      type:String,
      required:true
    }
  },
  watch:{
    cycleValue(val){
      this.drawLine();
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let chartObj = myCharts.init(document.getElementById(this.elId));
      window.onresize = chartObj.resize;
      var vm = this;
      // 绘制图表
      chartObj.setOption({
        backgroundColor: "#ffffff",
        series: {
          type: "pie",
          clockWise: false,
          radius: [45, 50],
          hoverAnimation: false,
          silent: true,
          center: ["50%", "50%"],
          labelLine: {
            show: false
          },
          data: [
            {
              value: 100 - vm.cycleValue,
              itemStyle: {
                normal: {
                  color: "#ebecf0", //外圈背景颜色
                  borderWidth: 1,
                  borderColor: "#dddddd" //外圈边框颜色
                }
              }
            },
            {
              value: vm.cycleValue,
              label: {
                normal: {
                  rich: {
                    a: {
                      color: "#333333",
                      align: "center",
                      fontSize: 13
                    },
                    b: {
                      color: "#9397ad",
                      align: "center",
                      fontSize: 13
                    },
                    c: {
                      color: "#333333",
                      fontSize: 13
                    }
                  },
                  formatter: function(params) {        
                    return (
                      "{b|" + vm.cycleName + "}\n\n" + "{a|" + params.value + "}" + " {c|%}"
                    );
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "14",
                    fontWeight: "normal",
                    color: "#dddddd"
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#239eff",
                  borderWidth: 2,
                  borderColor: "#239eff"
                }
              }
            }
          ]
        }
      });
    },
  },
  mounted() {
    this.drawLine();
    // console.log(this.cycleValue);
    setTimeout(() => {
      this.drawLine();
    }, 1000);
    document
      .getElementById(this.elId)
      .getElementsByTagName("canvas")[0].style.width = this.cyclewidth;
    document
      .getElementById(this.elId)
      .getElementsByTagName("canvas")[0].style.height = this.cyclewidth;
  }
};
</script>

<style lang="less" scoped>
.cycle_main {
  overflow: hidden;
}
// /deep/ #myChart5{
//   canvas{
//     width: 2rem !important;
//     height: 2rem !important;
//   }
// }
</style>