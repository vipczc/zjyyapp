<template>
  <div class="piebar">
    <div class="radechart">
      <div class="radechart_desc_top">
        <p v-show="maintitle" class="title">{{maintitle}}<span v-show="secondtitle">{{secondtitle}}</span></p>
      </div>
      <div class="pie_single">
        <div style="width:1.2rem;height:1.2rem;margin-right:auto;"> </div>
        <div :id="elId" class="pies" :style="{width: '1.2rem', height: '1.2rem',marginRight: 'auto'}"></div>
        <div v-show="cycletitle == 1" :id="clId" class="cycle" :style="{width: '1.5rem', height: '1.5rem',marginRight: 'auto'}"></div>
        <div class="radechart_desc">
          <div class="radechart_desc_end">      
            <div v-for="(item, index) in barnumber" :key="index" class="radechart_desc_detial">
              <div :style="{background:item.color}" class="block"></div>
              <p class="title">{{item.title}}</p>
              <p v-show="item.number" class="number">{{item.number}}</p>
              <p v-show="item.percent" class="desc">{{item.percent}}</p>
            </div>
            <div v-show="cycletitle == 1" class="radechart_desc_detial">
              <div style="background:#239EFF" class="block"></div>
              <p  class="title">已培训</p>
              <p  class="desc">40人</p>
            </div>
            <div v-show="cycletitle == 1" class="radechart_desc_detial">
              <div style="background:#F9953F" class="block"></div>
              <p  class="title">未培训</p>
              <p  class="desc">5人</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myCharts from "echarts";
import uuidv1 from 'uuid/v1';
export default {
  data() {
    return {
      elId:'',
      clId:'',
      datas:1,
      realdata:[]
    };
  },
  created(){
    this.elId = uuidv1() //获取随机id
    this.clId = uuidv1()
  },
  props: {
    maintitle:{
      type: String,
      required: false
    },
    secondtitle:{
      type: String,
      required: false
    },
    cycletitle:{
      type: Number,
      default:0,
      required:false
    },
    barnumber:{
      type: Array,
      required: true
    },
    middlenumber:{
      type: Number,
      default:0,
      required: false
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let chartObj = myCharts.init(document.getElementById(this.elId));
      let chartObjs = myCharts.init(document.getElementById(this.clId));
      window.onresize = chartObj.resize;
      window.onresize = chartObjs.resize;
      var vm = this
      chartObj.setOption({
        series: [
          {
            type: "pie",
            color: vm.barnumber.length == 3 ? ["#395275", "#5E7AB8","#7ED5BC"] : ["#395275", "#5E7AB8","#C9D5EC","#7ED5BC"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["50%", "100%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: function(params) {
                  return (
                    vm.middlenumber == 0 ? "":vm.middlenumber
                  );
                },
                position: "center",
                show: true,
                textStyle: {
                  fontSize: "15",
                  fontWeight: "normal",
                  color: "#212121"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: vm.realdata
          }
        ]
      });
      chartObjs.setOption({
        series: [
          {
            type: "pie",
            color: ["#239EFF", "#F9953F"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["90%", "100%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: function(params) {
                  return (
                    vm.middlenumber == 1?"5000":"5000"
                  );
                },
                position: "center",
                show: true,
                textStyle: {
                  fontSize: "15",
                  fontWeight: "normal",
                  color: "#212121"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 135, name: "视频广告" }
            ]
          }
        ]
      });
    },
    changeData(){
      var ads = [] 
      for (let i = 0; i < this.barnumber.length; i++) {
        ads.push({
          value:this.barnumber[i].numbers
        })
      }
      this.realdata = ads
    }
  },
  mounted() {
    this.changeData()
    // this.drawLine();
    
  }
};
</script>

<style lang="less" scoped>
.radechart {
  .radechart_desc_top {
    margin-bottom: 0.2rem;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      span{
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #9397AD;
        letter-spacing: 0;
        text-align: center;
        // line-height: 10px;
      }
    }
  }
  .pie_single {
    display: flex;
    align-items: center;
    margin-left: 0.22rem;
    margin-right: 0.22rem;
    position: relative;
  }
  .radechart_desc {
    // position: absolute;
    // margin-left: 0.1rem;
    width: 1.6rem;

    .radechart_desc_end {
      
      .radechart_desc_detial {
        display: flex;
        align-items: center;
        margin-top: 0.15rem;
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
          // width: 0.5rem;
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
        .number{
          font-size: 0.13rem;
          margin-left: 0.1rem;
          font-family: PingFangSC-Regular;
          color: #212121;
          letter-spacing: 0;
          // width: 0.5rem;
        }
      }
      .radechart_desc_detial:nth-child(1){
          margin: 0;
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
</style>