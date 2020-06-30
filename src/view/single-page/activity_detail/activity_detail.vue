<template>
  <div>
    <header-main :message="'活动详情'"></header-main>
    <div class="activity">
      <div v-if="this.$route.query.type == 1" class="activity_mian">
        <div v-show="routeid == item.id" v-for="(item, index) in historydata" :key="index" v-html="item.content"></div>
      </div>
      <div v-else class="activity_mian">
        <div v-show="routeid == item.id" v-for="(item, index) in threedata" :key="index" v-html="item.content"></div>
      </div>
      <!-- <div v-show="this.$route.query.type == 1" class="activity_mian">
        <p class="title">第七期全国住院医师规范化培训专业基地教学主任轮训班</p>
        <p class="time">原创： 浙二教学部  广济教学  1周前</p>
        <p class="news">
          2019年8月1日-4日，浙大二院成功举办第七期全国住院医师规范化培训专业基地教学主任轮训班。此次轮训班邀请了国内住培权威专家和领导，旨在为全国各专业基地的教学主任详细解读国家政策，进一步提高临床教学、教学考评、组织管理等能力，提供交流教学经验、探讨质量改进的平台。来自全国20个省份76家培训基地23个培训专业的131名教学主任参加了此次轮训。课程设计合理，内容丰富；专家备课充实，讲解详实；学员全神贯注，收获满满。
        </p>
        <p class="news">
          中国医师协会毕教部邢立颖副主任以“我国住院医师规范化培训制度建设存在问题与对策”为主题，从行业协会的角度介绍了全国住培工作成效显著，但同时仍面临诸多问题与挑战。
        </p>
        <img src="../../../assets/images/activity/640.jpeg" alt="">
        <p class="news">浙大二院吴志英副院长以“老院新枝，文化引领”为主题，从历史沿革、医院文化、医院愿景、推动创新等方面向各位教学主任详细介绍了浙大二院近年来为推动住院医师规范化培训建设、提高住院医师培训质量、完善住院医师规范化培训体系等工作所作出的努力和成果。</p>
        <img src="../../../assets/images/activity/641.jpeg" alt="">
        <p class="news"> 吴院长还代表浙大二院对国家卫生健康委科教司、中国医师协会以及各位同仁同道对此次轮训班的支持与贡献表示衷心感谢，对各位专家、教学主任们的到来表示热烈欢迎！各位教学主任为了努力提高住院医师规范化培训质量这一共同愿景齐聚一堂，与专家、同行交流学习新理念、新方法、新手段，收获颇丰。</p>
        <p class="news">浙大二院教学部谢小洁主任以“齿轮精神与广济传奇——论住培基地与专业基地的有效运作”，为各位教学主任详细介绍了浙大二院住培组织架构、管理体系，并将住培工作形象的比喻成齿轮间的高效运转，为大家展示了浙大二院住培工作的特色亮点以及显著成果。浙大二院教学部副主任张冯江对“职能部门与专业基地联动中的信息化管理和质控”进行了全面的展示；内科基地教学主任薛静从专业基地角度出发，分享了从教学主任视角谈基地住培管理的经验。教学主任们均表示受益颇多，进行了深入的思考与探讨。</p>
        <img src="../../../assets/images/activity/642.jpeg" alt="">
        <p class="news">北京大学第一医院、北京协和医院、北大人民医院、复旦大学附属华山医院等全国各地知名住培专家结合自己实际工作经验，从住培的培训、管理、考核等多方面做了精彩的授课。轮训班理论课程期间，会议现场座无虚席，学员专心致志、聚精会神，积极与授课专家探讨疑惑、与其他学员交流心得，现场学习气氛浓厚。</p>
        <img src="../../../assets/images/activity/643.jpeg" alt="">
        <p class="news">此外，本次轮训班还安排了特色工作坊，内容涵盖擂台式教学查房、住院医师情景模拟课程设计和反馈、广济医影分层递进培养模式，由浙大二院急诊科、麻醉科、放射科6位医师及教学秘书进行授课。工作坊设置不但体现了浙大二院广济育人的文化，还满足来自临床、医技科室教学主任的多方面需求，获得学员一致好评。</p>
        <img src="../../../assets/images/activity/644.jpeg" alt="">
        <p class="news">轮训班理论课程精彩纷呈，医院实践课程同样高潮迭起。浙大二院内科、骨科、放射科、五官科、急诊科、麻醉科6个专业基地勇担此次医院临床实践教学重任。通过基地建设介绍、特色教学方法展示、临床实践技能带教、学员交流汇报四个模块详细向各位学员展示了6个专业基地的浙二特色。内科专业基地临床实践以心内科为重点，分享了在培训教学管理中的信息化管理经验，并且还有现场胸腔穿刺操作技实时反馈评分等实战环节。</p>
        <p class="news">经过四天的培训，每个小组派出代表进行总结汇报。教学主任们纷纷表示此次轮训班课程设计合理、形式多样，专家答疑解惑仿佛拨云见日，受益匪浅,满载而归。并且表示想要将此次所学所得带回工作岗位，不断为提高住院医师培养质量而努力。轮训班结束后，学员纷纷留下对此次轮训班的感言，感恩感激感谢之情溢于言表。</p>
        <img src="../../../assets/images/activity/645.jpeg" alt="">
        <p class="news">本次轮训班在中国医师协会毕教部邢立颖副主任及浙江大学医学院耿晓北教授的全程监管、以及浙大二院教学部谢小洁主任、张冯江主任、临床技能中心唐碧云主任的精心组织管理下成功召开，也是所有会务组成员全程不辞劳苦、尽职尽责的工作成果。</p>
        <img src="../../../assets/images/activity/646.jpeg" alt="">
        <p class="news"> 今年恰逢浙大二院150周年院庆，150年的悠久历史奠定了浙大二院深厚的文化底蕴和丰富的教学经验，同时也奠定了本次全国教学主任轮训班成功的基石。通过本次轮训班的学习交流，将继续推动住院医师规范化培训质量持续提升。</p>
      </div>
      <div v-show="this.$route.query.type == 2" class="activity_mian">
        <p class="title">改变思维方式 重塑医患关系——浙大二院“巴林特小组”培训圆满结束</p>
        <p class="time">原创： 教学部  浙江大学医学院附属第二医院  5天前</p>
        <p class="news">为进一步贯彻落实全国高校思想政治工作会议精神和《中共中央国务院关于加强和改进新形势下高校思想政治工作的意见》，构建高质量的思想政治工作模式，着力培养德智体劳美全面发展、具有全球竞争力的高素质创新人才，浙大二院高度关注医学研究生的心理状态，开展“广济巴林特”团体心理辅导项目。</p>
        <p class="news">“巴林特小组”在欧美国家被广泛运用于训练临床医务人员处理医患关系，提升医务人员的心理调节能力、缓解职业压力等，国内目前只有少数医院开展“巴林特小组”活动。</p>
        <p class="news">浙大二院于2019年8月16日至18日，组织开展了首期“巴林特小组”组长培训，为后期开展“巴林特小组”活动储备骨干师资队伍。</p>
        <img src="../../../assets/images/activity/moreactive/640.jpeg" alt="">
        <p class="news">全国知名心理培训专家陈华老师应邀作为此次“巴林特小组”组长培训的讲者，参加本次培训的学员有来自浙大二院的医务人员、行政人员和医学研究生，也有来自浙大一院、省口腔医院、省妇产科医院等兄弟医院的同仁。本次培训活动形式丰富，内容详实，授课生动，学员认真倾听，积极参与，氛围活跃。</p>
        <img src="../../../assets/images/activity/moreactive/641.jpeg" alt="">
        <p class="img_desc">01.“巴林特小组”的起源</p>
        <p class="news">培训伊始，陈华老师介绍了“巴林特小组”的起源，以及在复旦大学附属中山医院十年来组织“巴林特小组”活动的宝贵经验。之后学员们在陈华老师的带领下开始了第一次“金鱼缸”演练。学员们分为圈内的参与者和圈外的观察者，第一位案例提供者分享了自己亲身经历的医疗故事，其他学员则作为不同身份的当事人，站在各自的立场，以第一人称的口吻表达自己的观点和感受。期间陈华老师作为组长积极引导学员们发言，气氛十分和谐融洽。</p>
        <img src="../../../assets/images/activity/moreactive/642.jpeg" alt="">
        <p class="img_desc">02.医疗中的人文关怀</p>
        <p class="news">“金鱼缸”演练后，陈华老师便教授学员学习“雕塑”技术。学员们通过不同的角色扮演以及体会自己扮演角色的改变，更加深刻地体会到医疗中人文关怀的重要性。案例提供者表示：“自从事情发生后，我一直很内疚自责，但通过‘巴林特小组’这种独特的形式，以及‘雕塑’技术的演练，我的心理真的发生了很大转变，感觉心里轻松多了。”</p>
        <img src="../../../assets/images/activity/moreactive/643.jpeg" alt="">
        <p class="img_desc">03.标准答案or一种思维方式</p>
        <p class="news">在感受过“巴林特小组”讨论和“雕塑”的神奇魅力之后，学员们跃跃欲试，许多学员提出想当组长。陈华老师首先教授担任组长的基本技能，强调“巴林特小组”的安全性原则，随后组织组长和协同组长进行了多场“巴林特小组”演练。</p>
        <p class="news">随着培训的深入，学员们的讨论也更热烈起来，如“在开展活动时如何挑选参与者”、“如何控制时间”、“如何区别普通座谈会和‘巴林特小组’”等。陈华老师详细地一一作了解答，并提出了开展活动需要特别注意的细节，如安全性原则，不提建议原则等。针对学员提出“‘巴林特小组’似乎是一个情感宣泄平台而非问题解决平台”这一问题，陈华老师表示：“巴林特小组”并不会提供解决问题的标准答案，更多的是让小组成员领悟到处理医患关系的一种思维方式。</p>
        <img src="../../../assets/images/activity/moreactive/644.jpeg" alt="">
        <p class="img_desc">04.真实案例演练</p>
        <p class="news">培训最后一天，学员们都基本掌握了“巴林特小组”的流程，组长和协同组长均能独当一面，带领“巴林特小组”很顺利地完成每场活动。在最后一场“巴林特小组”演练中，一位医学研究生带来一个案例：当患者家属面对家人死亡，情绪失控时，该如何进行医疗谈话？组长和协同组长将“金鱼缸”和“雕塑”技术融合，还原案例现场，小组成员纷纷被带入角色，经历了一场“死亡”与集体潜意识“离别”的碰撞，不少学员情感被深深卷入，感触良多。</p>
        <p class="news">有医生坦言“下次碰到很不和谐的医患关系时，会尽量多从自己的角度去做改变。而且通过和大家的分享，知道自己并不是孤独的个体，而是有一个群体在做自己的后盾，会坚强很多。”有医学研究生也表示“能参加此次培训，甚是有幸，心存感激。在以后的医学生涯中一定会努力去改变自己，去和患者多沟通，这对从医之路大有裨益。”行政人员也表示“通过这次培训，让我更理解了医务工作者的不易，也加深了对心理学的理解，原来心理学可以这么神奇地影响我们！”</p>
        <p class="news">陈华老师总结道，“巴林特小组”为医务人员提供一个安全自由和包容的环境，同时也为大家提供了一种新的视角、新的思维方式，去探讨医患关系中容易忽视的问题。它不是为大家提供具体的解决方案，也不是传统意义上的心理治疗小组，而是为了让我们在探讨别人案例的同时，能联系自己的实际情况，进而逐步形成“新视野、新思维、新感受”，在下一次面临紧张的医患关系的时候，多一种选择。</p>
        <img src="../../../assets/images/activity/moreactive/645.jpeg" alt="">
        <img src="../../../assets/images/activity/moreactive/646.jpeg" alt="">
        <img src="../../../assets/images/activity/moreactive/647.jpeg" alt="">
        <p class="news">在闭幕式上，陈华老师和禹华良副主任共同为本次参与的学员颁发培训证书。禹华良副主任阐述了对“巴林特小组”的理解：“巴林特小组”并非是用传统意义上的说教方式来培训学员，而是用心理学的方式让参与的学员自己去领悟；并非一种心理治疗的手段，而是提供一个可以自我觉知的情绪释放平台。</p>
        <img src="../../../assets/images/activity/moreactive/648.jpeg" alt="">
        <img src="../../../assets/images/activity/moreactive/649.jpeg" alt="">
        <img src="../../../assets/images/activity/moreactive/650.jpeg" alt="">
        <p class="news">“巴林特小组”就像一颗种子，播种在了浙大二院这片土地上，它将在这里生根、发芽，茁壮成长，并开出绚烂的花朵！</p>
        <p class="news">“广济巴林特”是广济医学人文教育体系的重要部分。今后浙大二院将会定期举办“巴林特小组”活动，让我们一起倾诉医者心声，回忆医路初心；听医患故事，汇成长心路；相聚巴林特，相伴医路缘！</p>
      </div> -->
      <!-- <div class="activity_desc">
        <p>相关资料</p>
        <div v-show="this.$route.query.type == 1">
          <img src="../../../assets/images/activity/activity2.png" alt />
          <img src="../../../assets/images/activity/activity3.png" alt />
          <img src="../../../assets/images/activity/activity4.png" alt />
          <img src="../../../assets/images/activity/activity5.png" alt />
        </div>
        <video
          v-show="this.$route.query.type == 2"
          controls
          poster="../../../assets/images/activity/activity5.png"
          x5-video-player-fullscreen="true"
          webkit-playsinline="true"
          x-webkit-airplay="true"
          playsinline="true"
          x5-playsinline
          style="width:100%;height:1.95rem;border-radius: 5px;object-fit: fill;"
          :src="'wsq'"
        ></video>
      </div> -->
    </div>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import { queryActivitydata } from "../../../api/skill"
export default {
  data() {
    return {
      historydata:"",
      threedata:"",
      routeid:0
    };
  },
  mounted(){
    queryActivitydata().then(res => {
      // console.log(this.$route.query.id);
      this.routeid = this.$route.query.id
      this.historydata = JSON.parse(res).historyactivitylist
      this.threedata = JSON.parse(res).threedaysactivitylist
    })
  },
  components: {
    "header-main": mainHeader
  }
};
</script>

<style lang="less" scoped>
.activity {
  // margin-top: 0.2rem;
  // margin-left: 0.15rem;
  // margin-right: 0.15rem;
  position: absolute;
  background: #ffffff;
  border-radius: 5px;
  left: 0.1rem;
  right: 0.1rem;
  /deep/ img {
    width: 100% !important;
  }
  .activity_mian {
    border-bottom: 1px solid #f0f0f7;
    // margin-left: 0.1rem;
    // margin-right: 0.1rem;
    width: 3.35rem;
    margin: 0 auto;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 0.18rem;
      color: #212121;
      letter-spacing: 0;
      line-height: 0.27rem;
      margin-top: 0.2rem;
    }
    .time {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      text-align: left;
      line-height: 0.13rem;
      margin-top: 0.1rem;
      margin-bottom: 0.1rem;
    }
    
    .img_desc {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.13rem;
      margin-top: 0.13rem;
      margin-bottom: 0.14rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .news {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #212121;
      letter-spacing: 0;
      text-align: justify;
      line-height: 0.27rem;
      margin-bottom: 0.2rem;
    }
  }
  .activity_desc {
    width: 3.25rem;
    margin: 0 auto;
    p {
      margin-top: 0.2rem;
      margin-bottom: 0.1rem;
      font-family: PingFangSC-Semibold;
      font-size: 0.18rem;
      color: #212121;
      letter-spacing: 0;
      line-height: 0.27rem;
    }
    img {
      width: 100%;
      margin-bottom: 0.15rem;
    }
    video {
      margin-bottom: 0.2rem;
    }
  }
}
</style>