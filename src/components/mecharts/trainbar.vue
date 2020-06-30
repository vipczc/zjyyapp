<template>
  <div class="train_bar">
    <div class="bar_left">
      <p v-for="(item, index) in trainbardata" :key="index">{{item.name}}</p>
    </div>
    <div class="bar_right">
      <div v-for="(item, index) in trainbardata" :key="index" class="bar_right_single">
        <div :style="{ 'width': item.percent*0.03 + 'rem','background' : item.color }" class="bar_right_single_block">
          <p class="percent">{{item.percent}}%</p>
        </div>
        <p class="number">开展{{item.number}}次</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      bardata:{
        type: Array,
        required: true
      }
    },
    data() {
      return {
        trainbardata:[
          {
            name:"小讲课",
            number:30,
            percent:100,
            color:'#395275'
          },
          {
            name:"阅片会",
            number:25,
            percent:60,
            color:'#1976B4'
          },
          {
            name:"疑难病症讨论",
            number:15,
            percent:35,
            color:'#5E7AB8'
          },
          {
            name:"教学查房",
            number:20,
            percent:40,
            color:'#7ED5BC'
          },
          {
            name:"其他",
            number:20,
            percent:20,
            color:'#C9D5EC'
          },
        ],
        colors:[
          {
            color:'#395275'
          },
          {
            color:'#1976B4'
          },
          {
            color:'#5E7AB8'
          },
          {
            color:'#7ED5BC'
          },
          {
            color:'#C9D5EC'
          },
          {
            color:'#239eff'
          }
        ]
      }
    },
    mounted() {
      // console.log(this.bardata);
      var arrs = []
      for (let i = 0; i < 6; i++) {
        arrs.push({
          name:this.bardata[i].traintypename,
          number:this.bardata[i].pxs,
          percent:parseInt(this.bardata[i].bl2 * 100),
          color:this.colors[i].color
        })
      }
      this.trainbardata = arrs
    },
  }
</script>

<style lang="less" scoped>
  .train_bar{
    display: flex;
    align-items: center;
    padding-left: 0.1rem;
    .bar_left{
      margin-right: 0.1rem;
      p{
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        text-align: right;
        margin-bottom: 0.14rem;
        line-height: 0.14rem;
      }
    }
    .bar_right{
      .bar_right_single{
        display: flex;
        align-items: center;
        margin-bottom: 0.14rem;
        .bar_right_single_block{
          height: 0.14rem;
          .percent{
            text-align: center;
            color: #FFFFFF;
          }
        }
        p{
          font-size: 0.11rem;
          line-height: 0.14rem;
        }
        .number{
          font-family: PingFangSC-Regular;
          font-size: 0.11rem;
          margin-left: 0.05rem;
          color: #9397AD;
          letter-spacing: 0;
          // line-height: 11px;
        }
      }
    }
  }
</style>