<template>
  <div>
    <header-main :message="'师资介绍'"></header-main>
    <div class="teacherintroduce">
      <div class="teacher_introduce">
        <!-- <piebar
          :maintitle="'带教医师职称分布比例'"
          :barnumber="bardata1"
          style="padding-top: 0.2rem;padding-bottom:0.2rem"
        ></piebar>-->
        <div class="barpie">
          <p class="toptitle">带教医师职称分布比例</p>
          <div id="myChart2" :style="{ height: '1.2rem'}"></div>
        </div>
        <!-- <piebar :maintitle="'带教医师教龄分布比例'" :barnumber="bardata2" style="padding-top: 0.2rem;padding-bottom:0.2rem;border-bottom: 1px solid #F0F0F7;"></piebar> -->
        <!-- <div style="height: 2.2rem;" class="barpie"> -->
          <!-- <p class="toptitle">带教医师培训比例</p> -->
          <!-- <div class="piecenter"> -->
          <!-- <div id="myChart" class="pies" :style="{width: '1.2rem', height: '1.2rem',marginRight: 'auto'}"></div> -->
          <!-- <div id="myChart1" class="cycle" :style="{width: '100%', height: '1.5rem',marginRight: 'auto'}"></div> -->
          <!-- <div style="position: absolute;right: 10px;">
            <div style="margin:0" class="radechart_desc_detial">
              <div style="background: #239EFF;" class="block"></div>
              <p  class="titles">已培训</p>
              <p  class="descs">{{bardata2.ypx}}人</p>
            </div>
            <div class="radechart_desc_detial">
              <div style="background: #F9953F;" class="block"></div>
              <p  class="titles">未培训</p>
              <p  class="descs">{{bardata2.wpx}}人</p>
            </div>
            <div class="radechart_desc_detial">
              <div style="background: #395275;" class="block"></div>
              <p  class="titles">培训1次</p>
              <p  class="descs">{{bardata2.px1c}}人</p>
            </div>
            <div class="radechart_desc_detial">
              <div style="background: #5E7AB8;" class="block"></div>
              <p  class="titles">培训2次</p>
              <p  class="descs">{{bardata2.px2c}}人</p>
            </div>
            <div  class="radechart_desc_detial">
              <div style="background: #7ED5BC;" class="block"></div>
              <p  class="titles">培训2次以上</p>
              <p  class="descs">{{bardata2.px2cys}}人</p>
            </div>
          </div> -->
          <!-- </div> -->
          
        <!-- </div> -->
        <!-- <piebar
          :maintitle="'带教医师培训比例'"
          :barnumber="bardata3"
          :cycletitle="1"
          style="padding-top: 0.2rem;padding-bottom:0.2rem"
        ></piebar> -->
      </div>
      <div class="teacher_end">
        <p class="title">带教医师带教人数分布</p>
        <!-- <div class="top">
                    <p class="desc">总带教人数</p>
                    <p class="number">40000</p>
        </div>-->
        <div class="end">
          <div class="end_top">
            <div class="top_left">
              <p>人数</p>
            </div>
            <div class="top_right" >
              <div :style="{height:item2.rs * 0.0004 + 'rem'}" class="block"  v-for="(item2, index2) in teacherdata" :key="index2" >
                <p>{{item2.rs}}</p>
              </div>
              <!-- <div :style="{height:teacherdata.rs * 0.004 + 'rem'}" class="block">
                <p>20</p>
              </div>
              <div :style="{height:teacherdata.rs * 0.004 + 'rem'}" class="block">
                <p>{{teacherdata.rs}}</p>
              </div>
              <div :style="{height:teacherdata.rs * 0.004 + 'rem'}" class="block">
                <p>{{teacherdata.rs}}</p>
              </div>
              <div :style="{height:teacherdata.rs * 0.004 + 'rem'}" class="block">
                <p>{{teacherdata.rs}}</p>
              </div>
              <div :style="{height:teacherdata.rs * 0.004 + 'rem'}" class="block">
                <p>{{teacherdata.rs}}</p>
              </div> -->
            </div>
          </div>
          <div class="end_end">
            <div class="end_left">
              <p>带教</p>
              <p>人次</p>
            </div>
            <div class="end_right">
              <p v-for="(item2, index2) in teacherdata" :key="index2" >{{item2.range1}}-<span >{{item2.range2}}</span></p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import piebar from "../../../components/mecharts/piebar.vue";
import {
  queryTeacherTitledistribution,
  queryTeacheTeachingsum,
  queryTrainOfteacherdata4
} from "../../../api/introduce";
import myCharts from "echarts";
export default {
  data() {
    return {
      teacherdata: [
        {
          type: "<2",
          number: 40
        },
        {
          type: "3-5",
          number: 40
        },
        {
          type: "6-8",
          number: 43
        },
        {
          type: "9-11",
          number: 38
        },
        {
          type: "12-14",
          number: 37
        },
        {
          type: ">15",
          number: 39
        }
      ],
      teacherdata2: [
        {
          type: "<2",
          number: 40
        },
        {
          type: "3-5",
          number: 40
        },
        {
          type: "6-8",
          number: 43
        },
        {
          type: "9-11",
          number: 38
        },
        {
          type: "12-14",
          number: 37
        },
        {
          type: ">15",
          number: 39
        }
      ],
      bardata2: [
        {
          color: "#395275",
          title: "3年以下医师",

          percent: "50人"
        },
        {
          color: "#5E7AB8",
          title: "3-5年医师",

          percent: "40人"
        },
        {
          color: "#C9D5EC",
          title: "5-10年医师",

          percent: "40人"
        },
        {
          color: "#7ED5BC",
          title: "10年以上医师",

          percent: "20人"
        }
      ],
      bardata3: [
        {
          color: "#395275",
          title: "培训1次",

          percent: "40人"
        },
        {
          color: "#5E7AB8",
          title: "培训2次",

          percent: "20人"
        },
        {
          color: "#7ED5BC",
          title: "培训2次以上",

          percent: "20人"
        }
      ],
      seriesData: [],
      bardata: "",
      bardata2:"",
      middlenumber:0,
      cycledata:[],
      cycledata2:[]
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = myCharts.init(document.getElementById("myChart2"));
      // let myChart3 = myCharts.init(document.getElementById("myChart3"));
      // let myChart4 = myCharts.init(document.getElementById("myChart4"));
      window.onresize = myChart.resize;
      // let chartObj = myCharts.init(document.getElementById("myChart"));
      // let chartObjs = myCharts.init(document.getElementById("myChart1"));
      // window.onresize = chartObj.resize;
      // window.onresize = chartObjs.resize;
      var vm = this;
      // window.onresize = myChart3.resize;
      // window.onresize = myChart4.resize;
      // 绘制图表
      myChart.setOption({
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 20,
          top: 20,
          selectedMode: false,
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 15,
          formatter: function(name) {
            let target;
            for (let i = 0; i < vm.seriesData.length; i++) {
              if (vm.seriesData[i].name === name) {
                target = vm.seriesData[i].value;
              }
            }
            let arr = ["{a|" + name + "}" + "{b|" + target + "人}"];
            return arr;
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 13,
                color: "#212121",
                // padding:15
                padding: [0, 15, 0, 0]
              },
              b: {
                fontSize: 13,
                color: "#9397ad"
              }
            }
          }
        },
        series: [
          {
            type: "pie",
            // color: ["#395275", "#5E7AB8", "#C9D5EC", "#7ED5BC"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["50%", "100%"],
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
      // chartObj.setOption({
      //   series: [
      //     {
      //       type: "pie",
      //       color: ["#395275", "#5E7AB8", "#7ED5BC"],
      //       legendHoverLink: false,
      //       hoverAnimation: false,
      //       radius: ["50%", "100%"],
      //       center: ["50%", "50%"],
      //       avoidLabelOverlap: false,
      //       label: {
      //         normal: {
      //           show: true,
      //           position: "center",
      //           formatter: function(params) {
      //             return (
      //               vm.middlenumber 
      //             );
      //           },
      //           position: "center",
      //           show: true,
      //           textStyle: {
      //             fontSize: "15",
      //             fontWeight: "normal",
      //             color: "#212121"
      //           }
      //         }
      //       },
      //       labelLine: {
      //         normal: {
      //           show: false
      //         }
      //       },
      //       data: [
      //         {
      //           name:"培训1次",
      //           value:vm.bardata2.px1c
      //         },
      //         {
      //           name:"培训2次",
      //           value:vm.bardata2.px2c
      //         },
      //         {
      //           name:"培训2次以上",
      //           value:vm.bardata2.px2cys
      //         }
      //       ]
      //     }
      //   ]
      // });
      // chartObjs.setOption({
      //   // legend: {
      //   //   type: "scroll",
      //   //   orient: "vertical",
      //   //   right: 0,
      //   //   top: 20,
      //   //   selectedMode: false,
      //   //   itemWidth: 14,
      //   //   itemHeight: 14,
      //   //   itemGap: 15,
      //   //   formatter: function(name) {
      //   //     let target;
      //   //     for (let i = 0; i < vm.seriesData.length; i++) {
      //   //       if (vm.seriesData[i].name === name) {
      //   //         target = vm.seriesData[i].value;
      //   //       }
      //   //     }
      //   //     let arr = ["{a|" + name + "}" + "{b|" + target + "人}"];
      //   //     return arr;
      //   //   },
      //   //   textStyle: {
      //   //     rich: {
      //   //       a: {
      //   //         fontSize: 13,
      //   //         color: "#212121",
      //   //         // padding:15
      //   //         padding: [0, 15, 0, 0]
      //   //       },
      //   //       b: {
      //   //         fontSize: 13,
      //   //         color: "#9397ad"
      //   //       }
      //   //     }
      //   //   }
      //   // },
      //   series: [
      //     {
      //       type: "pie",
      //       color: ["#239EFF", "#F9953F"],
      //       legendHoverLink: false,
      //       hoverAnimation: false,
      //       radius: ["90%", "96%"],
      //       center: ["24%", "50%"],
      //       avoidLabelOverlap: false,
      //       label: {
      //         normal: {
      //           show: false,
      //           position: "center",
      //           formatter: function(params) {
      //             return (
      //               vm.middlenumber == 1?"":""
      //             );
      //           },
      //           position: "center",
      //           show: true,
      //           textStyle: {
      //             fontSize: "15",
      //             fontWeight: "normal",
      //             color: "#212121"
      //           }
      //         }
      //       },
      //       labelLine: {
      //         normal: {
      //           show: false
      //         }
      //       },
      //       data: [
      //         {
      //           name:"已培训",
      //           value:vm.bardata2.ypx
      //         },
      //         {
      //           name:"未培训",
      //           value:vm.bardata2.wpx
      //         }
      //       ]
      //     }
      //   ]
      // });
    }
  },
  mounted() {
    // this.drawLine()
    queryTeacheTeachingsum().then(res => {
      // console.log(JSON.parse(res));
      this.teacherdata = JSON.parse(res).teacheteachingsum;
    });
    queryTrainOfteacherdata4().then(res => {
      // console.log(JSON.parse(res).data);
      this.bardata2 = JSON.parse(res).data;
      this.middlenumber = parseInt(JSON.parse(res).data.ypx) + parseInt(JSON.parse(res).data.wpx) 
    })
    queryTeacherTitledistribution().then(res => {
        // console.log(JSON.parse(res));
      this.bardata = JSON.parse(res).titlelist;
      for (let i = 0; i < this.bardata.length; i++) {
        this.seriesData.push({
          name: this.bardata[i].professionaltitle,
          value: this.bardata[i].rs
        });
      }
      this.drawLine();
    });
    
  },
  components: {
    "header-main": mainHeader,
    piebar
  }
};
</script>

<style lang="less" scoped>
.teacherintroduce {
  position: absolute;
  width: 100%;
  .teacher_introduce {
    width: 3.55rem;
    background: #ffffff;
    // position: absolute;
    border-radius: 5px;
    margin: 0 auto;
    .barpie {
      height: 2rem;
      .toptitle {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        padding-top: 0.1rem;
        margin-bottom: 0.1rem;
      }
      .piecenter{
        display: flex;
    align-items: center;
    margin-left: 0.22rem;
    margin-right: 0.22rem;
    position: relative;
    top: 0.8rem;
      }
    }
  }
}
.teacher_end {
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .top {
    display: flex;
    align-items: center;
    margin-left: 0.3rem;
    margin-bottom: 0.2rem;
    .desc {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 13px;
    }
    .number {
      font-family: PingFangSC-Regular;
      font-size: 0.2rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 20px;
      margin-left: 0.1rem;
    }
  }
  .end {
    width: 3.15rem;
    margin: 0 auto;
    margin-bottom: 0.21rem;
    .end_top {
      display: flex;
      align-items: flex-end;
      .top_left {
        height: 1.47rem;
        width: 0.31rem;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 13px;
        }
      }
      .top_right {
        height: 1.48rem;
        width: 2.83rem;
        border-left: 1px solid #d7dde4;
        border-bottom: 1px solid #d7dde4;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        .block {
          width: 0.16rem;
          // height: 1.2rem;
          // transform: scaleY(-1) rotate(-180deg);
          background: #239eff;
          position: relative;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #239eff;
            letter-spacing: 0;
            text-align: center;
            // line-height: 13px;
            position: absolute;
            top: -0.2rem;
          }
        }
      }
    }
    .end_end {
      display: flex;
      align-items: flex-start;
      .end_left {
        width: 0.31rem;
        height: 0.31rem;
        border-top: 1px solid #d7dde4;
        border-right: 1px solid #d7dde4;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 13px;
        }
      }
      .end_right {
        display: flex;
        align-items: flex-start;
        width: 2.83rem;
        justify-content: space-around;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.11rem;
          color: #9397ad;
          letter-spacing: 0;
          text-align: center;
          // line-height: 11px;
        }
      }
    }
  }
}
.cycle{
  position: absolute;

}
.pies{
  position: absolute;
  left: 0.14rem;
}
.radechart_desc_detial {
        display: flex;
        align-items: center;
        margin-top: 0.15rem;
        .block {
          width: 0.14rem;
          height: 0.14rem;
          background: #333333;
          border-radius: 4px;
        }
        
        .titles {
          font-size: 0.13rem;
          margin-left: 0.1rem;
          font-family: PingFangSC-Regular;
          color: #212121;
          letter-spacing: 0;
          // width: 0.5rem;
        }
        .descs {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #9397ad;
          letter-spacing: 0;
          text-align: center;
          // line-height: 10px;
          margin-left: auto;
        }
        .number{
          font-size: 0.13rem;
          margin-left: 0.1rem;
          font-family: PingFangSC-Regular;
          color: #212121;
          letter-spacing: 0;
          // width: 0.5rem;
        }
      }
</style>