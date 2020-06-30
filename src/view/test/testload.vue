<template>
  <div class="arrowimg">
      <img class="left_img" src="" alt="">
      <div class="right_block">
        <div class="right_block_top">
          <p class="title">最佳评价项</p>
          <p class="desc">（评价平均分98.9）</p>
        </div>
        <div class="single_block">
          <div style="border-right:0.1rem solid #FFF6E2;" class="square"></div>
          <div style="background: #FFF6E2;" class="single_block_right">
            <p>1.热心教学并愿意花足够时间参与住院医师的教学工作<span>（100分，比上月高2分，该项有人120人评分低于60分）</span></p>
          </div>
        </div>
        <div class="single_block">
          <div style="border-right:0.1rem solid #FFF8EA;" class="square"></div>
          <div style="background: #FFF8EA;" class="single_block_right">
            <p>2.能为住院医师创造良好的培训和教学环境<span>（99分，比上个月高5分，该项有人120人评分低于60分）</span></p>
          </div>
        </div>
        <div class="single_block">
          <div style="border-right:0.1rem solid #FFFBF3;" class="square"></div>
          <div style="background: #FFFBF3;" class="single_block_right">
            <p>3.有较好的临床经验和熟练的临床操作技能<span>（98分，比上个月低2分，该项有人120人评分低于60分）</span></p>
          </div>
        </div>
        <div class="single_button">
          <p>展开更多</p>
        </div>
        <div class="single_block">
          <div style="border-right:0.1rem solid #F8FBFF;" class="square"></div>
          <div style="background: #F8FBFF;" class="single_block_right">
            <p>8.有较强的沟通能力，并能与病人及其家属保持健康的医患关系<span>（80分，比上个月低10分，该项有人120人评分低于60分）</span></p>
          </div>
        </div>
        <div class="single_block">
          <div style="border-right:0.1rem solid #EBF5FC;" class="square"></div>
          <div style="background: #EBF5FC;" class="single_block_right">
            <p>9.认真督导住院医师临床工作，致力于培养住院医师的独立工作能力<span>（81分，比上个月低5分，该项有人120人评分低于60分）</span></p>
          </div>
        </div>
        <div class="single_block">
          <div style="border-right:0.1rem solid #E3F1FC;" class="square"></div>
          <div style="background: #E3F1FC;" class="single_block_right">
            <p>10.教学查房和专业讲座准备充分，深入浅出，条理清楚<span>（80分，比上个月高2分，该项有人120人评分低于60分）</span></p>
          </div>
        </div>
        <p class="end_title">最差评价项</p>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .arrowimg{
    display: flex;
    align-items: center;
    .right_block{
      .single_button{
        font-size: 0.1rem;
        margin-bottom: 0.1rem;
        p{
          width: 0.6rem;
          background: #dddddd;
          color: #212121;
          margin: 0 auto;
        }
      }
      .right_block_top{
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        .title{
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #F57C00;
          letter-spacing: 0;
          // line-height: 16px;
        }
        .desc{
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #dddddd;
          letter-spacing: 0;
          margin-left: auto;
        }
      }
      .single_block{
        width: 3rem;
        border-radius: 10px;
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.1rem;
        .single_block_right{
          border-radius: 10px;
        }
        .square{
          width:0;
          height:0;
          border-top:0.1rem solid transparent;
          border-bottom:0.1rem solid transparent;
          border-right:0.1rem solid red;
          margin-top: 0.1rem;
        }
        p{
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          padding-top: 0.08rem;
          padding-bottom: 0.08rem;
          padding-left: 0.1rem;
          padding-right: 0.1rem;
          // line-height: 18px;
        }
        span{
          font-family: PingFangSC-Regular;
          font-size: 0.1rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 18px;
        }
      }
    }
    .end_title{
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #239EFF;
      letter-spacing: 0;
      // line-height: 16px;
    }
  }
</style>