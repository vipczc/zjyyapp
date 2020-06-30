<template>
<div style="height:100%" class="main">
   <keep-alive >
     <router-view :key="$route.fullPath"/>
  </keep-alive>
</div>
</template>
<script>
import './main.less'

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
