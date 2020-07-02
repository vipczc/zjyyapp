<template>
  <div>
    <p v-show="maintitle" class="radar_title">
      {{maintitle}}
      <span v-show="secondtitle">{{secondtitle}}</span>
    </p>
    <div :id="elId" :style="{width: '3rem', height: '2rem', margin:'0 auto'}"></div>
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
    // console.log(this.elId);
  },
  props: {
    maintitle: {
      type: String,
      required: false
    },
    secondtitle: {
      type: String,
      required: false
    },
    barnumber: {
      type: Array,
      required: true
    }
  },
  methods: {
    drawLine() {
      // console.log(this.barnumber);
      // 基于准备好的dom，初始化echarts实例
      let chartObj = myCharts.init(document.getElementById(this.elId));
      window.onresize = chartObj.resize;
      var vm = this;
      // 绘制图表
      chartObj.setOption({
        color: "#67abff",
        width: "auto",
        height: "auto",
        radar: {
          name: {
            textStyle: {
              fontSize: "10",
              color: "#9397AD",
              align: "center"
            },
            lineHeight: 10
          },
          startAngle: 60,
          splitNumber: 3,
          nameGap: 25,
          indicator: [
            { text: this.barnumber[0].name, max: 100 },
            { text: this.barnumber[1].name, max: 100 },
            { text: this.barnumber[2].name, max: 100 },
            { text: this.barnumber[3].name, max: 100 },
            { text: this.barnumber[4].name, max: 100 },
            { text: this.barnumber[5].name, max: 100 }
          ],
          // radius: ["80%", "80%"],
          // center: ["50%", "50%"],
          axisLine: {
            lineStyle: {
              color: "rgba(240,240,247,1)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 0.8,
              color: "rgba(240,240,247,1)" // 设置网格的颜色
            }
          },
          splitArea: {
            areaStyle: {
              normal: {
                width: 1,
                opacity: 0.8
              }
            }
          }
        },
        textStyle: {
          fontSize: 12,
          color: "#000"
        },
        series: {
          type: "radar",
          tooltip: {
            trigger: "item"
          },
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: [
            {
              value: [
                vm.barnumber[0].value,
                vm.barnumber[1].value,
                vm.barnumber[2].value,
                vm.barnumber[3].value,
                vm.barnumber[4].value,
                vm.barnumber[5].value
              ]
            }
          ]
        }
      });
    }
  },
  mounted() {
    this.drawLine();
    // setTimeout(() => {
    // }, 1000);
    //  console.log(this.maintitle);
    //  console.log(this.barnumber);
  }
};
</script>

<style lang="less" scoped>
.radar_title {
  font-family: PingFangSC-Regular;
  font-size: 0.15rem;
  color: #212121;
  letter-spacing: 0;
  text-align: center;

  span {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #9397ad;
    letter-spacing: 0;
    // line-height: 13px;
  }

  // line-height: 15px;
}
</style>