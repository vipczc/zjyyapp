<template>
  <div>
    <header-main :message="'师资培训'"></header-main>
    <div class="train">
      <div class="train_main">
        <div style="margin-bottom:0.15rem" class="train_box">
          <div class="train_box_left">
            <p class="top">{{topdata.pxbl}}</p>
            <p class="bottom">培训比例</p>
          </div>
          <div class="train_box_right">
            <div class="train_right_top">
              <p class="left">师资总数</p>
              <p class="right">{{topdata.szzs}}</p>
            </div>
            <div class="train_right_end">
              <p class="left">已培训人数</p>
              <p class="right">{{topdata.ypxrs}}</p>
            </div>
          </div>
        </div>
        <div class="train_box">
          <div class="train_box_left">
            <p class="top">{{topdata.wcbl}}</p>
            <p class="bottom">完成比例</p>
          </div>
          <div class="train_box_right">
            <div class="train_right_top">
              <p class="left">全年计划培训次数</p>
              <p class="right">{{topdata.jhpxcs}}</p>
            </div>
            <div class="train_right_end">
              <p class="left">已培训次数</p>
              <p class="right">{{topdata.ypxcs}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="trein_end">
        <!-- <img src="../../../assets/images/teachertrain/teachertrain.png" alt=""> -->
        <p class="titles">院内师资培训比例</p>
        <div class="radechart">
          <div
            id="myChart2"
            :style="{width: '1.2rem', height: '1.2rem', marginLeft:'0.4rem',marginRight: 'auto'}"
          ></div>
          <div class="radechart_desc">
            <div class="radechart_desc_end">
              <div class="radechart_desc_detial">
                <div style="background:#395275" class="block"></div>
                <p class="title">2次以上 {{bardata.dcys}}</p>
                <p class="desc">{{bardata.dcysbl}}</p>
              </div>
              <div class="radechart_desc_detial">
                <div style="background:#5E7AB8" class="block"></div>
                <p class="title">2次培训 {{bardata.ccpx}}</p>
                <p class="desc">{{bardata.ccpxbl}}</p>
              </div>
              <div class="radechart_desc_detial">
                <div style="background:#C9D5EC" class="block"></div>
                <p class="title">1次培训 {{bardata.bcpx}}</p>
                <p class="desc">{{bardata.bcpxbl}}</p>
              </div>
              <div class="radechart_desc_detial">
                <div style="background:#7ED5BC" class="block"></div>
                <p class="title">0次培训 {{bardata.acpx}}</p>
                <p class="desc">{{bardata.acpxbl}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="yraybar">
          <p class="title">各基地未培训带教教师人数</p>
          <div class="bartop">
            <p class="yray">0</p>
            <p class="xray">人数</p>
          </div>
          <div class="barmiddle_center">
            <div class="barleft">
              <p v-for="(item, index) in traindata" :key="index">{{item.majorname}}</p>
            </div>
            <div class="barmiddle">
              <div v-for="(item2, index2) in traindata" :key="index2" class="barmiddle_single">
                <div :style="{ 'width': item2.wpxrs*0.1 + 'rem','background': item2.wpxrs > 10 ? '#F9953F':'#FDD5B2'}" class="block"></div>
                <p>{{item2.wpxrs}}</p>
              </div>
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
  querytrainOfTeacherdata,
  querytrainOfTeacherdata2,
  querytrainOfTeacherdata3
} from "../../../api/teachertrain";
import myCharts from "echarts";
export default {
  data() {
    return {
      traindata: [
        {
          name: "内科基地",
          number: 249,
          color: "#E28A4A"
        },
        {
          name: "外科基地",
          number: 200,
          color: "#E6A062"
        },
        {
          name: "妇产科基地",
          number: 30,
          color: "#ECB987"
        },
        {
          name: "全科基地",
          number: 15,
          color: "#F2CEAE"
        },
        {
          name: "儿科基地",
          number: 7,
          color: "#F7E8D7"
        }
      ],
      bardata: [
        {
          color: "#395275",
          title: "2次以上",
          number: "128",
          percent: "95%"
        },
        {
          color: "#5E7AB8",
          title: "2次培训",
          number: "26",
          percent: "1.93%"
        },
        {
          color: "#C9D5EC",
          title: "1次培训",
          number: "15",
          percent: "1.11%"
        },
        {
          color: "#7ED5BC",
          title: "0次培训",
          number: "23",
          percent: "1.70%"
        }
      ],
      topdata: "",
      slecetdata:[]
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = myCharts.init(document.getElementById("myChart2"));
      // let myChart3 = myCharts.init(document.getElementById("myChart3"));
      // let myChart4 = myCharts.init(document.getElementById("myChart4"));
      window.onresize = myChart.resize;
      var vm = this;
      // window.onresize = myChart3.resize;
      // window.onresize = myChart4.resize;
      // 绘制图表
      myChart.setOption({
        series: [
          {
            type: "pie",
            color: ["#395275", "#5E7AB8", "#C9D5EC", "#7ED5BC"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["40%", "100%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            formatter: function(name) {
              console.log(vm.slecetdata);
            },
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
            data: vm.slecetdata
          }
        ]
      });
    }
  },
  mounted() {
   
    querytrainOfTeacherdata().then(res => {
      this.topdata = JSON.parse(res).data;
    });
    querytrainOfTeacherdata2().then(res => {
      // console.log(JSON.parse(res).data.dcys);
      this.bardata = JSON.parse(res).data;
      this.slecetdata.push({
        name:"2次以上",
        value:parseInt(JSON.parse(res).data.dcys)
      })
      this.slecetdata.push({
        name:"2次培训",
        value:parseInt(JSON.parse(res).data.ccpx)
      })
      this.slecetdata.push({
        name:"1次培训",
        value:parseInt(JSON.parse(res).data.bcpx)
      })
      this.slecetdata.push({
        name:"0次培训",
        value:parseInt(JSON.parse(res).data.acpx)
      })
      console.log(this.slecetdata);
      this.drawLine();  
      // parseInt
    });
    querytrainOfTeacherdata3().then(res => {
      this.traindata = JSON.parse(res).majornottrainteacherlist;
    });
     
  },
  components: {
    "header-main": mainHeader,
    piebar
  }
};
</script>

<style lang="less" scoped>
.train {
  position: absolute;
  width: 100%;
}
.train_main {
  // margin-top: 0.2rem;
  margin-bottom: 0.1rem;
  margin-left: 0.15rem;
  margin-right: 0.15rem;
  .train_box {
    // width: 3.45rem;
    height: 0.7rem;
    background: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    .train_box_left {
      margin-top: 0.11rem;
      margin-bottom: 0.12rem;
      border-right: 1px solid #f0f0f7;
      margin-left: 0.37rem;
      padding-right: 0.36rem;
      width: 0.52rem !important;
      .top {
        font-family: PingFangSC-Medium;
        font-size: 0.24rem;
        color: #277fff;
        letter-spacing: 0;
        line-height: 0.24rem;
      }
      .bottom {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.13rem;
        margin-top: 0.1rem;
        width: 60px;
      }
    }
    .train_box_right {
      margin-left: 0.3rem;
      margin-right: 0.38rem;
      width: 100%;
      .train_right_top {
        display: flex;
        align-items: center;
        padding-bottom: 0.08rem;
        .left {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          line-height: 0.13rem;
          margin-right: auto;
        }
        .right {
          font-family: PingFangSC-Medium;
          font-size: 0.13rem;
          color: #ffbc2e;
          letter-spacing: 0;
          line-height: 0.15rem;
        }
      }
      .train_right_end {
        display: flex;
        align-items: center;
        padding-top: 0.08rem;
        .left {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          line-height: 0.13rem;
          margin-right: auto;
        }
        .right {
          font-family: PingFangSC-Medium;
          font-size: 0.13rem;
          color: #ffbc2e;
          letter-spacing: 0;
          line-height: 0.15rem;
        }
      }
    }
  }
}
.train_desc {
  margin-left: 0.15rem;
  margin-right: 0.15rem;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.15rem;
    margin-bottom: 0.17rem;
  }
  .train_echart {
    display: flex;
    align-items: center;
    img {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.4rem;
      margin-left: 0.1rem;
    }
    .train_echart_right {
      .train_echart_desc {
        display: flex;
        align-items: center;
        padding-bottom: 0.065rem;
        padding-top: 0.065rem;
        .box {
          width: 0.14rem;
          height: 0.14rem;
        }
        .type {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          line-height: 0.13rem;
          margin-left: 0.1rem;
        }
        .percin {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #9397ad;
          letter-spacing: 0;
          line-height: 0.13rem;
        }
      }
    }
  }
}
.train_people {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.15rem;
    margin-top: 0.2rem;
  }
  .people_number {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #9397ad;
    letter-spacing: 0;
    line-height: 0.13rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .title_table {
    display: flex;
    align-items: flex-end;
    width: 3.25rem;
    height: 1.41rem;
    border-left: 1px solid #d7dde4;
    border-bottom: 1px solid #d7dde4;
    .train_table_single {
      margin-right: 0.48rem;
      .train_single {
        width: 0.16rem;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        letter-spacing: 0;
        text-align: center;
        line-height: 0.13rem;
        margin-bottom: 0.1rem;
      }
      .origin {
        color: #f57c00;
      }
      .blue {
        color: #277fff;
      }
      .div_origin {
        background-image: linear-gradient(0deg, #ffe482 0%, #f76b1c 100%);
        border-radius: 10px 10px 0 0;
        border-radius: 10px 10px 0px 0px;
      }
      .div_blue {
        background-image: linear-gradient(180deg, #277fff 0%, #81e7ff 100%);
        border-radius: 10px 10px 0 0;
        border-radius: 10px 10px 0px 0px;
      }
    }
  }
  .train_end {
    display: flex;
    align-items: center;
    margin-left: 0.09rem;
    width: 100%;
    margin-top: 0.1rem;
    .train_end_single {
      margin-right: 0.4rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        color: #9397ad;
        letter-spacing: 0;
        text-align: center;
        line-height: 0.13rem;
      }
    }
  }
}
.trein_end {
  padding-top: 0.1rem;
  background: #ffffff;
  // width: 3.45rem;
  display: block;
  // margin: 0 auto;
  margin-bottom: 0.3rem;
  border-radius: 5px;
  .titles {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
    // margin-top: 0.2rem;
    // margin-bottom: 0.15rem;
  }
  img {
    width: 90%;
    display: block;
    margin: 0 auto;
  }
  .yraybar {
    .title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      // line-height: 15px;
      margin-top: 0.2rem;
      margin-bottom: 0.15rem;
    }
    .bartop {
      width: 3.08rem;
      display: flex;
      align-items: center;
      margin-left: 0.57rem;
      margin-bottom: 0.09rem;
      .xray {
        margin-left: auto;
        margin-right: 0.23rem;
      }

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        // line-height: 13px;
      }
    }
    .barmiddle_center {
      display: flex;
      align-items: flex-start;
      .barleft {
        width: 0.57rem;

        p {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #9397ad;
          letter-spacing: 0;
          text-align: center;
          // line-height: 13px;
          width: 0.36rem;
          margin: 0 auto;
          margin-top: 0.11rem;
          height: 0.42rem;
        }
      }
      .barmiddle {
        width: 3.08rem;
        // height: 2.72rem;
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
        .barmiddle_single {
          display: flex;
          align-items: center;
          .block {
            height: 0.42rem;
            // width: 2.72rem;
            // background: #212121;
            margin-top: 0.11rem;
          }
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.12rem;
            color: #212121;
            letter-spacing: 0;
            margin-left: 0.05rem;
            // line-height: 12px;
          }
        }
      }
    }
  }
}
.radechart {
  display: flex;
  align-items: center;
padding-top: 0.2rem;
  .radechart_desc_top {
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    margin-left: 0.1rem;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 13px;
    }
    .number {
      margin-left: 0.05rem;
      font-family: PingFangSC-Regular;
      font-size: 0.2rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 20px;
    }
  }
  .radechart_desc {
    position: absolute;
    // margin-left: 0.1rem;
    width: 1.6rem;
    right: 0.4rem;
    .radechart_desc_end {
      .radechart_desc_detial {
        display: flex;
        align-items: center;
        margin-bottom: 0.15rem;
        .block {
          width: 0.14rem;
          height: 0.14rem;
          background: #333333;
        }
        .title {
          font-size: 0.13rem;
          margin-left: 0.1rem;
          font-family: PingFangSC-Regular;
          color: #212121;
          letter-spacing: 0;
        }
        .desc {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #9397ad;
          letter-spacing: 0;
          text-align: center;
          // line-height: 10px;
          margin-left: auto;
        }
      }
    }
  }
}
</style>